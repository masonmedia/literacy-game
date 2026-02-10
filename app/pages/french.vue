<!-- <script setup>
import { ref, onMounted } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameWords = ref([]);
const score = ref(0);
const columns = ref({});

onMounted(() => {
  // Initialize columns
  baseSounds.value.forEach(s => columns.value[s] = []);
  
  // Shuffle and set words
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false }));
});

// --- AUDIO LOGIC ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR'; // Parisian French
  utterance.rate = 0.9;     // Slightly slower for clarity
  window.speechSynthesis.speak(utterance);
};

// --- DRAG & DROP LOGIC ---
const onDragStart = (event, word) => {
  event.dataTransfer.setData('wordId', word.id);
};

const onDrop = (event, targetSound) => {
  const wordId = event.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == wordId);

  if (word && word.sound === targetSound && !word.matched) {
    word.matched = true;
    columns.value[targetSound].push(word);
    score.value++;
    triggerConfetti();
  } else {
    // Snap back logic is handled by NOT updating state if incorrect
    console.log("Incorrect match!");
  }
};

const triggerConfetti = () => {
  // Simple CSS-based confetti or external library call
  // For this single-file version, we'll use a simple alert or visual cue
  console.log("Confetti Explosion!");
};
</script>

<template>
  <div class="container-fluid min-vh-100 bg-light p-4 font-sans">
    
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h4 fw-bold">Pratique du son</h1>
      <div class="badge rounded-pill bg-primary px-3 py-2 fs-6">
        Score: {{ score }} / {{ initialWords.length }}
      </div>
    </div>

    <div class="row g-2 mb-5">
      <div v-for="sound in baseSounds" :key="sound" class="col">
        <div 
          @dragover.prevent 
          @drop="onDrop($event, sound)"
          class="drop-zone d-flex flex-column align-items-center"
        >
          <button 
            @click="playSound(sound)" 
            class="btn btn-blue-ios w-100 py-3 shadow-sm fw-bold text-uppercase"
          >
            {{ sound }}
          </button>
          
          <div class="matched-container mt-2 w-100">
            <div 
              v-for="w in columns[sound]" 
              :key="w.id" 
              class="matched-card animate-pop"
            >
              {{ w.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-4 g-3">
      <div v-for="word in gameWords" :key="word.id" class="col">
        <div 
          v-if="!word.matched"
          draggable="true"
          @dragstart="onDragStart($event, word)"
          @click="playSound(word.text)"
          class="word-card shadow-sm p-3 text-center bg-white"
        >
          {{ word.text }}
        </div>
        <div v-else class="word-placeholder"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* iOS Look & Feel */
.font-sans {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.btn-blue-ios {
  background-color: #007AFF;
  color: white;
  border-radius: 12px;
  border: none;
  transition: transform 0.1s ease;
}

.btn-blue-ios:active {
  transform: scale(0.95);
}

.word-card {
  border-radius: 12px;
  cursor: grab;
  border: 1px solid #e0e0e0;
  font-weight: 500;
  transition: all 0.2s ease;
  user-select: none;
}

.word-card:active {
  cursor: grabbing;
  opacity: 0.7;
}

.drop-zone {
  min-height: 150px;
  border-radius: 16px;
  background: rgba(0, 122, 255, 0.05);
  border: 2px dashed transparent;
  transition: border 0.3s ease;
}

.matched-card {
  background: #E5E5EA;
  margin-bottom: 4px;
  padding: 8px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.word-placeholder {
  height: 50px;
  visibility: hidden;
}

/* Animations */
@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop {
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style> -->


<!-- v2 add click/drag toggle -->
 <!-- <script setup>
import { ref, onMounted } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait', 'fi': 'fee' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameWords = ref([]);
const score = ref(0);
const columns = ref({});
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);

onMounted(() => {
  baseSounds.value.forEach(s => columns.value[s] = []);
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false }));
});

// --- AUDIO ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

// --- CORE LOGIC ---
const handleMatch = (word, targetSound) => {
  if (word.sound === targetSound) {
    word.matched = true;
    columns.value[targetSound].push(word);
    score.value++;
    triggerVisualSuccess();
    selectedWord.value = null;
  } else {
    selectedWord.value = null; // Snap back/Deselect
  }
};

const triggerVisualSuccess = () => {
  showSuccessOverlay.value = true;
  // Generate 40 random confetti particles
  const colors = ['#007AFF', '#FFD700', '#FF2D55', '#34C759', '#AF52DE'];
  confettiParticles.value = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5
  }));

  setTimeout(() => {
    showSuccessOverlay.value = false;
    confettiParticles.value = [];
  }, 1200);
};

// --- INTERACTION ---
const onWordClick = (word) => {
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) handleMatch(selectedWord.value, sound);
};

const onDragStart = (e, word) => { e.dataTransfer.setData('wordId', word.id); };
const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};
</script>

