<!-- <template>
  <div class="ios-container vh-100 p-3 p-md-5 overflow-auto">
    <nav>
      <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none d-inline-block">← Home</NuxtLink>
    </nav>

    <div class="text-center mb-5">
      <h1 class="display-3 fw-bold text-dark tracking-tight">STEM Lab</h1>
      <p class="text-secondary fw-bold text-uppercase tracking-wider">Explore • Build • Solve</p>
    </div>

    <div class="row g-5 justify-content-center max-width-lg mx-auto">
      <div class="col-12 col-md-6 col-lg-5">
        <NuxtLink to="/stem/patterns" class="stem-card patterns shadow-sm text-decoration-none d-flex flex-column p-4 rounded-5 gap-4">
          <div class="card-icon-flat">🧩</div>
          <div class="card-content d-flex flex-column gap-3">
            <h2 class="h1 fw-bold text-white mb-0">Pattern Engine</h2>
            <p class="text-white opacity-85 fw-medium fs-5">Complete sequences with shapes and symbols.</p>
          </div>
          <div class="play-pill-left shadow-sm">Play Now</div>
        </NuxtLink>
      </div>

      <div class="col-12 col-md-6 col-lg-5">
        <NuxtLink to="/stem/counting" class="stem-card counting shadow-sm text-decoration-none d-flex flex-column p-4 rounded-5 gap-4">
          <div class="card-icon-flat">🧊</div>
          <div class="card-content d-flex flex-column gap-3">
            <h2 class="h1 fw-bold text-white mb-0">Cube Counter</h2>
            <p class="text-white opacity-85 fw-medium fs-5">Build numbers up to 50 with Base-Ten blocks.</p>
          </div>
          <div class="play-pill-left shadow-sm">Play Now</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; min-height: 100vh; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; }

.stem-card {
  height: 100%; min-height: 380px;
  transition: all 0.2s ease;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
}
.stem-card:hover { transform: translateY(-8px); filter: brightness(1.05); }

