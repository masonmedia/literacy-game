<!-- v1 working great -->
<!-- <template>
  <div class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg" style="background-color: #F2F2F7;">
    
    <nav class="row align-items-center flex-shrink-0 mb-3">
      <div class="col-3 d-flex justify-content-start gap-2">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back</NuxtLink>
        <button @click="toggleMode" class="nav-btn-ios rounded-pill bg-white border-ios py-2 fw-black shadow-sm text-primary">
          MODE: {{ mode === 'playful' ? 'ANIMALS' : 'BLOCKS' }}
        </button>
      </div>
      <div class="col-6 d-flex justify-content-center align-items-center">
        <div class="target-card-ios shadow-sm border-ios px-5 py-2 fw-bold bg-primary text-white border-white border-3 shadow-lg rounded-pill text-uppercase">
          HOW MANY MORE TO MAKE 10?
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">
      
      <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5">
        <div class="ten-frame-grid">
          <div v-for="i in 10" :key="i" class="math-cell border-ios">
            <Transition name="pop">
              <div v-if="i <= currentCount" class="cell-content">
                <span v-if="mode === 'playful'">{{ currentObject }}</span>
                <div v-else class="stem-block shadow-sm"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
        <div class="eq-num">{{ currentCount }}</div>
        <div class="eq-op">+</div>
        <div class="eq-box border-ios" :class="{ 'filled': isCorrect }">
          {{ isCorrect ? missingCount : '?' }}
        </div>
        <div class="eq-op">=</div>
        <div class="eq-num">10</div>
      </div>

      <div class="number-grid-container p-3">
        <div class="number-grid">
          <button v-for="n in 10" :key="n-1" 
                  @click="checkAnswer(n-1)"
                  class="num-btn border-ios shadow-sm fw-black"
                  :disabled="showSuccessOverlay">
            {{ n - 1 }}
          </button>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
          <div class="fw-black">Ya Bud!</div>
          <div class="move-badge px-3 py-1 rounded-pill bg-primary text-white small fw-black">
            {{ currentCount }} + {{ missingCount }} = 10
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
import { ref, onMounted } from 'vue';

const score = ref(0);
const mode = ref('playful'); // 'playful' or 'stem'
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const currentCount = ref(0);
const missingCount = ref(0);
const currentObject = ref('');
const confettiParticles = ref([]);

const objects = ['❤️', '🐘', '🐅', '🏒', '⚽', '🐸'];

const generateMission = () => {
  isCorrect.value = false;
  showSuccessOverlay.value = false;
  // Random 0-9
  currentCount.value = Math.floor(Math.random() * 10);
  missingCount.value = 10 - currentCount.value;
  currentObject.value = objects[Math.floor(Math.random() * objects.length)];
};

const checkAnswer = (val) => {
  if (val === missingCount.value) {
    isCorrect.value = true;
    score.value += 10;
    showSuccessOverlay.value = true;
    spawnConfetti(150);
    setTimeout(generateMission, 3000);
  } else {
    // Shake or feedback logic could go here
  }
};

const toggleMode = () => {
  mode.value = mode.value === 'playful' ? 'stem' : 'playful';
  generateMission();
};

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

onMounted(generateMission);
</script>

<style scoped>
.fw-black { font-weight: 900; }
.border-ios { border: 4px solid #E5E5EA !important; }
.nav-btn-ios { background: white; border-radius: 15px; font-weight: 700; border: none; padding: 10px 20px; color: #007AFF; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

/* 10-Frame Styling */
.ten-frame-grid {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}
.math-cell {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9F9F9;
}
.cell-content { font-size: 3.5rem; }

/* STEM Block Styling */
.stem-block {
  width: 70px;
  height: 70px;
  background: #007AFF;
  border-radius: 8px;
  border-bottom: 6px solid #0056b3;
  border-right: 4px solid #006ce0;
}

/* Equation */
.equation-card { font-size: 3rem; font-weight: 900; color: #1c1c1e; }
.eq-box {
  width: 80px;
  height: 80px;
  background: #F2F2F7;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
}
.eq-box.filled { background: #E5F9E9; color: #34C759; border-color: #34C759 !important; }

/* Number Grid */
.number-grid {
  display: grid;
  grid-template-columns: repeat(5, 70px);
  gap: 15px;
}
.num-btn {
  height: 70px;
  background: white;
  border-radius: 18px;
  font-size: 1.8rem;
  color: #1c1c1e;
  transition: 0.1s;
  box-shadow: 0 4px 0 #E5E5EA;
}
.num-btn:active { transform: translateY(4px); box-shadow: none; }

/* Victory Overlay */
.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); pointer-events: none; }
.pill-ui-yellow { 
  font-weight: 900; 
  padding: 30px 50px; 
  border-radius: 60px; 
  border: 10px solid white; 
  background: #FFD60A; 
  color: #007AFF; 
  font-size: 4rem; 
  transform: rotate(-3deg); 
  animation: hop 0.5s infinite alternate ease-in-out; 
}
.move-badge { font-size: 1.2rem; }

@keyframes hop { from { transform: rotate(-3deg) translateY(0); } to { transform: rotate(-3deg) translateY(-15px); } }

/* Confetti */
.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

/* Transitions */
.pop-enter-active { animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0); } 100% { transform: scale(1); } }
</style> -->



