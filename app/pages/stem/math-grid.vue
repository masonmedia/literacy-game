<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const score = ref(0);
const gridColumns = ref(8);
const gridRows = ref(5);
const grid = ref([]);
const answers = ref({});
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const solved = ref(new Set());
const gameWon = ref(false);

// Settings
const operationMode = ref('mix'); // 'add', 'subtract', 'mix'
const targetTotal = ref(10); // 10, 20, 30
const solveFor = ref('first'); // 'first', 'second', 'sum'
const practiceNumber = ref(null); // 1-10 or null for random

const cellStates = ref({}); // Track individual cell states: 'pending', 'correct', 'error'

// Compute total cells from current grid dimensions
const totalCells = computed(() => gridColumns.value * gridRows.value);

const generateEquation = () => {
  let a, b, sum;

  // If practicing a specific number, include it in the equation
  if (practiceNumber.value !== null) {
    const pNum = practiceNumber.value;
    const isAddition = operationMode.value === 'add' || (operationMode.value === 'mix' && Math.random() > 0.5);

    // Randomly choose where the practice number goes
    const position = Math.floor(Math.random() * 3); // 0=first operand, 1=second operand, 2=result

    if (isAddition) {
      if (position === 0) {
        // pNum + b = sum
        a = pNum;
        b = Math.floor(Math.random() * Math.min(10, targetTotal.value - pNum)) + 1;
        sum = a + b;
      } else if (position === 1) {
        // a + pNum = sum
        b = pNum;
        a = Math.floor(Math.random() * Math.min(10, targetTotal.value - pNum)) + 1;
        sum = a + b;
      } else {
        // a + b = pNum
        sum = pNum;
        a = Math.floor(Math.random() * Math.max(1, pNum - 1)) + 1;
        b = pNum - a;
        if (b <= 0) b = 1;
      }
      return { a, b, sum, op: '+' };
    } else {
      if (position === 0) {
        // pNum - b = sum
        a = pNum;
        b = Math.floor(Math.random() * Math.max(1, pNum - 1)) + 1;
        sum = a - b;
      } else if (position === 1) {
        // a - pNum = sum
        b = pNum;
        a = pNum + Math.floor(Math.random() * 10) + 1;
        sum = a - b;
      } else {
        // a - b = pNum
        sum = pNum;
        a = pNum + Math.floor(Math.random() * 10) + 1;
        b = a - pNum;
      }
      return { a, b, sum, op: '-' };
    }
  }

  // Original random generation when no practice number selected
  if (operationMode.value === 'add' || (operationMode.value === 'mix' && Math.random() > 0.5)) {
    a = Math.floor(Math.random() * (targetTotal.value - 2)) + 1;
    b = Math.floor(Math.random() * (targetTotal.value - a - 1)) + 1;
    sum = a + b;
    return { a, b, sum, op: '+' };
  } else {
    a = Math.floor(Math.random() * (targetTotal.value - 1)) + 1;
    b = Math.floor(Math.random() * a) + 1;
    sum = a - b;
    return { a, b, sum, op: '-' };
  }
};

const generateGrid = () => {
  grid.value = [];
  answers.value = {};
  solved.value = new Set();
  gameWon.value = false;
  cellStates.value = {};

  for (let i = 0; i < totalCells.value; i++) {
    const eq = generateEquation();
    const cellId = `cell-${i}`;

    let display = {};
    let correctAnswer = null;

    if (solveFor.value === 'first') {
      display = { blank: 'a', b: eq.b, sum: eq.sum, op: eq.op };
      correctAnswer = eq.a;
    } else if (solveFor.value === 'second') {
      display = { a: eq.a, blank: 'b', sum: eq.sum, op: eq.op };
      correctAnswer = eq.b;
    } else { // solve for sum
      display = { a: eq.a, b: eq.b, blank: 'sum', op: eq.op };
      correctAnswer = eq.sum;
    }

    grid.value.push({ id: cellId, ...display, correctAnswer, eq });
    answers.value[cellId] = '';
    cellStates.value[cellId] = 'pending';
  }
};

