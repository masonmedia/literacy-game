<!-- <template>
  <div class="ios-container vh-100 overflow-hidden position-relative d-flex flex-column p-3 p-md-4">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-4">
        <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none d-inline-block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="me-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Menu
        </NuxtLink>
      </div>
      <div class="col-4 text-center">
        <h1 class="h4 fw-bold mb-0 text-dark tracking-tight">STEM Patterns</h1>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <div class="mini-score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <div class="card border-0 rounded-5 shadow-sm p-3 p-md-4 h-100 d-flex flex-column justify-content-between border-ios">
        
        <div class="pattern-stage flex-grow-1 d-flex align-items-center justify-content-center bg-ios-system rounded-5 px-3 mb-3">
          <div class="d-flex justify-content-center flex-wrap gap-2 gap-md-4 w-100">
            <div v-for="(item, idx) in currentQuestion.sequence" :key="idx" 
                 class="pattern-card bg-white shadow-sm rounded-4 d-flex align-items-center justify-content-center animate-pop">
              <svg viewBox="0 0 24 24" class="svg-shape">
                <path :d="item.path" :fill="item.color" />
              </svg>
            </div>

            <div class="pattern-card rounded-4 shadow-sm transition-all d-flex align-items-center justify-content-center"
                 :class="isCorrect ? 'bg-white shadow-sm' : 'border-dashed-ios bg-transparent'">
              <template v-if="isCorrect">
                <svg viewBox="0 0 24 24" class="svg-shape animate-pop">
                  <path :d="currentQuestion.answer.path" :fill="currentQuestion.answer.color" />
                </svg>
              </template>
              <template v-else>
                <span class="fw-bold display-1 text-primary pulse">?</span>
              </template>
            </div>
          </div>
        </div>

        <div class="options-bar pt-3 border-top">
          <p class="text-secondary fw-bold mb-2 small text-uppercase text-center tracking-wider">What comes next?</p>
          <div class="row g-2 g-md-3 justify-content-center">
            <div v-for="(opt, idx) in currentQuestion.options" :key="idx" class="col-4 col-md-2">
              <button @click="checkAnswer(opt)" 
                      class="btn-ios-option bg-white border-0 shadow-sm rounded-4 transition-active"
                      :disabled="isCorrect">
                <svg viewBox="0 0 24 24" class="svg-option">
                  <path :d="opt.path" :fill="opt.color" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
        :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const score = ref(0);
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);

const shapes = [
  { name: 'circle', path: 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z', colors: ['#FF3B30', '#007AFF', '#34C759', '#FFCC00'] },
  { name: 'square', path: 'M3,3H21V21H3Z', colors: ['#FF9500', '#5856D6', '#AF52DE', '#FF2D55'] },
  { name: 'triangle', path: 'M12,2L2,22H22Z', colors: ['#007AFF', '#34C759', '#FFCC00', '#FF3B30'] },
  { name: 'star', path: 'M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21Z', colors: ['#FFCC00', '#FF9500'] },
  { name: 'arrow-up', path: 'M12,2L4.5,11H9V22H15V11H19.5L12,2Z', colors: ['#8E8E93', '#1C1C1E'] },
  { name: 'arrow-right', path: 'M22,12L13,4.5V9H2V15H13V19.5L22,12Z', colors: ['#8E8E93', '#1C1C1E'] }
];

const generateQuestion = () => {
  const types = ['AB', 'ABC', 'AAB'];
  const type = types[Math.floor(Math.random() * types.length)];
  const pool = [];
  shapes.forEach(s => s.colors.forEach(c => pool.push({ path: s.path, color: c, id: `${s.name}-${c}` })));
  const sel = pool.sort(() => 0.5 - Math.random());
  
  let seq = [], ans = null;
  if (type === 'AB') { seq = [sel[0], sel[1], sel[0], sel[1]]; ans = sel[0]; }
  else if (type === 'ABC') { seq = [sel[0], sel[1], sel[2], sel[0], sel[1]]; ans = sel[2]; }
  else { seq = [sel[0], sel[0], sel[1], sel[0], sel[0]]; ans = sel[1]; }

  let opts = [ans];
  while (opts.length < 6) {
    const cand = pool[Math.floor(Math.random() * pool.length)];
    // Fixed: check against the local opts array
    if (!opts.some(o => o.id === cand.id)) {
      opts.push(cand);
    }
  }
  return { sequence: seq, answer: ans, options: opts.sort(() => 0.5 - Math.random()) };
};

const currentQuestion = ref(generateQuestion());

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newParticles = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4500);
};