<!-- v2 working best -->
<!-- 
<template>
  <div v-if="stemReady" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">
    
    <nav class="row align-items-center flex-shrink-0 mb-3">
      <div class="col-3 d-flex justify-content-start gap-2">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back</NuxtLink>
        <button @click="toggleTarget" class="nav-btn-ios rounded-pill bg-white border-ios py-2 fw-black shadow-sm text-primary">
          TARGET: {{ targetSum }}
        </button>
      </div>
      <div class="col-6 d-flex justify-content-center align-items-center gap-2">
        <button @click="setMode('playful')" class="mode-pill" :class="{ active: mode === 'playful' }">ANIMALS</button>
        <button @click="setMode('sports')" class="mode-pill" :class="{ active: mode === 'sports' }">SPORTS</button>
        <button @click="setMode('stem')" class="mode-pill" :class="{ active: mode === 'stem' }">BLOCKS</button>
      </div>
      <div class="col-3 d-flex justify-content-end text-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">
      
      <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5" :class="{ 'grid-fade': isResetting }">
        <div class="math-grid" :class="targetSum === 20 ? 'grid-20' : 'grid-10'">
          <div v-for="i in targetSum" :key="i + '-' + currentObject" class="math-cell border-ios">
            
            <div v-if="i <= currentCount" class="cell-content">
              <span v-if="mode !== 'stem'">{{ currentObject }}</span>
              <div v-else class="stem-block blue-block shadow-sm"></div>
            </div>
            
            <Transition name="pop">
              <div v-if="isCorrect && i > currentCount" class="cell-content success-cell">
                 <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                 <div v-else class="stem-block success-block shadow-sm"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
        <div class="eq-num">{{ currentCount }}</div>
        <div class="eq-op">+</div>
        <div class="eq-box border-ios" 
             :class="{ 
               'filled-success': isCorrect, 
               'shake-error': isWrong 
             }">
          {{ isCorrect ? missingCount : (isWrong ? wrongValue : '?') }}
        </div>
        <div class="eq-op">=</div>
        <div class="eq-num">{{ targetSum }}</div>
      </div>

      <div class="number-grid-container p-3">
        <div class="number-grid" :class="{ 'grid-large': targetSum === 20 }">
          <button v-for="n in (targetSum + 1)" :key="n-1" 
                  @click="checkAnswer(n-1)"
                  class="num-btn border-ios shadow-sm fw-black"
                  :disabled="showSuccessOverlay || isResetting">
            {{ n - 1 }}
          </button>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
          <div class="fw-black">Ya Bud!</div>
          <div class="move-badge px-3 py-1 rounded-pill bg-primary text-white small fw-black">
            {{ currentCount }} + {{ missingCount }} = {{ targetSum }}
          </div>
        </div>
      </div>
    </Transition>

    <div class="confetti-holder"><div v-for="p in confettiParticles" :key="p.id" class="particle" :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }"></div></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const mode = ref('playful'); 
const targetSum = ref(10);
const stemReady = ref(false);
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const isWrong = ref(false);
const isResetting = ref(false);
const wrongValue = ref(null);
const currentCount = ref(0);
const missingCount = ref(0);
const currentObject = ref('');
const confettiParticles = ref([]);

const animalPool = ['❤️', '🐘', '🐅', '🐸', '🐱', '🐶'];
const sportsPool = ['⚽', '🏒', '🏀', '⚾'];

const generateMission = () => {
  // Clear states immediately
  isCorrect.value = false;
  isWrong.value = false;
  showSuccessOverlay.value = false;
  wrongValue.value = null;
  isResetting.value = false;
  
  const max = targetSum.value;
  currentCount.value = Math.floor(Math.random() * (max + 1));
  missingCount.value = max - currentCount.value;

  const pool = (mode.value === 'sports') ? sportsPool : animalPool;
  currentObject.value = pool[Math.floor(Math.random() * pool.length)];
  stemReady.value = true;
};

const checkAnswer = (val) => {
  if (showSuccessOverlay.value || isCorrect.value || isResetting.value) return;

  if (val === missingCount.value) {
    isCorrect.value = true;
    score.value += 10;
    
    // Sequence: Show grid fill -> Show Ya Bud -> Fade board -> Reset
    setTimeout(() => {
      showSuccessOverlay.value = true;
      spawnConfetti(150);
      
      setTimeout(() => {
        isResetting.value = true; // Start the fade
        setTimeout(generateMission, 400); // Actually swap data after fade starts
      }, 3000);
    }, 800);
  } else {
    isWrong.value = true;
    wrongValue.value = val;
    setTimeout(() => {
      isWrong.value = false;
      wrongValue.value = null;
    }, 600);
  }
};

const handleKeyDown = (e) => {
  if (showSuccessOverlay.value || isResetting.value) return;
  if (e.key >= '0' && e.key <= '9') {
    checkAnswer(parseInt(e.key));
  }
};