const checkAnswer = (cellId) => {
  if (solved.value.has(cellId)) return;

  const cell = grid.value.find(c => c.id === cellId);
  const userAnswer = parseInt(answers.value[cellId], 10);

  if (isNaN(userAnswer)) return;

  if (userAnswer === cell.correctAnswer) {
    cellStates.value[cellId] = 'correct';
    solved.value.add(cellId);
    answers.value[cellId] = cell.correctAnswer;

    if (solved.value.size === totalCells.value) {
      gameWon.value = true;
      score.value += 10;
      showSuccessOverlay.value = true;
      spawnConfetti(150);
      setTimeout(() => {
        showSuccessOverlay.value = false;
        setTimeout(generateGrid, 600);
      }, 2000);
    } else {
      // Move focus to the cell below (next row)
      setTimeout(() => {
        const currentIndex = parseInt(cellId.split('-')[1], 10);
        const nextIndex = currentIndex + gridColumns.value;
        if (nextIndex < totalCells.value) {
          const nextInput = document.querySelector(`input[data-cell="cell-${nextIndex}"]`);
          if (nextInput) nextInput.focus();
        }
      }, 200);
    }
  } else {
    cellStates.value[cellId] = 'error';
    setTimeout(() => {
      cellStates.value[cellId] = 'pending';
      answers.value[cellId] = '';
      const inputEl = document.querySelector(`input[data-cell="${cellId}"]`);
      if (inputEl) inputEl.focus();
    }, 500);
  }
};

const handleInput = (cellId, value) => {
  // Only allow digits
  const sanitized = value.replace(/[^0-9]/g, '');
  answers.value[cellId] = sanitized;
  // Auto-check when 2 digits entered or when it's a single digit number
  if (sanitized.length > 0) {
    const num = parseInt(sanitized, 10);
    if (num >= 0 && num <= 99) {
      setTimeout(() => checkAnswer(cellId), 200);
    }
  }
};

const spawnConfetti = (count) => {
  const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
  confettiParticles.value = Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    size: Math.random() * 15 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 2.5 + Math.random() * 2,
    drift: (Math.random() - 0.5) * 200
  }));
};

const resetGame = () => {
  generateGrid();
};

const setPracticeNumber = (num) => {
  practiceNumber.value = num;
  resetGame();
};

const handleKeyDown = (e, cellId) => {
  if (solved.value.has(cellId)) return;

  if (e.key === 'Enter') {
    checkAnswer(cellId);
  }
};

const showPracticeMenu = ref(false);

onMounted(() => {
  generateGrid();
});

onUnmounted(() => {
  // cleanup if needed
});
</script>

