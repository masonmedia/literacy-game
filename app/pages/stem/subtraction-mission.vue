<template>
  <div v-if="stemReady" class="vh-100 d-flex flex-column p-3 p-md-4 overflow-hidden ios-bg">

    <nav class="row align-items-center flex-shrink-0 mb-4 px-2">
      <div class="col-4 d-flex align-items-center gap-2">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-black shadow-sm">← Back</NuxtLink>
        <button @click="toggleTarget" class="nav-btn-target shadow-sm fw-black">TARGET = {{ targetSum }}</button>
        <button @click="toggleSolveMode" class="nav-btn-yellow shadow-sm fw-black">Solve for ?</button>
      </div>

      <div class="col-4 d-flex justify-content-center gap-2">
        <button v-for="label in ['animals', 'sports', 'dinos', 'blocks']" :key="label" 
                @click="setMode(label)" class="mode-pill text-uppercase" :class="{ active: mode === label }">
          {{ label }}
        </button>
      </div>

      <div class="col-4 d-flex align-items-center justify-content-end gap-2">
        <div class="score-pill shadow-sm fw-black">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-4">
      <div class="playmat-container border-ios shadow-lg p-3 bg-white rounded-5" :class="{ 'grid-fade': isResetting }">
        <div class="math-grid" :class="targetSum === 20 ? 'grid-20' : 'grid-10'">
          <div v-for="i in targetSum" :key="i + '-' + currentObject" class="math-cell border-ios">
            <Transition name="fade-out">
              <div v-if="i <= currentCount && !isCorrect" class="cell-content">
                <span v-if="mode !== 'blocks'">{{ currentObject }}</span>
                <div v-else class="stem-block blue-block shadow-sm"></div>
              </div>
            </Transition>
            
            <Transition name="pop">
              <div v-if="isCorrect && i > (targetSum - equationResult)" class="cell-content success-cell">
                <span v-if="mode !== 'blocks'">{{ currentObject }}</span>
                <div v-else class="stem-block success-block shadow-sm"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="equation-card border-ios bg-white rounded-5 p-4 shadow-sm d-flex align-items-center gap-3">
        <div class="eq-num">{{ targetSum }}</div>
        <div class="eq-op">-</div>
        
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
        <div class="victory-stack">
          <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center">
            <div class="thumbs-up-icon">👍</div>
            <div class="fw-black mb-1">Ya Bud!</div>
            <div class="final-equation px-5 py-3 rounded-pill bg-primary text-white fw-black border-0">
               {{ targetSum }} - {{ missingCount }} = {{ equationResult }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const mode = ref('animals');
const solveMode = ref('variable'); 
const targetSum = ref(10);
const stemReady = ref(false);
const showSuccessOverlay = ref(false);
const isCorrect = ref(false);
const isWrong = ref(false);
const isResetting = ref(false);
const wrongValue = ref(null);

const currentCount = ref(0);     // How many icons start on screen
const missingCount = ref(0);     // The subtrahend (The variable ?)
const equationResult = ref(0);   // The difference
const currentObject = ref('');

const generateMission = () => {
    isCorrect.value = false; isWrong.value = false; showSuccessOverlay.value = false; isResetting.value = false;
    
    // Logic: Target (10) - MissingCount = EquationResult
    // We randomize the missingCount (what is being taken away)
    missingCount.value = Math.floor(Math.random() * (targetSum.value + 1));
    equationResult.value = targetSum.value - missingCount.value;
    currentCount.value = targetSum.value; // Start with all items for subtraction visual

    const pools = { 
        animals: ['❤️', '🦧', '🐘', '🐅', '🐸', '🐱', '🐶'], 
        sports: ['⚽', '🏒', '🏀', '⚾', '🥅'], 
        dinos: ['🦖', '🦕', '🛡️', '🦴'],
        blocks: ['📦'] 
    };
    currentObject.value = pools[mode.value][Math.floor(Math.random() * pools[mode.value].length)];
    stemReady.value = true;
};

const checkAnswer = (val) => {
    if (showSuccessOverlay.value || isResetting.value) return;

    // What is the user solving for?
    const answerKey = solveMode.value === 'variable' ? missingCount.value : equationResult.value;

    if (val === answerKey) {
        isCorrect.value = true;
        score.value += 10;
        setTimeout(() => {
            showSuccessOverlay.value = true;
            setTimeout(() => {
                isResetting.value = true;
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
    // Allow multi-digit for target 20
    if (e.key === 'Enter') return; 
    const val = parseInt(e.key);
    if (!isNaN(val)) {
        // Simple 0-9 check; for 10-20, user usually clicks, but we can expand this
        checkAnswer(val);
    }
};

const setMode = (m) => { mode.value = m; generateMission(); };
const toggleTarget = () => { targetSum.value = (targetSum.value === 10) ? 20 : 10; generateMission(); };
const toggleSolveMode = () => { solveMode.value = solveMode.value === 'variable' ? 'result' : 'variable'; };

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
.nav-btn-ios, .nav-btn-target, .nav-btn-yellow { border-radius: 50px; padding: 10px 20px; font-weight: 900; border: 4px solid white; cursor: pointer; }
.nav-btn-ios { background: white; color: #007AFF; }
.nav-btn-target { background: #007AFF; color: white; }
.nav-btn-yellow { background: #FFD60A; color: #007AFF; }
.mode-pill { border: 4px solid #E5E5EA; background: white; padding: 8px 15px; border-radius: 50px; font-weight: 900; color: #8E8E93; cursor: pointer; font-size: 0.8rem; }
.mode-pill.active { border-color: #007AFF; color: #007AFF; background: #007AFF11; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; border: 4px solid white; font-weight: 900; }
.math-grid { display: grid; gap: 10px; }
.grid-10 { grid-template-columns: repeat(5, 80px); }
.grid-20 { grid-template-columns: repeat(10, 60px); }
.math-cell { aspect-ratio: 1; border-radius: 12px; background: #F9F9F9; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.cell-content { font-size: 2.5rem; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.success-cell { background: #E5F9E9; border: 2px solid #34C759; }
.fade-out-leave-active { transition: all 0.5s cubic-bezier(0.4, 0, 1, 1); }
.fade-out-leave-to { opacity: 0; transform: scale(0.5) translateY(20px); }
.stem-block { width: 70%; height: 70%; border-radius: 6px; }
.blue-block { background: #007AFF; border-bottom: 4px solid #0056b3; }
.success-block { background: #34C759 !important; border-bottom: 4px solid #248a3d !important; }
.equation-card { font-size: 2.5rem; font-weight: 900; }
.eq-box { width: 85px; height: 85px; background: #F2F2F7; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: #007AFF; }
.filled-success { border-color: #34C759 !important; color: #34C759; background: #E5F9E9; }
.shake-error { border-color: #FF2D55 !important; background: #FF2D5515; color: #FF2D55; animation: shake 0.4s ease-in-out; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
.number-grid { display: grid; grid-template-columns: repeat(6, 65px); gap: 10px; }
.grid-large { grid-template-columns: repeat(7, 55px); }
.num-btn { aspect-ratio: 1; background: white; border-radius: 15px; font-size: 1.5rem; box-shadow: 0 4px 0 #E5E5EA; cursor: pointer; transition: 0.1s; }
.num-btn:active { transform: translateY(3px); box-shadow: none; }
.status-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); }
.victory-stack { display: flex; flex-direction: column; align-items: center; }
.pill-ui-yellow { font-weight: 900; padding: 40px 60px; border-radius: 80px; border: 12px solid white; background: #FFD60A; color: #007AFF; font-size: 3.5rem; transform: rotate(-5deg); animation: hop 0.5s infinite alternate ease-in-out; }
.thumbs-up-icon { font-size: 5rem; line-height: 1; margin-bottom: 10px; }
.final-equation { font-size: 2rem; margin-top: 20px; box-shadow: none; }
@keyframes hop { from { transform: rotate(-5deg) translateY(0); } to { transform: rotate(-5deg) translateY(-25px); } }
</style>