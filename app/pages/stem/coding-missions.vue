<!-- <template>
  <div v-if="stemReady" :style="{ backgroundColor: stemConfig.bg }" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-3">
        <NuxtLink to="/stem" class="nav-btn-ios shadow-sm text-decoration-none">← Back</NuxtLink>
      </div>
      <div class="col-6 d-flex justify-content-center">
        <div class="target-card-ios shadow-sm border-ios px-4 py-2">
          <span class="label">MISSION: REACH THE {{ stemConfig.goalName }}</span>
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex gap-3 overflow-hidden">
      
      <div class="d-flex flex-column gap-3" style="width: 320px;">
        
        <div class="card border-0 rounded-5 shadow-sm border-ios p-3 bg-white flex-grow-1 d-flex flex-column overflow-hidden">
          <span class="label mb-2 opacity-50 fw-black small">PROGRAM SEQUENCE</span>
          <div class="code-tape-container flex-grow-1 scroll-hide">
            <TransitionGroup name="rod">
              <div v-for="(cmd, i) in stemSequence" :key="i" class="tape-item shadow-sm mb-2" :style="{ backgroundColor: getBtnColor(cmd) }">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="white">
                  <path v-if="cmd === 'UP'" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                  <path v-if="cmd === 'DOWN'" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                  <path v-if="cmd === 'LEFT'" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                  <path v-if="cmd === 'RIGHT'" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
                <span class="ms-2 fw-black text-white text-uppercase">{{ cmd }}</span>
              </div>
            </TransitionGroup>
          </div>
          <button @click="stemReset" class="btn btn-outline-danger btn-sm rounded-pill fw-black mt-2">RESET CODE</button>
        </div>

        <div class="card border-0 rounded-5 shadow-sm border-ios p-4 bg-white">
          <div class="dpad-grid-ios">
            <div class="spacer"></div>
            <button @click="stemMove('UP')" class="tool-btn-ios dpad-key up-btn"><svg viewBox="0 0 16 16" width="32" fill="white"><path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/></svg></button>
            <div class="spacer"></div>
            <button @click="stemMove('LEFT')" class="tool-btn-ios dpad-key left-btn"><svg viewBox="0 0 16 16" width="32" fill="white"><path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm-4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" transform="rotate(180 8 8)"/></svg></button>
            <div class="center-nub"></div>
            <button @click="stemMove('RIGHT')" class="tool-btn-ios dpad-key right-btn"><svg viewBox="0 0 16 16" width="32" fill="white"><path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 5.5a.5.5 0 0 1 0-1h5.793L6.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5z" transform="rotate(180 8 8)"/></svg></button>
            <div class="spacer"></div>
            <button @click="stemMove('DOWN')" class="tool-btn-ios dpad-key down-btn"><svg viewBox="0 0 16 16" width="32" fill="white"><path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/></svg></button>
          </div>
        </div>
      </div>

      <div class="card border-0 rounded-5 shadow-sm border-ios flex-grow-1 overflow-hidden position-relative bg-light">
        <div class="work-mat-organic h-100 w-100">
           <svg class="path-overlay" viewBox="0 0 800 400" preserveAspectRatio="none">
            <polyline fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-dasharray="1, 20" :points="svgPoints" />
          </svg>
          <div class="grid-wrap">
            <div v-for="r in 4" :key="'r'+r" class="d-flex flex-grow-1">
              <div v-for="c in 8" :key="'c'+c" class="grid-cell-ios">
                <div v-if="isSafeTile(r-1, c-1) && !isPlayerOn(r-1, c-1)" class="lily-pad animate-float">🍃</div>
                <div v-if="stemGoal.r === r-1 && stemGoal.c === c-1" class="goal-item">{{ stemConfig.goal }}</div>
                <div v-if="stemPos.r === r-1 && stemPos.c === c-1" class="player-sprite">{{ stemConfig.char }}</div>
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

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
          :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const stemReady = ref(false);
const stemWon = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const stemSequence = ref([]);
const stemHistory = ref([]);
const stemPos = ref({ r: 0, c: 0 });
const stemGoal = ref({ r: 0, c: 0 });
const stemSafeTiles = ref([]);
const stemConfig = ref({});