.patterns { background-color: #FF3B30; } 
.counting { background-color: #007AFF; }

.card-icon-flat { font-size: 6rem; line-height: 1; }

.play-pill-left {
  align-self: flex-start;
  background: #FFD60A; color: #007AFF;
  padding: 12px 30px; border-radius: 20px;
  font-weight: 900; text-transform: uppercase;
  margin-top: auto;
}
.max-width-lg { max-width: 1100px; }
</style> -->


<!-- 
best board size, and general UI
<template>
  <div class="stem-hub min-vh-100 bg-light py-5">
    <div class="container">
      <nav class="mb-4">
        <NuxtLink to="/" class="btn btn-outline-secondary btn-sm rounded-pill px-3 shadow-sm">
          <i class="bi bi-arrow-left me-1"></i> Literacy Dashboard
        </NuxtLink>
      </nav>

      <div class="text-center mb-5">
        <h1 class="display-3 fw-black text-dark mb-2">STEM Lab</h1>
        <p class="lead text-muted fw-medium">Choose your mission, Explorer!</p>
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-md-4">
          <div class="card h-100 shadow border-0 text-center p-4 ios-card">
            <div class="icon-sq bg-warning-subtle text-warning mx-auto mb-3">
              <span class="fs-1">🔢</span>
            </div>
            <h2 class="fw-bold">Counting</h2>
            <p class="text-muted small">Master numbers and quantities!</p>
            <NuxtLink to="/stem/counting" class="btn btn-warning btn-lg w-100 rounded-pill mt-auto fw-bold text-white">
              Start
            </NuxtLink>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 shadow border-0 text-center p-4 ios-card">
            <div class="icon-sq bg-primary-subtle text-primary mx-auto mb-3">
              <span class="fs-1">🧩</span>
            </div>
            <h2 class="fw-bold">Patterns</h2>
            <p class="text-muted small">Complete the shape sequences!</p>
            <NuxtLink to="/stem/patterns" class="btn btn-primary btn-lg w-100 rounded-pill mt-auto fw-bold">
              Start
            </NuxtLink>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 shadow border-0 text-center p-4 ios-card">
            <div class="icon-sq bg-success-subtle text-success mx-auto mb-3">
              <span class="fs-1">🐸</span>
            </div>
            <h2 class="fw-bold">Coding</h2>
            <p class="text-muted small">Program a path for your animal!</p>
            <NuxtLink to="/stem/coding-missions" class="btn btn-success btn-lg w-100 rounded-pill mt-auto fw-bold">
              Start
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fw-black { font-weight: 900; }
.ios-card { border-radius: 30px; transition: transform 0.2s; }
.ios-card:hover { transform: scale(1.02); }
.icon-sq { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 22px; }
</style> -->

<!-- v4 close to prod -->
<!-- <template>
  <div v-if="stemReady" :style="{ backgroundColor: stemConfig.bg }" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">
    
    <nav class="row align-items-center flex-shrink-0 mb-3">
      <div class="col-3 d-flex justify-content-start">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back</NuxtLink>
        <button @click="stemReset" class="nav-btn-ios rounded-pill bg-primary border border-white border-3 text-light py-2 fw-black shadow-sm">RESET MISSION</button>
      </div>
      <div class="col-6 d-flex justify-content-center align-items-center">
        <div class="target-card-ios shadow-sm border-ios px-5 py-2 fw-bold bg-primary text-white border-white border-3 shadow-lg rounded-pill text-uppercase">
          {{ allCollected ? 'GO TO THE FLAG!' : `COLLECT ${stemConfig.itemName}S: ${collectedCount}/${totalNeeded}` }}
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex gap-4 overflow-hidden">
      
      <div class="d-flex flex-column gap-3 h-100" style="width: 300px;">
        <div class="card border-ios rounded-5 shadow-sm p-3 bg-white d-flex flex-column" style="height: 45%;">
          <span class="label mb-2 opacity-50 fw-black small fw-bold">SEQUENCE</span>
          <div class="flex-grow-1 overflow-y-auto pr-2 text-light custom-scroll" id="codeTape">
            <TransitionGroup name="list">
              <div v-for="(cmd, i) in stemSequence" :key="i" class="tape-item fw-bold shadow mb-1 p-3 d-inline-block align-items-center rounded-4 border border-white border-3" :style="{ backgroundColor: getBtnColor(cmd) }">
                
    NOT USING <span class="step-num px-2 text-light">{{ i + 1 }}</span>
                <div class="tape-icon-wrap d-flex justify-content-center">
                  <svg v-if="cmd === 'UP'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/></svg>
                  <svg v-if="cmd === 'DOWN'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/></svg>
                  <svg v-if="cmd === 'LEFT'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>
                  <svg v-if="cmd === 'RIGHT'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg>
                </div>
    not using <span class="ms-2 fw-black text-white small">{{ cmd }}</span>
              </div>
            </TransitionGroup>
          </div>
    not using <button @click="stemReset" class="nav-btn-ios border-ios border-2 text-danger mt-3 py-2 w-100 fw-black shadow-sm">RESET MISSION</button>
        </div>

        <div class="card border-ios rounded-5 shadow-sm p-4 bg-white d-flex align-items-center justify-content-center">
          <div class="dpad-grid-ios">
            <div class="spacer"></div>
            <button @click="stemMove('UP')" class="dpad-key up-btn"><svg viewBox="0 0 16 16" width="30" fill="white"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/></svg></button>
            <div class="spacer"></div>
            <button @click="stemMove('LEFT')" class="dpad-key left-btn"><svg viewBox="0 0 16 16" width="30" fill="white"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></button>
            <div class="center-nub"></div>
            <button @click="stemMove('RIGHT')" class="dpad-key right-btn"><svg viewBox="0 0 16 16" width="30" fill="white"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg></button>
            <div class="spacer"></div>
            <button @click="stemMove('DOWN')" class="dpad-key down-btn"><svg viewBox="0 0 16 16" width="30" fill="white"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/></svg></button>
            <div class="spacer"></div>
          </div>
        </div>
      </div>

      <div class="card border-ios rounded-5 shadow-sm flex-grow-1 p-4 bg-white d-flex align-items-center justify-content-center">
        <div class="board-inner position-relative" :style="{ backgroundColor: stemConfig.matColor }">
          <svg class="trace-svg" :viewBox="`0 0 ${8 * cellSize} ${4 * cellSize}`">
            <polyline fill="none" :stroke="stemConfig.pathColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1, 15" :points="svgTracePoints" />
          </svg>

          <div class="grid-8x4">
            <div v-for="r in 4" :key="'r'+r" class="d-flex">
              <div v-for="c in 8" :key="'c'+c" class="square-cell">
                <div v-if="isItemAt(r-1, c-1)" class="game-item animate-float">{{ stemConfig.item }}</div>
                <div v-if="isCollectedAt(r-1, c-1)" class="collected-dot"></div>
                
                <div v-if="stemGoal.r === r-1 && stemGoal.c === c-1 && !isPlayerOn(r-1, c-1)" 
                     class="goal-item" :class="{ 'locked-flag': !allCollected }">🚩</div>
                
                <div v-if="stemPos.r === r-1 && stemPos.c === c-1" class="player-sprite bounce-pop">{{ stemConfig.char }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui-yellow shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <div class="confetti-holder"><div v-for="p in confettiParticles" :key="p.id" class="particle" :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }"></div></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const score = ref(0);
const stemReady = ref(false);
const stemWon = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const stemSequence = ref([]);
const stemTrace = ref([]); 
const stemPos = ref({ r: 0, c: 0 });
const stemGoal = ref({ r: 0, c: 0 });
const stemItems = ref([]); 
const collectedItems = ref([]); 
const stemConfig = ref({});
const cellSize = 100;

const themes = [
  { char: '🦦', item: '🌿', itemName: 'Kelp', bg: '#F2F2F7', matColor: '#007AFF33', pathColor: '#007AFF' },
  { char: '🐘', item: '🌳', itemName: 'Tree', bg: '#F2F2F7', matColor: '#D2B48C', pathColor: '#5D4037' },
  { char: '🐸', item: '🪷', itemName: 'Lily Pad', bg: '#F2F2F7', matColor: '#34C75944', pathColor: '#34C759' }
];

const totalNeeded = computed(() => stemItems.value.length + collectedItems.value.length);
const collectedCount = computed(() => collectedItems.value.length);
const allCollected = computed(() => stemItems.value.length === 0);

const isItemAt = (r, c) => stemItems.value.some(p => p.r === r && p.c === c);
const isCollectedAt = (r, c) => collectedItems.value.some(p => p.r === r && p.c === c);
const isPlayerOn = (r, c) => stemPos.value.r === r && stemPos.value.c === c;

const svgTracePoints = computed(() => stemTrace.value.map(p => `${p.c * cellSize + cellSize/2},${p.r * cellSize + cellSize/2}`).join(' '));

const getBtnColor = (cmd) => ({ UP: '#FF2D55', DOWN: '#FF9500', LEFT: '#AF52DE', RIGHT: '#007AFF' }[cmd]);

const generateNewMission = () => {
  stemWon.value = false; showSuccessOverlay.value = false; stemSequence.value = []; collectedItems.value = [];
  stemConfig.value = themes[Math.floor(Math.random() * themes.length)];
  
  const start = { r: Math.floor(Math.random() * 4), c: 0 };
  stemPos.value = { ...start };
  stemTrace.value = [{ ...start }];
  
  let curr = { ...start };
  const fullPath = [{ ...start }];
  while (curr.c < 7) {
    const moves = [{r:0,c:1}, {r:0,c:1}, {r:1,c:0}, {r:-1,c:0}].filter(m => 
      curr.r + m.r >= 0 && curr.r + m.r < 4 && curr.c + m.c >= 0 && curr.c + m.c < 8
    );
    const move = moves[Math.floor(Math.random() * moves.length)];
    curr = { r: curr.r + move.r, c: curr.c + move.c };
    if (!fullPath.some(p => p.r === curr.r && p.c === curr.c)) fullPath.push({ ...curr });
  }

  const goal = fullPath[fullPath.length - 1];
  stemItems.value = fullPath.filter((p, i) => {
    const isSpecial = (p.r === goal.r && p.c === goal.c) || (p.r === start.r && p.c === start.c);
    return i > 0 && !isSpecial && i % 2 === 0;
  });
  stemGoal.value = goal;
  stemReady.value = true;
};

const stemMove = (dir) => {
  if (stemWon.value) return;
  let nr = stemPos.value.r, nc = stemPos.value.c;
  if (dir === 'UP' && nr > 0) nr--;
  if (dir === 'DOWN' && nr < 3) nr++;
  if (dir === 'LEFT' && nc > 0) nc--;
  if (dir === 'RIGHT' && nc < 7) nc++;

  if (nr !== stemPos.value.r || nc !== stemPos.value.c) {
    stemPos.value = { r: nr, c: nc };
    stemSequence.value.push(dir);
    stemTrace.value.push({ r: nr, c: nc });
    
    const idx = stemItems.value.findIndex(p => p.r === nr && p.c === nc);
    if (idx > -1) {
      collectedItems.value.push(stemItems.value[idx]);
      stemItems.value.splice(idx, 1);
    }

    nextTick(() => { const el = document.getElementById('codeTape'); if (el) el.scrollTop = el.scrollHeight; });

    if (nr === stemGoal.value.r && nc === stemGoal.value.c && allCollected.value) {
      stemWon.value = true; score.value += 10; showSuccessOverlay.value = true;
      spawnConfetti(150);
      setTimeout(() => { showSuccessOverlay.value = false; setTimeout(generateNewMission, 600); }, 2000);
    }
  }
};

const stemReset = () => generateNewMission();

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

onMounted(() => { window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') stemMove('UP'); if (e.key === 'ArrowDown') stemMove('DOWN');
  if (e.key === 'ArrowLeft') stemMove('LEFT'); if (e.key === 'ArrowRight') stemMove('RIGHT');
}); generateNewMission(); });
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; }
.nav-btn-ios { background: white; border-radius: 15px; font-weight: 700; border: none; padding: 12px 25px; }
.border-ios { border: 4px solid #E5E5EA !important; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

.board-inner { width: 100%; border-radius: 24px; overflow: hidden; box-shadow: inset 0 0 20px rgba(0,0,0,0.1); }
.grid-8x4 { display: flex; flex-direction: column; position: relative; z-index: 2; }
.square-cell { flex: 1; aspect-ratio: 1 / 1; border: 1px solid rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; position: relative; }

.collected-dot { width: 14px; height: 14px; background: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.locked-flag { opacity: 0.2; filter: grayscale(1); }

.dpad-grid-ios { display: grid; grid-template-columns: repeat(3, 75px); gap: 12px; }
.dpad-key { border: 4px solid rgba(0,0,0,0.05); border-radius: 20px; height: 75px; display: flex; align-items: center; justify-content: center; transition: 0.1s; box-shadow: 0 6px 0 rgba(0,0,0,0.1); }
.up-btn { background: #FF2D55; } .left-btn { background: #AF52DE; } .right-btn { background: #007AFF; } .down-btn { background: #FF9500; }
.dpad-key:active { transform: translateY(4px); box-shadow: none; }

.player-sprite { font-size: 4rem; z-index: 10; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2)); }
.game-item { font-size: 3.5rem; z-index: 2; }
.goal-item { font-size: 3.5rem; transition: 0.3s; }

.trace-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
.custom-scroll::-webkit-scrollbar { width: 6px; } .custom-scroll::-webkit-scrollbar-thumb { background: #AEAEB2; border-radius: 10px; }

.animate-float { animation: float 3s infinite ease-in-out; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.bounce-pop { animation: pop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop { 0% { transform: scale(0.6); } 100% { transform: scale(1); } }

.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui-yellow { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; background: #FFD60A; color: #007AFF; font-size: 4rem; transform: rotate(-5deg); animation: hop 0.5s infinite alternate ease-in-out; }
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }
</style> -->




<!-- v5 -->
<!-- 
<template>
    <div v-if="stemReady" :style="{ backgroundColor: stemConfig.bg }"
        class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">

        <nav class="row align-items-center flex-shrink-0 mb-3">
            <div class="col-3 d-flex justify-content-start gap-2">
                <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back
                </NuxtLink>
                <button @click="stemReset"
                    class="nav-btn-ios rounded-pill bg-primary border border-white border-3 text-light py-2 fw-black shadow-sm">RESET</button>
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center">
                <div
                    class="target-card-ios shadow-sm border-ios px-5 py-2 fw-bold bg-primary text-white border-white border-3 shadow-lg rounded-pill text-uppercase">
                    {{ allCollected ? 'GO TO THE FLAG!' : `COLLECT ${stemConfig.itemName}S:
                                        ${collectedCount}/${totalNeeded}` }}
                </div>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <div class="score-pill shadow-sm">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex gap-4 overflow-hidden">
            <div class="d-flex flex-column gap-3 h-100" style="width: 300px;">
                <div class="card border-ios rounded-5 shadow-sm p-3 bg-white d-flex flex-column" style="height: 45%;">
                    <span class="label mb-2 opacity-50 fw-black small fw-bold">SEQUENCE</span>
                    <div class="flex-grow-1 overflow-y-auto pr-2 text-light custom-scroll" id="codeTape">
                        <TransitionGroup name="list">
                            <div v-for="(cmd, i) in stemSequence" :key="i"
                                class="tape-item fw-bold shadow mb-1 p-3 d-inline-block align-items-center rounded-4 border border-white border-3"
                                :style="{ backgroundColor: getBtnColor(cmd) }">
                                <div class="tape-icon-wrap d-flex justify-content-center">
                                    <ArrowSvg :dir="cmd" />
                                </div>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>

                <div
                    class="card border-ios rounded-5 shadow-sm p-4 bg-white d-flex align-items-center justify-content-center">
                    <div class="dpad-grid-ios">
                        <div class="spacer"></div>
                        <button @click="stemMove('UP')" class="dpad-key up-btn">
                            <ArrowSvg dir="UP" size="30" />
                        </button>
                        <div class="spacer"></div>
                        <button @click="stemMove('LEFT')" class="dpad-key left-btn">
                            <ArrowSvg dir="LEFT" size="30" />
                        </button>
                        <div class="center-nub"></div>
                        <button @click="stemMove('RIGHT')" class="dpad-key right-btn">
                            <ArrowSvg dir="RIGHT" size="30" />
                        </button>
                        <div class="spacer"></div>
                        <button @click="stemMove('DOWN')" class="dpad-key down-btn">
                            <ArrowSvg dir="DOWN" size="30" />
                        </button>
                        <div class="spacer"></div>
                    </div>
                </div>
            </div>

            <div
                class="card border-ios rounded-5 shadow-sm flex-grow-1 p-4 bg-white d-flex align-items-center justify-content-center">
                <div class="board-inner position-relative" :style="{ backgroundColor: stemConfig.matColor }">
                    <svg class="trace-svg" :viewBox="`0 0 ${8 * cellSize} ${4 * cellSize}`">
                        <polyline fill="none" :stroke="stemConfig.pathColor" stroke-width="6" stroke-linecap="round"
                            stroke-linejoin="round" stroke-dasharray="1, 15" :points="svgTracePoints" />
                    </svg>

                    <div class="grid-8x4">
                        <div v-for="r in 4" :key="'r' + r" class="d-flex">
                            <div v-for="c in 8" :key="'c' + c" class="square-cell">
                                <div v-if="isItemAt(r - 1, c - 1)" class="game-item animate-float">{{ stemConfig.item }}</div>
                                <div v-if="isCollectedAt(r - 1, c - 1)" class="collected-dot"></div>
                                <div v-if="stemGoal.r === r - 1 && stemGoal.c === c - 1 && !isPlayerOn(r - 1, c - 1)"
                                    class="goal-item" :class="{ 'locked-flag': !allCollected }">🚩</div>
                                <div v-if="stemPos.r === r - 1 && stemPos.c === c - 1" class="player-sprite bounce-pop">{{
                                    stemConfig.char }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="ios-pop-fade">
            <div v-if="showSuccessOverlay" class="status-overlay">
                <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
                    <div class="fw-black mb-1">Ya Bud!</div>
                    <div class="move-badge px-3 py-1 rounded-pill bg-primary text-white small fw-black">
                        {{ stemSequence.length }} MOVES
                    </div>
                    <div class="d-flex flex-wrap justify-content-center gap-1 mt-2" style="max-width: 300px;">
                        <div v-for="(cmd, i) in stemSequence" :key="'v' + i" class="v-path-icon"
                            :style="{ backgroundColor: getBtnColor(cmd) }">
                            <ArrowSvg :dir="cmd" size="20" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <div class="confetti-holder">
            <div v-for="p in confettiParticles" :key="p.id" class="particle"
                :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }">
            </div>
        </div>
    </div>
</template>

<script setup>
import { h, ref, computed, onMounted, nextTick } from 'vue';

const ArrowSvg = (props) => {
    const paths = {
        UP: "M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z",
        DOWN: "M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z",
        LEFT: "M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z",
        RIGHT: "M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
    };
    return h('svg', { viewBox: "0 0 16 16", fill: "white", width: props.size || 18 }, [
        h('path', { 'fill-rule': "evenodd", d: paths[props.dir] })
    ]);
};

const score = ref(0);
const stemReady = ref(false);
const stemWon = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const stemSequence = ref([]);
const stemTrace = ref([]);
const stemPos = ref({ r: 0, c: 0 });
const stemGoal = ref({ r: 0, c: 0 });
const stemItems = ref([]);
const collectedItems = ref([]);
const stemConfig = ref({});
const cellSize = 100;

const themes = [
    { char: '🦦', item: '🌿', itemName: 'Kelp', bg: '#F2F2F7', matColor: '#007AFF33', pathColor: '#007AFF' },
    { char: '🐘', item: '🌳', itemName: 'Tree', bg: '#F2F2F7', matColor: '#D2B48C', pathColor: '#5D4037' },
    { char: '🐸', item: '🪷', itemName: 'Lily Pad', bg: '#F2F2F7', matColor: '#34C75944', pathColor: '#34C759' },
    { char: '🐅', item: '🍖', itemName: 'Meat', bg: '#F2F2F7', matColor: '#FF950033', pathColor: '#FF9500' },
    { char: '🐆', item: '🍖', itemName: 'Meat', bg: '#F2F2F7', matColor: '#FFCC0033', pathColor: '#8B4513' }
];

const totalNeeded = computed(() => stemItems.value.length + collectedItems.value.length);
const collectedCount = computed(() => collectedItems.value.length);
const allCollected = computed(() => stemItems.value.length === 0);

const isItemAt = (r, c) => stemItems.value.some(p => p.r === r && p.c === c);
const isCollectedAt = (r, c) => collectedItems.value.some(p => p.r === r && p.c === c);
const isPlayerOn = (r, c) => stemPos.value.r === r && stemPos.value.c === c;

const svgTracePoints = computed(() => stemTrace.value.map(p => `${p.c * cellSize + cellSize / 2},${p.r * cellSize + cellSize / 2}`).join(' '));
const getBtnColor = (cmd) => ({ UP: '#FF2D55', DOWN: '#FF9500', LEFT: '#AF52DE', RIGHT: '#007AFF' }[cmd]);

const generateNewMission = () => {
    stemWon.value = false; showSuccessOverlay.value = false; stemSequence.value = []; collectedItems.value = [];
    stemConfig.value = themes[Math.floor(Math.random() * themes.length)];

    const start = { r: Math.floor(Math.random() * 4), c: 0 };
    stemPos.value = { ...start };
    stemTrace.value = [{ ...start }];

    // Random Goal Placement
    let goal;
    do {
        goal = { r: Math.floor(Math.random() * 4), c: Math.floor(Math.random() * 6) + 2 };
    } while (goal.r === start.r && goal.c === start.c);
    stemGoal.value = goal;

    // Random item count 4-10
    const count = Math.floor(Math.random() * 7) + 4;
    const newItems = [];
    while (newItems.length < count) {
        const item = { r: Math.floor(Math.random() * 4), c: Math.floor(Math.random() * 8) };
        const isStart = item.r === start.r && item.c === start.c;
        const isGoal = item.r === goal.r && item.c === goal.c;
        const isDuplicate = newItems.some(i => i.r === item.r && i.c === item.c);
        if (!isStart && !isGoal && !isDuplicate) newItems.push(item);
    }
    stemItems.value = newItems;
    stemReady.value = true;
};

const stemMove = (dir) => {
    if (stemWon.value) return;
    let nr = stemPos.value.r, nc = stemPos.value.c;
    if (dir === 'UP' && nr > 0) nr--;
    if (dir === 'DOWN' && nr < 3) nr++;
    if (dir === 'LEFT' && nc > 0) nc--;
    if (dir === 'RIGHT' && nc < 7) nc++;

    if (nr !== stemPos.value.r || nc !== stemPos.value.c) {
        stemPos.value = { r: nr, c: nc };
        stemSequence.value.push(dir);
        stemTrace.value.push({ r: nr, c: nc });

        const idx = stemItems.value.findIndex(p => p.r === nr && p.c === nc);
        if (idx > -1) {
            collectedItems.value.push(stemItems.value[idx]);
            stemItems.value.splice(idx, 1);
        }

        nextTick(() => { const el = document.getElementById('codeTape'); if (el) el.scrollTop = el.scrollHeight; });

        if (nr === stemGoal.value.r && nc === stemGoal.value.c && allCollected.value) {
            stemWon.value = true; score.value += 10; showSuccessOverlay.value = true;
            spawnConfetti(150);
            setTimeout(() => { showSuccessOverlay.value = false; setTimeout(generateNewMission, 600); }, 5000);
        }
    }
};

const stemReset = () => generateNewMission();

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200
    }));
};

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') stemMove('UP'); if (e.key === 'ArrowDown') stemMove('DOWN');
        if (e.key === 'ArrowLeft') stemMove('LEFT'); if (e.key === 'ArrowRight') stemMove('RIGHT');
    });
    generateNewMission();
});
</script>

