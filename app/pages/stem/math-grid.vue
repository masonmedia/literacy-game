<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import YaBud from '~/components/YaBud.vue';

const score = ref(0);
const gridRows = ref(5);
const grid = ref([]);
const answers = ref({});
const solved = ref(new Set());
const gameWon = ref(false);

// Settings
const operationMode = ref('add'); // 'add', 'subtract', 'mix'
const solveFor = ref('first'); // 'first', 'second', 'sum'
const practiceNumber = ref(null); // 1-10 or null for random

// Single cycling sum mode: = 10 → = 20 → = 30 → < 10 → < 20 → < 30 → ...
const SUM_MODES = [
  { label: 'Sum = 10', exact: true,  target: 10 },
  { label: 'Sum = 20', exact: true,  target: 20 },
  { label: 'Sum = 30', exact: true,  target: 30 },
  { label: 'Sum < 10', exact: false, target: 10 },
  { label: 'Sum < 20', exact: false, target: 20 },
  { label: 'Sum < 30', exact: false, target: 30 },
];
const sumModeIdx = ref(0);
const sumMode    = computed(() => SUM_MODES[sumModeIdx.value]);
const targetTotal = computed(() => sumMode.value.target);
const exactSum    = computed(() => sumMode.value.exact);

const cycleSumMode = () => {
  sumModeIdx.value = (sumModeIdx.value + 1) % SUM_MODES.length;
  resetGame();
};

// Fewer columns for larger targets so 2-digit numbers fit
// Rows stay at 5 → totals: 8×5=40, 6×5=30, 5×5=25 (all clean rectangles)
const gridColumns = computed(() => {
  if (targetTotal.value >= 30) return 5;
  if (targetTotal.value >= 20) return 6;
  return 8;
});

const SOLVE_LABELS = { first: 'Missing: ?+b=s', second: 'Missing: a+?=s', sum: 'Missing: a+b=?' };
const solveLabel = computed(() => SOLVE_LABELS[solveFor.value]);

const cellStates = ref({}); // Track individual cell states: 'pending', 'correct', 'error'
const inputTimers = ref({});

// Compute total cells from current grid dimensions
const totalCells = computed(() => gridColumns.value * gridRows.value);

const generateEquation = () => {
  const N = targetTotal.value;
  const pNum = practiceNumber.value;
  const isAdd = operationMode.value === 'add' || (operationMode.value === 'mix' && Math.random() > 0.5);
  let a, b, sum;

  if (isAdd) {
    if (exactSum.value) {
      // Sum must equal N exactly.
      // Practice #: pNum is one addend, the other fills to N.
      // If pNum >= N it can't be an addend, so ignore it.
      if (pNum !== null && pNum > 0 && pNum < N) {
        if (Math.random() > 0.5) { a = pNum; b = N - pNum; }
        else                      { b = pNum; a = N - pNum; }
      } else {
        a = Math.floor(Math.random() * (N - 1)) + 1;
        b = N - a;
      }
      sum = N;
    } else {
      // Sum ranges 2 to N inclusive.
      if (pNum !== null) {
        // pNum can be a, b, or the sum — whichever fits within N.
        const position = Math.floor(Math.random() * 3);
        if (position === 0 && pNum < N - 1) {
          a = pNum;
          b = Math.floor(Math.random() * (N - pNum - 1)) + 1; // sum stays < N
        } else if (position === 1 && pNum < N - 1) {
          b = pNum;
          a = Math.floor(Math.random() * (N - pNum - 1)) + 1; // sum stays < N
        } else {
          // pNum IS the sum (or fallback when pNum >= N as addend)
          sum = Math.min(pNum, N);
          a = Math.floor(Math.random() * (sum - 1)) + 1;
          b = sum - a;
          return { a, b, sum, op: '+' };
        }
      } else {
        // sum must be strictly < N, so max sum = N-1
        a = Math.floor(Math.random() * (N - 2)) + 1; // 1 to N-2
        b = Math.floor(Math.random() * (N - a - 1)) + 1; // 1 to N-a-1
      }
      sum = a + b;
    }
    return { a, b, sum, op: '+' };

  } else {
    if (exactSum.value) {
      // Result must equal N: a - b = N.
      // Practice #: pNum is b, so a = N + pNum.
      if (pNum !== null && pNum > 0) {
        b = pNum;
        a = N + pNum;
      } else {
        b = Math.floor(Math.random() * N) + 1;
        a = N + b;
      }
      sum = N;
    } else {
      // Result ranges 0 to N.
      if (pNum !== null) {
        const position = Math.floor(Math.random() * 3);
        if (position === 0 && pNum <= N) {
          // pNum - b = result
          a = pNum;
          b = Math.floor(Math.random() * pNum) + 1;
        } else if (position === 1 && pNum < N) {
          // a - pNum = result, a > pNum
          b = pNum;
          a = pNum + Math.floor(Math.random() * (N - pNum)) + 1;
        } else {
          // result = pNum: a - b = pNum
          sum = pNum;
          b = Math.floor(Math.random() * (N - pNum)) + 1;
          a = pNum + b;
          return { a, b, sum, op: '-' };
        }
      } else {
        a = Math.floor(Math.random() * (N - 1)) + 1;
        b = Math.floor(Math.random() * a) + 1;
      }
      sum = a - b;
    }
    return { a, b, sum, op: '-' };
  }
};