<template>
  <div class="ios-container min-vh-100 p-4">
    
    <div v-if="showSuccessOverlay" class="confetti-holder">
      <div v-for="(p, i) in confettiParticles" :key="i" 
           class="particle" 
           :style="{ left: p.x + '%', backgroundColor: p.color, animationDelay: p.delay + 's' }">
      </div>
    </div>

    <Transition name="ios-pop">
      <div v-if="showSuccessOverlay" class="success-overlay">
        <div class="yes-pill">OUI !</div>
      </div>
    </Transition>

    <header class="d-flex justify-content-between align-items-center mb-4 mt-2">
      <div class="ios-switch-container shadow-sm">
        <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
        <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
      </div>
      <div class="ios-score-pill">Score: <b>{{ score }}</b></div>
    </header>

    <div class="row g-3 mb-5">
      <div v-for="sound in baseSounds" :key="sound" class="col text-center">
        <div @dragover.prevent @drop="onDrop($event, sound)" class="drop-zone-wrapper">
          <button @click="onSoundClick(sound)" 
                  :class="['sound-tile', { 'pulse-target': selectedWord && isClickMode }]">
            {{ sound }}
          </button>
          <div class="stack mt-2">
            <div v-for="w in columns[sound]" :key="w.id" class="stacked-item">
              {{ w.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-4 g-3">
      <div v-for="word in gameWords" :key="word.id" class="col">
        <div v-if="!word.matched"
             :draggable="!isClickMode"
             @dragstart="onDragStart($event, word)"
             @click="onWordClick(word)"
             :class="['ios-card shadow-sm', { 'selected': selectedWord?.id === word.id }]">
          {{ word.text }}
        </div>
        <div v-else class="ios-card-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* iOS Foundation */
.ios-container {
  background-color: #F2F2F7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  overflow-x: hidden;
}

/* iOS Segmented Control (Switch) */
.ios-switch-container {
  background: #E3E3E8;
  padding: 2px;
  border-radius: 10px;
  display: flex;
}
.ios-switch-container button {
  border: none;
  background: transparent;
  padding: 6px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.ios-switch-container button.active {
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.ios-score-pill {
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* Base Sound Tiles */
.sound-tile {
  background: #007AFF;
  color: white;
  border: none;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 18px;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

/* iOS Cards */
.ios-card {
  background: white;
  border-radius: 14px;
  padding: 20px 10px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: transform 0.2s, background 0.2s;
}
.ios-card:active { transform: scale(0.96); background: #fafafa; }
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.05); }

.stacked-item {
  background: #FFFFFF;
  border: 1px solid #E5E5EA;
  padding: 6px;
  border-radius: 8px;
  margin-top: 4px;
  font-size: 0.8rem;
  animation: slideIn 0.3s ease-out;
}

/* Success Overlay & Confetti */
.success-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  pointer-events: none;
}
.yes-pill {
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
  font-weight: 900;
  padding: 20px 60px;
  border-radius: 100px;
  border: 8px solid white;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  transform: rotate(-5deg);
}

.confetti-holder {
  position: fixed;
  top: -50px; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1999;
}
.particle {
  position: absolute;
  width: 10px; height: 10px;
  opacity: 0;
  animation: fall 1.2s linear forwards;
}

/* Animations */
@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.pulse-target { animation: ios-pulse 1.5s infinite; }
@keyframes ios-pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(0, 122, 255, 0); }
}

/* Transitions */
.ios-pop-enter-active { animation: bounce-in 0.5s; }
.ios-pop-leave-active { animation: bounce-in 0.3s reverse; }
@keyframes bounce-in {
  0% { transform: scale(0); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style> -->


<!-- v3 updated success and game completion states -->

<!-- <script setup>
import { ref, onMounted, watch } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; // Kept 'fe' fix, removed 'fi' fix per feedback

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameWords = ref([]);
const score = ref(0);
const columns = ref({});
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const confettiParticles = ref([]);

onMounted(() => {
  baseSounds.value.forEach(s => columns.value[s] = []);
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false }));
});

// Watch for Game Win
watch(score, (newScore) => {
  if (newScore === initialWords.length) {
    setTimeout(() => { showGameComplete.value = true; }, 1000);
  }
});

// --- AUDIO ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

// --- CORE LOGIC ---
const handleMatch = (word, targetSound) => {
  if (word.sound === targetSound) {
    word.matched = true;
    columns.value[targetSound].push(word);
    score.value++;
    triggerVisualSuccess();
    selectedWord.value = null;
  } else {
    selectedWord.value = null; 
  }
};

const triggerVisualSuccess = () => {
  showSuccessOverlay.value = true;
  const colors = ['#007AFF', '#FFD700', '#FF2D55', '#34C759', '#AF52DE'];
  confettiParticles.value = Array.from({ length: 45 }).map(() => ({
    x: Math.random() * 100,
    size: Math.random() * 15 + 10, // Bigger particles
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.4
  }));

  setTimeout(() => {
    showSuccessOverlay.value = false;
    confettiParticles.value = [];
  }, 1200);
};

// --- INTERACTION ---
const onWordClick = (word) => {
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) handleMatch(selectedWord.value, sound);
};

const onDragStart = (e, word) => { e.dataTransfer.setData('wordId', word.id); };
const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};

const resetGame = () => { window.location.reload(); };
</script>

<template>
  <div class="ios-container min-vh-100 p-4">
    
    <div v-if="showSuccessOverlay || showGameComplete" class="confetti-holder">
      <div v-for="(p, i) in confettiParticles" :key="i" 
           class="particle" 
           :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDelay: p.delay + 's' }">
      </div>
    </div>

    <Transition name="ios-pop">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill">OUI !</div>
      </div>
    </Transition>

    <Transition name="ios-pop">
      <div v-if="showGameComplete" class="status-overlay bg-glass">
        <div class="pill-ui blue-pill text-center">
          <div class="display-1">👍</div>
          <div>Ya Bud!</div>
          <div class="fs-4 mt-2 opacity-75">{{ score }}/{{ initialWords.length }}</div>
          <button @click="resetGame" class="btn btn-light rounded-pill mt-4 px-4">Rejouer</button>
        </div>
      </div>
    </Transition>

    <header class="d-flex justify-content-between align-items-center mb-4">
      <div class="ios-segmented-control">
        <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
        <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
      </div>
      <div class="ios-score">Score: <b>{{ score }}</b></div>
    </header>

    <div class="row g-2 justify-content-center mb-5">
      <div v-for="sound in baseSounds" :key="sound" class="col-2-custom">
        <div @dragover.prevent @drop="onDrop($event, sound)" class="drop-zone text-center">
          <button @click="onSoundClick(sound)" 
                  :class="['sound-tile-sm', { 'pulse-target': selectedWord && isClickMode }]">
            {{ sound }}
          </button>
          <div class="stack mt-2">
            <div v-for="w in columns[sound]" :key="w.id" class="stacked-item">
              {{ w.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-4 g-3">
      <div v-for="word in gameWords" :key="word.id" class="col">
        <div v-if="!word.matched"
             :draggable="!isClickMode"
             @dragstart="onDragStart($event, word)"
             @click="onWordClick(word)"
             :class="['ios-card', { 'selected': selectedWord?.id === word.id }]">
          {{ word.text }}
        </div>
        <div v-else class="ios-card-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

/* Adjusted Sound Tiles (15% Smaller) */
.col-2-custom { width: 18%; } /* Keeps them in a neat row but smaller */
.sound-tile-sm {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1/1; border-radius: 16px;
  font-weight: 700; font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 122, 255, 0.25);
  transition: transform 0.1s;
}
.sound-tile-sm:active { transform: scale(0.9); }

/* Overlays */
.status-overlay {
  position: fixed; inset: 0; display: flex; justify-content: center;
  align-items: center; z-index: 2000; pointer-events: none;
}
.bg-glass { background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); pointer-events: all; }

.pill-ui {
  font-weight: 900; padding: 30px 60px; border-radius: 100px;
  border: 10px solid white; box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  transform: rotate(-3deg);
}
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }
.blue-pill { background: #007AFF; color: white; font-size: 3.5rem; }

/* iOS Styling */
.ios-segmented-control { background: #D1D1D6; padding: 2px; border-radius: 10px; display: flex; }
.ios-segmented-control button { 
  border: none; background: transparent; padding: 5px 15px; 
  border-radius: 8px; font-weight: 500; font-size: 0.85rem; 
}
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

.ios-card {
  background: white; border-radius: 14px; padding: 22px 10px;
  text-align: center; font-weight: 600; cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05); transition: all 0.2s;
}
.ios-card.selected { border: 2px solid #007AFF; background: #EBF5FF; }

/* Confetti Logic */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 100%; z-index: 1999; }
.particle {
  position: absolute; opacity: 0;
  animation: fall-wobble 1.5s ease-out forwards;
}

@keyframes fall-wobble {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
  25% { transform: translateY(25vh) rotate(90deg) translateX(20px); }
  50% { transform: translateY(50vh) rotate(180deg) translateX(-20px); }
  75% { transform: translateY(75vh) rotate(270deg) translateX(20px); }
  100% { transform: translateY(110vh) rotate(360deg) translateX(0); opacity: 0; }
}

/* Standard Transitions */
.ios-pop-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes ios-pop {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(-3deg); opacity: 1; }
}