<template>
  <div class="vh-100 d-flex flex-column p-3 p-md-4 ios-bg" style="background-color: #F2F2F7;">
    <!-- Header Nav -->
    <nav class="nav-container flex-shrink-0 mb-3">
      <div class="nav-left">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-bold shadow-sm">← Back</NuxtLink>
      </div>

      <div class="nav-center">
        <button @click="operationMode = 'add'; resetGame()" class="mode-pill" :class="{ active: operationMode === 'add' }">+</button>
        <button @click="operationMode = 'subtract'; resetGame()" class="mode-pill" :class="{ active: operationMode === 'subtract' }">−</button>
        <button @click="operationMode = 'mix'; resetGame()" class="mode-pill" :class="{ active: operationMode === 'mix' }">Mix</button>

        <div class="practice-menu-wrapper">
          <button @click="showPracticeMenu = !showPracticeMenu" class="practice-select shadow-sm">
            {{ practiceNumber ? `Practice # = ${practiceNumber}` : 'Practice #' }}
          </button>
          <div v-if="showPracticeMenu" class="practice-dropdown">
            <button v-for="n in 10" :key="n" @click="setPracticeNumber(n); showPracticeMenu = false">{{ n }}</button>
            <button v-if="practiceNumber" @click="setPracticeNumber(null); showPracticeMenu = false" class="clear-btn">Clear</button>
          </div>
        </div>
      </div>

      <div class="nav-right">
        <button @click="solveFor = (solveFor === 'first' ? 'second' : solveFor === 'second' ? 'sum' : 'first'); resetGame()" class="nav-btn-yellow shadow-sm fw-black">Solve for ?</button>
        <button @click="targetTotal = (targetTotal === 10 ? 20 : targetTotal === 20 ? 30 : 10); resetGame()" class="nav-btn-target shadow-sm fw-black">TARGET = {{ targetTotal }}</button>
        <div class="score-pill shadow-sm">{{ score }} ⭐</div>
      </div>
    </nav>

    <!-- Game Board -->
    <div class="flex-grow-1 d-flex align-items-center justify-content-center overflow-auto">
      <div class="math-grid-container">
        <div class="grid-8x4">
          <div v-for="cell in grid" :key="cell.id" class="grid-cell" :class="cellStates[cell.id]">
            <div class="equation-box">
              <!-- Display equation -->
              <div class="equation-display">
                <span v-if="cell.a !== undefined" class="num">{{ cell.a }}</span>
                <span v-if="cell.blank === 'a'" class="blank-input-wrapper">
                  <input
                    :data-cell="cell.id"
                    v-model="answers[cell.id]"
                    @input="(e) => handleInput(cell.id, e.target.value)"
                    @keydown="handleKeyDown($event, cell.id)"
                    type="text"
                    class="blank-input"
                    placeholder=""
                    :disabled="solved.has(cell.id)"
                    autofocus
                  />
                </span>

                <span class="operator">{{ cell.op }}</span>

                <span v-if="cell.b !== undefined" class="num">{{ cell.b }}</span>
                <span v-if="cell.blank === 'b'" class="blank-input-wrapper">
                  <input
                    :data-cell="cell.id"
                    v-model="answers[cell.id]"
                    @input="(e) => handleInput(cell.id, e.target.value)"
                    @keydown="handleKeyDown($event, cell.id)"
                    type="text"
                    class="blank-input"
                    placeholder=""
                    :disabled="solved.has(cell.id)"
                  />
                </span>

                <span class="equals">=</span>

                <span v-if="cell.sum !== undefined" class="num">{{ cell.sum }}</span>
                <span v-if="cell.blank === 'sum'" class="blank-input-wrapper">
                  <input
                    :data-cell="cell.id"
                    v-model="answers[cell.id]"
                    @input="(e) => handleInput(cell.id, e.target.value)"
                    @keydown="handleKeyDown($event, cell.id)"
                    type="text"
                    class="blank-input"
                    placeholder=""
                    :disabled="solved.has(cell.id)"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Overlay -->
    <Transition name="ios-pop-fade">
      <div v-if="showSuccessOverlay" class="status-overlay">
        <div class="pill-ui-yellow shadow-lg">Ya Bud!</div>
      </div>
    </Transition>

    <!-- Confetti -->
    <div class="confetti-holder">
      <div
        v-for="p in confettiParticles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.x + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          backgroundColor: p.color,
          animationDuration: p.duration + 's',
          '--drift': p.drift + 'px'
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.ios-bg {
  background-color: #F2F2F7;
}

.border-ios {
  border: 4px solid #E5E5EA !important;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.5rem;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-center {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.nav-btn-ios {
  background: white;
  padding: 10px 20px;
  border-radius: 15px;
  font-weight: 700;
  color: #007AFF;
  border: 4px solid white;
  cursor: pointer;
}

.mode-pill {
  border: 4px solid #E5E5EA;
  background: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.85rem;
  color: #8E8E93;
  transition: 0.2s;
  cursor: pointer;
}

.mode-pill.active {
  border-color: #007AFF;
  color: #007AFF;
  background: #007AFF11;
}

.nav-btn-yellow {
  background: #FFD60A;
  color: #007AFF;
  padding: 10px 20px;
  border-radius: 50px;
  border: 4px solid white;
  cursor: pointer;
}

.nav-btn-target {
  background: #007AFF;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  border: 4px solid white;
  cursor: pointer;
}

.score-pill {
  background: #FFD60A;
  color: #007AFF;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 900;
  border: 4px solid white;
}

.math-grid-container {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-8x4 {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
}

.grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 18px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.grid-cell.correct {
  background: #D1FAE5;
  border-color: #34C759;
}

.grid-cell.error {
  background: #FEE2E2;
  border-color: #FF3B30;
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.equation-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
}

.equation-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
  flex-wrap: nowrap;
  width: 100%;
  line-height: 1.1;
}