const stemCharacters = [
  { char: '🐸', goal: '🦟', goalName: 'FLY', bg: '#E8F5E9' },
  { char: '🐘', goal: '🥜', goalName: 'PEANUT', bg: '#E3F2FD' }
];

const isSafeTile = (r, c) => stemSafeTiles.value.some(p => p.r === r && p.c === c);
const isPlayerOn = (r, c) => stemPos.value.r === r && stemPos.value.c === c;
const svgPoints = computed(() => stemHistory.value.map(p => `${p.c * 100 + 50},${p.r * 100 + 50}`).join(' '));

const getBtnColor = (cmd) => {
  const map = { UP: '#FF2D55', DOWN: '#FF9500', LEFT: '#AF52DE', RIGHT: '#007AFF' };
  return map[cmd];
};

const handleKeydown = (e) => {
  if (e.key === 'ArrowUp') stemMove('UP');
  if (e.key === 'ArrowDown') stemMove('DOWN');
  if (e.key === 'ArrowLeft') stemMove('LEFT');
  if (e.key === 'ArrowRight') stemMove('RIGHT');
};

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.8, 
        duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

const generateNewMission = () => {
  stemWon.value = false;
  showSuccessOverlay.value = false;
  stemSequence.value = [];
  stemConfig.value = stemCharacters[Math.floor(Math.random() * stemCharacters.length)];
  const start = { r: Math.floor(Math.random() * 4), c: 0 };
  stemPos.value = { ...start };
  stemHistory.value = [{ ...start }];
  
  let curr = { ...start };
  const fullPath = [{ ...start }];
  let lastMove = null;

  // Winding logic: Force turns
  for (let i = 0; i < 22; i++) {
    let moves = [{r:0,c:1}, {r:1,c:0}, {r:-1,c:0}, {r:0,c:-1}].filter(m => 
      curr.r + m.r >= 0 && curr.r + m.r < 4 && curr.c + m.c >= 0 && curr.c + m.c < 8
    );
    const move = moves.sort(() => Math.random() - 0.5).find(m => m.r !== lastMove?.r || m.c !== lastMove?.c) || moves[0];
    curr.r += move.r; curr.c += move.c;
    lastMove = move;
    if (!fullPath.some(p => p.r === curr.r && p.c === curr.c)) fullPath.push({ ...curr });
    if (curr.c === 7 && i > 12) break;
  }
  
  stemSafeTiles.value = fullPath.filter((_, i) => i > 0 && i % 4 === 0);
  stemGoal.value = { ...curr };
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
    stemHistory.value.push({ r: nr, c: nc });
    if (nr === stemGoal.value.r && nc === stemGoal.value.c) {
      stemWon.value = true; score.value += 10; showSuccessOverlay.value = true;
      spawnConfetti(150);
      setTimeout(() => { showSuccessOverlay.value = false; setTimeout(generateNewMission, 600); }, 2000);
    }
  }
};

