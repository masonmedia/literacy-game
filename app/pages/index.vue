<!-- <script setup>
import { ref, watch, computed } from 'vue';
import gameData from '@/data/gameData.json'; // Ensure path is correct

// --- STATE ---
const gameState = ref('landing'); // 'landing' | 'menu' | 'playing'
const activeUnitKey = ref('unit-f');
const activeUnit = computed(() => gameData[activeUnitKey.value]);

const gameWords = ref([]);
const score = ref(0);
const matchedWordsList = ref([]);
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const showMatchedModal = ref(false);
const confettiParticles = ref([]);
let winConfettiInterval = null;

// --- CORE LOGIC ---
const selectUnit = (key) => {
  activeUnitKey.value = key;
  initGame();
  gameState.value = 'playing';
};

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...activeUnit.value.words]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false, animating: false }));
};

const playSound = (text) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

const handleMatch = (word, targetSound) => {
  if (word.matched || word.animating) return;
  if (word.sound === targetSound) {
    word.animating = true;
    setTimeout(() => {
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      showSuccessOverlay.value = true;
      spawnConfetti(45);
      setTimeout(() => { showSuccessOverlay.value = false; }, 1200);
    }, 500);
    selectedWord.value = null;
  } else {
    selectedWord.value = null;
  }
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

watch(score, (newScore) => {
  if (newScore > 0 && newScore === activeUnit.value.words.length) {
    setTimeout(() => {
      showGameComplete.value = true;
      winConfettiInterval = setInterval(() => spawnConfetti(25), 700);
    }, 800);
  }
});

// --- DRAG HANDLERS ---
const onDragStart = (e, word) => {
  if (isClickMode.value) return;
  e.dataTransfer.setData('wordId', word.id);
};
const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden position-relative">

    <Transition name="fade">
      <div v-if="gameState === 'landing'"
        class="screen landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div class="pill-ui blue-pill mb-4 shadow-lg">Pratique du Son</div>
        <p class="fs-2 text-dark mb-2 fw-bold">Drag the words to the correct sound.</p>
        <p class="fs-4 text-dark mb-5 opacity-75">Faites glisser les mots vers le bon son.</p>
        <button @click="gameState = 'menu'" class="start-btn shadow-lg">START / COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'menu'" class="screen menu-page p-5 overflow-auto h-100">
        <div class="container max-width-md">
          <h2 class="display-5 fw-bold mb-5 text-center">Choisissez un niveau</h2>
          <div class="row g-4 justify-content-center">
            <div v-for="(unit, key) in gameData" :key="key" class="col-md-6 col-lg-5">
              <button @click="selectUnit(key)" class="unit-selection-card shadow-sm w-100">
                <div class="unit-icon" :style="{ backgroundColor: unit.colors[0] }">{{ unit.baseSounds[0] }}</div>
                <div class="text-start">
                  <div class="fw-bold fs-4">{{ unit.title }}</div>
                  <div class="text-secondary small">Apprendre les sons: {{ unit.baseSounds.join(', ') }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="screen d-flex flex-column h-100 p-3 container-fluid">

        <nav class="row align-items-center mb-4 flex-shrink-0">
          <div class="col-4 d-flex gap-2">
            <button @click="gameState = 'menu'" class="nav-btn-ios shadow-sm">Menu</button>
            <button @click="showMatchedModal = true" class="nav-btn-ios shadow-sm">Mots trouvés</button>
          </div>
          <div class="col-4 text-center">
            <h1 class="h4 fw-bold mb-0 text-dark">{{ activeUnit.title }}</h1>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-center">
            <div class="ios-segmented-control shadow-sm me-3">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <div class="mini-score-pill shadow-sm">{{ score }} / {{ activeUnit.words.length }}</div>
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="(sound, idx) in activeUnit.baseSounds" :key="sound" class="col-sound">
            <button @click="playSound(sound); if (isClickMode && selectedWord) handleMatch(selectedWord, sound)"
              @dragover.prevent @drop="onDrop($event, sound)" class="sound-tile-mini shadow"
              :style="{ backgroundColor: activeUnit.colors[idx] }"
              :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="grid-scroll-area flex-grow-1 overflow-hidden px-2">
          <TransitionGroup name="grid-reflow" tag="div" class="dynamic-grid">
            <div v-for="word in gameWords.filter(w => !w.matched)" :key="word.id" class="grid-item">
              <div class="ios-card shadow-sm"
                :class="{ 'selected': selectedWord?.id === word.id, 'arc-out': word.animating }"
                @click="playSound(word.text); if (isClickMode) selectedWord = word" :draggable="!isClickMode"
                @dragstart="onDragStart($event, word)">
                {{ word.text }}
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle"
            :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
          </div>
        </div>

        <Transition name="ios-pop-fade">
          <div v-if="showSuccessOverlay" class="status-overlay">
            <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
            <div class="pill-ui yellow-pill shadow-lg">OUI !</div>
          </div>
        </Transition>

        <Transition name="ios-pop-fade">
          <div v-if="showGameComplete" class="status-overlay bg-glass">
            <div class="pill-ui blue-pill text-center shadow-lg">
              <div class="display-1 mb-2">👍</div>
              <div class="mb-3">Bravo !</div>
              <button @click="gameState = 'menu'"
                class="btn btn-light rounded-pill px-5 fw-bold text-primary shadow-sm py-3 fs-4">UNITÉS</button>
            </div>
          </div>
        </Transition>

        <Transition name="modal-fade">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal-lg shadow-lg">
              <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 class="h3 fw-bold mb-0">Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="ios-close-btn">&times;</button>
              </div>
              <div class="matched-grid-container">
                <div v-for="w in matchedWordsList" :key="w.id" class="matched-badge-lg shadow-sm">
                  <span class="sound-label"
                    :style="{ backgroundColor: activeUnit.colors[activeUnit.baseSounds.indexOf(w.targetSound)] }">
                    {{ w.targetSound }}
                  </span>
                  <span class="word-text">{{ w.text }}</span>
                </div>
                <div v-if="matchedWordsList.length === 0" class="text-center py-5 w-100 text-secondary fs-4">
                  Commencez à jouer pour voir vos mots ici !
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* BASE CONTAINER */
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
}

.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* LANDING & MENU */
.landing-page {
  background: #FFD60A;
  z-index: 10;
}

.start-btn {
  background: #007AFF;
  color: white;
  border: none;
  font-weight: 900;
  padding: 25px 60px;
  border-radius: 60px;
  font-size: 2rem;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.start-btn:active {
  transform: scale(0.95);
}

.unit-selection-card {
  background: white;
  border-radius: 24px;
  border: none;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;
}

.unit-selection-card:hover {
  transform: translateY(-5px) scale(1.02);
}

.unit-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.8rem;
  flex-shrink: 0;
}

/* REFLOWING GRID */
.dynamic-grid {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* gap: 1.2rem; */
  gap: .8rem;
  padding: 10px;
  height: 100%;
  width: 100%;
}

.grid-item {
  width: calc(25% - 0.9rem);
  transition: all 0.5s ease;
}

.grid-reflow-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.grid-reflow-leave-active {
  position: absolute;
  visibility: hidden;
}

/* TILES & CARDS */
.sound-tile-mini {
  color: white;
  border: none;
  width: 100%;
  aspect-ratio: 1.2/1;
  border-radius: 20px;
  font-weight: 800;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.ios-card {
  background: white;
  border-radius: 20px;
  /* padding: 20px 5px;
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem; */
  padding: 16px 5px;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  border: 2px solid transparent;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.ios-card.selected {
  border-color: #007AFF;
  background: #EBF5FF;
  transform: scale(1.08);
}

/* ANIMATIONS */
.arc-out {
  animation: arcToTop 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  z-index: 1000;
  pointer-events: none;
}

@keyframes arcToTop {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-150px) scale(1.1);
  }

  100% {
    transform: translateY(-500px) scale(0);
    opacity: 0;
  }
}

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
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    transform: translateY(115vh) rotate(720deg);
    opacity: 0;
  }
}