.pulse-target { animation: pulse 1.5s infinite; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(0, 122, 255, 0); }
}
</style> -->



<!-- v4 improved button and font size, apple border radius, play again logic update -->

<!-- <script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameWords = ref([]);
const score = ref(0);
const columns = ref({});
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const confettiParticles = ref([]);

const initGame = () => {
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  baseSounds.value.forEach(s => columns.value[s] = []);
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false }));
};

onMounted(() => {
  initGame();
});

watch(score, (newScore) => {
  if (newScore === initialWords.length && initialWords.length > 0) {
    setTimeout(() => { showGameComplete.value = true; }, 800);
  }
});

// --- AUDIO ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// --- CORE LOGIC ---
const handleMatch = (word, targetSound) => {
  if (word.matched) return;
  
  if (word.sound === targetSound) {
    word.matched = true;
    columns.value[targetSound].push({ ...word });
    score.value++;
    triggerVisualSuccess();
    selectedWord.value = null;
  } else {
    selectedWord.value = null; 
  }
};

const triggerVisualSuccess = () => {
  showSuccessOverlay.value = true;
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  confettiParticles.value = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    size: Math.random() * 12 + 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5
  }));

  setTimeout(() => {
    showSuccessOverlay.value = false;
  }, 1200);
};

// --- INTERACTION ---
const onWordClick = (word) => {
  if (word.matched) return;
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) {
    handleMatch(selectedWord.value, sound);
  }
};

const onDragStart = (e, word) => { 
  if (word.matched) return;
  e.dataTransfer.setData('wordId', word.id); 
};

const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};
</script>

<template>
  <div class="ios-container vh-100 p-3 d-flex flex-column overflow-hidden">
    
    <div v-if="showSuccessOverlay || showGameComplete" class="confetti-holder">
      <div v-for="(p, i) in confettiParticles" :key="i" 
           class="particle" 
           :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.6) + 'px', backgroundColor: p.color, animationDelay: p.delay + 's' }">
      </div>
    </div>

    <Transition name="ios-pop">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill">OUI !</div>
      </div>
    </Transition>

    <Transition name="ios-pop">
      <div v-if="showGameComplete" class="status-overlay bg-glass">
        <div class="pill-ui blue-pill text-center">
          <div class="display-3">👍</div>
          <div class="mb-2">Ya Bud!</div>
          <div class="fs-3 opacity-75">{{ score }}/20</div>
          <button @click="initGame" class="btn btn-light rounded-pill mt-4 px-5 fw-bold text-primary shadow">REJOUER</button>
        </div>
      </div>
    </Transition>

    <header class="d-flex justify-content-between align-items-center mb-3">
      <div class="ios-segmented-control shadow-sm">
        <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
        <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
      </div>
      <div>
        <h1 class="h4 fw-bold">Pratique du son</h1>
      </div>
      <div class="mini-score-pill">
        {{ score }} / 20
      </div>
    </header>

    <div class="row g-2 justify-content-center mb-3 flex-shrink-0">
      <div v-for="sound in baseSounds" :key="sound" class="col-sound">
        <div @dragover.prevent @drop="onDrop($event, sound)" class="drop-zone text-center">
          <button @click="onSoundClick(sound)" 
                  :class="['sound-tile-mini', { 'pulse-target': selectedWord && isClickMode }]">
            {{ sound }}
          </button>
          <div class="stack mt-2">
            <div v-for="w in columns[sound]" :key="w.id" class="stacked-item-button">
              {{ w.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-4 g-2 flex-grow-1 overflow-hidden align-content-start">
      <div v-for="word in gameWords" :key="word.id" class="col">
        <div v-if="!word.matched"
             :draggable="!isClickMode"
             @dragstart="onDragStart($event, word)"
             @click="onWordClick(word)"
             :class="['ios-card', { 'selected': selectedWord?.id === word.id }]">
          {{ word.text }}
        </div>
        <div v-else class="ios-card-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

/* Score UI styled like the Mini Bluey Button */
.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 7px 22px; border-radius: 50px; border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-size: 1.4rem;
}

/* Sound Tiles: Smaller box, Bigger Text */
.col-sound { width: 14%; }
.sound-tile-mini {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1.2/1; border-radius: 20px;
  font-weight: 800; font-size: 2.2rem; /* Exact requested size */
  box-shadow: 0 4px 10px rgba(0, 122, 255, 0.2);
  display: flex; align-items: center; justify-content: center;
}

/* Matched items kept as button style */
.stacked-item-button {
  background: #E5E5EA; color: #3A3A3C; padding: 4px 2px;
  border-radius: 10px; margin-top: 3px; font-size: 0.75rem;
  font-weight: 600; text-align: center; border: 1px solid #D1D1D6;
}

/* Word Cards */
.ios-card {
  background: white; border-radius: 20px; padding: 12px 4px;
  text-align: center; font-weight: 600; font-size: 1.5rem;
  cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.1s; border: 2px solid transparent;
}
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.05); }

/* Confetti: Falls further down */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle {
  position: absolute; opacity: 0;
  animation: fall-complex 1.8s ease-in forwards;
}

@keyframes fall-complex {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
}

/* Overlay UI */
.status-overlay {
  position: fixed; inset: 0; display: flex; justify-content: center;
  align-items: center; z-index: 2000; pointer-events: none;
}
.bg-glass { background: rgba(242, 242, 247, 0.7); backdrop-filter: blur(15px); pointer-events: all; }

.pill-ui {
  font-weight: 900; padding: 25px 50px; border-radius: 60px;
  border: 8px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transform: rotate(-2deg);
}
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 3.5rem; }
.blue-pill { background: #007AFF; color: white; font-size: 3rem; line-height: 1; }

.ios-segmented-control { background: #D1D1D6; padding: 2px; border-radius: 8px; display: flex; }
.ios-segmented-control button { border: none; background: transparent; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

.pulse-target { animation: pulse-ios 1.5s infinite; }
@keyframes pulse-ios {
  0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5); }
  70% { box-shadow: 0 0 0 12px rgba(0, 122, 255, 0); }
}
</style> -->

<!-- v5 updated confetti and final win state -->

<!-- <script setup>
import { ref, onMounted, watch } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameWords = ref([]);
const score = ref(0);
const columns = ref({});
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const confettiParticles = ref([]);
let winConfettiInterval = null;

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  baseSounds.value.forEach(s => columns.value[s] = []);
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false }));
};