onMounted(() => { 
  window.addEventListener('keydown', handleKeydown);
  generateNewMission(); 
});
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; border: none; }
.target-card-ios { background: white; border-radius: 20px; border: 4px solid #007AFF; display: flex; align-items: center; }
.label { font-size: 0.75rem; font-weight: 900; color: #8E8E93; letter-spacing: 1.5px; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

/* Code Tape */
.code-tape-container { background: #F2F2F7; border-radius: 15px; padding: 10px; border: 2px inset rgba(0,0,0,0.05); }
.tape-item { display: flex; align-items: center; padding: 10px; border-radius: 12px; }

/* Bento Board */
.work-mat-organic { background: #D1D1D6; border: 5px dashed #AEAEB2; position: relative; border-radius: 35px; }
.grid-wrap { display: flex; flex-direction: column; height: 100%; width: 100%; padding: 10px; }
.grid-cell-ios { flex: 1; border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; position: relative; }

/* D-PAD Styled exactly like tool buttons */
.dpad-grid-ios { display: grid; grid-template-columns: repeat(3, 80px); gap: 10px; justify-content: center; }
.tool-btn-ios { 
    border: 4px solid #E5E5EA; border-radius: 20px; 
    height: 80px; display: flex; align-items: center; justify-content: center; transition: 0.1s;
}
.up-btn { background: #FF2D55; }
.left-btn { background: #AF52DE; }
.right-btn { background: #007AFF; }
.down-btn { background: #FF9500; }
.tool-btn-ios:active { transform: scale(0.95); filter: brightness(0.9); }

.player-sprite { font-size: clamp(3rem, 8vh, 6rem); z-index: 10; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2)); }
.lily-pad { font-size: 4rem; z-index: 2; }
.goal-item { font-size: 5rem; z-index: 5; }

/* Path Overlay */
.path-overlay { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }

/* Success UI */
.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui-yellow { 
    font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; 
    background: #FFD60A; color: #007AFF; font-size: 4rem; transform: rotate(-5deg);
    animation: hop 0.5s infinite alternate ease-in-out;
}
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 1999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

.scroll-hide::-webkit-scrollbar { display: none; }
</style> -->


<template>
  <div v-if="stemReady" :style="{ backgroundColor: stemConfig.bg }" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-3">
        <NuxtLink to="/stem" class="nav-btn-ios shadow-sm text-decoration-none">← Back</NuxtLink>
      </div>
      <div class="col-6 d-flex justify-content-center">
        <div class="target-card-ios shadow-sm border-ios px-5 py-2 fw-bold bg-primary text-white border-white border-3 shadow-lg rounded-pill">
          MISSION: CROSS THE POND
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex gap-4 overflow-hidden">
      
      <div class="d-flex flex-column gap-3 h-100" style="width: 300px;">
        
        <div class="card border-0 rounded-5 shadow-sm border-ios p-3 bg-white d-flex flex-column" style="height: 45%;">
          <span class="label mb-2 opacity-50 fw-black small">SEQUENCE</span>
          <div class="flex-grow-1 overflow-y-auto pr-2 custom-scroll" id="codeTape">
            <TransitionGroup name="list">
              <div v-for="(cmd, i) in stemSequence" :key="i" class="tape-item shadow-sm mb-2 d-flex align-items-center" :style="{ backgroundColor: getBtnColor(cmd) }">
                <span class="step-num">{{ i + 1 }}</span>
                <div class="tape-icon-wrap">
                  <svg v-if="cmd === 'UP'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/></svg>
                  <svg v-if="cmd === 'DOWN'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/></svg>
                  <svg v-if="cmd === 'LEFT'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>
                  <svg v-if="cmd === 'RIGHT'" viewBox="0 0 16 16" fill="white" width="18"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg>
                </div>
                <span class="ms-2 fw-black text-white small">{{ cmd }}</span>
              </div>
            </TransitionGroup>
          </div>
          <button @click="stemReset" class="btn btn-outline-danger border-2 rounded-pill fw-black btn-sm mt-2">RESET</button>
        </div>

        <div class="card border-0 rounded-5 shadow-sm border-ios p-4 bg-white d-flex align-items-center justify-content-center">
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

      <div class="card border-0 rounded-5 shadow-sm border-ios flex-grow-1 p-1 p-md-2 bg-white d-flex align-items-center justify-content-center">
        <div class="board-inner position-relative" id="boardInner">
          <svg class="trace-svg" :viewBox="`0 0 ${8 * cellSize} ${4 * cellSize}`">
            <polyline fill="none" stroke="rgba(0,122,255,0.3)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1, 15" :points="svgTracePoints" />
          </svg>

          <div class="grid-8x4">
            <div v-for="r in 4" :key="'r'+r" class="d-flex">
              <div v-for="c in 8" :key="'c'+c" class="square-cell">
                <div v-if="isSafeTile(r-1, c-1) && !isPlayerOn(r-1, c-1)" class="lily-pad animate-float">🪷</div>
                <div v-if="stemGoal.r === r-1 && stemGoal.c === c-1 && !isPlayerOn(r-1, c-1)" class="goal-item animate-pulse">🚩</div>
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

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
          :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }">
      </div>
    </div>
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
const stemSafeTiles = ref([]);
const stemConfig = ref({});
const cellSize = 100;

const stemCharacters = [{ char: '🐸', bg: '#E8F5E9' }, { char: '🦦', bg: '#F3E5F5' }];

const isSafeTile = (r, c) => stemSafeTiles.value.some(p => p.r === r && p.c === c);
const isPlayerOn = (r, c) => stemPos.value.r === r && stemPos.value.c === c;

const svgTracePoints = computed(() => {
  return stemTrace.value.map(p => `${p.c * cellSize + cellSize/2},${p.r * cellSize + cellSize/2}`).join(' ');
});

const getBtnColor = (cmd) => {
  const map = { UP: '#FF2D55', DOWN: '#FF9500', LEFT: '#AF52DE', RIGHT: '#007AFF' };
  return map[cmd];
};

const handleKeydown = (e) => {
  if (e.key === 'ArrowUp') stemMove('UP');
  if (e.key === 'ArrowDown') stemMove('DOWN');
  if (e.key === 'ArrowLeft') stemMove('LEFT');
  if (e.key === 'ArrowRight') stemMove('RIGHT');
};

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.8, 
        duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

const generateNewMission = () => {
  stemWon.value = false;
  showSuccessOverlay.value = false;
  stemSequence.value = [];
  stemConfig.value = stemCharacters[Math.floor(Math.random() * stemCharacters.length)];
  
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
  stemSafeTiles.value = fullPath.filter((p, i) => {
    const isGoalArea = (p.r === goal.r && (p.c === goal.c || p.c === goal.c - 1));
    return i > 0 && !isGoalArea && i % 2 === 0;
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
    
    nextTick(() => {
      const el = document.getElementById('codeTape');
      if (el) el.scrollTop = el.scrollHeight;
    });

    if (nr === stemGoal.value.r && nc === stemGoal.value.c) {
      stemWon.value = true; score.value += 10; showSuccessOverlay.value = true;
      spawnConfetti(150);
      setTimeout(() => { showSuccessOverlay.value = false; setTimeout(generateNewMission, 600); }, 2000);
    }
  }
};

const stemReset = () => {
  const start = stemTrace.value[0];
  stemSequence.value = [];
  stemTrace.value = [start];
  stemPos.value = { ...start };
};

onMounted(() => { 
  window.addEventListener('keydown', handleKeydown);
  generateNewMission(); 
});
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; border: none; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

/* Grid Stretching */
.board-inner { 
  width: 100%; height: auto;
  max-width: 100%; /* Fill bento card space */
  background: #D1D1D6;
  border: 4px solid #AEAEB2;
  border-radius: 24px;
  overflow: hidden;
}
.grid-8x4 { display: flex; flex-direction: column; position: relative; z-index: 2; }
.square-cell { 
  flex: 1; aspect-ratio: 1 / 1; border: 1px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center; position: relative;
}

.trace-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }

/* Code Tape UI */
.tape-item { padding: 10px; border-radius: 14px; }
.step-num { color: rgba(255,255,255,0.7); font-weight: 900; font-size: 0.75rem; width: 25px; }

/* D-PAD */
.dpad-grid-ios { display: grid; grid-template-columns: repeat(3, 75px); gap: 12px; }
.dpad-key { 
  border: 4px solid rgba(0,0,0,0.05); border-radius: 20px; 
  height: 75px; display: flex; align-items: center; justify-content: center; transition: 0.1s;
  box-shadow: 0 6px 0 rgba(0,0,0,0.1);
}
.up-btn { background: #FF2D55; }
.left-btn { background: #AF52DE; }
.right-btn { background: #007AFF; }
.down-btn { background: #FF9500; }
.dpad-key:active { transform: translateY(4px); box-shadow: none; }

.player-sprite { font-size: 4.5rem; z-index: 10; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2)); }
.lily-pad { font-size: 3.5rem; z-index: 2; }
.goal-item { font-size: 3.5rem; }

.custom-scroll { scrollbar-width: thin; scrollbar-color: #AEAEB2 transparent; }
.custom-scroll::-webkit-scrollbar { width: 6px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #AEAEB2; border-radius: 10px; }

.animate-float { animation: float 3s infinite ease-in-out; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.bounce-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop { 0% { transform: scale(0.6); } 100% { transform: scale(1); } }

/* Success UI */
.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui-yellow { 
    font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; 
    background: #FFD60A; color: #007AFF; font-size: 4rem; transform: rotate(-5deg);
    animation: hop 0.5s infinite alternate ease-in-out;
}
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }
</style>