const generateGrid = () => {
  grid.value = [];
  answers.value = {};
  solved.value = new Set();
  gameWon.value = false;
  cellStates.value = {};
  inputTimers.value = {};
  suggestedCellId.value = 'cell-0';

  const usedEquations = new Set();

  for (let i = 0; i < totalCells.value; i++) {
    let eq;
    let attempts = 0;
    do {
      eq = generateEquation();
      attempts++;
    } while (usedEquations.has(`${eq.a}${eq.op}${eq.b}`) && attempts < 30);
    usedEquations.add(`${eq.a}${eq.op}${eq.b}`);
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

// Returns the next unsolved cell index in column-major order (down then across)
const getNextUnsolvedIndex = (fromIndex) => {
  const cols = gridColumns.value;
  const rows = gridRows.value;
  const total = totalCells.value;

  let col = fromIndex % cols;
  let row = Math.floor(fromIndex / cols);

  for (let step = 1; step < total; step++) {
    row++;
    if (row >= rows) {
      row = 0;
      col = (col + 1) % cols;
    }
    const idx = row * cols + col;
    if (!solved.value.has(`cell-${idx}`)) return idx;
  }
  return null;
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
      setTimeout(() => {
        setTimeout(generateGrid, 600);
      }, 2000);
    } else {
      // Advance suggested cell and focus in column-major order
      const currentIndex = parseInt(cellId.split('-')[1], 10);
      const nextIndex = getNextUnsolvedIndex(currentIndex);
      if (nextIndex !== null) {
        suggestedCellId.value = `cell-${nextIndex}`;
        setTimeout(() => {
          const nextInput = document.querySelector(`input[data-cell="cell-${nextIndex}"]`);
          if (nextInput) nextInput.focus();
        }, 200);
      }
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

  // Clear any pending check for this cell
  if (inputTimers.value[cellId]) {
    clearTimeout(inputTimers.value[cellId]);
    inputTimers.value[cellId] = null;
  }

  if (sanitized.length === 0) return;

  // 2 digits → check quickly; 1 digit → wait in case user types a second digit
  const delay = sanitized.length >= 2 ? 200 : 800;
  inputTimers.value[cellId] = setTimeout(() => checkAnswer(cellId), delay);
};


const resetGame = () => {
  generateGrid();
  setTimeout(() => {
    const firstInput = document.querySelector('input[data-cell="cell-0"]');
    if (firstInput) firstInput.focus();
  }, 100);
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
const suggestedCellId = ref('cell-0');

onMounted(() => {
  generateGrid();
  setTimeout(() => {
    const firstInput = document.querySelector('input[data-cell="cell-0"]');
    if (firstInput) firstInput.focus();
  }, 100);
});

onUnmounted(() => {
  // cleanup if needed
});
</script>

<template>
  <div class="vh-100 d-flex flex-column p-3 p-md-4 ios-bg" style="background-color: #F2F2F7;">
    <!-- Header Nav -->
    <nav class="row align-items-center flex-shrink-0 mb-3 px-2">
      <div class="col-4 d-flex align-items-center gap-2">
        <NuxtLink to="/stem" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-bold shadow-sm">← Back</NuxtLink>
        <button @click="cycleSumMode" class="nav-btn-target shadow-sm fw-bold">{{ sumMode.label }}</button>
        <button @click="solveFor = (solveFor === 'first' ? 'second' : solveFor === 'second' ? 'sum' : 'first'); resetGame()" class="nav-btn-yellow shadow-sm fw-bold">Missing</button>
      </div>

      <div class="col-4 d-flex justify-content-center gap-1">
        <button @click="operationMode = 'add'; resetGame()" class="mode-pill px-4 fs-6" :class="{ active: operationMode === 'add' }">+</button>
        <button @click="operationMode = 'subtract'; resetGame()" class="mode-pill px-4 fs-6" :class="{ active: operationMode === 'subtract' }">−</button>
        <button @click="operationMode = 'mix'; resetGame()" class="mode-pill mb-0 px-4" :class="{ active: operationMode === 'mix' }">Mix</button>

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

      <div class="col-4 d-flex align-items-center justify-content-end gap-2">
        <button class="nav-btn-yellow shadow-sm fw-bold">{{ score }} ⭐</button>
      </div>
    </nav>

    <!-- Game Board -->
    <div class="flex-grow-1 d-flex align-items-center justify-content-center overflow-auto">
      <div class="math-grid-container">
        <div class="row g-2 w-100" :class="`row-cols-${gridColumns}`">
          <div v-for="cell in grid" :key="cell.id" class="col">
            <div class="grid-cell" :class="[cellStates[cell.id], { 'suggested-pulse-start': cell.id === suggestedCellId && !solved.has(cell.id) && suggestedCellId === 'cell-0', 'suggested-pulse-next': cell.id === suggestedCellId && !solved.has(cell.id) && suggestedCellId !== 'cell-0' }]">
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
    </div>

    <!-- Ya Bud! Success overlay -->
    <YaBud :show="gameWon" />
  </div>
</template>

<style scoped>
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

.math-grid-container {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.math-grid-container .row {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-content: stretch;
}

.math-grid-container .col {
  display: flex;
  align-items: stretch;
}

/* Explicit column widths — row-cols-8 is not a built-in Bootstrap class */
.math-grid-container .row-cols-8 .col { flex: 0 0 calc(100% / 8); max-width: calc(100% / 8); }
.math-grid-container .row-cols-6 .col { flex: 0 0 calc(100% / 6); max-width: calc(100% / 6); }
.math-grid-container .row-cols-5 .col { flex: 0 0 calc(100% / 5); max-width: calc(100% / 5); }

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
  width: 100%;
  height: 100%;
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

@keyframes pulse-border-success {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(52, 199, 89, 0.3);
    border-color: #34C759;
  }
  50% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 8px rgba(52, 199, 89, 0.1);
    border-color: #34C759;
  }
}

@keyframes pulse-border-secondary {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(108, 117, 125, 0.2);
    border-color: rgba(108, 117, 125, 0.25);
  }
  50% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 8px rgba(108, 117, 125, 0.08);
    border-color: rgba(108, 117, 125, 0.25);
  }
}

.grid-cell.suggested-pulse-start {
  background: rgba(209, 250, 229, 0.7);
  border-color: #34C759;
  border-width: 3px;
  animation: pulse-border-success 2s ease-in-out infinite;
}

.grid-cell.suggested-pulse-next {
  background: rgba(233, 236, 239, 0.5);
  border-color: rgba(108, 117, 125, 0.25);
  border-width: 3px;
  animation: pulse-border-secondary 2s ease-in-out infinite;
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