const checkAnswer = (choice) => {
  if (choice.id === currentQuestion.value.answer.id) {
    isCorrect.value = true;
    score.value++;
    
    // Exact Literacy Trigger
    showSuccessOverlay.value = true;
    spawnConfetti(45);
    
    setTimeout(() => {
      showSuccessOverlay.value = false;
      isCorrect.value = false;
      currentQuestion.value = generateQuestion();
    }, 1500);
  }
};
</script>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }
.border-ios { border: 1px solid #E5E5EA !important; }
.rounded-5 { border-radius: 40px !important; }

/* NAVBAR */
.nav-btn-ios {
  background: white; border: none; padding: 10px 20px;
  border-radius: 14px; color: #007AFF; font-weight: 600;
}
.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 8px 20px; border-radius: 50px; border: 3px solid white; font-size: 1.2rem;
}

/* PATTERN DISPLAY */
.pattern-stage { width: 100%; }
.pattern-card {
  width: clamp(80px, 14vw, 160px);
  aspect-ratio: 1/1;
}
.svg-shape { width: 75%; height: 75%; }

/* OPTIONS */
.btn-ios-option {
  width: 100%; aspect-ratio: 1/1;
  display: flex; align-items: center; justify-content: center;
}
.svg-option { width: 60%; height: 60%; }
.transition-active:active { transform: scale(0.92); }
.border-dashed-ios { border: 4px dashed #007AFF !important; }

/* LITERACY OVERLAY STYLE */
.status-overlay {
  position: fixed; inset: 0; z-index: 2500;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.pill-ui {
  font-weight: 900; padding: 25px 50px; border-radius: 60px;
  border: 10px solid white; transform: rotate(-2deg);
}
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }

/* CONFETTI */
.confetti-holder {
  position: fixed; top: -100px; left: 0; width: 100%; height: 120vh;
  pointer-events: none; z-index: 1999;
}
.particle {
  position: absolute; animation-name: fall-gravity;
  animation-timing-function: linear; animation-fill-mode: forwards;
}
@keyframes fall-gravity {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
}

/* ANIMATIONS */
@keyframes ios-pop {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.animate-pop { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pulse { animation: pulse-anim 1.5s infinite; }
@keyframes pulse-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* TRANSITIONS */
.ios-pop-fade-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ios-pop-fade-leave-active { transition: opacity 0.3s ease; }
</style> -->


<!-- v2 good, shapes only -->
<!-- <template>
  <div class="ios-container vh-100 overflow-hidden position-relative d-flex flex-column p-3 p-md-4">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-4">
        <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none d-inline-block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="me-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Menu
        </NuxtLink>
      </div>
      <div class="col-4 text-center">
        <h1 class="h4 fw-bold mb-0 text-dark tracking-tight">STEM Patterns</h1>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <div class="mini-score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <div v-if="mounted" class="card border-0 rounded-5 shadow-sm p-3 p-md-4 h-100 d-flex flex-column justify-content-between border-ios">
        
        <div class="pattern-stage flex-grow-1 d-flex align-items-center justify-content-center bg-ios-system rounded-5 px-3 mb-3">
          <div class="d-flex justify-content-center flex-wrap gap-2 gap-md-4 w-100">
            <div v-for="(item, idx) in currentQuestion.sequence" :key="'seq-' + idx" 
                 class="pattern-card bg-white shadow-sm rounded-4 d-flex align-items-center justify-content-center animate-pop">
              <svg viewBox="0 0 24 24" class="svg-shape">
                <path :d="item.path" :fill="item.color" />
              </svg>
            </div>

            <div class="pattern-card rounded-4 shadow-sm transition-all d-flex align-items-center justify-content-center"
                 :class="isCorrect ? 'bg-white shadow-sm' : 'border-dashed-ios bg-transparent'">
              <template v-if="isCorrect">
                <svg viewBox="0 0 24 24" class="svg-shape animate-pop">
                  <path :d="currentQuestion.answer.path" :fill="currentQuestion.answer.color" />
                </svg>
              </template>
              <template v-else>
                <span class="fw-bold display-1 text-primary pulse">?</span>
              </template>
            </div>
          </div>
        </div>

        <div class="options-bar pt-3 border-top">
          <p class="text-secondary fw-bold mb-2 small text-uppercase text-center tracking-wider">What comes next?</p>
          <div class="row g-2 g-md-3 justify-content-center">
            <div v-for="(opt, idx) in currentQuestion.options" :key="'opt-' + idx" class="col-4 col-md-2">
              <button @click="checkAnswer(opt)" 
                      class="btn-ios-option bg-white border-0 shadow-sm rounded-4 transition-active d-flex align-items-center justify-content-center"
                      :disabled="isCorrect">
                <svg viewBox="0 0 24 24" class="svg-option">
                  <path :d="opt.path" :fill="opt.color" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
        :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const score = ref(0);
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);

const shapes = [
  { name: 'circle', path: 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z', colors: ['#FF3B30', '#007AFF', '#34C759', '#FFCC00'] },
  { name: 'square', path: 'M3,3H21V21H3Z', colors: ['#FF9500', '#5856D6', '#AF52DE', '#FF2D55'] },
  { name: 'triangle', path: 'M12,2L2,22H22Z', colors: ['#007AFF', '#34C759', '#FFCC00', '#FF3B30'] },
  { name: 'star', path: 'M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21Z', colors: ['#FFCC00', '#FF9500'] }
];

const currentQuestion = ref({ sequence: [], answer: {}, options: [] });

const generateQuestion = () => {
  const types = ['AB', 'ABC', 'AAB'];
  const type = types[Math.floor(Math.random() * types.length)];
  const pool = [];
  shapes.forEach(s => s.colors.forEach(c => pool.push({ path: s.path, color: c, id: `${s.name}-${c}` })));
  const sel = [...pool].sort(() => 0.5 - Math.random());
  
  let seq = [], ans = null;
  if (type === 'AB') { seq = [sel[0], sel[1], sel[0], sel[1]]; ans = sel[0]; }
  else if (type === 'ABC') { seq = [sel[0], sel[1], sel[2], sel[0], sel[1]]; ans = sel[2]; }
  else { seq = [sel[0], sel[0], sel[1], sel[0], sel[0]]; ans = sel[1]; }

  let opts = [ans];
  while (opts.length < 6) {
    const cand = pool[Math.floor(Math.random() * pool.length)];
    if (!opts.some(o => o.id === cand.id)) opts.push(cand);
  }
  return { sequence: seq, answer: ans, options: opts.sort(() => 0.5 - Math.random()) };
};

onMounted(() => {
  currentQuestion.value = generateQuestion();
  mounted.value = true;
});

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newParticles = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4500);
};

const checkAnswer = (choice) => {
  if (isCorrect.value) return; // Prevent double clicks during success
  
  if (choice.id === currentQuestion.value.answer.id) {
    isCorrect.value = true;
    score.value++;
    showSuccessOverlay.value = true;
    spawnConfetti(45);
    
    setTimeout(() => {
      showSuccessOverlay.value = false;
      isCorrect.value = false;
      currentQuestion.value = generateQuestion();
    }, 1500);
  }
};
</script>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; height: 100vh; width: 100vw; }
.border-ios { border: 1px solid #E5E5EA !important; }
.rounded-5 { border-radius: 40px !important; }

/* NAVBAR */
.nav-btn-ios { background: white; border: none; padding: 10px 20px; border-radius: 14px; color: #007AFF; font-weight: 600; }
.mini-score-pill { background: #FFD60A; color: #007AFF; font-weight: 900; padding: 8px 20px; border-radius: 50px; border: 3px solid white; font-size: 1.2rem; }

/* PATTERN DISPLAY */
.pattern-stage { width: 100%; position: relative; }
.pattern-card { width: clamp(70px, 13vw, 150px); aspect-ratio: 1/1; z-index: 1; }
.svg-shape { width: 70%; height: 70%; pointer-events: none; }

/* OPTIONS */
.btn-ios-option { width: 100%; aspect-ratio: 1/1; cursor: pointer; transition: transform 0.1s; border: none; }
.svg-option { width: 65%; height: 65%; pointer-events: none; }
.transition-active:active { transform: scale(0.9); }
.border-dashed-ios { border: 4px dashed #007AFF !important; }

/* SUCCESS OVERLAY */
.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 8px solid white; transform: rotate(-2deg); }
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }

/* CONFETTI */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1000; }
.particle { position: absolute; animation: fall-gravity linear forwards; }
@keyframes fall-gravity { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(115vh) rotate(720deg); opacity: 0; } }

