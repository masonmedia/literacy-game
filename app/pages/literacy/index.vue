<template>
  <div class="ios-container vh-100 overflow-hidden position-relative">

    <Transition name="fade">
      <div v-if="gameState === 'landing'"
        class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <NuxtLink to="/"
          class="nav-btn-ios border-ios rounded-pill shadow-sm text-decoration-none position-absolute start-0 top-0 m-3">←
          Home</NuxtLink>

        <div class="pill-ui blue-pill mb-5 shadow-lg">
          <h1 class="display-2 fw-bold">Word sounds</h1>
          <p class="fs-3 fw-bold">Pratique du Son</p>
        </div>
        <p class="fs-2 mb-2 fw-bold">Drag/click the words to match them with the correct sound.</p>
        <p class="fs-4 mb-5 opacity-75">Faites glisser les mots vers le bon son.</p>
        <button @click="gameState = 'menu'" class="start-btn shadow-lg fs-4 border border-white border-4">START /
          COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'menu'" class="screen menu-page p-5 overflow-auto h-100">
        <NuxtLink to="/" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-black shadow-sm">←
          Home</NuxtLink>

        <div class="container max-width-md">
          <div class="d-flex justify-content-center mb-5">
            <div class="ios-segmented-control shadow-sm menu-lang-toggle" style="padding: 10px;">
              <button @click="selectedLang = 'fr'" :class="{ active: selectedLang === 'fr' }">Français 🇫🇷</button>
              <button @click="selectedLang = 'en'" :class="{ active: selectedLang === 'en' }">English 🇨🇦</button>
            </div>
          </div>
          <h2 class="display-5 fw-bold mb-4 text-center">Sounds / Sons</h2>
          <div class="row g-4 justify-content-center">
            <div v-for="([key, unit]) in filteredUnits" :key="key" class="col-lg-4 col-md-6">
              <button @click="selectUnit(key)" class="unit-selection-card shadow-sm w-100 d-flex align-items-center p-3">
                <div class="unit-icon me-3" :style="{ backgroundColor: unit.colors[0] }">{{ unit.baseSounds[0] }}</div>
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
      <div v-if="gameState === 'playing'"
        class="d-flex flex-column h-100 p-4 container-fluid overflow-hidden justify-content-between">

        <nav class="row align-items-center flex-shrink-0">
          <div class="col-3 d-flex gap-2">
            <button @click="gameState = 'menu'" class="nav-btn-ios shadow-sm">Menu</button>
          </div>
          <div class="col-6 d-flex justify-content-center gap-3">
            <div class="ios-segmented-control shadow-sm active-blue">
              <button @click="gameMode = 'match'" :class="{ active: gameMode === 'match' }">Match</button>
              <button @click="gameMode = 'spell'" :class="{ active: gameMode === 'spell' }">Spell</button>
            </div>
            <div class="ios-segmented-control shadow-sm active-blue">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
          </div>
          <div class="col-3 d-flex justify-content-end align-items-center">
            <div class="mini-score-pill shadow-sm">{{ score }} / {{ activeUnit.words.length }}</div>
          </div>
        </nav>

        <div class="row g-3 justify-content-center my-4 flex-shrink-0">
          <div v-for="(sound, idx) in activeUnit.baseSounds" :key="sound" class="col-auto">
            <button :id="`target-${sound}`"
              @click="playSound(sound); if (isClickMode && selectedWord) handleMatch(selectedWord, sound)"
              @dragover.prevent @drop="(e) => handleDrop(e, sound)" class="sound-tile-original shadow"
              :style="{ backgroundColor: activeUnit.colors[idx] }"
              :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="flex-grow-1 overflow-hidden d-flex align-items-center py-2">
          <TransitionGroup name="grid-reflow" tag="div" class="dynamic-grid justify-content-center w-100">
            <div v-for="word in gameWords.filter(w => !w.matched)" :key="word.id" class="grid-item">
              <div :id="`word-${word.id}`" class="ios-card shadow-sm"
                :class="{ 'selected': selectedWord?.id === word.id, 'arc-to-target': word.animating }"
                :style="word.flyStyle" @click="playSound(word.text); if (isClickMode) selectedWord = word"
                :draggable="!isClickMode" @dragstart="onDragStart($event, word)">
                {{ formatWord(word.text) }}
              </div>
            </div>
          </TransitionGroup>
        </div>

        <Transition name="modal-fade">
          <div v-if="showSpellingModal" class="ios-modal-overlay">
            <div class="ios-modal-spelling shadow-lg text-center d-flex flex-column gap-5 position-relative">
              <div class="position-absolute top-0 end-0 m-3">
                <button @click="showSpellingModal = false" class="btn btn-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x-circle-fill text-secondary" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                  </svg>
                </button>
              </div>
              <div class="modal-top flex-shrink-0">
                <div class="pill-ui blue-pill mb-3 py-1 fs-3 mx-auto" style="max-width: 350px; transform: rotate(0deg);">
                  Spell the word!</div>
                <div class="d-flex justify-content-center gap-3">
                  <button @click="playSound(spellingTarget.text)"
                    class="shadow btn btn-primary fw-bold border-white border-4 rounded-4 px-4 py-2">🔊 Hear Word</button>
                  <button @click="showHint = !showHint"
                    class="shadow btn btn-warning fw-bold border-white border-4 rounded-4 px-3 py-2">💡 Hint</button>
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center flex-nowrap gap-1 overflow-hidden px-2">
                <div v-for="(char, index) in spellingTarget.text.split('')" :key="index">
                  <div v-if="char === ' '" class="spell-space"></div>
                  <div v-else class="spell-block shadow-sm"
                    :class="{ 'filled': userSpelling[index], 'current': currentIdx === index, 'shake-error': isSpellingError && currentIdx === index }">
                    {{ userSpelling[index] ? userSpelling[index] : (showHint ? char : '') }}
                  </div>
                </div>
              </div>

              <div class="keyboard-container flex-shrink-0 pb-2">
                <div class="keyboard-grid">
                  <button v-for="letter in 'abcdefghijklmnopqrstuvwxyz'.split('')" :key="letter"
                    @click="submitLetter(letter)" class="key-btn shadow-sm">{{ letter }}</button>
                  <button @click="popLetter" class="key-btn back-btn shadow-sm">⌫</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle"
            :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.7) + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }">
          </div>
        </div>

        <Transition name="ios-pop-fade">
          <div v-if="showSuccessOverlay" class="status-overlay">
            <div class="pill-ui-yellow shadow-lg text-center d-flex flex-column align-items-center gap-2">
              <div class="thumbs-up-icon">👍</div>
              <div class="fw-bold">Ya Bud!</div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import gameData from '@/data/gameData.json';