onMounted(() => {
  initGame();
});

// Watch for Game Win
watch(score, (newScore) => {
  if (newScore === initialWords.length && initialWords.length > 0) {
    setTimeout(() => {
      showGameComplete.value = true;
      // Continuous confetti for win state
      winConfettiInterval = setInterval(() => {
        spawnConfetti(20);
      }, 500);
    }, 800);
  }
});

// --- AUDIO ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// --- CORE LOGIC ---
const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  const newParticles = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5
  }));
  
  confettiParticles.value.push(...newParticles);
  
  // Cleanup particles after animation to keep DOM light
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 2500);
};

const handleMatch = (word, targetSound) => {
  if (word.matched) return;
  
  if (word.sound === targetSound) {
    word.matched = true;
    columns.value[targetSound].push({ ...word });
    score.value++;
    
    showSuccessOverlay.value = true;
    spawnConfetti(40);
    
    setTimeout(() => {
      showSuccessOverlay.value = false;
    }, 1200);
    
    selectedWord.value = null;
  } else {
    selectedWord.value = null; 
  }
};

// --- INTERACTION ---
const onWordClick = (word) => {
  if (word.matched) return;
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) {
    handleMatch(selectedWord.value, sound);
  }
};

const onDragStart = (e, word) => { 
  if (word.matched) return;
  e.dataTransfer.setData('wordId', word.id); 
};

const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};
</script>

<template>
  <div class="ios-container vh-100 p-3 d-flex flex-column overflow-hidden">
    
    <TransitionGroup name="confetti-fade">
      <div v-if="showSuccessOverlay || showGameComplete" class="confetti-holder" key="holder">
        <div v-for="p in confettiParticles" :key="p.id" 
             class="particle" 
             :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.6) + 'px', backgroundColor: p.color, animationDelay: p.delay + 's' }">
        </div>
      </div>
    </TransitionGroup>

    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui yellow-pill">OUI !</div>
      </div>
    </Transition>

    <Transition name="ios-pop-fade">
      <div v-if="showGameComplete" class="status-overlay bg-glass">
        <div class="pill-ui blue-pill text-center">
          <div class="display-3">👍</div>
          <div class="mb-2">Ya Bud!</div>
          <div class="fs-3 opacity-75">{{ score }}/20</div>
          <button @click="initGame" class="btn btn-light rounded-pill mt-4 px-5 fw-bold text-primary shadow">REJOUER</button>
        </div>
      </div>
    </Transition>

    <header class="d-flex justify-content-between align-items-center mb-3">
      <div class="ios-segmented-control shadow-sm">
        <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
        <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
      </div>
      <div class="mini-score-pill">
        {{ score }} / 20
      </div>
    </header>

    <div class="row g-2 justify-content-center mb-3 flex-shrink-0">
      <div v-for="sound in baseSounds" :key="sound" class="col-sound">
        <div @dragover.prevent @drop="onDrop($event, sound)" class="drop-zone text-center">
          <button @click="onSoundClick(sound)" 
                  :class="['sound-tile-mini', { 'pulse-target': selectedWord && isClickMode }]">
            {{ sound }}
          </button>
          <div class="stack mt-2">
            <div v-for="w in columns[sound]" :key="w.id" class="stacked-item-button">
              {{ w.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-4 g-2 flex-grow-1 overflow-hidden align-content-start">
      <div v-for="word in gameWords" :key="word.id" class="col">
        <div v-if="!word.matched"
             :draggable="!isClickMode"
             @dragstart="onDragStart($event, word)"
             @click="onWordClick(word)"
             :class="['ios-card', { 'selected': selectedWord?.id === word.id }]">
          {{ word.text }}
        </div>
        <div v-else class="ios-card-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 7px 22px; border-radius: 50px; border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-size: 1.4rem;
}

.col-sound { width: 14%; }
.sound-tile-mini {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1.2/1; border-radius: 20px;
  font-weight: 800; font-size: 2.2rem;
  box-shadow: 0 4px 10px rgba(0, 122, 255, 0.2);
  display: flex; align-items: center; justify-content: center;
}

.stacked-item-button {
  background: #E5E5EA; color: #3A3A3C; padding: 4px 2px;
  border-radius: 10px; margin-top: 3px; font-size: 0.75rem;
  font-weight: 600; text-align: center; border: 1px solid #D1D1D6;
}

.ios-card {
  background: white; border-radius: 20px; padding: 12px 4px;
  text-align: center; font-weight: 600; font-size: 1.5rem;
  cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.1s; border: 2px solid transparent;
}
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.05); }

/* Confetti Logic */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle {
  position: absolute; opacity: 0;
  animation: fall-complex 1.8s ease-in forwards;
}

@keyframes fall-complex {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  /* Falls 80% down the screen before fading to match your request */
  80% { opacity: 1; }
  100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
}

/* Smoother fade out for Success Overlay + Confetti */
.confetti-fade-leave-active,
.ios-pop-fade-leave-active {
  transition: opacity 0.5s ease;
}
.confetti-fade-leave-to,
.ios-pop-fade-leave-to {
  opacity: 0;
}

.ios-pop-fade-enter-active {
  animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ios-pop {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  100% { transform: scale(1) rotate(-2deg); opacity: 1; }
}

.status-overlay {
  position: fixed; inset: 0; display: flex; justify-content: center;
  align-items: center; z-index: 2000; pointer-events: none;
}
.bg-glass { background: rgba(242, 242, 247, 0.7); backdrop-filter: blur(15px); pointer-events: all; }

.pill-ui {
  font-weight: 900; padding: 25px 50px; border-radius: 60px;
  border: 8px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transform: rotate(-2deg);
}
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 3.5rem; }
.blue-pill { background: #007AFF; color: white; font-size: 3rem; line-height: 1; }

.ios-segmented-control { background: #D1D1D6; padding: 2px; border-radius: 8px; display: flex; }
.ios-segmented-control button { border: none; background: transparent; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

.pulse-target { animation: pulse-ios 1.5s infinite; }
@keyframes pulse-ios {
  0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5); }
  70% { box-shadow: 0 0 0 12px rgba(0, 122, 255, 0); }
}

.ios-card-placeholder { height: 100%; }
</style> -->



<!-- v6 add landing page, improve game UI -->

<!-- <script setup>
import { ref, onMounted, watch } from 'vue';

// --- CUSTOMIZABLE DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameState = ref('landing'); // 'landing' | 'playing'
const gameWords = ref([]);
const score = ref(0);
const matchedWordsList = ref([]); // For the modal
const isClickMode = ref(false);
const selectedWord = ref(null);
const showSuccessOverlay = ref(false);
const showGameComplete = ref(false);
const showMatchedModal = ref(false);
const confettiParticles = ref([]);
let winConfettiInterval = null;

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false, animating: false }));
};