const setMode = (m) => { mode.value = m; generateMission(); };
const toggleTarget = () => { targetSum.value = (targetSum.value === 10) ? 20 : 10; generateMission(); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  generateMission();
});
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; }
.fw-black { font-weight: 900; }
.border-ios { border: 4px solid #E5E5EA !important; }
.nav-btn-ios { background: white; border-radius: 15px; font-weight: 700; padding: 10px 20px; color: #007AFF; display: inline-block; cursor: pointer;}
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

.mode-pill {
  border: 4px solid #E5E5EA; background: white; padding: 8px 15px; border-radius: 50px;
  font-weight: 800; font-size: 0.75rem; color: #8E8E93; transition: 0.2s; cursor: pointer;
}
.mode-pill.active { border-color: #007AFF; color: #007AFF; background: #007AFF11; }

/* Grid & Reset Logic */
.playmat-container { transition: opacity 0.4s, transform 0.4s; }
.grid-fade { opacity: 0; transform: scale(0.98); }

.math-grid { display: grid; gap: 10px; }
.grid-10 { grid-template-columns: repeat(5, 80px); grid-template-rows: repeat(2, 80px); }
.grid-20 { grid-template-columns: repeat(10, 60px); grid-template-rows: repeat(2, 60px); }

.math-cell {
  aspect-ratio: 1; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #F9F9F9; overflow: hidden;
}
.cell-content { font-size: 2.5rem; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }

/* Success State */
.success-cell { background: #E5F9E9; border: 2px solid #34C759; }

/* Blocks */
.stem-block { width: 70%; height: 70%; border-radius: 6px; }
.blue-block { background: #007AFF; border-bottom: 4px solid #0056b3; }
.success-block { background: #34C759 !important; border-bottom: 4px solid #248a3d !important; }

/* Equation */
.equation-card { font-size: 2.5rem; font-weight: 900; }
.eq-box { width: 80px; height: 80px; background: #F2F2F7; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: #007AFF; transition: 0.2s; }
.filled-success { border-color: #34C759 !important; color: #34C759; background: #E5F9E9; }

/* Error Animation */
.shake-error {
  border-color: #FF2D55 !important;
  background: #FF2D5515;
  color: #FF2D55;
  animation: shake 0.4s ease-in-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

/* Number Grid */
.number-grid { display: grid; grid-template-columns: repeat(6, 60px); gap: 10px; }
.grid-large { grid-template-columns: repeat(7, 50px); }
.num-btn { aspect-ratio: 1; background: white; border-radius: 12px; font-size: 1.4rem; transition: 0.1s; box-shadow: 0 4px 0 #E5E5EA; cursor: pointer; }
.num-btn:active { transform: translateY(3px); box-shadow: none; }

/* Victory Skew */
.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); pointer-events: none; }
.pill-ui-yellow { 
  font-weight: 900; padding: 30px 50px; border-radius: 60px; border: 10px solid white; 
  background: #FFD60A; color: #007AFF; font-size: 3.5rem; 
  transform: rotate(-5deg); 
  animation: hop 0.5s infinite alternate ease-in-out; 
}
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style> -->


<!-- v3 great working  -->
<!--  
<template>
  <div v-if="stemReady" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">
    
    <nav class="row align-items-center flex-shrink-0 mb-3">
      <div class="col-3 d-flex justify-content-start gap-2">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back</NuxtLink>
        <button @click="toggleTarget" class="nav-btn-ios rounded-pill bg-white border-ios py-2 fw-black shadow-sm text-primary">
          TARGET: {{ targetSum }}
        </button>
      </div>
      <div class="col-6 d-flex justify-content-center align-items-center gap-2">
        <button @click="setMode('playful')" class="mode-pill" :class="{ active: mode === 'playful' }">ANIMALS</button>
        <button @click="setMode('sports')" class="mode-pill" :class="{ active: mode === 'sports' }">SPORTS</button>
        <button @click="setMode('stem')" class="mode-pill" :class="{ active: mode === 'stem' }">BLOCKS</button>
      </div>
      <div class="col-3 d-flex justify-content-end text-end">
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">
      
      <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5" :class="{ 'grid-fade': isResetting }">
        <div class="math-grid" :class="targetSum === 20 ? 'grid-20' : 'grid-10'">
          <div v-for="i in targetSum" :key="i + '-' + currentObject" class="math-cell border-ios">
            <div v-if="i <= currentCount" class="cell-content">
              <span v-if="mode !== 'stem'">{{ currentObject }}</span>
              <div v-else class="stem-block blue-block shadow-sm"></div>
            </div>
            <Transition name="pop">
              <div v-if="isCorrect && i > currentCount" class="cell-content success-cell">
                 <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                 <div v-else class="stem-block success-block shadow-sm"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
        <div class="eq-num">{{ currentCount }}</div>
        <div class="eq-op">+</div>
        <div class="eq-box border-ios" :class="{ 'filled-success': isCorrect, 'shake-error': isWrong }">
          {{ isCorrect ? missingCount : (isWrong ? wrongValue : '?') }}
        </div>
        <div class="eq-op">=</div>
        <div class="eq-num">{{ targetSum }}</div>
      </div>

      <div class="number-grid-container p-3">
        <div class="number-grid" :class="{ 'grid-large': targetSum === 20 }">
          <button v-for="n in (targetSum + 1)" :key="n-1" 
                  @click="checkAnswer(n-1)"
                  class="num-btn border-ios shadow-sm fw-black"
                  :disabled="showSuccessOverlay || isResetting">
            {{ n - 1 }}
          </button>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
          <div class="fw-black">Ya Bud!</div>
          <div class="move-badge px-3 py-1 rounded-pill bg-primary text-white small fw-black">
            {{ currentCount }} + {{ missingCount }} = {{ targetSum }}
          </div>
        </div>
      </div>
    </Transition>

    <div class="confetti-holder"><div v-for="p in confettiParticles" :key="p.id" class="particle" :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }"></div></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const mode = ref('playful'); 
const targetSum = ref(10);
const stemReady = ref(false);
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const isWrong = ref(false);
const isResetting = ref(false);
const wrongValue = ref(null);
const currentCount = ref(0);
const missingCount = ref(0);
const currentObject = ref('');
const confettiParticles = ref([]);

const animalPool = ['❤️', '🐘', '🐅', '🐸', '🐱', '🐶'];
const sportsPool = ['⚽', '🏒', '🏀', '⚾'];

// --- Audio Synthesis for "Whoosh" ---
const playWhoosh = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; } // White noise

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(100, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
  filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
};

const generateMission = () => {
  isCorrect.value = false;
  isWrong.value = false;
  showSuccessOverlay.value = false;
  wrongValue.value = null;
  isResetting.value = false;
  
  const max = targetSum.value;
  currentCount.value = Math.floor(Math.random() * (max + 1));
  missingCount.value = max - currentCount.value;

  const pool = (mode.value === 'sports') ? sportsPool : animalPool;
  currentObject.value = pool[Math.floor(Math.random() * pool.length)];
  stemReady.value = true;
};

const checkAnswer = (val) => {
  if (showSuccessOverlay.value || isCorrect.value || isResetting.value) return;

  if (val === missingCount.value) {
    isCorrect.value = true;
    score.value += 10;
    
    setTimeout(() => {
      showSuccessOverlay.value = true;
      spawnConfetti(150);
      
      setTimeout(() => {
        isResetting.value = true;
        playWhoosh(); // Trigger sound with visual fade
        setTimeout(generateMission, 400);
      }, 3000);
    }, 800);
  } else {
    isWrong.value = true;
    wrongValue.value = val;
    setTimeout(() => {
      isWrong.value = false;
      wrongValue.value = null;
    }, 600);
  }
};

const handleKeyDown = (e) => {
  if (showSuccessOverlay.value || isResetting.value) return;
  if (e.key >= '0' && e.key <= '9') checkAnswer(parseInt(e.key));
};

const setMode = (m) => { mode.value = m; generateMission(); };
const toggleTarget = () => { targetSum.value = (targetSum.value === 10) ? 20 : 10; generateMission(); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200 
    }));
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  generateMission();
});
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<style scoped>
/* Keeping original styles */
.ios-bg { background-color: #F2F2F7; }
.fw-black { font-weight: 900; }
.border-ios { border: 4px solid #E5E5EA !important; }
.nav-btn-ios { background: white; border-radius: 15px; font-weight: 700; padding: 10px 20px; color: #007AFF; display: inline-block; cursor: pointer;}
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

.mode-pill {
  border: 4px solid #E5E5EA; background: white; padding: 8px 15px; border-radius: 50px;
  font-weight: 800; font-size: 0.75rem; color: #8E8E93; transition: 0.2s; cursor: pointer;
}
.mode-pill.active { border-color: #007AFF; color: #007AFF; background: #007AFF11; }

.playmat-container { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.grid-fade { opacity: 0; transform: scale(0.9) rotate(2deg); }

.math-grid { display: grid; gap: 10px; }
.grid-10 { grid-template-columns: repeat(5, 80px); grid-template-rows: repeat(2, 80px); }
.grid-20 { grid-template-columns: repeat(10, 60px); grid-template-rows: repeat(2, 60px); }

.math-cell { aspect-ratio: 1; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #F9F9F9; overflow: hidden; }
.cell-content { font-size: 2.5rem; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.success-cell { background: #E5F9E9; border: 2px solid #34C759; }

.stem-block { width: 70%; height: 70%; border-radius: 6px; }
.blue-block { background: #007AFF; border-bottom: 4px solid #0056b3; }
.success-block { background: #34C759 !important; border-bottom: 4px solid #248a3d !important; }

.equation-card { font-size: 2.5rem; font-weight: 900; }
.eq-box { width: 80px; height: 80px; background: #F2F2F7; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: #007AFF; transition: 0.2s; }
.filled-success { border-color: #34C759 !important; color: #34C759; background: #E5F9E9; }

.shake-error { border-color: #FF2D55 !important; background: #FF2D5515; color: #FF2D55; animation: shake 0.4s ease-in-out; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }

.number-grid { display: grid; grid-template-columns: repeat(6, 60px); gap: 10px; }
.grid-large { grid-template-columns: repeat(7, 50px); }
.num-btn { aspect-ratio: 1; background: white; border-radius: 12px; font-size: 1.4rem; transition: 0.1s; box-shadow: 0 4px 0 #E5E5EA; cursor: pointer; }
.num-btn:active { transform: translateY(3px); box-shadow: none; }

.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); pointer-events: none; }
.pill-ui-yellow { 
  font-weight: 900; padding: 30px 50px; border-radius: 60px; border: 10px solid white; 
  background: #FFD60A; color: #007AFF; font-size: 3.5rem; 
  transform: rotate(-5deg); animation: hop 0.5s infinite alternate ease-in-out; 
}
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style> -->




<!-- v4 shuffle logic, dino icons -->
<!-- 
<template>
    <div v-if="stemReady" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">

        <nav class="row align-items-center flex-shrink-0 mb-3">
            <div class="col-3 d-flex justify-content-start gap-2">
                <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none">← Back
                </NuxtLink>
                <button @click="toggleTarget" class="nav-btn-target shadow-sm">
                    TARGET = {{ targetSum }}
                </button>
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center gap-2">
                <button @click="setMode('playful')" class="mode-pill"
                    :class="{ active: mode === 'playful' }">ANIMALS</button>
                <button @click="setMode('sports')" class="mode-pill" :class="{ active: mode === 'sports' }">SPORTS</button>
                <button @click="setMode('dinos')" class="mode-pill" :class="{ active: mode === 'dinos' }">DINOS</button>
                <button @click="setMode('stem')" class="mode-pill" :class="{ active: mode === 'stem' }">BLOCKS</button>
            </div>
            <div class="col-3 d-flex justify-content-end text-end">
                <div class="score-pill shadow-sm">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">

            <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5"
                :class="{ 'grid-fade': isResetting }">
                <div class="math-grid" :class="targetSum === 20 ? 'grid-20' : 'grid-10'">
                    <div v-for="i in targetSum" :key="i + '-' + currentObject" class="math-cell border-ios">
                        <div v-if="i <= currentCount" class="cell-content">
                            <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                            <div v-else class="stem-block blue-block shadow-sm"></div>
                        </div>
                        <Transition name="pop">
                            <div v-if="isCorrect && i > currentCount" class="cell-content success-cell">
                                <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                                <div v-else class="stem-block success-block shadow-sm"></div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
                <div class="eq-num">{{ currentCount }}</div>
                <div class="eq-op">+</div>
                <div class="eq-box border-ios" :class="{ 'filled-success': isCorrect, 'shake-error': isWrong }">
                    {{ isCorrect ? missingCount : (isWrong ? wrongValue : '?') }}
                </div>
                <div class="eq-op">=</div>
                <div class="eq-num">{{ targetSum }}</div>
            </div>

            <div class="number-grid-container p-3">
                <div class="number-grid" :class="{ 'grid-large': targetSum === 20 }">
                    <button v-for="n in (targetSum + 1)" :key="n - 1" @click="checkAnswer(n - 1)"
                        class="num-btn border-ios shadow-sm fw-black" :disabled="showSuccessOverlay || isResetting">
                        {{ n - 1 }}
                    </button>
                </div>
            </div>
        </div>

        <Transition name="ios-pop-fade">
            <div v-if="showSuccessOverlay" class="status-overlay">
                <div class="victory-stack">
                    <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
                        <div class="thumbs-up-icon">👍</div>
                        <div class="fw-black">Ya Bud!</div>
                        <div class="move-badge px-4 py-1 rounded-pill bg-primary text-white small fw-black">
                            {{ currentCount }} + {{ missingCount }} = {{ targetSum }}
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
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const mode = ref('playful');
const targetSum = ref(10);
const stemReady = ref(false);
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const isWrong = ref(false);
const isResetting = ref(false);
const wrongValue = ref(null);
const currentCount = ref(0);
const lastCount = ref(-1);
const missingCount = ref(0);
const currentObject = ref('');
const confettiParticles = ref([]);

const animalPool = ['❤️', '🦧', '🐘', '🐅', '🐸', '🐱', '🐶'];
const sportsPool = ['⚽', '🏒', '🏀', '⚾', '🥅'];
const dinoPool = ['🦖', '🦕', '🦣', '🌋']; // T-Rex, Brachio/Diplo, Triceratops, Bone

const playWhoosh = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    noise.start();
};

const generateMission = () => {
    isCorrect.value = false;
    isWrong.value = false;
    showSuccessOverlay.value = false;
    wrongValue.value = null;
    isResetting.value = false;

    const max = targetSum.value;
    let nextCount;

    // Anti-Repetition Logic: Force a different number than the last round
    do {
        nextCount = Math.floor(Math.random() * (max + 1));
    } while (nextCount === lastCount.value);

    currentCount.value = nextCount;
    lastCount.value = nextCount;
    missingCount.value = max - currentCount.value;

    const pool = mode.value === 'sports' ? sportsPool : mode.value === 'dinos' ? dinoPool : animalPool;
    currentObject.value = pool[Math.floor(Math.random() * pool.length)];
    stemReady.value = true;
};

const checkAnswer = (val) => {
    if (showSuccessOverlay.value || isCorrect.value || isResetting.value) return;
    if (val === missingCount.value) {
        isCorrect.value = true;
        score.value += 10;
        setTimeout(() => {
            showSuccessOverlay.value = true;
            spawnConfetti(150);
            setTimeout(() => {
                isResetting.value = true;
                playWhoosh();
                setTimeout(generateMission, 400);
            }, 3000);
        }, 800);
    } else {
        isWrong.value = true;
        wrongValue.value = val;
        setTimeout(() => { isWrong.value = false; wrongValue.value = null; }, 600);
    }
};

const handleKeyDown = (e) => {
    if (showSuccessOverlay.value || isResetting.value) return;
    if (e.key >= '0' && e.key <= '9') checkAnswer(parseInt(e.key));
};

const setMode = (m) => { mode.value = m; generateMission(); };
const toggleTarget = () => { targetSum.value = (targetSum.value === 10) ? 20 : 10; generateMission(); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200
    }));
};

onMounted(() => { window.addEventListener('keydown', handleKeyDown); generateMission(); });
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<style scoped>
.ios-bg {
    background-color: #F2F2F7;
}

.fw-black {
    font-weight: 900;
}

.border-ios {
    border: 4px solid #E5E5EA !important;
}

/* New Target Button Styling */
.nav-btn-target {
    background: #007AFF;
    color: white;
    border-radius: 50px;
    font-weight: 900;
    padding: 10px 25px;
    border: 4px solid white;
    transition: transform 0.1s;
}

.nav-btn-target:active {
    transform: scale(0.95);
}

.nav-btn-ios {
    background: white;
    border-radius: 15px;
    font-weight: 700;
    padding: 10px 20px;
    color: #007AFF;
    display: inline-block;
    cursor: pointer;
}

.score-pill {
    background: #FFD60A;
    color: #007AFF;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 900;
    border: 4px solid white;
}

.mode-pill {
    border: 4px solid #E5E5EA;
    background: white;
    padding: 8px 15px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 0.75rem;
    color: #8E8E93;
    transition: 0.2s;
    cursor: pointer;
}

.mode-pill.active {
    border-color: #007AFF;
    color: #007AFF;
    background: #007AFF11;
}

.playmat-container {
    transition: opacity 0.4s, transform 0.4s;
}

.grid-fade {
    opacity: 0;
    transform: scale(0.95);
}

.math-grid {
    display: grid;
    gap: 10px;
}

.grid-10 {
    grid-template-columns: repeat(5, 80px);
    grid-template-rows: repeat(2, 80px);
}

.grid-20 {
    grid-template-columns: repeat(10, 60px);
    grid-template-rows: repeat(2, 60px);
}

.math-cell {
    aspect-ratio: 1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F9F9F9;
    overflow: hidden;
}

.cell-content {
    font-size: 2.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.success-cell {
    background: #E5F9E9;
    border: 2px solid #34C759;
}

.stem-block {
    width: 70%;
    height: 70%;
    border-radius: 6px;
}

.blue-block {
    background: #007AFF;
    border-bottom: 4px solid #0056b3;
}

.success-block {
    background: #34C759 !important;
    border-bottom: 4px solid #248a3d !important;
}

.equation-card {
    font-size: 2.5rem;
    font-weight: 900;
}

.eq-box {
    width: 80px;
    height: 80px;
    background: #F2F2F7;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #007AFF;
    transition: 0.2s;
}

.filled-success {
    border-color: #34C759 !important;
    color: #34C759;
    background: #E5F9E9;
}

.shake-error {
    border-color: #FF2D55 !important;
    background: #FF2D5515;
    color: #FF2D55;
    animation: shake 0.4s ease-in-out;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    75% {
        transform: translateX(8px);
    }
}

.number-grid {
    display: grid;
    grid-template-columns: repeat(6, 60px);
    gap: 10px;
}

.grid-large {
    grid-template-columns: repeat(7, 50px);
}

.num-btn {
    aspect-ratio: 1;
    background: white;
    border-radius: 12px;
    font-size: 1.4rem;
    transition: 0.1s;
    box-shadow: 0 4px 0 #E5E5EA;
    cursor: pointer;
}

.num-btn:active {
    transform: translateY(3px);
    box-shadow: none;
}

/* Victory Stack */
/* Fixed CSS */
.victory-stack {
    display: flex;
    flex-direction: column;
    /* Assigned correctly now */
    align-items: center;
    gap: 0;
}

.thumbs-up-icon {
    font-size: 5rem;
    padding: 0;
    margin: -20px 0 -20px;
}

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
    padding: 30px 50px;
    border-radius: 60px;
    border: 10px solid white;
    background: #FFD60A;
    color: #007AFF;
    font-size: 3.5rem;
    transform: rotate(-5deg);
    animation: hop 0.5s infinite alternate ease-in-out;
}

@keyframes hop {
    from {
        transform: rotate(-5deg) translateY(0);
    }

    to {
        transform: rotate(-5deg) translateY(-20px);
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
}

.pop-enter-active {
    animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}</style> -->



<!-- v5 add subtraction, solve-for toggle -->
 <template>
    <div v-if="stemReady" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">

        <nav class="row align-items-center flex-shrink-0 mb-4 px-2">
            <div class="col-4 d-flex align-items-center gap-2">
                <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-black shadow-sm">← Back</NuxtLink>
                <button @click="toggleTarget" class="nav-btn-target shadow-sm fw-black">TARGET = {{ targetSum }}</button>
                <button @click="toggleSolveMode" class="nav-btn-yellow shadow-sm fw-black">Solve for ?</button>
            </div>

            <div class="col-4 d-flex justify-content-center gap-2">
                <button @click="setMode('playful')" class="mode-pill" :class="{ active: mode === 'playful' }">Animals</button>
                <button @click="setMode('sports')" class="mode-pill" :class="{ active: mode === 'sports' }">Sports</button>
                <button @click="setMode('dinos')" class="mode-pill" :class="{ active: mode === 'dinos' }">Dinos</button>
                <button @click="setMode('stem')" class="mode-pill" :class="{ active: mode === 'stem' }">Blocks</button>
            </div>

            <div class="col-4 d-flex align-items-center justify-content-end gap-2">
                <div class="op-selector-blue d-flex gap-2 p-1 rounded-pill shadow-sm justify-content-center align-items-center">
                    <button @click="setOperator('+')" class="op-btn-white d-flex justify-content-center align-items-center" :class="{ active: operator === '+' }">+</button>
                    <button @click="setOperator('-')" class="op-btn-white d-flex justify-content-center align-items-center" :class="{ active: operator === '-' }">-</button>
                </div>
                <div class="score-pill shadow-sm fw-black">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">

            <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5" :class="{ 'grid-fade': isResetting }">
                <div class="math-grid" :class="targetSum === 20 ? 'grid-20' : 'grid-10'">
                    <div v-for="i in targetSum" :key="i + '-' + currentObject" class="math-cell border-ios">
                        
                        <template v-if="operator === '+'">
                            <div v-if="i <= currentCount" class="cell-content">
                                <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                                <div v-else class="stem-block blue-block shadow-sm"></div>
                            </div>
                            <Transition name="pop">
                                <div v-if="isCorrect && i > currentCount" class="cell-content success-cell">
                                    <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                                    <div v-else class="stem-block success-block shadow-sm"></div>
                                </div>
                            </Transition>
                        </template>

                        <template v-else>
                            <Transition name="fade-out">
                                <div v-if="i <= currentCount && !isCorrect" class="cell-content">
                                    <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                                    <div v-else class="stem-block blue-block shadow-sm"></div>
                                </div>
                            </Transition>
                            <Transition name="pop">
                                <div v-if="isCorrect && i > currentCount" class="cell-content success-cell">
                                    <span v-if="mode !== 'stem'">{{ currentObject }}</span>
                                    <div v-else class="stem-block success-block shadow-sm"></div>
                                </div>
                            </Transition>
                        </template>
                    </div>
                </div>
            </div>

            <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
                <div class="eq-num">{{ operator === '+' ? currentCount : targetSum }}</div>
                <div class="eq-op">{{ operator }}</div>
                
                <div v-if="solveMode === 'variable'" class="eq-box border-ios" :class="{ 'filled-success': isCorrect, 'shake-error': isWrong }">
                    {{ isCorrect ? missingCount : (isWrong ? wrongValue : '?') }}
                </div>
                <div v-else class="eq-num">{{ missingCount }}</div>
                
                <div class="eq-op">=</div>
                
                <div v-if="solveMode === 'result'" class="eq-box border-ios" :class="{ 'filled-success': isCorrect, 'shake-error': isWrong }">
                    {{ isCorrect ? equationResult : (isWrong ? wrongValue : '?') }}
                </div>
                <div v-else class="eq-num">{{ equationResult }}</div>
            </div>

            <div class="number-grid-container p-3">
                <div class="number-grid" :class="{ 'grid-large': targetSum === 20 }">
                    <button v-for="n in (targetSum + 1)" :key="n - 1" @click="checkAnswer(n - 1)"
                        class="num-btn border-ios shadow-sm fw-black" :disabled="showSuccessOverlay || isResetting">
                        {{ n - 1 }}
                    </button>
                </div>
            </div>
        </div>

        <Transition name="ios-pop-fade">
            <div v-if="showSuccessOverlay" class="status-overlay">
                <div class="victory-stack">
                    <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center">
                        <div class="thumbs-up-icon my-3">👍</div>
                        <div class="fw-black">Ya Bud!</div>
                        <div class="move-badge px-5 py-3 rounded-pill bg-primary text-white fw-black border-0">
                            {{ operator === '+' ? currentCount : targetSum }} 
                            {{ operator }} 
                            {{ missingCount }} 
                            = 
                            {{ equationResult }}
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
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const mode = ref('playful');
const operator = ref('+');
const solveMode = ref('variable'); 
const targetSum = ref(10);
const stemReady = ref(false);
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const isWrong = ref(false);
const isResetting = ref(false);
const wrongValue = ref(null);
const currentCount = ref(0);
const missingCount = ref(0);
const equationResult = ref(0);
const answerKey = ref(0);
const currentObject = ref('');
const confettiParticles = ref([]);

const generateMission = () => {
    isCorrect.value = false; isWrong.value = false; showSuccessOverlay.value = false; isResetting.value = false;
    const max = targetSum.value;

    if (operator.value === '+') {
        currentCount.value = Math.floor(Math.random() * (max + 1));
        missingCount.value = max - currentCount.value;
        equationResult.value = max;
    } else {
        // Subtraction Logic: Target - Variable = Result
        currentCount.value = Math.floor(Math.random() * (max + 1));
        missingCount.value = currentCount.value;
        equationResult.value = max - currentCount.value;
    }
    
    answerKey.value = (solveMode.value === 'variable') ? missingCount.value : equationResult.value;

    const pools = { playful: ['❤️', '🦧', '🐘', '🐅', '🐸', '🐱', '🐶'], sports: ['⚽', '🏒', '🏀', '⚾', '🥅'], dinos: ['🦖', '🦕', '🛡️', '🦴'] };
    currentObject.value = pools[mode.value][Math.floor(Math.random() * pools[mode.value].length)];
    stemReady.value = true;
};

const checkAnswer = (val) => {
    if (showSuccessOverlay.value || isCorrect.value || isResetting.value) return;
    if (val === answerKey.value) {
        isCorrect.value = true;
        score.value += 10;
        setTimeout(() => {
            showSuccessOverlay.value = true;
            spawnConfetti(150);
            setTimeout(() => {
                isResetting.value = true;
                setTimeout(generateMission, 400);
            }, 3000);
        }, 800);
    } else {
        isWrong.value = true; wrongValue.value = val;
        setTimeout(() => { isWrong.value = false; wrongValue.value = null; }, 600);
    }
};

const handleKeyDown = (e) => {
    if (showSuccessOverlay.value || isResetting.value) return;
    const val = parseInt(e.key);
    if (!isNaN(val) && val <= targetSum.value) checkAnswer(val);
};

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)], duration: 2.5 + Math.random() * 2, drift: (Math.random() - 0.5) * 200
    }));
};

const setOperator = (op) => { operator.value = op; solveMode.value = (op === '+') ? 'variable' : 'result'; generateMission(); };
const setMode = (m) => { mode.value = m; generateMission(); };
const toggleTarget = () => { targetSum.value = (targetSum.value === 10) ? 20 : 10; generateMission(); };
const toggleSolveMode = () => { 
    solveMode.value = solveMode.value === 'variable' ? 'result' : 'variable'; 
    answerKey.value = (solveMode.value === 'variable') ? missingCount.value : equationResult.value;
};

onMounted(() => { window.addEventListener('keydown', handleKeyDown); generateMission(); });
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<style scoped>
.ios-bg { background-color: #F2F2F7; }
.fw-black { font-weight: 900; }
.border-ios { border: 4px solid #E5E5EA !important; }

.nav-btn-ios, .nav-btn-target, .nav-btn-yellow { border-radius: 50px; padding: 10px 20px; font-weight: 900; border: 4px solid white; cursor: pointer; }
.nav-btn-ios { background: white; color: #007AFF; }
.nav-btn-target { background: #007AFF; color: white; }
.nav-btn-yellow { background: #FFD60A; color: #007AFF; }

.mode-pill { border: 4px solid #E5E5EA; background: white; padding: 10px 18px; border-radius: 50px; font-weight: 900; color: #8E8E93; cursor: pointer; }
.mode-pill.active { border-color: #007AFF; color: #007AFF; background: #007AFF11; }

.op-selector-blue { background: #007AFF; height: 55px; border: 4px solid white; }
.op-btn-white { width: 42px; height: 42px; border: none; background: rgba(255,255,255,0.2); font-size: 1.8rem; font-weight: 900; color: white; border-radius: 50%; cursor: pointer; }
.op-btn-white.active { background: white; color: #007AFF; }

.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; border: 4px solid white; font-weight: 900; }

.math-grid { display: grid; gap: 10px; }
.grid-10 { grid-template-columns: repeat(5, 80px); }
.grid-20 { grid-template-columns: repeat(10, 60px); }
.math-cell { aspect-ratio: 1; border-radius: 12px; background: #F9F9F9; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.cell-content { font-size: 2.5rem; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.success-cell { background: #E5F9E9; border: 2px solid #34C759; }

.fade-out-leave-active { transition: all 0.5s cubic-bezier(0.4, 0, 1, 1); }
.fade-out-leave-to { opacity: 0; transform: scale(0.5) translateY(20px); }

.equation-card { font-size: 2.5rem; font-weight: 900; }
.eq-box { width: 85px; height: 85px; background: #F2F2F7; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: #007AFF; }
.filled-success { border-color: #34C759 !important; color: #34C759; background: #E5F9E9; }

.number-grid { display: grid; grid-template-columns: repeat(6, 65px); gap: 10px; }
.grid-large { grid-template-columns: repeat(7, 55px); }
.num-btn { aspect-ratio: 1; background: white; border-radius: 15px; font-size: 1.5rem; box-shadow: 0 4px 0 #E5E5EA; cursor: pointer; }

/* Victory Stack Refined */
.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); }
.victory-stack { display: flex; flex-direction: column; align-items: center; }
.pill-ui-yellow { font-weight: 900; padding: 20px 50px; border-radius: 60px; border: 10px solid white; background: #FFD60A; color: #007AFF; font-size: 3rem; transform: rotate(-5deg); animation: hop 0.5s infinite alternate ease-in-out; }
.thumbs-up-icon { font-size: 5.5rem; line-height: 1; }
.move-badge { font-size: 1.8rem; margin-top: 15px; } /* Removed shadow via class logic */

@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-20px); } }

.confetti-holder { position: fixed; inset: 0; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style>