/* ANIMATIONS */
@keyframes ios-pop { 0% { transform: scale(0.5) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
.animate-pop { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pulse { animation: pulse-anim 1.5s infinite; }
@keyframes pulse-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.ios-pop-fade-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ios-pop-fade-leave-active { transition: opacity 0.3s ease; }
</style> -->


<!-- v3 -->
 <!-- <script setup>
import { ref, onMounted, watch } from 'vue';

// --- STATE ---
const score = ref(0);
const roundsCompleted = ref(0); // New counter
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);
const activeTheme = ref('shapes');

// --- THEME DATA ---
const themes = {
  shapes: [
    { label: '', path: 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z', colors: ['#FF3B30', '#007AFF', '#34C759', '#FFCC00'] },
    { label: '', path: 'M3,3H21V21H3Z', colors: ['#FF9500', '#5856D6', '#AF52DE', '#FF2D55'] },
    { label: '', path: 'M12,2L2,22H22Z', colors: ['#007AFF', '#34C759', '#FFCC00', '#FF3B30'] },
    { label: '', path: 'M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21Z', colors: ['#FFCC00', '#FF9500'] }
  ],
  emoji: [
    { label: '🚀', path: '', colors: ['#000'] }, { label: '🐱', path: '', colors: ['#000'] },
    { label: '🍦', path: '', colors: ['#000'] }, { label: '🏀', path: '', colors: ['#000'] },
    { label: '🦖', path: '', colors: ['#000'] }, { label: '🍕', path: '', colors: ['#000'] }
  ],
  numbers: [
    { label: '1', path: '', colors: ['#007AFF'] }, { label: '2', path: '', colors: ['#FF3B30'] },
    { label: '3', path: '', colors: ['#34C759'] }, { label: '4', path: '', colors: ['#AF52DE'] },
    { label: '5', path: '', colors: ['#FF9500'] }, { label: '6', path: '', colors: ['#5856D6'] }
  ]
};

const currentQuestion = ref({ sequence: [], answer: {}, options: [] });

// --- CORE LOGIC ---
const generateQuestion = () => {
  const currentPool = themes[activeTheme.value];
  const types = ['AB', 'ABC', 'AAB'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const flattened = [];
  currentPool.forEach((item, i) => {
    item.colors.forEach(c => flattened.push({ ...item, color: c, id: `${activeTheme.value}-${i}-${c}` }));
  });
  
  const sel = [...flattened].sort(() => 0.5 - Math.random());
  let seq = [], ans = null;

  if (type === 'AB') { seq = [sel[0], sel[1], sel[0], sel[1]]; ans = sel[0]; }
  else if (type === 'ABC') { seq = [sel[0], sel[1], sel[2], sel[0], sel[1]]; ans = sel[2]; }
  else { seq = [sel[0], sel[0], sel[1], sel[0], sel[0]]; ans = sel[1]; }

  let opts = [ans];
  while (opts.length < 6) {
    const cand = flattened[Math.floor(Math.random() * flattened.length)];
    if (!opts.some(o => o.id === cand.id)) opts.push(cand);
  }
  return { sequence: seq, answer: ans, options: opts.sort(() => 0.5 - Math.random()) };
};

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newParticles = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4500);
};

const checkAnswer = (choice) => {
  if (isCorrect.value) return;
  if (choice.id === currentQuestion.value.answer.id) {
    isCorrect.value = true;
    score.value++;
    roundsCompleted.value++; // Increment rounds
    showSuccessOverlay.value = true;
    spawnConfetti(45);
    
    setTimeout(() => {
      showSuccessOverlay.value = false;
      setTimeout(() => { 
        isCorrect.value = false;
        currentQuestion.value = generateQuestion();
      }, 800);
    }, 1500);
  }
};

onMounted(() => {
  currentQuestion.value = generateQuestion();
  mounted.value = true;
});

watch(activeTheme, () => {
  if (mounted.value) currentQuestion.value = generateQuestion();
});
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden position-relative d-flex flex-column p-3 p-md-4">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-3">
        <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none">Menu</NuxtLink>
      </div>
      <div class="col-6 text-center d-flex justify-content-center gap-2">
        <select v-model="activeTheme" class="theme-dropdown shadow-sm">
          <option value="shapes">Shapes</option>
          <option value="emoji">Emoji</option>
          <option value="numbers">Numbers</option>
        </select>
        <div class="round-counter shadow-sm">Round: {{ roundsCompleted }}</div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="mini-score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <div v-if="mounted" class="card border-0 rounded-5 shadow-sm p-3 p-md-4 h-100 d-flex flex-column justify-content-between border-ios">
        
        <div class="pattern-stage flex-grow-1 d-flex align-items-center justify-content-center bg-ios-system rounded-5 px-3 mb-3">
          <div class="d-flex justify-content-center flex-wrap gap-2 gap-md-4 w-100">
            <div v-for="(item, idx) in currentQuestion.sequence" :key="'seq-' + idx" 
                 class="pattern-card bg-white shadow-sm rounded-4 d-flex align-items-center justify-content-center animate-pop">
              <span v-if="activeTheme !== 'shapes'" class="pattern-text" :style="{ color: item.color }">{{ item.label }}</span>
              <svg v-else viewBox="0 0 24 24" class="svg-shape">
                <path :d="item.path" :fill="item.color" />
              </svg>
            </div>

            <div class="pattern-card rounded-4 shadow-sm transition-all d-flex align-items-center justify-content-center"
                 :class="isCorrect ? 'bg-white shadow-sm' : 'border-dashed-ios bg-transparent'">
              <template v-if="isCorrect">
                <span v-if="activeTheme !== 'shapes'" class="pattern-text animate-pop" :style="{ color: currentQuestion.answer.color }">{{ currentQuestion.answer.label }}</span>
                <svg v-else viewBox="0 0 24 24" class="svg-shape animate-pop">
                  <path :d="currentQuestion.answer.path" :fill="currentQuestion.answer.color" />
                </svg>
              </template>
              <template v-else>
                <span class="pattern-text text-primary pulse">?</span>
              </template>
            </div>
          </div>
        </div>

        <div class="options-bar pt-3 border-top flex-shrink-0">
          <div class="row g-2 g-md-3 justify-content-center">
            <div v-for="(opt, idx) in currentQuestion.options" :key="'opt-' + idx" class="col-4 col-md-2">
              <button @click="checkAnswer(opt)" 
                      class="btn-ios-option bg-white border-0 shadow-sm rounded-4 transition-active d-flex align-items-center justify-content-center"
                      :disabled="isCorrect">
                <span v-if="activeTheme !== 'shapes'" class="option-text" :style="{ color: opt.color }">{{ opt.label }}</span>
                <svg v-else viewBox="0 0 24 24" class="svg-option">
                  <path :d="opt.path" :fill="opt.color" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
        :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, system-ui, sans-serif;
  height: 100vh;
  width: 100vw;
}

.border-ios { border: 1px solid #E5E5EA !important; }
.rounded-5 { border-radius: 40px !important; }

/* NAV ELEMENTS */
.nav-btn-ios {
  background: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  color: #007AFF;
  font-weight: 700;
}

.theme-dropdown {
  background-color: #FFD60A;
  color: #007AFF;
  border: 3px solid white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;
}

.round-counter {
  background-color: #007AFF;
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700;
  border: 3px solid white;
  font-size: 1rem;
}

.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 8px 20px;
  border-radius: 50px;
  border: 3px solid white;
  font-size: 1.2rem;
}

/* GAME STAGE & RATIOS */
.pattern-stage { width: 100%; }

.pattern-card {
  width: clamp(75px, 12vw, 150px);
  aspect-ratio: 1/1;
  z-index: 1;
}

/* Maintain font ratio relative to shape size */
.pattern-text {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
}

.svg-shape {
  width: 75%;
  height: 75%;
  pointer-events: none;
}

/* OPTIONS BAR RATIOS */
.btn-ios-option {
  width: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
}

.option-text {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
}

.svg-option {
  width: 65%;
  height: 65%;
  pointer-events: none;
}

.transition-active:active { transform: scale(0.9); }
.border-dashed-ios { border: 4px dashed #007AFF !important; }

/* SUCCESS OVERLAY (Exact Literacy Port) */
.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.pill-ui {
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  border: 10px solid white;
  transform: rotate(-2deg);
}

.yellow-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
}

/* CONFETTI (Exact Literacy Port) */
.confetti-holder {
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: 120vh;
  pointer-events: none;
  z-index: 1999;
}

.particle {
  position: absolute;
  animation-name: fall-gravity;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes fall-gravity {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
}

/* TRANSITIONS */
.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ios-pop-fade-leave-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.ios-pop-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(5deg);
}

@keyframes ios-pop {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(-2deg); opacity: 1; }
}