<style scoped>
.ios-bg {
    background-color: #F2F2F7;
}

.nav-btn-ios {
    background: white;
    border-radius: 15px;
    font-weight: 700;
    border: none;
    padding: 12px 25px;
    color: #007AFF;
}

.border-ios {
    border: 4px solid #E5E5EA !important;
}

.fw-black {
    font-weight: 900;
}

.score-pill {
    background: #FFD60A;
    color: #007AFF;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 900;
    border: 4px solid white;
}

.board-inner {
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}

.grid-8x4 {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
}

.square-cell {
    flex: 1;
    aspect-ratio: 1 / 1;
    border: 1px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.collected-dot {
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.locked-flag {
    opacity: 0.2;
    filter: grayscale(1);
}

.dpad-grid-ios {
    display: grid;
    grid-template-columns: repeat(3, 75px);
    gap: 12px;
}

.dpad-key {
    border: 4px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s;
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.1);
}

.up-btn {
    background: #FF2D55;
}

.left-btn {
    background: #AF52DE;
}

.right-btn {
    background: #007AFF;
}

.down-btn {
    background: #FF9500;
}

.dpad-key:active {
    transform: translateY(4px);
    box-shadow: none;
}

.player-sprite {
    font-size: 4rem;
    z-index: 10;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.2));
    transform: scaleX(-1);
}