/* OVERLAYS & MODAL */
.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.bg-glass {
  background: rgba(242, 242, 247, 0.8);
  backdrop-filter: blur(20px);
  pointer-events: all;
}

.pill-ui {
  font-weight: 900;
  padding: 30px 60px;
  border-radius: 70px;
  border: 10px solid white;
  transform: rotate(-2deg);
}

.yellow-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 5rem;
}

.blue-pill {
  background: #007AFF;
  color: white;
  font-size: 5rem;
}

.ios-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.ios-modal-lg {
  background: white;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  border-radius: 40px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.matched-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  overflow-y: auto;
  padding: 10px;
}

.matched-badge-lg {
  background: #F2F2F7;
  border-radius: 20px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #D1D1D6;
}

.sound-label {
  color: white;
  font-weight: 900;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 1.4rem;
}

.word-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1C1C1E;
}

/* UI COMPONENTS */
.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 10px 25px;
  border-radius: 50px;
  border: 3px solid white;
  font-size: 1.6rem;
}

.nav-btn-ios {
  background: white;
  border: none;
  padding: 12px 24px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 1.1rem;
}

.ios-segmented-control {
  background: #D1D1D6;
  padding: 4px;
  border-radius: 14px;
  display: flex;
}

.ios-segmented-control button {
  border: none;
  background: transparent;
  padding: 8px 20px;
  border-radius: 11px;
  font-weight: 700;
}