const phoneticMap = {
  'fe': 'fait',
  've': 'veux',
  'vo': 'voh',
  'et': 'ett',
  'eg': 'egg',
  'it': 'itt',
  'ot': 'ott. ',
  'og': 'ogg',
  'ut': 'utt',
  'cut': 'cutt',
  'nut': 'nutt',
  'ug': 'ugg',
  'en': 'n',
  'ip': 'ipp',
  'an': 'ann',
  'van': 'vann',
  'can': 'cann',
  'ap': 'app',
  'cat': 'catt',
  'bat': 'batt',
  'mat': 'matt',
  'hat': 'hatt',
  'rat': 'ratt',
  'wag': 'wagg . '
};

const gameState = ref('landing');
const gameMode = ref('spell');
const activeUnitKey = ref('unit-f');
const gameWords = ref([]);
const score = ref(0);
const isClickMode = ref(true);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const selectedLang = ref('fr');

const showSpellingModal = ref(false);
const spellingTarget = ref(null);
const userSpelling = ref({});
const isSpellingError = ref(false);
const showHint = ref(false);

const activeUnit = computed(() => gameData[activeUnitKey.value]);
const filteredUnits = computed(() => Object.entries(gameData).filter(([k, u]) => (u.lang || 'fr-FR').startsWith(selectedLang.value)));