const startGame = () => {
  initGame();
  gameState.value = 'playing';
};

watch(score, (newScore) => {
  if (newScore === initialWords.length && initialWords.length > 0) {
    setTimeout(() => {
      showGameComplete.value = true;
      winConfettiInterval = setInterval(() => spawnConfetti(20), 500);
    }, 1000);
  }
});

// --- AUDIO ---
const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// --- ANIMATION & MATCH LOGIC ---
const handleMatch = (word, targetSound, event = null) => {
  if (word.matched) return;
  
  if (word.sound === targetSound) {
    word.animating = true; // Triggers the arc animation
    
    setTimeout(() => {
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      showSuccessOverlay.value = true;
      spawnConfetti(40);
      setTimeout(() => { showSuccessOverlay.value = false; }, 1200);
    }, 600); // Matches the CSS transition time
    
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
    delay: Math.random() * 0.5
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 2500);
};

// --- INTERACTIONS ---
const onWordClick = (word) => {
  if (word.matched || word.animating) return;
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) handleMatch(selectedWord.value, sound);
};

const onDragStart = (e, word) => { 
  if (word.matched || word.animating) return;
  e.dataTransfer.setData('wordId', word.id); 
};

const onDrop = (e, sound) => {
  const id = e.dataTransfer.getData('wordId');
  const word = gameWords.value.find(w => w.id == id);
  if (word) handleMatch(word, sound);
};
</script>

<template>
  <div class="ios-container vh-100 overflow-hidden">
    
    <Transition name="fade">
      <div v-if="gameState === 'landing'" class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div class="pill-ui blue-pill mb-3">Pratique du Son</div>
        <p class="fs-4 text-secondary mb-5">Faites glisser les mots vers le bon son.</p>
        <button @click="startGame" class="start-btn shadow-lg">COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="d-flex flex-column h-100 p-3">
        
        <nav class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex gap-2 align-items-center">
            <div class="ios-segmented-control shadow-sm">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <button @click="showMatchedModal = true" class="nav-btn-ios">Mots trouvés</button>
          </div>
          
          <h1 class="h4 fw-bold mb-0 text-dark">Pratique du son</h1>
          
          <div class="mini-score-pill">
            {{ score }} / 20
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="sound in baseSounds" :key="sound" class="col-sound">
            <button @click="onSoundClick(sound)" 
                    @dragover.prevent @drop="onDrop($event, sound)"
                    :id="'target-' + sound"
                    :class="['sound-tile-mini', { 'pulse-target': selectedWord && isClickMode }]">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="row row-cols-4 g-2 flex-grow-1 overflow-hidden align-content-start pb-4">
          <div v-for="word in gameWords" :key="word.id" class="col position-relative">
            <div v-if="!word.matched"
                 :draggable="!isClickMode"
                 @dragstart="onDragStart($event, word)"
                 @click="onWordClick(word)"
                 :class="['ios-card', { 'selected': selectedWord?.id === word.id, 'arc-out': word.animating }]">
              {{ word.text }}
            </div>
          </div>
        </div>

        <div v-if="showSuccessOverlay || showGameComplete" class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle" 
               :style="{ left: p.x + '%', width: p.size + 'px', height: (p.size * 0.6) + 'px', backgroundColor: p.color, animationDelay: p.delay + 's' }">
          </div>
        </div>

        <Transition name="ios-pop-fade">
          <div v-if="showSuccessOverlay" class="status-overlay"><div class="pill-ui yellow-pill">OUI !</div></div>
        </Transition>

        <Transition name="ios-pop-fade">
          <div v-if="showGameComplete" class="status-overlay bg-glass">
            <div class="pill-ui blue-pill text-center">
              <div class="display-3">👍</div>
              <div class="mb-2">Ya Bud!</div>
              <button @click="initGame" class="btn btn-light rounded-pill mt-4 px-5 fw-bold text-primary shadow">REJOUER</button>
            </div>
          </div>
        </Transition>

        <Transition name="slide">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal">
              <div class="d-flex justify-content-between mb-4">
                <h2 class="h5 fw-bold">Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="btn-close"></button>
              </div>
              <div class="matched-grid">
                <div v-for="w in matchedWordsList" :key="w.id" class="stacked-item-button">
                  <span class="badge bg-primary me-2">{{ w.targetSound }}</span> {{ w.text }}
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
/* Incorporating your requested styles */
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 7px 22px; border-radius: 50px; border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-size: 1.1rem;
}

.col-sound { width: 14%; }
.sound-tile-mini {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1.2/1; border-radius: 20px;
  font-weight: 800; font-size: 2.2rem;
  box-shadow: 0 4px 10px rgba(0, 122, 255, 0.2);
  display: flex; align-items: center; justify-content: center;
}

.ios-card {
  background: white; border-radius: 20px; padding: 12px 4px;
  text-align: center; font-weight: 600; font-size: 1.2rem;
  cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.1s; border: 2px solid transparent;
}
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.05); }

/* Arc Animation */
.arc-out {
  pointer-events: none;
  animation: arcToTop 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  z-index: 1000;
}

@keyframes arcToTop {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-100px) scale(1.1); }
  100% { transform: translateY(-400px) scale(0); opacity: 0; }
}

/* Landing Page Styling */
.landing-page { height: 100vh; background: #F2F2F7; }
.start-btn {
  background: #007AFF; color: white; border: none; font-weight: 900;
  padding: 20px 60px; border-radius: 50px; font-size: 1.5rem;
  transition: transform 0.2s;
}
.start-btn:active { transform: scale(0.95); }

/* Navigation Helpers */
.nav-btn-ios {
  background: #E5E5EA; border: none; padding: 6px 15px;
  border-radius: 8px; font-size: 0.85rem; font-weight: 600;
}

/* Modal Styling */
.ios-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3);
  backdrop-filter: blur(5px); z-index: 3000; display: flex; justify-content: flex-end;
}
.ios-modal {
  width: 300px; height: 100%; background: white; padding: 30px;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}
.matched-grid { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; height: 90%; }

/* Existing UI Styles */
.stacked-item-button {
  background: #E5E5EA; color: #3A3A3C; padding: 10px;
  border-radius: 10px; font-size: 0.9rem; font-weight: 600; border: 1px solid #D1D1D6;
}