.ios-segmented-control button.active {
  background: white;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.ios-close-btn {
  background: #E5E5EA;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}

.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ios-pop {
  0% {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) rotate(-2deg);
    opacity: 1;
  }
}

.pulse-target {
  animation: pulse-ios 1.5s infinite;
}

@keyframes pulse-ios {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5);
  }

  70% {
    box-shadow: 0 0 0 20px rgba(0, 122, 255, 0);
  }
}

.col-sound {
  width: 14%;
}</style> -->



<!-- v2 updated word grid styling, added 2nd landing page table of contents -->
<!-- <script setup>
import { ref, watch, computed } from 'vue';
import gameData from '@/data/gameData.json';

// --- PHONETIC OVERRIDES ---
const phoneticMap = {
  'fe': 'fait'
};

// --- STATE ---
const gameState = ref('landing');
const activeUnitKey = ref('unit-f');
const activeUnit = computed(() => gameData[activeUnitKey.value]);

const gameWords = ref([]);
const score = ref(0);
const matchedWordsList = ref([]);
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const showMatchedModal = ref(false);
const confettiParticles = ref([]);
let winConfettiInterval = null;

// --- ACTIONS ---
const selectUnit = (key) => {
  activeUnitKey.value = key;
  initGame();
  gameState.value = 'playing';
};

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...activeUnit.value.words]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false, animating: false }));
};

const playSound = (text) => {
  window.speechSynthesis.cancel();
  const speechText = phoneticMap[text] || text;
  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.7; // Fixed slow speed
  window.speechSynthesis.speak(utterance);
};