.animate-pop { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pulse { animation: pulse-anim 1.5s infinite; }
@keyframes pulse-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style> -->


<!-- v4 -->
 <script setup>
import { ref, onMounted, watch } from 'vue';

// --- STATE ---
const score = ref(0);
const roundsCompleted = ref(0);
const isCorrect = ref(false);
const wrongId = ref(null); // Track which ID is currently shaking
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);
const activeTheme = ref('shapes');

// --- THEME DATA ---
const themes = {
  shapes: [
    { label: '', path: 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z', colors: ['#FF3B30', '#007AFF', '#34C759', '#FFCC00'] },
    { label: '', path: 'M3,3H21V21H3Z', colors: ['#FF9500', '#5856D6', '#AF52DE', '#FF2D55'] },
    { label: '', path: 'M12,2L2,22H22Z', colors: ['#007AFF', '#34C759', '#FFCC00', '#FF3B30'] },
    { label: '', path: 'M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21Z', colors: ['#FFCC00', '#FF9500'] }
  ],
  emoji: [
    { label: '🚀', path: '', colors: ['#000'] }, { label: '🐱', path: '', colors: ['#000'] },
    { label: '🍦', path: '', colors: ['#000'] }, { label: '🏀', path: '', colors: ['#000'] },
    { label: '🦖', path: '', colors: ['#000'] }, { label: '🍕', path: '', colors: ['#000'] }
  ],
  numbers: [
    { label: '1', path: '', colors: ['#007AFF'] }, { label: '2', path: '', colors: ['#FF3B30'] },
    { label: '3', path: '', colors: ['#34C759'] }, { label: '4', path: '', colors: ['#AF52DE'] },
    { label: '5', path: '', colors: ['#FF9500'] }, { label: '6', path: '', colors: ['#5856D6'] }
  ]
};

const currentQuestion = ref({ sequence: [], answer: {}, options: [] });

// --- CORE LOGIC ---
const generateQuestion = () => {
  const currentPool = themes[activeTheme.value];
  const types = ['AB', 'ABC', 'AAB'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const flattened = [];
  currentPool.forEach((item, i) => {
    item.colors.forEach(c => flattened.push({ ...item, color: c, id: `${activeTheme.value}-${i}-${c}` }));
  });
  
  const sel = [...flattened].sort(() => 0.5 - Math.random());
  let seq = [], ans = null;

  if (type === 'AB') { seq = [sel[0], sel[1], sel[0], sel[1]]; ans = sel[0]; }
  else if (type === 'ABC') { seq = [sel[0], sel[1], sel[2], sel[0], sel[1]]; ans = sel[2]; }
  else { seq = [sel[0], sel[0], sel[1], sel[0], sel[0]]; ans = sel[1]; }

  let opts = [ans];
  while (opts.length < 6) {
    const cand = flattened[Math.floor(Math.random() * flattened.length)];
    if (!opts.some(o => o.id === cand.id)) opts.push(cand);
  }
  return { sequence: seq, answer: ans, options: opts.sort(() => 0.5 - Math.random()) };
};

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newParticles = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4500);
};