.ios-segmented-control { background: #D1D1D6; padding: 2px; border-radius: 8px; display: flex; }
.ios-segmented-control button { border: none; background: transparent; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

/* Confetti & Overlays */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle { position: absolute; opacity: 0; animation: fall-complex 1.8s ease-in forwards; }
@keyframes fall-complex {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
}

.status-overlay { position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 2000; pointer-events: none; }
.bg-glass { background: rgba(242, 242, 247, 0.7); backdrop-filter: blur(15px); pointer-events: all; }
.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 8px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.1); transform: rotate(-2deg); }
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 3.5rem; }
.blue-pill { background: #007AFF; color: white; font-size: 3rem; line-height: 1; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
.ios-pop-fade-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes ios-pop { 0% { transform: scale(0.5) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(-2deg); opacity: 1; } }

.pulse-target { animation: pulse-ios 1.5s infinite; }
@keyframes pulse-ios { 0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5); } 70% { box-shadow: 0 0 0 12px rgba(0, 122, 255, 0); } }
</style> -->



<!-- v7 modal for matched words, better confettim, updated landing page -->
<!-- 
<script setup>
import { ref, onMounted, watch } from 'vue';

// --- DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameState = ref('landing'); 
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

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false, animating: false }));
};

const startGame = () => {
  initGame();
  gameState.value = 'playing';
};

watch(score, (newScore) => {
  if (newScore === initialWords.length && initialWords.length > 0) {
    setTimeout(() => {
      showGameComplete.value = true;
      winConfettiInterval = setInterval(() => spawnConfetti(25), 600);
    }, 1000);
  }
});

const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

const handleMatch = (word, targetSound) => {
  if (word.matched) return;
  if (word.sound === targetSound) {
    word.animating = true;
    setTimeout(() => {
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      showSuccessOverlay.value = true;
      spawnConfetti(50);
      setTimeout(() => { showSuccessOverlay.value = false; }, 1200);
    }, 600);
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
    duration: 2 + Math.random() * 2 
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4000);
};

const onWordClick = (word) => {
  if (word.matched || word.animating) return;
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) handleMatch(selectedWord.value, sound);
};

const onDragStart = (e, word) => { 
  if (word.matched || word.animating) return;
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
      <div v-if="gameState === 'landing'" class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div class="pill-ui blue-pill mb-5 shadow-lg">Pratique du Son</div>
        <p class="fs-2 text-dark mb-2 fw-bold">Drag/click the words to match them with the correct sound.</p>
        <p class="fs-4 text-dark mb-5 opacity-75">Faites glisser les mots vers le bon son.</p>
        <button @click="startGame" class="start-btn shadow-lg">START / COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="d-flex flex-column h-100 p-3 container-fluid">
        
        <nav class="row align-items-center mb-4 flex-shrink-0">
          <div class="col-4 d-flex gap-2">
            <div class="ios-segmented-control shadow-sm">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <button @click="showMatchedModal = true" class="nav-btn-ios shadow-sm">Mots trouvés</button>
          </div>
          
          <div class="col-4 text-center">
            <h1 class="h4 fw-bold mb-0 text-dark">Pratique du son</h1>
          </div>
          
          <div class="col-4 d-flex justify-content-end">
            <div class="mini-score-pill shadow-sm">
              {{ score }} / 20
            </div>
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="sound in baseSounds" :key="sound" class="col-sound">
            <button @click="onSoundClick(sound)" 
                    @dragover.prevent @drop="onDrop($event, sound)"
                    class="sound-tile-mini shadow"
                    :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="grid-container flex-grow-1 overflow-hidden px-2">
            <div class="row row-cols-4 g-3 align-content-start h-100">
                <div v-for="word in gameWords" :key="word.id" class="col position-relative">
                    <div v-if="!word.matched"
                        :draggable="!isClickMode"
                        @dragstart="onDragStart($event, word)"
                        @click="onWordClick(word)"
                        class="ios-card shadow-sm"
                        :class="{ 'selected': selectedWord?.id === word.id, 'arc-out': word.animating }">
                    {{ word.text }}
                    </div>
                    <div v-else class="ios-card-placeholder"></div>
                </div>
            </div>
        </div>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle" 
               :style="{ 
                 left: p.x + '%', 
                 width: p.size + 'px', 
                 height: (p.size * 0.7) + 'px', 
                 backgroundColor: p.color,
                 animationDuration: p.duration + 's',
                 animationDelay: p.delay + 's' 
               }">
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
              <div class="mb-3">Ya Bud!</div>
              <button @click="initGame" class="btn btn-light rounded-pill px-5 fw-bold text-primary shadow-sm py-3 fs-4">REJOUER</button>
            </div>
          </div>
        </Transition>

        <Transition name="modal-fade">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal-lg shadow-lg">
              <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 class="h3 fw-bold mb-0">Matched words / Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="ios-close-btn">&times;</button>
              </div>
              <div class="matched-grid-container">
                <div v-for="w in matchedWordsList" :key="w.id" class="matched-badge-lg shadow-sm">
                  <span class="sound-label">{{ w.targetSound }}</span>
                  <span class="word-text">{{ w.text }}</span>
                </div>
              </div>
              <div v-if="matchedWordsList.length === 0" class="text-center py-5 text-secondary fs-4">
                  Aucun mot trouvé pour l'instant !
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

/* LANDING PAGE */
.landing-page { height: 100vh; background: #FFD60A; z-index: 10; position: absolute; width: 100%; }
.start-btn {
  background: #007AFF; color: white; border: none; font-weight: 900;
  padding: 25px 50px; border-radius: 60px; font-size: 1.8rem;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.start-btn:hover { transform: scale(1.05); }
.start-btn:active { transform: scale(0.95); }

/* UI ELEMENTS */
.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 7px 22px; border-radius: 50px; border: 3px solid white;
  font-size: 1.4rem; white-space: nowrap;
}

.col-sound { width: 14%; }
.sound-tile-mini {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1.2/1; border-radius: 20px;
  font-weight: 800; font-size: 2.2rem;
  display: flex; align-items: center; justify-content: center;
}

.grid-container { width: 100%; max-width: 100%; }

.ios-card {
  background: white; border-radius: 20px; padding: 18px 4px;
  text-align: center; font-weight: 600; font-size: 1.5rem;
  cursor: pointer; border: 2px solid transparent;
  transition: transform 0.1s;
  width: 100%;
}
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.08); }
.ios-card-placeholder { height: 75px; }