const currentIdx = computed(() => {
  if (!spellingTarget.value) return 0;
  const chars = spellingTarget.value.text.split('');
  for (let i = 0; i < chars.length; i++) if (chars[i] !== ' ' && !userSpelling.value[i]) return i;
  return chars.length;
});

const formatWord = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const selectUnit = (key) => { activeUnitKey.value = key; initGame(); gameState.value = 'playing'; };

const initGame = () => {
  score.value = 0; confettiParticles.value = [];
  gameWords.value = [...activeUnit.value.words].sort(() => Math.random() - 0.5).map((w, i) => ({
    ...w, id: i, matched: false, animating: false, flyStyle: {}
  }));
};

const playSound = (text) => {
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utt.lang = 'fr-FR';
  utt.rate = 0.9;
  window.speechSynthesis.speak(utt);
};

// Helper to strip accents for comparison
const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const handleMatch = (word, sound) => {
  if (word.matched || word.animating) return;
  if (word.sound === sound) {
    const wEl = document.getElementById(`word-${word.id}`);
    const tEl = document.getElementById(`target-${sound}`);
    if (wEl && tEl) {
      const wR = wEl.getBoundingClientRect(); const tR = tEl.getBoundingClientRect();
      word.flyStyle = { '--target-x': `${tR.left + tR.width / 2 - (wR.left + wR.width / 2)}px`, '--target-y': `${tR.top + tR.height / 2 - (wR.top + wR.height / 2)}px` };
    }
    word.animating = true;
    setTimeout(() => {
      if (gameMode.value === 'spell') startSpelling(word);
      else finishMatch(word);
      word.animating = false;
    }, 600);
  }
  selectedWord.value = null;
};

const startSpelling = (word) => {
  spellingTarget.value = word; userSpelling.value = {}; showHint.value = false; showSpellingModal.value = true; playSound(word.text);
};

const submitLetter = (char) => {
  const targetRaw = spellingTarget.value.text;
  const i = currentIdx.value;

  // Compare normalized (unaccented) typed char with normalized target char
  if (normalize(char) === normalize(targetRaw[i])) {
    // If correct, store the ORIGINAL char (accented) from the word data
    userSpelling.value[i] = targetRaw[i];

    if (Object.keys(userSpelling.value).length === targetRaw.replace(/\s/g, '').length) {
      setTimeout(() => { showSpellingModal.value = false; finishMatch(spellingTarget.value); }, 500);
    }
  } else {
    isSpellingError.value = true; setTimeout(() => isSpellingError.value = false, 400);
  }
};

const popLetter = () => {
  const keys = Object.keys(userSpelling.value).sort((a, b) => a - b);
  if (keys.length) delete userSpelling.value[keys.pop()];
};

const finishMatch = (word) => {
  word.matched = true; score.value++; showSuccessOverlay.value = true; spawnConfetti(45);
  setTimeout(() => {
    showSuccessOverlay.value = false;
    if (score.value === activeUnit.value.words.length) gameState.value = 'menu';
  }, 1500);
};

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newP = Array.from({ length: count }).map(() => ({
    id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.5, duration: 2.5 + Math.random() * 1.5
  }));
  confettiParticles.value.push(...newP);
};

const handleDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};

const onDragStart = (e, word) => { playSound(word.text); e.dataTransfer.setData('wordId', word.id); };

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (showSpellingModal.value) {
      if (e.key === 'Backspace') popLetter();
      else if (/^[a-zA-Z]$/.test(e.key)) submitLetter(e.key);
    }
  });
});
</script>