const checkAnswer = (choice) => {
  if (isCorrect.value || wrongId.value) return;

  if (choice.id === currentQuestion.value.answer.id) {
    isCorrect.value = true;
    score.value++;
    roundsCompleted.value++;
    showSuccessOverlay.value = true;
    spawnConfetti(45);
    
    setTimeout(() => {
      showSuccessOverlay.value = false;
      setTimeout(() => { 
        isCorrect.value = false;
        currentQuestion.value = generateQuestion();
      }, 800);
    }, 1500);
  } else {
    // Incorrect Feedback
    wrongId.value = choice.id;
    setTimeout(() => {
      wrongId.value = null;
    }, 500);
  }
};

onMounted(() => {
  currentQuestion.value = generateQuestion();
  mounted.value = true;
});

watch(activeTheme, () => {
  if (mounted.value) currentQuestion.value = generateQuestion();
});
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden position-relative d-flex flex-column p-3 p-md-4">
    
    <nav class="row align-items-center mb-3 flex-shrink-0">
      <div class="col-3">
        <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none">Menu</NuxtLink>
      </div>
      <div class="col-6 text-center d-flex justify-content-center gap-2">
        <select v-model="activeTheme" class="form-select theme-dropdown rounded-5" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="shapes">Shapes</option>
            <option value="emoji">Emojis</option>
            <option value="numbers">Numbers</option>
        </select>

        <!-- <select v-model="activeTheme" class="theme-dropdown shadow-sm">
          <option value="shapes">Shapes</option>
          <option value="emoji">Emoji</option>
          <option value="numbers">Numbers</option>
        </select> -->
        <div class="round-counter shadow-sm col-6">Round: {{ roundsCompleted }}</div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="mini-score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <div v-if="mounted" class="card border-0 rounded-5 shadow-sm p-3 p-md-4 h-100 d-flex flex-column justify-content-between border-ios">
        
        <div class="pattern-stage flex-grow-1 d-flex align-items-center justify-content-center bg-ios-system rounded-5 px-3 mb-3">
          <div class="d-flex justify-content-center flex-wrap gap-2 gap-md-4 w-100">
            <div v-for="(item, idx) in currentQuestion.sequence" :key="'seq-' + idx" 
                 class="pattern-card bg-white rounded-4 d-flex align-items-center justify-content-center animate-pop">
              <span v-if="activeTheme !== 'shapes'" class="pattern-text" :style="{ color: item.color }">{{ item.label }}</span>
              <svg v-else viewBox="0 0 24 24" class="svg-shape">
                <path :d="item.path" :fill="item.color" />
              </svg>
            </div>

            <div class="pattern-card rounded-4 transition-all d-flex align-items-center justify-content-center"
                 :class="isCorrect ? 'bg-white' : 'border-dashed-ios bg-transparent'">
              <template v-if="isCorrect">
                <span v-if="activeTheme !== 'shapes'" class="pattern-text animate-pop" :style="{ color: currentQuestion.answer.color }">{{ currentQuestion.answer.label }}</span>
                <svg v-else viewBox="0 0 24 24" class="svg-shape animate-pop">
                  <path :d="currentQuestion.answer.path" :fill="currentQuestion.answer.color" />
                </svg>
              </template>
              <template v-else>
                <span class="pattern-text text-primary pulse">?</span>
              </template>
            </div>
          </div>
        </div>

        <div class="options-bar pt-3 border-top flex-shrink-0">
          <div class="row g-2 g-md-3 justify-content-center">
            <div v-for="(opt, idx) in currentQuestion.options" :key="'opt-' + idx" class="col-4 col-md-2">
              <button @click="checkAnswer(opt)" 
                      class="btn-ios-option bg-white border-0 rounded-4 transition-active d-flex align-items-center justify-content-center"
                      :class="{ 'animate-shake': wrongId === opt.id }"
                      :disabled="isCorrect">
                <span v-if="activeTheme !== 'shapes'" class="option-text" :style="{ color: opt.color }">{{ opt.label }}</span>
                <svg v-else viewBox="0 0 24 24" class="svg-option">
                  <path :d="opt.path" :fill="opt.color" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <div class="confetti-holder">
      <div v-for="p in confettiParticles" :key="p.id" class="particle"
        :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
      </div>
    </div>
  </div>