/* MODAL & OVERLAYS */
.ios-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px); z-index: 3000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.ios-modal-lg {
  background: white; width: 100%; max-width: 800px;
  max-height: 85vh; border-radius: 30px; padding: 40px;
  display: flex; flex-direction: column;
}
.matched-grid-container {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px; overflow-y: auto; padding: 10px;
}
.matched-badge-lg {
  background: #F2F2F7; border-radius: 18px; padding: 15px;
  display: flex; align-items: center; gap: 12px;
  border: 1px solid #D1D1D6;
}
.sound-label {
  background: #007AFF; color: white; font-weight: 800;
  padding: 5px 12px; border-radius: 10px; font-size: 1.2rem;
}
.word-text { font-size: 1.3rem; font-weight: 600; color: #1C1C1E; }

/* CONFETTI */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle {
  position: absolute; opacity: 1;
  animation-name: fall-gravity;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes fall-gravity {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
}

/* ARC */
.arc-out {
  pointer-events: none;
  animation: arcToTop 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  z-index: 1000;
}
@keyframes arcToTop {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-120px) scale(1.1); }
  100% { transform: translateY(-450px) scale(0); opacity: 0; }
}

/* UTILS */
.status-overlay {
  position: fixed; inset: 0; z-index: 2500;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.bg-glass { background: rgba(242, 242, 247, 0.7); backdrop-filter: blur(15px); pointer-events: all; }

.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 8px solid white; transform: rotate(-2deg); pointer-events: auto; }
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }
.blue-pill { background: #007AFF; color: white; font-size: 4.5rem; }

.ios-segmented-control { background: #D1D1D6; padding: 3px; border-radius: 12px; display: flex; }
.ios-segmented-control button { border: none; background: transparent; padding: 6px 18px; border-radius: 9px; font-size: 1rem; font-weight: 600; white-space: nowrap;}
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.15); }
.nav-btn-ios { background: white; border: none; padding: 8px 18px; border-radius: 12px; font-weight: 600; white-space: nowrap; }
.ios-close-btn { background: #E5E5EA; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }

/* TRANSITIONS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.modal-fade-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.modal-fade-leave-to { opacity: 0; transform: scale(0.9); }
.ios-pop-fade-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes ios-pop { 0% { transform: scale(0.5) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(-2deg); opacity: 1; } }

.pulse-target { animation: pulse-ios 1.5s infinite; }
@keyframes pulse-ios { 0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5); } 70% { box-shadow: 0 0 0 15px rgba(0, 122, 255, 0); } }
</style> -->


<!-- v8 - word grid reshuffles after correct match -->

<script setup>
import { ref, onMounted, watch } from 'vue';

// --- DATA ---
const baseSounds = ref(['fe', 'fa', 'fi', 'fo', 'fu']);
const phoneticMap = { 'fe': 'fait' }; 

const initialWords = [
  { text: 'la fête', sound: 'fe' }, { text: 'finir', sound: 'fi' }, { text: 'la folio', sound: 'fo' }, { text: 'la fée', sound: 'fe' },
  { text: 'la farine', sound: 'fa' }, { text: 'la file', sound: 'fi' }, { text: 'la forêt', sound: 'fo' }, { text: 'le sofa', sound: 'fa' },
  { text: 'la rafale', sound: 'fa' }, { text: 'la fusée', sound: 'fu' }, { text: 'la forme', sound: 'fo' }, { text: 'fier', sound: 'fi' },
  { text: 'la fille', sound: 'fi' }, { text: 'le défi', sound: 'fi' }, { text: 'fermer', sound: 'fe' }, { text: 'la fumée', sound: 'fu' },
  { text: 'la ferme', sound: 'fe' }, { text: 'le futur', sound: 'fu' }, { text: 'la façon', sound: 'fa' }, { text: 'le fauteuil', sound: 'fo' }
];

// --- STATE ---
const gameState = ref('landing'); 
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

const initGame = () => {
  clearInterval(winConfettiInterval);
  score.value = 0;
  showGameComplete.value = false;
  selectedWord.value = null;
  confettiParticles.value = [];
  matchedWordsList.value = [];
  gameWords.value = [...initialWords]
    .sort(() => Math.random() - 0.5)
    .map((w, index) => ({ ...w, id: index, matched: false, animating: false }));
};

const startGame = () => {
  initGame();
  gameState.value = 'playing';
};

watch(score, (newScore) => {
  if (newScore === initialWords.length && initialWords.length > 0) {
    setTimeout(() => {
      showGameComplete.value = true;
      winConfettiInterval = setInterval(() => spawnConfetti(25), 600);
    }, 1000);
  }
});

const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(phoneticMap[text] || text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

const handleMatch = (word, targetSound) => {
  if (word.matched) return;
  if (word.sound === targetSound) {
    word.animating = true;
    
    // 1. Start Arc Animation
    setTimeout(() => {
      // 2. Remove from active grid (matched = true)
      word.matched = true;
      matchedWordsList.value.push({ ...word, targetSound });
      score.value++;
      
      // 3. Trigger UI success
      showSuccessOverlay.value = true;
      spawnConfetti(50);
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
    duration: 2 + Math.random() * 2 
  }));
  confettiParticles.value.push(...newParticles);
  setTimeout(() => {
    confettiParticles.value = confettiParticles.value.filter(p => !newParticles.includes(p));
  }, 4000);
};

const onWordClick = (word) => {
  if (word.matched || word.animating) return;
  playSound(word.text);
  if (isClickMode.value) selectedWord.value = word;
};

const onSoundClick = (sound) => {
  playSound(sound);
  if (isClickMode.value && selectedWord.value) handleMatch(selectedWord.value, sound);
};

const onDragStart = (e, word) => { 
  if (word.matched || word.animating) return;
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
      <div v-if="gameState === 'landing'" class="landing-page d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div class="pill-ui blue-pill mb-5 shadow-lg">Pratique du Son</div>
        <p class="fs-2 text-dark mb-2 fw-bold">Drag/click the words to match them with the correct sound.</p>
        <p class="fs-4 text-dark mb-5 opacity-75">Faites glisser les mots vers le bon son.</p>
        <button @click="startGame" class="start-btn shadow-lg">START / COMMENCER</button>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="gameState === 'playing'" class="d-flex flex-column h-100 p-3 container-fluid">
        
        <nav class="row align-items-center mb-4 flex-shrink-0">
          <div class="col-4 d-flex gap-2">
            <div class="ios-segmented-control shadow-sm">
              <button @click="isClickMode = false" :class="{ active: !isClickMode }">Drag</button>
              <button @click="isClickMode = true" :class="{ active: isClickMode }">Click</button>
            </div>
            <button @click="showMatchedModal = true" class="nav-btn-ios shadow-sm">Matched words</button>
          </div>
          
          <div class="col-4 text-center">
            <h1 class="h4 fw-bold mb-0 text-dark">Pratique du son</h1>
          </div>
          
          <div class="col-4 d-flex justify-content-end">
            <div class="mini-score-pill shadow-sm">
              {{ score }} / 20
            </div>
          </div>
        </nav>

        <div class="row g-2 justify-content-center mb-4 flex-shrink-0">
          <div v-for="sound in baseSounds" :key="sound" class="col-sound">
            <button @click="onSoundClick(sound)" 
                    @dragover.prevent @drop="onDrop($event, sound)"
                    class="sound-tile-mini shadow"
                    :class="{ 'pulse-target': selectedWord && isClickMode }">
              {{ sound }}
            </button>
          </div>
        </div>

        <div class="grid-scroll-area flex-grow-1 overflow-hidden px-2">
            <TransitionGroup name="grid-reflow" tag="div" class="dynamic-grid">
                <div v-for="word in gameWords.filter(w => !w.matched)" 
                     :key="word.id" 
                     class="grid-item">
                    <div :draggable="!isClickMode"
                        @dragstart="onDragStart($event, word)"
                        @click="onWordClick(word)"
                        class="ios-card shadow-sm"
                        :class="{ 'selected': selectedWord?.id === word.id, 'arc-out': word.animating }">
                    {{ word.text }}
                    </div>
                </div>
            </TransitionGroup>
        </div>

        <div class="confetti-holder">
          <div v-for="p in confettiParticles" :key="p.id" class="particle" 
               :style="{ 
                 left: p.x + '%', 
                 width: p.size + 'px', 
                 height: (p.size * 0.7) + 'px', 
                 backgroundColor: p.color,
                 animationDuration: p.duration + 's',
                 animationDelay: p.delay + 's' 
               }">
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
              <div class="mb-3">Ya Bud!</div>
              <button @click="initGame" class="btn btn-light rounded-pill px-5 fw-bold text-primary shadow-sm py-3 fs-4">REJOUER</button>
            </div>
          </div>
        </Transition>

        <Transition name="modal-fade">
          <div v-if="showMatchedModal" class="ios-modal-overlay" @click.self="showMatchedModal = false">
            <div class="ios-modal-lg shadow-lg">
              <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 class="h3 fw-bold mb-0">Matched words / Mots trouvés</h2>
                <button @click="showMatchedModal = false" class="ios-close-btn">&times;</button>
              </div>
              <div class="matched-grid-container">
                <div v-for="w in matchedWordsList" :key="w.id" class="matched-badge-lg shadow-sm">
                  <span class="sound-label">{{ w.targetSound }}</span>
                  <span class="word-text">{{ w.text }}</span>
                </div>
              </div>
              <div v-if="matchedWordsList.length === 0" class="text-center py-5 text-secondary fs-4">
                  <p class="fs-3 mb-0">Match some words Bud!</p>
                  <p class="fs-3">Aucun mot trouvé pour l'instant!</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; font-family: -apple-system, system-ui, sans-serif; }

/* REFLOWING GRID STYLES */
.dynamic-grid {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1rem;
  height: 100%;
  width: 100%;
}

.grid-item {
  width: calc(25% - 0.75rem); /* Simulates row-cols-4 with gap accounting */
  transition: all 0.5s ease;
}

/* Vue reflow transitions */
.grid-reflow-leave-active {
  position: absolute;
  visibility: hidden; /* Hide the item immediately so the others can slide into place */
}

.grid-reflow-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* LANDING PAGE */
.landing-page { height: 100vh; background: #FFD60A; z-index: 10; position: absolute; width: 100%; }
.start-btn {
  background: #007AFF; color: white; border: none; font-weight: 900;
  padding: 25px 50px; border-radius: 60px; font-size: 1.8rem;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.start-btn:active { transform: scale(0.95); }

/* UI ELEMENTS */
.mini-score-pill {
  background: #FFD60A; color: #007AFF; font-weight: 900;
  padding: 7px 22px; border-radius: 50px; border: 3px solid white;
  font-size: 1.4rem; white-space: nowrap;
}

.col-sound { width: 14%; }
.sound-tile-mini {
  background: #007AFF; color: white; border: none;
  width: 100%; aspect-ratio: 1.2/1; border-radius: 20px;
  font-weight: 800; font-size: 2.2rem;
  display: flex; align-items: center; justify-content: center;
}

.ios-card {
  background: white; border-radius: 20px; padding: 18px 4px;
  text-align: center; font-weight: 600; font-size: 1.5rem;
  cursor: pointer; border: 2px solid transparent;
  transition: transform 0.1s, opacity 0.3s;
  width: 100%;
}
.ios-card.selected { border-color: #007AFF; background: #EBF5FF; transform: scale(1.08); }

/* ARC ANIMATION */
.arc-out {
  pointer-events: none;
  animation: arcToTop 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  z-index: 1000;
}
@keyframes arcToTop {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-120px) scale(1.1); }
  100% { transform: translateY(-450px) scale(0); opacity: 0; }
}

/* MODAL & OVERLAYS */
.ios-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px); z-index: 3000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.ios-modal-lg {
  background: white; width: 100%; max-width: 800px;
  max-height: 85vh; border-radius: 30px; padding: 40px;
  display: flex; flex-direction: column;
}
.matched-grid-container {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px; overflow-y: auto; padding: 10px;
}
.matched-badge-lg {
  background: #F2F2F7; border-radius: 18px; padding: 15px;
  display: flex; align-items: center; gap: 12px;
  border: 1px solid #D1D1D6;
}
.sound-label { background: #007AFF; color: white; font-weight: 800; padding: 5px 12px; border-radius: 10px; font-size: 1.2rem; }
.word-text { font-size: 1.3rem; font-weight: 600; color: #1C1C1E; }

/* CONFETTI */
.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle {
  position: absolute; opacity: 1;
  animation-name: fall-gravity;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes fall-gravity {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
}

/* UTILS */
.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.bg-glass { background: rgba(242, 242, 247, 0.7); backdrop-filter: blur(15px); pointer-events: all; }
.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 8px solid white; transform: rotate(-2deg); pointer-events: auto; }
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }
.blue-pill { background: #007AFF; color: white; font-size: 4.5rem; }

.ios-segmented-control { background: #D1D1D6; padding: 3px; border-radius: 12px; display: flex; }
.ios-segmented-control button { border: none; background: transparent; padding: 6px 18px; border-radius: 9px; font-size: 1rem; font-weight: 600; white-space: nowrap;}
.ios-segmented-control button.active { background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.15); }
.nav-btn-ios { background: white; border: none; padding: 8px 18px; border-radius: 12px; font-weight: 600; white-space: nowrap; }
.ios-close-btn { background: #E5E5EA; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }

/* TRANSITIONS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.modal-fade-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.modal-fade-leave-to { opacity: 0; transform: scale(0.9); }
.ios-pop-fade-enter-active { animation: ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes ios-pop { 0% { transform: scale(0.5) rotate(-10deg); opacity: 0; } 100% { transform: scale(1) rotate(-2deg); opacity: 1; } }

.pulse-target { animation: pulse-ios 1.5s infinite; }
@keyframes pulse-ios { 0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.5); } 70% { box-shadow: 0 0 0 15px rgba(0, 122, 255, 0); } }
</style>