.game-item {
    font-size: 3.5rem;
    z-index: 2;
}

.goal-item {
    font-size: 3.5rem;
    transition: 0.3s;
}

.trace-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.custom-scroll::-webkit-scrollbar {
    width: 6px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: #AEAEB2;
    border-radius: 10px;
}

.animate-float {
    animation: float 3s infinite ease-in-out;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }
}

.bounce-pop {
    animation: pop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop {
    0% {
        transform: scale(-0.6, 0.6);
    }

    100% {
        transform: scale(-1, 1);
    }
}

/* Success Overlay Integrated Styling */
.status-overlay {
    position: fixed;
    inset: 0;
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

.pill-ui-yellow {
    font-weight: 900;
    padding: 30px 40px;
    border-radius: 50px;
    border: 10px solid white;
    background: #FFD60A;
    color: #007AFF;
    font-size: 3.5rem;
    transform: rotate(-3deg);
    animation: hop 0.5s infinite alternate ease-in-out;
}

.move-badge {
    font-size: 1rem;
    letter-spacing: 1px;
}

.v-path-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 0;
}

@keyframes hop {
    from {
        transform: rotate(-3deg) translateY(0);
    }

    to {
        transform: rotate(-3deg) translateY(-15px);
    }
}

.confetti-holder {
    position: fixed;
    top: -50px;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 2999;
}

.particle {
    position: absolute;
    border-radius: 3px;
    animation: fall linear forwards;
}

@keyframes fall {
    to {
        transform: translateY(110vh) translateX(var(--drift)) rotate(720deg);
        opacity: 0;
    }
}</style> -->


<template>
  <div class="vh-100 d-flex flex-column p-4 ios-bg" style="background-color: #F2F2F7;">
    
    <nav class="row align-items-center flex-shrink-0 mb-5">
      <div class="col-3">
        <NuxtLink to="/" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Home</NuxtLink>
      </div>
      <div class="col-6 text-center">
        <h1 class="fw-black text-dark m-0" style="font-size: 2.5rem; letter-spacing: -1px;">STEM Labs</h1>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="status-pill shadow-sm">v2.0 Ready</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row g-4 justify-content-center">
          
          <div class="col-12 col-md-4">
            <NuxtLink to="/stem/coding-missions" class="mission-card-link">
              <div class="mission-card border-ios shadow-sm bg-white rounded-5 p-4 text-center h-100">
                <div class="icon-circle bg-primary mb-3 mx-auto">🐸</div>
                <h3 class="fw-black text-dark">Coding</h3>
                <p class="text-secondary small fw-bold">Logic & Sequencing</p>
              </div>
            </NuxtLink>
          </div>

          <div class="col-12 col-md-4">
            <NuxtLink to="/stem/patterns" class="mission-card-link">
              <div class="mission-card border-ios shadow-sm bg-white rounded-5 p-4 text-center h-100">
                <div class="icon-circle bg-warning mb-3 mx-auto">🍎</div>
                <h3 class="fw-black text-dark">Patterns</h3>
                <p class="text-secondary small fw-bold">Predicting Sequences</p>
              </div>
            </NuxtLink>
          </div>

          <div class="col-12 col-md-4">
            <NuxtLink to="/stem/addition-mission" class="mission-card-link">
              <div class="mission-card border-ios shadow-sm bg-white rounded-5 p-4 text-center h-100">
                <div class="icon-circle bg-success mb-3 mx-auto">➕</div>
                <h3 class="fw-black text-dark">Addition</h3>
                <p class="text-secondary small fw-bold">Make to 10 Games</p>
              </div>
            </NuxtLink>
          </div>
          
          <!-- <div class="col-12 col-md-4">
            <NuxtLink to="/stem/subtraction-mission" class="mission-card-link">
              <div class="mission-card border-ios shadow-sm bg-white rounded-5 p-4 text-center h-100">
                <div class="icon-circle bg-info mb-3 mx-auto">-</div>
                <h3 class="fw-black text-dark">Subtraction</h3>
                <p class="text-secondary small fw-bold">Make to 10 Games</p>
              </div>
            </NuxtLink>
          </div> -->

        </div>
      </div>
    </div>

    <footer class="text-center py-4 opacity-50">
      <span class="fw-bold small text-uppercase ls-wide">Choose a mission to begin</span>
    </footer>
  </div>
</template>

<style scoped>
.fw-black { font-weight: 900; }
.ls-wide { letter-spacing: 2px; }
.border-ios { border: 4px solid #E5E5EA !important; }

.nav-btn-ios { 
  background: white; 
  padding: 12px 25px; 
  font-weight: 700; 
  color: #007AFF; 
  display: inline-block;
}

.status-pill {
  background: #E5E5EA;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.8rem;
  color: #8E8E93;
}

.mission-card-link {
  text-decoration: none;
  display: block;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mission-card-link:hover {
  transform: scale(1.05);
}

.mission-card-link:active {
  transform: scale(0.95);
}

.mission-card {
  transition: box-shadow 0.2s;
}

.mission-card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: inset 0 -5px 0 rgba(0,0,0,0.1);
}

.bg-primary { background-color: #007AFF !important; }
.bg-warning { background-color: #FFCC00 !important; }
.bg-success { background-color: #34C759 !important; }
</style>