</template>

<style scoped>

.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, system-ui, sans-serif;
  height: 100vh;
  width: 100vw;
}

.border-ios { border: 1px solid #E5E5EA !important; }
.rounded-5 { border-radius: 40px !important; }

/* NAV ELEMENTS */
.nav-btn-ios {
  background: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  color: #007AFF;
  font-weight: 700;
}

.theme-dropdown {
  background-color: #FFD60A;
  color: #007AFF;
  border: 3px solid white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  /* outline: none; */
  font-family: sans-serif;
}

.round-counter {
  background-color: #007AFF;
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700;
  border: 3px solid white;
  font-size: 1rem;
}

.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 8px 20px;
  border-radius: 50px;
  border: 3px solid white;
  font-size: 1.2rem;
}

/* SHADOWS */
.pattern-card {
  width: clamp(75px, 12vw, 150px);
  aspect-ratio: 1/1;
  z-index: 1;
  /* Darker Shadow for main pattern cards */
  filter: drop-shadow(0px 0px 12px rgba(0,0,0,0.2));
}

.btn-ios-option {
  width: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  /* Lighter Shadow for option buttons */
  filter: drop-shadow(0px 0px 6px rgba(0,0,0,0.1));
}

/* TEXT RATIOS */
.pattern-text {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
}