const handleMatch = (word, targetSound) => {
  if (word.matched || word.animating) return;
  if (word.sound === targetSound) {
    word.animating = true;
    setTimeout(() => {
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      showSuccessOverlay.value = true;
      spawnConfetti(45);
      setTimeout(() => { showSuccessOverlay.value = false; }, 1200);
    }, 500);
    selectedWord.value = null;
  } else {
    selectedWord.value = null;
  }
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

watch(score, (newScore) => {
  if (newScore > 0 && newScore === activeUnit.value.words.length) {
    setTimeout(() => {
      showGameComplete.value = true;
      winConfettiInterval = setInterval(() => spawnConfetti(25), 700);
    }, 800);
  }
});

const onDragStart = (e, word) => { e.dataTransfer.setData('wordId', word.id); };
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden position-relative">

    <Transition name="fade">
      <div v-if="gameState === 'landing'"
        class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div class="pill-ui blue-pill mb-4 shadow-lg">Pratique du Son</div>
        <p class="fs-2 text-dark mb-2 fw-bold">Prêt pour les sons?</p>
        <button @click="gameState = 'menu'" class="start-btn shadow-lg">COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'menu'" class="screen menu-page p-5 overflow-auto h-100">
        <div class="container max-width-md">
          <h2 class="display-5 fw-bold mb-5 text-center">Choisissez un niveau</h2>
          <div class="row g-4 justify-content-center">
            <div v-for="(unit, key) in gameData" :key="key" class="col-md-6 col-lg-5">
              <button @click="selectUnit(key)" class="unit-selection-card shadow-sm w-100">
                <div class="unit-icon" :style="{ backgroundColor: unit.colors[0] }">{{ unit.baseSounds[0] }}</div>
                <div class="text-start">
                  <div class="fw-bold fs-4">{{ unit.title }}</div>
                  <div class="text-secondary small">Sons: {{ unit.baseSounds.join(', ') }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="d-flex flex-column h-100 p-3 container-fluid">
        <nav class="row align-items-center mb-4 flex-shrink-0">
          <div class="col-4 d-flex gap-2">
            <button @click="gameState = 'menu'" class="nav-btn-ios shadow-sm">Menu</button>
            <button @click="showMatchedModal = true" class="nav-btn-ios shadow-sm">Trouvés</button>
          </div>
          <div class="col-4 text-center">
            <h1 class="h4 fw-bold mb-0 text-dark">{{ activeUnit.title }}</h1>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-center">
            <div class="ios-segmented-control shadow-sm me-3">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <div class="mini-score-pill shadow-sm">{{ score }} / {{ activeUnit.words.length }}</div>
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="(sound, idx) in activeUnit.baseSounds" :key="sound" class="col-sound">
            <button @click="playSound(sound); if (isClickMode && selectedWord) handleMatch(selectedWord, sound)"
              @dragover.prevent @drop="(e) => {
                const id = e.dataTransfer.getData('wordId');
                const word = gameWords.find(w => w.id == id);
                if (word) handleMatch(word, sound);
              }" class="sound-tile-mini shadow" :style="{ backgroundColor: activeUnit.colors[idx] }"
              :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="grid-scroll-area flex-grow-1 overflow-hidden px-2">
          <TransitionGroup name="grid-reflow" tag="div" class="dynamic-grid">
            <div v-for="word in gameWords.filter(w => !w.matched)" :key="word.id" class="grid-item">
              <div class="ios-card shadow-sm"
                :class="{ 'selected': selectedWord?.id === word.id, 'arc-out': word.animating }"
                @click="playSound(word.text); if (isClickMode) selectedWord = word" :draggable="!isClickMode"
                @dragstart="onDragStart($event, word)">
                {{ word.text }}
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle"
            :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
          </div>
        </div>

        <Transition name="ios-pop-fade">
          <div v-if="showSuccessOverlay" class="status-overlay">
            <div class="pill-ui yellow-pill shadow-lg">OUI !</div>
          </div>
        </Transition>

        <Transition name="ios-pop-fade">
          <div v-if="showGameComplete" class="status-overlay bg-glass">
            <div class="pill-ui blue-pill text-center shadow-lg">
              <div class="display-1 mb-2">👍</div>
              <div class="mb-3">Bravo !</div>
              <button @click="gameState = 'menu'"
                class="btn btn-light rounded-pill px-5 fw-bold text-primary shadow-sm py-3 fs-4">UNITÉS</button>
            </div>
          </div>
        </Transition>

        <Transition name="modal-fade">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal-lg shadow-lg">
              <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 class="h3 fw-bold mb-0">Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="ios-close-btn">&times;</button>
              </div>
              <div class="matched-grid-container">
                <div v-for="w in matchedWordsList" :key="w.id" class="matched-badge-lg shadow-sm">
                  <span class="sound-label"
                    :style="{ backgroundColor: activeUnit.colors[activeUnit.baseSounds.indexOf(w.targetSound)] }">
                    {{ w.targetSound }}
                  </span>
                  <span class="word-text">{{ w.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, system-ui, sans-serif;
}

.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.unit-selection-card {
  background: white;
  border-radius: 24px;
  border: none;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;
}

.unit-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.8rem;
}

/* REFLOWING GRID STYLES */
.dynamic-grid {
  display: flex;
  flex-wrap: wrap;
  /* align-content: flex-start; */
  align-content: center;
  /* gap: 1rem; */
      gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px;
}

.grid-item {
  width: calc(25% - 0.75rem);
  transition: all 0.5s ease;
}

.grid-reflow-leave-active {
  position: absolute;
  visibility: hidden;
}

.grid-reflow-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* LANDING PAGE */
.landing-page {
  height: 100vh;
  background: #FFD60A;
  z-index: 10;
  position: absolute;
  width: 100%;
}

.start-btn {
  background: #007AFF;
  color: white;
  border: none;
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  font-size: 1.8rem;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.start-btn:active {
  transform: scale(0.95);
}

/* UI ELEMENTS */
.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 7px 22px;
  border-radius: 50px;
  border: 3px solid white;
  font-size: 1.4rem;
  white-space: nowrap;
}

.col-sound {
  width: 14%;
}

.sound-tile-mini {
  color: white;
  border: none;
  width: 100%;
  aspect-ratio: 1.2/1;
  border-radius: 20px;
  font-weight: 800;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-card {
  background: white;
  border-radius: 20px;
  padding: 18px 4px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.1s, opacity 0.3s;
  width: 100%;
}

.ios-card.selected {
  border-color: #007AFF;
  background: #EBF5FF;
  transform: scale(1.08);
}

/* ARC ANIMATION */
.arc-out {
  pointer-events: none;
  animation: arcToTop 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  z-index: 1000;
}

@keyframes arcToTop {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-120px) scale(1.1);
  }

  100% {
    transform: translateY(-450px) scale(0);
    opacity: 0;
  }
}

