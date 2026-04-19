<template>
  <div class="ios-bg vh-100 d-flex flex-column overflow-hidden">

    <nav class="d-flex align-items-center gap-3 flex-shrink-0 p-3 px-4">
      <NuxtLink to="/" class="nav-btn-ios border-ios rounded-pill text-decoration-none fw-bold shadow-sm">← Home</NuxtLink>
      <h1 class="fw-black mb-0 fs-3">Progress Dashboard</h1>
      <button @click="confirmClear" class="ms-auto nav-btn-red border-ios rounded-pill fw-bold shadow-sm">Clear All</button>
    </nav>

    <div class="flex-grow-1 overflow-auto p-4">

      <!-- Empty state -->
      <div v-if="!dashboard.length" class="empty-state text-center py-5">
        <div class="empty-emoji mb-3">🎮</div>
        <p class="fs-4 fw-bold">No sessions yet.</p>
        <p class="text-secondary">Play any game to start tracking your progress!</p>
        <NuxtLink to="/" class="start-btn mt-3 d-inline-block">Play a game</NuxtLink>
      </div>

      <template v-else>
        <!-- Skill tabs -->
        <div class="d-flex gap-2 mb-4 flex-wrap">
          <button @click="filterSkill = null"
            class="filter-pill" :class="{ active: filterSkill === null }">All</button>
          <button v-for="skill in allSkills" :key="skill"
            @click="filterSkill = skill"
            class="filter-pill" :class="{ active: filterSkill === skill }">
            {{ skillLabel(skill) }}
          </button>
        </div>

        <!-- Summary cards -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="stat-card shadow-sm">
              <div class="stat-num">{{ totalPlays }}</div>
              <div class="stat-label">Total Plays</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="stat-card shadow-sm">
              <div class="stat-num">{{ totalCompleted }}</div>
              <div class="stat-label">Completed</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="stat-card shadow-sm">
              <div class="stat-num">{{ totalStars }} ⭐</div>
              <div class="stat-label">Stars Earned</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="stat-card shadow-sm">
              <div class="stat-num">{{ uniqueGames }}</div>
              <div class="stat-label">Games Tried</div>
            </div>
          </div>
        </div>

        <!-- Per-game rows -->
        <div class="d-flex flex-column gap-3">
          <div v-for="row in filteredDashboard" :key="row.gameId" class="game-row shadow-sm">
            <div class="d-flex align-items-center gap-3 flex-wrap">

              <div class="skill-badge" :class="`skill-${row.skill}`">
                {{ skillLabel(row.skill) }}
              </div>

              <div class="flex-grow-1">
                <div class="fw-black fs-5">{{ gameLabel(row.gameId) }}</div>
                <div class="text-secondary small">
                  {{ row.tags.join(' · ') }}
                </div>
              </div>

              <div class="d-flex gap-3 align-items-center flex-wrap text-end">
                <div class="metric">
                  <div class="metric-val">{{ row.plays }}</div>
                  <div class="metric-label">plays</div>
                </div>
                <div class="metric">
                  <div class="metric-val">{{ row.completed }}</div>
                  <div class="metric-label">complete</div>
                </div>
                <div class="metric">
                  <div class="metric-val">{{ row.bestScore }}</div>
                  <div class="metric-label">best score</div>
                </div>
                <div class="stars-display">
                  <span v-for="n in 3" :key="n" :class="n <= Math.round(row.avgStars) ? 'star-on' : 'star-off'">★</span>
                </div>
              </div>

              <div class="last-played small text-secondary text-nowrap">
                {{ formatDate(row.lastPlayed) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Recent sessions log -->
        <div class="mt-5">
          <h2 class="fw-black fs-5 mb-3">Recent Sessions</h2>
          <div class="sessions-table">
            <div class="sessions-header">
              <span>Game</span><span>Skill</span><span>Score</span><span>Stars</span><span>Attempts</span><span>Duration</span><span>Date</span>
            </div>
            <div v-for="s in recentSessions" :key="s.id" class="sessions-row">
              <span class="fw-bold">{{ gameLabel(s.gameId) }}</span>
              <span><span class="skill-badge sm" :class="`skill-${s.skill}`">{{ skillLabel(s.skill) }}</span></span>
              <span>{{ s.score }}</span>
              <span>{{ '★'.repeat(s.stars) }}{{ '☆'.repeat(3 - s.stars) }}</span>
              <span>{{ s.attempts }}</span>
              <span>{{ s.duration != null ? s.duration + 's' : '—' }}</span>
              <span class="text-secondary">{{ formatDate(s.timestamp) }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProgress } from '@/composables/useProgress';

const { sessions, dashboard, clearAll } = useProgress();

const filterSkill = ref(null);

const allSkills = computed(() => [...new Set(dashboard.value.map(d => d.skill).filter(Boolean))]);

const filteredDashboard = computed(() =>
  filterSkill.value
    ? dashboard.value.filter(d => d.skill === filterSkill.value)
    : dashboard.value
);

const totalPlays      = computed(() => filteredDashboard.value.reduce((a, d) => a + d.plays, 0));
const totalCompleted  = computed(() => filteredDashboard.value.reduce((a, d) => a + d.completed, 0));
const totalStars      = computed(() => sessions.value.reduce((a, s) => a + s.stars, 0));
const uniqueGames     = computed(() => filteredDashboard.value.length);

const recentSessions  = computed(() =>
  [...sessions.value]
    .filter(s => !filterSkill.value || s.skill === filterSkill.value)
    .slice(0, 20)
);

const GAME_LABELS = {
  'addition-mission':    'Addition Mission',
  'subtraction-mission': 'Subtraction Mission',
  'math-grid':           'Math Grid',
  'counting':            'Counting',
  'patterns':            'Patterns',
  'coding-missions':     'Coding Missions',
  'literacy-word-sounds':'Word Sounds',
};
const gameLabel  = (id) => GAME_LABELS[id] || id;

const SKILL_LABELS = { math: 'Math', stem: 'STEM', language: 'Language', literacy: 'Literacy' };
const skillLabel = (s) => SKILL_LABELS[s] || (s || 'General');

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const confirmClear = () => {
  if (confirm('Clear all progress? This cannot be undone.')) clearAll();
};
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; font-family: -apple-system, sans-serif; }

.nav-btn-ios {
  background: white; border-radius: 50px; padding: 10px 20px;
  font-weight: 700; color: #007AFF; cursor: pointer; white-space: nowrap;
}
.nav-btn-red {
  background: #FF3B30; border-radius: 50px; padding: 10px 20px;
  font-weight: 700; color: white; cursor: pointer; border: none;
}

/* Filter pills */
.filter-pill {
  padding: 8px 20px; border-radius: 50px; border: 3px solid #E5E5EA;
  background: white; font-weight: 800; color: #8E8E93; cursor: pointer; transition: 0.15s;
}
.filter-pill.active { border-color: #007AFF; color: #007AFF; background: #007AFF11; }

/* Stat cards */
.stat-card {
  background: white; border-radius: 20px; padding: 20px;
  text-align: center; border: 3px solid #E5E5EA;
}
.stat-num   { font-size: 2rem; font-weight: 900; color: #007AFF; }
.stat-label { font-size: 0.85rem; color: #8E8E93; font-weight: 700; margin-top: 4px; }

/* Game rows */
.game-row {
  background: white; border-radius: 20px; padding: 18px 20px;
  border: 3px solid #E5E5EA;
}

/* Skill badge */
.skill-badge {
  padding: 6px 14px; border-radius: 50px; font-weight: 900; font-size: 0.78rem;
  white-space: nowrap;
}
.skill-badge.sm { font-size: 0.7rem; padding: 4px 10px; }
.skill-math     { background: #007AFF22; color: #007AFF; }
.skill-stem     { background: #34C75922; color: #34C759; }
.skill-language { background: #FF2D5522; color: #FF2D55; }
.skill-literacy { background: #AF52DE22; color: #AF52DE; }

/* Metrics */
.metric      { text-align: center; min-width: 55px; }
.metric-val  { font-weight: 900; font-size: 1.2rem; color: #1c1c1e; }
.metric-label{ font-size: 0.72rem; color: #8E8E93; font-weight: 700; }

/* Stars */
.stars-display { font-size: 1.4rem; letter-spacing: 2px; }
.star-on  { color: #FFD60A; }
.star-off { color: #D1D1D6; }

/* Sessions table */
.sessions-table { background: white; border-radius: 20px; border: 3px solid #E5E5EA; overflow: hidden; }
.sessions-header, .sessions-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1.5fr;
  gap: 8px; padding: 12px 16px; align-items: center;
}
.sessions-header {
  background: #F2F2F7; font-weight: 900; font-size: 0.78rem;
  color: #8E8E93; text-transform: uppercase; letter-spacing: 0.5px;
}
.sessions-row { border-top: 2px solid #F2F2F7; font-size: 0.9rem; }
.sessions-row:nth-child(even) { background: #FAFAFA; }

/* Empty state */
.empty-emoji { font-size: 5rem; }
.start-btn {
  background: #007AFF; color: white; font-weight: 900; padding: 14px 30px;
  border-radius: 50px; text-decoration: none; font-size: 1.1rem;
}
</style>