<style scoped>
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, sans-serif;
}

.landing-page {
  height: 100vh;
  background: #FFD60A;
  z-index: 100;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.pill-ui {
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  border: 8px solid white;
  transform: rotate(-2deg);
}

.blue-pill {
  background: #007AFF;
  color: white;
}

.start-btn {
  background: #007AFF;
  color: white;
  border: none;
  font-weight: 900;
  padding: 25px 50px;
  border-radius: 60px;
  font-size: 1.8rem;
  cursor: pointer;
}

.border-ios {
  border: 4px solid #E5E5EA !important;
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
  padding: 8px 22px;
  border-radius: 11px;
  font-weight: 800;
  cursor: pointer;
}

.menu-lang-toggle button.active {
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #007AFF;
}

.ios-segmented-control.active-blue button.active {
  background: #007AFF;
  color: white;
}

.unit-selection-card {
  background: white;
  border: none;
  border-radius: 20px;
  transition: transform 0.2s;
  text-align: left;
}

.unit-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 1.8rem;
}

.nav-btn-ios {
  background: white;
  border: none;
  padding: 10px 22px;
  border-radius: 14px;
  font-weight: 700;
  color: #007AFF;
  cursor: pointer;
}

.mini-score-pill {
  background: #FFD60A;
  color: #007AFF;
  font-weight: 900;
  padding: 8px 24px;
  border-radius: 50px;
  border: 4px solid white;
}

.sound-tile-original {
  color: white;
  border: none;
  width: 179px;
  height: 150px;
  border-radius: 25px;
  font-weight: 900;
  font-size: 3.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dynamic-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  max-height: 100%;
}

.grid-item {
  width: calc(20% - 12px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.ios-card {
  background: white;
  border-radius: 20px;
  padding: 18px 8px;
  text-align: center;
  font-weight: 900;
  font-size: 1.4rem;
  cursor: pointer;
  border: 3px solid transparent;
  white-space: nowrap;
}

.ios-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-modal-spelling {
  background: white;
  width: 95%;
  height: 95vh;
  max-width: 1000px;
  border-radius: 50px;
  padding: 20px;
  border: 10px solid #E5E5EA;
  overflow: hidden;
}

.spell-block {
  width: clamp(40px, 6vw, 75px);
  height: clamp(40px, 6vw, 75px);
  background: #F2F2F7;
  border: 3px solid #D1D1D6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 900;
  flex-shrink: 0;
}

.spell-block.filled {
  background: #34C759;
  border-color: white;
  color: white;
}

.spell-block.current {
  border-color: #007AFF;
  background: white;
}

.spell-space {
  width: 20px;
}

.keyboard-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
}

.key-btn {
  aspect-ratio: 1;
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  font-size: clamp(1.4rem, 2vh, 1.8rem);
  font-weight: 800;
  color: #007AFF;
  cursor: pointer;
}

.back-btn {
  grid-column: span 2;
  aspect-ratio: auto;
  background: #FF3B30;
  color: white;
}

.status-overlay {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.pill-ui-yellow {
  font-weight: 900;
  padding: 30px 60px;
  border-radius: 70px;
  border: 10px solid white;
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
  transform: rotate(-5deg);
  animation: hop 0.5s infinite alternate ease-in-out;
}

.thumbs-up-icon {
  font-size: 6rem;
  margin-top: -20px;
}

.confetti-holder {
  position: fixed;
  top: -50px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2000;
}

.particle {
  position: absolute;
  animation: fall linear forwards;
}

@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

@keyframes hop {
  from { transform: rotate(-5deg) translateY(0); }
  to { transform: rotate(-5deg) translateY(-25px); }
}

@keyframes arcToTarget {
  100% { transform: translate(var(--target-x), var(--target-y)) scale(0); opacity: 0; }
}

.arc-to-target {
  animation: arcToTarget 0.6s forwards;
}
</style>