/* MODAL & OVERLAYS */
.ios-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.ios-modal-lg {
  background: white;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.matched-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  overflow-y: auto;
  padding: 10px;
}

.matched-badge-lg {
  background: #F2F2F7;
  border-radius: 18px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #D1D1D6;
}

.sound-label {
  color: white;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 1.2rem;
}

.word-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1C1C1E;
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
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translateY(115vh) rotate(720deg);
    opacity: 0;
  }
}

/* UTILS */
.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.bg-glass {
  background: rgba(242, 242, 247, 0.7);
  backdrop-filter: blur(15px);
  pointer-events: all;
}

.pill-ui {
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  border: 8px solid white;
  transform: rotate(-2deg);
  pointer-events: auto;
}

.yellow-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
}

.blue-pill {
  background: #007AFF;
  color: white;
  font-size: 4.5rem;
}

.ios-segmented-control {
  background: #D1D1D6;
  padding: 3px;
  border-radius: 12px;
  display: flex;
}

.ios-segmented-control button {
  border: none;
  background: transparent;
  padding: 6px 18px;
  border-radius: 9px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
}

.ios-segmented-control button.active {
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.nav-btn-ios {
  background: white;
  border: none;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.ios-close-btn {
  background: #E5E5EA;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ios-pop {
  0% {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) rotate(-2deg);
    opacity: 1;
  }
}

.pulse-target {
  animation: pulse-ios 1.5s infinite;
}

@keyframes pulse-ios {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(0, 122, 255, 0);
  }
}</style> -->



<!-- v3 centering word gird, add drag-sound support, update matched card animation -->
<script setup>
import { ref, watch, computed } from 'vue';
import gameData from '@/data/gameData.json';

const phoneticMap = { 'fe': 'fait' };

// --- STATE ---
const gameState = ref('landing');
const activeUnitKey = ref('unit-f');
const activeUnit = computed(() => gameData[activeUnitKey.value]);
const gameWords = ref([]);
const score = ref(0);
const matchedWordsList = ref([]);
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const showMatchedModal = ref(false);
const confettiParticles = ref([]);
let winConfettiInterval = null;

// --- ACTIONS ---
const selectUnit = (key) => {
  activeUnitKey.value = key;
  initGame();
  gameState.value = 'playing';
};

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...activeUnit.value.words]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({
      ...w,
      id: index,
      matched: false,
      animating: false,
      flyStyle: {} // Stores the dynamic arc coordinates
    }));
};

const playSound = (text) => {
  window.speechSynthesis.cancel();
  const speechText = phoneticMap[text] || text;
  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.7;
  window.speechSynthesis.speak(utterance);
};

// --- DYNAMIC ARC LOGIC ---
const handleMatch = (word, targetSound, event = null) => {
  if (word.matched || word.animating) return;

  if (word.sound === targetSound) {
    // 1. Calculate trajectory if we have an element reference
    const wordEl = document.getElementById(`word-${word.id}`);
    const targetEl = document.getElementById(`target-${targetSound}`);

    if (wordEl && targetEl) {
      const wRect = wordEl.getBoundingClientRect();
      const tRect = targetEl.getBoundingClientRect();

      // Distance to move
      const deltaX = (tRect.left + tRect.width / 2) - (wRect.left + wRect.width / 2);
      const deltaY = (tRect.top + tRect.height / 2) - (wRect.top + wRect.height / 2);

      word.flyStyle = {
        '--target-x': `${deltaX}px`,
        '--target-y': `${deltaY}px`
      };
    }

    word.animating = true;

    setTimeout(() => {
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      showSuccessOverlay.value = true;
      spawnConfetti(45);
      setTimeout(() => { showSuccessOverlay.value = false; }, 1200);
    }, 600);

    selectedWord.value = null;
  } else {
    selectedWord.value = null;
  }
};