.num {
  color: #1C1C1E;
}

.operator {
  color: #007AFF;
}

.equals {
  color: #34C759;
}

.blank-input-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.blank-input {
  width: 36px;
  height: 36px;
  padding: 4px;
  border: 3px solid #34C759;
  background: #D1FAE5;
  border-radius: 6px;
  text-align: center;
  font-weight: 900;
  font-size: 1.3rem;
  color: #1C1C1E;
  transition: all 0.2s;
}

.blank-input:focus {
  outline: none;
  border-color: #007AFF;
}

.blank-input:disabled {
  background: #D1FAE5;
  border-color: #34C759;
  cursor: default;
}

.grid-cell.error .blank-input {
  background: #FEE2E2;
  border-color: #FF3B30;
}

/* Success overlay */
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
  padding: 25px 50px;
  border-radius: 60px;
  border: 10px solid white;
  background: #FFD60A;
  color: #007AFF;
  font-size: 4rem;
  transform: rotate(-5deg);
  animation: hop 0.5s infinite alternate ease-in-out;
}

@keyframes hop {
  from { transform: rotate(-5deg) translateY(0); }
  to { transform: rotate(-5deg) translateY(-20px); }
}

/* Confetti */
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

/* Transitions */
.ios-pop-fade-enter-active,
.ios-pop-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.ios-pop-fade-enter-from,
.ios-pop-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.practice-select {
  background: white;
  color: #007AFF;
  padding: 8px 12px;
  border-radius: 50px;
  border: 4px solid #E5E5EA;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.practice-select:hover {
  border-color: #007AFF;
  background: #007AFF11;
}

.practice-select:focus {
  outline: none;
  border-color: #007AFF;
}

.practice-menu-wrapper {
  position: relative;
}

.practice-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 4px solid #E5E5EA;
  border-radius: 12px;
  margin-top: 4px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
}

.practice-dropdown button {
  background: white;
  border: none;
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
  color: #007AFF;
  font-weight: 800;
  font-size: 0.85rem;
  transition: 0.2s;
  white-space: nowrap;
}

.practice-dropdown button:first-child {
  border-radius: 8px 8px 0 0;
}

.practice-dropdown button:last-child {
  border-radius: 0 0 8px 8px;
}

.practice-dropdown button:hover {
  background: #007AFF11;
}

.practice-dropdown button.clear-btn {
  border-top: 1px solid #E5E5EA;
  color: #FF3B30;
}

/* Responsive */
@media (max-width: 1200px) {
  .grid-8x4 {
    grid-template-columns: repeat(6, 1fr);
  }

  .equation-display {
    font-size: 1.3rem;
  }

  .blank-input {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
}

@media (max-width: 992px) {
  .grid-8x4 {
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }

  .equation-display {
    font-size: 1.1rem;
    gap: 3px;
  }

  .blank-input {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }

  .grid-cell {
    padding: 6px;
    border-radius: 12px;
  }
}

@media (max-width: 768px) {
  .grid-8x4 {
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }

  .equation-display {
    font-size: 0.95rem;
    gap: 2px;
  }

  .blank-input {
    width: 24px;
    height: 24px;
    font-size: 0.9rem;
    padding: 2px;
  }

  .grid-cell {
    padding: 4px;
    border-radius: 10px;
  }

  .nav-btn-ios {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .mode-pill,
  .nav-btn-yellow,
  .nav-btn-target,
  .practice-select {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .grid-8x4 {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .equation-display {
    font-size: 0.85rem;
    gap: 2px;
  }

  .blank-input {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    padding: 2px;
  }

  .grid-cell {
    padding: 3px;
    border-radius: 8px;
  }

  nav {
    margin-bottom: 1rem !important;
  }

  .col-auto {
    flex: 0 0 auto !important;
  }

  .mode-pill,
  .nav-btn-yellow,
  .nav-btn-target,
  .practice-select {
    padding: 5px 10px;
    font-size: 0.7rem;
  }

  .score-pill {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
