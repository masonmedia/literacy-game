/**
 * useProgress — shared composable for tracking game sessions.
 *
 * Each session record shape:
 * {
 *   id:         string,        // unique session id (auto-generated)
 *   gameId:     string,        // e.g. 'addition-mission', 'literacy-word-sounds'
 *   skill:      string,        // 'math' | 'language' | 'stem' | 'literacy'
 *   tags:       string[],      // e.g. ['addition', 'ten-frame']
 *   completed:  boolean,
 *   score:      number,        // raw score / points
 *   stars:      number,        // 0–3 calculated from score
 *   attempts:   number,
 *   duration:   number|null,   // seconds, null if not tracked
 *   timestamp:  string,        // ISO 8601
 * }
 *
 * Usage:
 *   const { startSession, endSession, sessions, summaryFor } = useProgress();
 *   const sid = startSession({ gameId: 'addition-mission', skill: 'math', tags: ['addition'] });
 *   // ... game runs ...
 *   endSession(sid, { score: 80, attempts: 10, completed: true });
 */

import { ref, computed } from 'vue';

const STORAGE_KEY = 'game_progress_v1';

// Shared reactive state across all composable instances
const sessions = ref(loadFromStorage());

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.value));
  } catch {
    // storage quota or SSR — silently ignore
  }
}

function calcStars(score, maxScore = 100) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  if (pct >= 0.85) return 3;
  if (pct >= 0.60) return 2;
  if (pct >= 0.30) return 1;
  return 0;
}

// In-flight sessions keyed by id (to compute duration)
const _active = {};

export function useProgress() {
  /**
   * Start a new session. Returns the session id.
   * @param {{ gameId: string, skill?: string, tags?: string[] }} opts
   */
  function startSession({ gameId, skill = '', tags = [] }) {
    const id = `${gameId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    _active[id] = { startedAt: Date.now() };

    const record = {
      id,
      gameId,
      skill,
      tags,
      completed:  false,
      score:      0,
      stars:      0,
      attempts:   0,
      duration:   null,
      timestamp:  new Date().toISOString(),
    };

    sessions.value = [record, ...sessions.value];
    persist();
    return id;
  }

  /**
   * Finalise a session.
   * @param {string} id  — from startSession
   * @param {{ score?: number, maxScore?: number, attempts?: number, completed?: boolean }} result
   */
  function endSession(id, { score = 0, maxScore = 100, attempts = 0, completed = false } = {}) {
    const idx = sessions.value.findIndex(s => s.id === id);
    if (idx === -1) return;

    const duration = _active[id]
      ? Math.round((Date.now() - _active[id].startedAt) / 1000)
      : null;
    delete _active[id];

    sessions.value[idx] = {
      ...sessions.value[idx],
      completed,
      score,
      stars:    calcStars(score, maxScore),
      attempts,
      duration,
    };
    // Trigger reactivity
    sessions.value = [...sessions.value];
    persist();
  }

  /** Bump attempt count mid-session (call on each wrong answer). */
  function recordAttempt(id) {
    const idx = sessions.value.findIndex(s => s.id === id);
    if (idx === -1) return;
    sessions.value[idx] = { ...sessions.value[idx], attempts: sessions.value[idx].attempts + 1 };
    sessions.value = [...sessions.value];
    persist();
  }

  /** Clear all stored progress. */
  function clearAll() {
    sessions.value = [];
    persist();
  }

  /** All sessions for a specific game. */
  function sessionsFor(gameId) {
    return computed(() => sessions.value.filter(s => s.gameId === gameId));
  }

  /** Aggregate summary for a game: best score, total plays, avg stars, etc. */
  function summaryFor(gameId) {
    return computed(() => {
      const recs = sessions.value.filter(s => s.gameId === gameId);
      if (!recs.length) return null;
      const completed = recs.filter(r => r.completed);
      return {
        gameId,
        totalPlays:    recs.length,
        totalCompleted: completed.length,
        bestScore:     Math.max(...recs.map(r => r.score), 0),
        avgStars:      recs.reduce((a, r) => a + r.stars, 0) / recs.length,
        lastPlayed:    recs[0].timestamp,
      };
    });
  }

  /** All sessions grouped by skill. */
  const bySkill = computed(() => {
    return sessions.value.reduce((acc, s) => {
      (acc[s.skill] = acc[s.skill] || []).push(s);
      return acc;
    }, {});
  });

  /** Dashboard-ready list: one row per unique game with aggregated stats. */
  const dashboard = computed(() => {
    const map = {};
    for (const s of sessions.value) {
      if (!map[s.gameId]) {
        map[s.gameId] = { gameId: s.gameId, skill: s.skill, tags: s.tags, plays: 0, completed: 0, bestScore: 0, totalStars: 0, lastPlayed: s.timestamp };
      }
      const m = map[s.gameId];
      m.plays++;
      if (s.completed) m.completed++;
      if (s.score > m.bestScore) m.bestScore = s.score;
      m.totalStars += s.stars;
      if (s.timestamp > m.lastPlayed) m.lastPlayed = s.timestamp;
    }
    return Object.values(map).map(m => ({ ...m, avgStars: m.plays ? m.totalStars / m.plays : 0 }));
  });

  return {
    sessions,
    dashboard,
    bySkill,
    startSession,
    endSession,
    recordAttempt,
    clearAll,
    sessionsFor,
    summaryFor,
  };
}