const onDragStart = (e, word) => {
  playSound(word.text); // Speak immediately on drag!
  e.dataTransfer.setData('wordId', word.id);
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

watch(score, (n) => {
  if (n > 0 && n === activeUnit.value.words.length) {
    setTimeout(() => { showGameComplete.value = true; winConfettiInterval = setInterval(() => spawnConfetti(25), 700); }, 800);
  }
});
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden position-relative">

    <Transition name="fade">
      <div v-if="gameState === 'landing'"
        class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <!-- <div class="pill-ui blue-pill mb-4 shadow-lg">Pratique du Son</div>
        <button @click="gameState = 'menu'" class="start-btn shadow-lg">COMMENCER</button> -->
        <div class="pill-ui blue-pill mb-5 shadow-lg">Pratique du Son</div>
        <p class="fs-2 mb-2 fw-bold">Drag/click the words to match them with the correct sound.</p>
        <p class="fs-4 mb-5 opacity-75">Faites glisser les mots vers le bon son.</p>
        <button @click="gameState = 'menu'" class="start-btn shadow-lg">START / COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'menu'" class="screen menu-page p-5 overflow-auto h-100">
        <div class="container max-width-md">
          <h2 class="display-5 fw-bold mb-5 text-center">Choisissez un niveau</h2>
          <div class="row g-4 justify-content-center">
            <div v-for="(unit, key) in gameData" :key="key" class="col-md-6 col-lg-5">
              <button @click="selectUnit(key)" class="unit-selection-card shadow-sm w-100">
                <div class="unit-icon" :style="{ backgroundColor: unit.colors[0] }">{{ unit.baseSounds[0] }}</div>
                <div class="text-start">
                  <div class="fw-bold fs-4">{{ unit.title }}</div>
                  <div class="text-secondary small">Sons: {{ unit.baseSounds.join(', ') }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="d-flex flex-column h-100 p-3 container-fluid">
        <nav class="row align-items-center mb-4 flex-shrink-0">
          <div class="col-4 d-flex gap-2">
            <button @click="gameState = 'menu'" class="nav-btn-ios shadow-sm">Menu</button>
            <button @click="showMatchedModal = true" class="nav-btn-ios shadow-sm">Trouvés</button>
          </div>
          <div class="col-4 text-center">
            <h1 class="h4 fw-bold mb-0 text-dark">{{ activeUnit.title }}</h1>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-center">
            <div class="ios-segmented-control shadow-sm me-3">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <div class="mini-score-pill shadow-sm">{{ score }} / {{ activeUnit.words.length }}</div>
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="(sound, idx) in activeUnit.baseSounds" :key="sound" class="col-sound">
            <button :id="`target-${sound}`"
              @click="playSound(sound); if (isClickMode && selectedWord) handleMatch(selectedWord, sound)"
              @dragover.prevent @drop="(e) => {
                const id = e.dataTransfer.getData('wordId');
                const word = gameWords.find(w => w.id == id);
                if (word) handleMatch(word, sound, e);
              }" class="sound-tile-mini shadow" :style="{ backgroundColor: activeUnit.colors[idx] }"
              :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="grid-scroll-area flex-grow-1 overflow-hidden">
          <TransitionGroup name="grid-reflow" tag="div" class="dynamic-grid">
            <div v-for="word in gameWords.filter(w => !w.matched)" :key="word.id" class="grid-item">
              <div :id="`word-${word.id}`" class="ios-card shadow-sm"
                :class="{ 'selected': selectedWord?.id === word.id, 'arc-to-target': word.animating }"
                :style="word.flyStyle" @click="playSound(word.text); if (isClickMode) selectedWord = word"
                :draggable="!isClickMode" @dragstart="onDragStart($event, word)">
                {{ word.text }}
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle"
            :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
          </div>
        </div>
        <Transition name="ios-pop-fade">
          <div v-if="showSuccessOverlay" class="status-overlay">
            <div class="pill-ui yellow-pill shadow-lg">Ya Bud!</div>
          </div>
        </Transition>
        <Transition name="ios-pop-fade">
          <div v-if="showGameComplete" class="status-overlay bg-glass">
            <div class="pill-ui blue-pill text-center shadow-lg">
              <div class="display-1">👍</div>
              <p class="display-2 fw-bold mb-0">Unreal Bud!</p>
              <button @click="gameState = 'menu'"
                class="btn btn-light rounded-pill px-5 fw-bold text-primary shadow-sm py-3 fs-4">Menu / UNITÉS</button>
            </div>
          </div>
        </Transition>

        <Transition name="modal-fade">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal-lg shadow-lg">
              <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 class="h3 fw-bold mb-0">Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="ios-close-btn">&times;</button>
              </div>
              <div class="matched-grid-container">
                <div v-for="w in matchedWordsList" :key="w.id" class="matched-badge-lg shadow-sm">
                  <span class="sound-label"
                    :style="{ backgroundColor: activeUnit.colors[activeUnit.baseSounds.indexOf(w.targetSound)] }">
                    {{ w.targetSound }}
                  </span>
                  <span class="word-text">{{ w.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* INSERTING YOUR SPECIFIC STYLE EDITS */
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, system-ui, sans-serif;
}

.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.unit-selection-card {
  background: white;
  border-radius: 24px;
  border: none;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;
}

.unit-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.8rem;
}

/* REFLOWING GRID STYLES */
.dynamic-grid {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 10px;
}

.grid-item {
  width: calc(25% - 0.75rem);
  transition: all 0.5s ease;
}

.grid-reflow-leave-active {
  position: absolute;
  visibility: hidden;
}

.grid-reflow-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* LANDING PAGE */
.landing-page {
  height: 100vh;
  background: #FFD60A;
  z-index: 10;
  position: absolute;
  width: 100%;
}

.start-btn {
  background: #007AFF;
  color: white;
  border: none;
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  font-size: 1.8rem;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.start-btn:active {
  transform: scale(0.95);
}

/* UI ELEMENTS */
.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 7px 22px;
  border-radius: 50px;
  border: 3px solid white;
  font-size: 1.4rem;
  white-space: nowrap;
}

.col-sound {
  width: 14%;
}

.sound-tile-mini {
  color: white;
  border: none;
  width: 100%;
  aspect-ratio: 1.2/1;
  border-radius: 20px;
  font-weight: 800;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-card {
  background: white;
  border-radius: 20px;
  padding: 18px 4px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.1s, opacity 0.3s;
  width: 100%;
}

.ios-card.selected {
  border-color: #007AFF;
  background: #EBF5FF;
  transform: scale(1.04);
}

/* DYNAMIC ARC ANIMATION */
.arc-to-target {
  pointer-events: none;
  z-index: 1000;
  animation: arcToSpecificTarget 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
}

@keyframes arcToSpecificTarget {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }

  /* We use the CSS variables calculated in JS */
  50% {
    transform: translate(calc(var(--target-x) * 0.5), calc(var(--target-y) - 100px)) scale(1.1);
  }

  100% {
    transform: translate(var(--target-x), var(--target-y)) scale(0);
    opacity: 0;
  }
}

/* MODAL & OVERLAYS */
.ios-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.ios-modal-lg {
  background: white;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.matched-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  overflow-y: auto;
  padding: 10px;
}

.matched-badge-lg {
  background: #F2F2F7;
  border-radius: 18px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #D1D1D6;
}

.sound-label {
  color: white;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 1.2rem;
}

.word-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1C1C1E;
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
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translateY(115vh) rotate(720deg);
    opacity: 0;
  }
}

/* UTILS */
.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.bg-glass {
  background: rgba(242, 242, 247, 0.7);
  backdrop-filter: blur(15px);
  pointer-events: all;
}

.pill-ui {
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  border: 8px solid white;
  transform: rotate(-2deg);
  pointer-events: auto;
}

.yellow-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
}

.blue-pill {
  background: #007AFF;
  color: white;
  font-size: 4.5rem;
}

.ios-segmented-control {
  background: #D1D1D6;
  padding: 3px;
  border-radius: 12px;
  display: flex;
}

.ios-segmented-control button {
  border: none;
  background: transparent;
  padding: 6px 18px;
  border-radius: 9px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
}

.ios-segmented-control button.active {
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.nav-btn-ios {
  background: white;
  border: none;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.ios-close-btn {
  background: #E5E5EA;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ios-pop {
  0% {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) rotate(-2deg);
    opacity: 1;
  }
}

.pulse-target {
  animation: pulse-ios 1.5s infinite;
}

@keyframes pulse-ios {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(0, 122, 255, 0);
  }
}</style>