.option-text {
  /* font-size: clamp(1.8rem, 4vw, 3rem); */
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-weight: 900;
}

.svg-shape { width: 75%; height: 75%; pointer-events: none; }
.svg-option { width: 65%; height: 65%; pointer-events: none; }

/* FEEDBACK ANIMATIONS */
@keyframes shake-left-right {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}

.animate-shake {
  animation: shake-left-right 0.4s ease-in-out;
  background-color: #ffe5e5 !important; /* Slight red tint on error */
}

.transition-active:active:not(.animate-shake) { 
  transform: scale(0.9); 
}

.border-dashed-ios {
  border: 4px dashed #007AFF !important;
}

/* SUCCESS OVERLAY */
.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.pill-ui {
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  border: 10px solid white;
  transform: rotate(-2deg);
}

.yellow-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
}

/* CONFETTI */
.confetti-holder {
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: 120vh;
  pointer-events: none;
  z-index: 1999;
}

.particle {
  position: absolute;
  animation-name: fall-gravity;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes fall-gravity {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
}

/* TRANSITIONS */
.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ios-pop-fade-leave-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.ios-pop-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(5deg);
}

@keyframes ios-pop {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(-2deg); opacity: 1; }
}

.animate-pop { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pulse { animation: pulse-anim 1.5s infinite; }
@keyframes pulse-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>