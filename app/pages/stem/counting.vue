<!-- <script setup>
import { ref, computed, onMounted, watch } from 'vue';

const score = ref(0);
const targetNumber = ref(0);
const userTens = ref([]);
const userOnes = ref([]);
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);

const modernColors = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00'];

const currentValue = computed(() => (userTens.value.length * 10) + userOnes.value.length);

const generateTarget = () => {
    userTens.value = [];
    userOnes.value = [];
    targetNumber.value = Math.floor(Math.random() * 41) + 5;
};

const addTen = () => {
    if (currentValue.value + 10 <= 60 && !isCorrect.value) {
        const color = modernColors[userTens.value.length % modernColors.length];
        userTens.value.push({ id: Math.random(), color });
    }
};

const addOne = () => {
    if (currentValue.value + 1 <= 60 && !isCorrect.value) {
        const color = modernColors[userOnes.value.length % modernColors.length];
        userOnes.value.push({ id: Math.random(), color });

        // SMOOTH AUTO-MERGE
        if (userOnes.value.length === 10) {
            setTimeout(() => {
                // Pick a fresh random color for the new rod
                const randomMergeColor = modernColors[Math.floor(Math.random() * modernColors.length)];
                userOnes.value = [];
                userTens.value.push({ id: Math.random(), color: randomMergeColor });
            }, 200); 
        }
    }
};

const removeTen = (index) => { if(!isCorrect.value) userTens.value.splice(index, 1); };
const removeOne = (index) => { if(!isCorrect.value) userOnes.value.splice(index, 1); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), x: Math.random() * 100, size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5, duration: 2.5 + Math.random() * 1.5
    }));
};

watch(currentValue, (newVal) => {
    if (newVal === targetNumber.value && newVal !== 0 && !isCorrect.value) {
        isCorrect.value = true;
        score.value += 10;
        showSuccessOverlay.value = true;
        spawnConfetti(45);
        
        setTimeout(() => {
            showSuccessOverlay.value = false;
            setTimeout(() => {
                generateTarget();
                isCorrect.value = false;
                confettiParticles.value = [];
            }, 600);
        }, 1800);
    }
});

onMounted(() => { mounted.value = true; generateTarget(); });
</script>

<template>
    <div class="ios-container vh-100 overflow-hidden d-flex flex-column p-3 p-md-4">
        <nav class="row align-items-center mb-3 flex-shrink-0">
            <div class="col-3">
                <NuxtLink to="/stem" class="nav-btn-ios shadow-sm text-decoration-none">← Back</NuxtLink>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <div class="target-card shadow-sm border-ios" :class="{ 'bump': isCorrect }">
                    <span class="label">BUILD THE NUMBER</span>
                    <span class="number">{{ targetNumber }}</span>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <div class="score-pill shadow-sm">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex flex-column overflow-hidden">
            <div v-if="mounted" class="card border-0 rounded-5 shadow-sm p-3 h-100 d-flex flex-column justify-content-between border-ios">
                <div class="work-mat rounded-5 flex-grow-1 d-flex align-items-center justify-content-center p-5 gap-5 position-relative">
                    
                    <div class="d-flex align-items-center gap-3">
                        <TransitionGroup name="rod">
                            <div v-for="(t, idx) in userTens" :key="t.id" class="ten-rod shadow-md"
                                :style="{ '--block-color': t.color }" @click="removeTen(idx)">
                                <div class="delete-hint"><span>×</span></div>
                                <div v-for="i in 10" :key="i" class="cube-unit"></div>
                            </div>
                        </TransitionGroup>
                    </div>

                    <div class="d-flex align-items-center justify-content-center">
                        <div class="ones-flex-container">
                            <TransitionGroup name="cube">
                                <div v-for="(o, idx) in userOnes" :key="o.id" class="cube-unit standalone shadow-md"
                                    :style="{ backgroundColor: o.color, borderColor: 'rgba(0,0,0,0.1)' }"
                                    @click="removeOne(idx)">
                                    <div class="delete-hint"><span>×</span></div>
                                </div>
                            </TransitionGroup>
                        </div>
                    </div>

                    <div class="live-counter shadow-lg" :class="{ 'correct': currentValue === targetNumber }">
                        {{ currentValue }}
                    </div>
                </div>

                <div class="toolbox pt-4 border-top mt-2 flex-shrink-0">
                    <div class="row g-4 justify-content-center">
                        <div class="col-5 col-md-4">
                            <button @click="addTen" class="tool-btn shadow-lg" :disabled="isCorrect">
                                <div class="rod-icon-select mb-3">
                                    <div v-for="i in 10" :key="i" class="cube-unit mini"></div>
                                </div>
                                <span class="btn-label fw-bold">ADD 10</span>
                            </button>
                        </div>
                        <div class="col-5 col-md-4">
                            <button @click="addOne" class="tool-btn shadow-lg" :disabled="isCorrect">
                                <div class="cube-unit standalone preview-one mb-3"></div>
                                <span class="btn-label fw-bold">ADD 1</span>
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
                :style="{ left: p.x + '%', width: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's' }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; border: none; }

.target-card { background: white; padding: 10px 40px; border-radius: 25px; border: 5px solid #007AFF; display: flex; flex-direction: column; align-items: center; transition: all 0.3s; }
.target-card.bump { transform: scale(1.1); border-color: #34C759; }
.target-card .label { font-size: 0.8rem; font-weight: 900; color: #8E8E93; letter-spacing: 1.5px; }
.target-card .number { font-size: 3rem; font-weight: 900; color: #007AFF; line-height: 1; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; font-size: 1.2rem; }

.work-mat { background: #D1D1D6; border: 5px dashed #AEAEB2; overflow: hidden; }

.cube-unit {
    width: clamp(50px, 6vw, 65px);
    height: clamp(20px, 2.8vh, 32px);
    background: #E5E5EA;
    border: 3px solid var(--block-color, #007AFF);
    border-radius: 6px;
    box-shadow: inset -4px -4px 0 rgba(0, 0, 0, 0.1), inset 4px 4px 0 rgba(255, 255, 255, 0.3);
    position: relative;
}

.cube-unit.standalone {
    width: clamp(50px, 6vw, 65px);
    height: clamp(50px, 6vw, 65px);
    border-width: 4px;
    cursor: pointer;
}

.ten-rod {
    display: flex; flex-direction: column-reverse;
    background: var(--block-color); padding: 4px; border-radius: 10px;
    border: 4px solid var(--block-color); cursor: pointer; position: relative;
}

.delete-hint {
    position: absolute; top: -12px; right: -12px;
    background: #FF3B30; color: white; width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid white; z-index: 10; opacity: 0; transition: opacity 0.2s;
}
.delete-hint span { line-height: 0; margin-top: -2px; font-weight: 900; font-size: 20px; }
.ten-rod:hover .delete-hint, .cube-unit.standalone:hover .delete-hint { opacity: 1; }

.ones-flex-container {
    display: flex; flex-direction: column-reverse; flex-wrap: wrap;
    height: calc(clamp(50px, 6vw, 65px) * 4 + 40px); gap: 10px;
    align-items: center; justify-content: center; align-content: center; padding: 10px;
}

.tool-btn {
    width: 100%; height: 200px; padding: 20px; background: white; border: 3px solid #E5E5EA; border-radius: 35px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.2s;
}
.tool-btn:active { transform: scale(0.95); }
.rod-icon-select { display: flex; flex-direction: column-reverse; background: #007AFF; padding: 3px; border-radius: 6px; }
.cube-unit.mini { width: 35px; height: 8px; border-radius: 2px; border-width: 1px; border-color: #007AFF; }
.preview-one { width: 60px !important; height: 60px !important; border-color: #007AFF !important; background: #E5E5EA !important; }

.live-counter {
    position: absolute; bottom: 30px; right: 30px;
    width: 80px; height: 80px; background: white; border: 6px solid #007AFF;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; font-weight: 900; color: #007AFF;
}

.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; transform: rotate(-2deg); }
.yellow-pill { background: #FFD60A; color: #007AFF; font-size: 4rem; }

.ios-pop-fade-enter-active { animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ios-pop-fade-leave-active { transition: opacity 0.5s ease; }
.ios-pop-fade-leave-to { opacity: 0; }

.rod-enter-active, .cube-enter-active { animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.rod-leave-active, .cube-leave-active { transition: all 0.3s ease-out; opacity: 0; transform: scale(0.5); }

@keyframes pop {
    0% { transform: scale(0.3); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.confetti-holder { position: fixed; top: -100px; left: 0; width: 100%; height: 120vh; pointer-events: none; z-index: 1999; }
.particle { position: absolute; height: 10px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(115vh) rotate(720deg); opacity: 0; } }
</style> -->


<!-- v2 10-rod and 1-cube buttons inside mat -->
<!-- 
<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const score = ref(0);
const targetNumber = ref(0);
const userTens = ref([]);
const userOnes = ref([]);
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);

const modernColors = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00'];

const currentValue = computed(() => (userTens.value.length * 10) + userOnes.value.length);

const generateTarget = () => {
    userTens.value = [];
    userOnes.value = [];
    targetNumber.value = Math.floor(Math.random() * 41) + 5;
};

const addTen = () => {
    if (currentValue.value + 10 <= 60 && !isCorrect.value) {
        const color = modernColors[userTens.value.length % modernColors.length];
        userTens.value.push({ id: Math.random(), color });
    }
};

const addOne = () => {
    if (currentValue.value + 1 <= 60 && !isCorrect.value) {
        const color = modernColors[userOnes.value.length % modernColors.length];
        userOnes.value.push({ id: Math.random(), color });

        if (userOnes.value.length === 10) {
            setTimeout(() => {
                const randomMergeColor = modernColors[Math.floor(Math.random() * modernColors.length)];
                userOnes.value = [];
                userTens.value.push({ id: Math.random(), color: randomMergeColor });
            }, 200); 
        }
    }
};

const removeTen = (index) => { if(!isCorrect.value) userTens.value.splice(index, 1); };
const removeOne = (index) => { if(!isCorrect.value) userOnes.value.splice(index, 1); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), 
        x: Math.random() * 100, 
        size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5, 
        duration: 2.5 + Math.random() * 1.5
    }));
};

watch(currentValue, (newVal) => {
    if (newVal === targetNumber.value && newVal !== 0 && !isCorrect.value) {
        isCorrect.value = true;
        score.value += 10;
        showSuccessOverlay.value = true;
        spawnConfetti(45); // CONFETTI TRIGGERED HERE
        
        setTimeout(() => {
            showSuccessOverlay.value = false;
            setTimeout(() => {
                generateTarget();
                isCorrect.value = false;
                confettiParticles.value = [];
            }, 600);
        }, 1800);
    }
});

onMounted(() => { mounted.value = true; generateTarget(); });
</script>

<template>
    <div class="ios-container vh-100 overflow-hidden d-flex flex-column p-3 p-md-4">
        <nav class="row align-items-center mb-3 flex-shrink-0">
            <div class="col-3">
                <NuxtLink to="/stem" class="nav-btn-ios shadow-sm text-decoration-none">← Back</NuxtLink>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <div class="target-card shadow-sm border-ios" :class="{ 'bump': isCorrect }">
                    <span class="label">BUILD THE NUMBER</span>
                    <span class="number">{{ targetNumber }}</span>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <div class="score-pill shadow-sm">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex flex-column overflow-hidden">
            <div v-if="mounted" class="card border-0 rounded-5 shadow-sm h-100 border-ios position-relative overflow-hidden">
                
                <div class="floating-toolbox">
                    <button @click="addTen" class="tool-btn-ios shadow-md" :disabled="isCorrect">
                        <div class="rod-icon-mini">
                            <div v-for="i in 10" :key="i" class="cube-unit micro"></div>
                        </div>
                        <span class="btn-label">ADD 10</span>
                    </button>
                    <button @click="addOne" class="tool-btn-ios shadow-md" :disabled="isCorrect">
                        <div class="cube-unit standalone micro-cube"></div>
                        <span class="btn-label">ADD 1</span>
                    </button>
                </div>

                <div class="work-mat rounded-5 flex-grow-1 d-flex align-items-center justify-content-center p-5 gap-5 position-relative overflow-hidden">
                    
                    <div class="d-flex align-items-center gap-3">
                        <TransitionGroup name="rod">
                            <div v-for="(t, idx) in userTens" :key="t.id" class="ten-rod shadow-md"
                                :style="{ '--block-color': t.color }" @click="removeTen(idx)">
                                <div class="delete-hint"><span>×</span></div>
                                <div v-for="i in 10" :key="i" class="cube-unit"></div>
                            </div>
                        </TransitionGroup>
                    </div>

                    <div class="ones-container-fixed">
                        <div class="ones-flex-grid">
                            <TransitionGroup name="cube">
                                <div v-for="(o, idx) in userOnes" :key="o.id" class="cube-unit standalone shadow-md"
                                    :style="{ backgroundColor: o.color, borderColor: 'rgba(0,0,0,0.1)' }"
                                    @click="removeOne(idx)">
                                    <div class="delete-hint"><span>×</span></div>
                                </div>
                            </TransitionGroup>
                        </div>
                    </div>

                    <div class="live-counter shadow-lg" :class="{ 'correct': currentValue === targetNumber }">
                        {{ currentValue }}
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
                :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's' }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; border: none; }

.target-card { background: white; padding: 10px 40px; border-radius: 25px; border: 5px solid #007AFF; display: flex; flex-direction: column; align-items: center; }
.target-card.bump { transform: scale(1.1); border-color: #34C759; }
.target-card .label { font-size: 0.8rem; font-weight: 900; color: #8E8E93; letter-spacing: 1.5px; }
.target-card .number { font-size: 3rem; font-weight: 900; color: #007AFF; line-height: 1; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

.work-mat { background: #D1D1D6; border: 5px dashed #AEAEB2; position: relative; }

/* TOOLBOX PADDING */
.floating-toolbox { position: absolute; top: 35px; left: 35px; z-index: 100; display: flex; flex-direction: column; gap: 20px; }
.tool-btn-ios { 
    background: white; border: 4px solid #E5E5EA; border-radius: 25px; 
    padding: 25px 20px; display: flex; flex-direction: column; align-items: center; 
    justify-content: center; min-width: 125px; transition: 0.2s;
}
.btn-label { font-size: 0.85rem; font-weight: 900; color: #007AFF; margin-top: 10px; }

/* UNIT GEOMETRY */
.cube-unit {
    width: clamp(40px, 4.5vw, 54px);
    height: clamp(36px, 3.5vw, 54px);
    background: #E5E5EA;
    border: 3px solid var(--block-color, #007AFF);
    border-radius: 6px;
    box-shadow: inset -4px -4px 0 rgba(0, 0, 0, 0.1);
    position: relative;
}

/* Standalone 1-cubes are square within the clamped width */
.cube-unit.standalone {
    height: clamp(40px, 4.5vw, 54px);
    border-width: 4px;
    cursor: pointer;
}

.ten-rod {
    display: flex; flex-direction: column-reverse;
    background: var(--block-color); padding: 4px; border-radius: 12px;
    border: 4px solid var(--block-color); cursor: pointer; position: relative;
}

/* CENTERED X-CLOSE */
.delete-hint {
    position: absolute; top: -15px; right: -15px;
    background: #FF3B30; color: white; width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid white; z-index: 10; opacity: 0; transition: opacity 0.2s;
}
.delete-hint span { font-weight: 900; font-size: 24px; line-height: 1; margin-top: -3px; }
.ten-rod:hover .delete-hint, .cube-unit.standalone:hover .delete-hint { opacity: 1; }

/* ONES GRID */
.ones-container-fixed {
    width: calc((clamp(40px, 4.5vw, 54px) * 2) + 30px);
    height: calc((clamp(40px, 4.5vw, 54px) * 5) + 60px);
}
.ones-flex-grid {
    display: flex; flex-direction: column-reverse; flex-wrap: wrap;
    height: 100%; width: 100%; gap: 12px; align-content: flex-start;
}

/* ICON PREVIEWS */
.rod-icon-mini { display: flex; flex-direction: column-reverse; background: #007AFF; padding: 2px; border-radius: 4px; }
.micro { width: 30px; height: 6px; border-radius: 1px; border-width: 1px; }
.micro-cube { width: 35px !important; height: 35px !important; border-width: 2px !important; background: #E5E5EA !important; border-color: #007AFF !important;}

.live-counter {
    position: absolute; bottom: 35px; right: 35px;
    width: 90px; height: 90px; background: white; border: 6px solid #007AFF;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; font-weight: 900; color: #007AFF;
}

.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.pill-ui { font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; background: #FFD60A; color: #007AFF; font-size: 4rem; }

/* CONFETTI STYLES */
.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 1999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }

.rod-enter-active, .cube-enter-active { animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop { 0% { transform: scale(0.3); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style> -->


<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const score = ref(0);
const targetNumber = ref(0);
const userTens = ref([]);
const userOnes = ref([]);
const isCorrect = ref(false);
const showSuccessOverlay = ref(false);
const confettiParticles = ref([]);
const mounted = ref(false);

const modernColors = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00'];

const currentValue = computed(() => (userTens.value.length * 10) + userOnes.value.length);

const generateTarget = () => {
    userTens.value = [];
    userOnes.value = [];
    targetNumber.value = Math.floor(Math.random() * 41) + 5;
};

const addTen = () => {
    if (currentValue.value + 10 <= 60 && !isCorrect.value) {
        const color = modernColors[userTens.value.length % modernColors.length];
        userTens.value.push({ id: Math.random(), color });
    }
};

const addOne = () => {
    if (currentValue.value + 1 <= 60 && !isCorrect.value) {
        const color = modernColors[userOnes.value.length % modernColors.length];
        userOnes.value.push({ id: Math.random(), color });

        if (userOnes.value.length === 10) {
            setTimeout(() => {
                const randomMergeColor = modernColors[Math.floor(Math.random() * modernColors.length)];
                userOnes.value = [];
                userTens.value.push({ id: Math.random(), color: randomMergeColor });
            }, 200); 
        }
    }
};

const removeTen = (index) => { if(!isCorrect.value) userTens.value.splice(index, 1); };
const removeOne = (index) => { if(!isCorrect.value) userOnes.value.splice(index, 1); };

const spawnConfetti = (count) => {
    const colors = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];
    confettiParticles.value = Array.from({ length: count }).map(() => ({
        id: Math.random(), 
        x: Math.random() * 100, 
        size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.8, 
        duration: 2.5 + Math.random() * 2,
        drift: (Math.random() - 0.5) * 200 
    }));
};

watch(currentValue, (newVal) => {
    if (newVal === targetNumber.value && newVal !== 0 && !isCorrect.value) {
        isCorrect.value = true;
        score.value += 10;
        showSuccessOverlay.value = true;
        spawnConfetti(150); 
        
        setTimeout(() => {
            showSuccessOverlay.value = false;
            setTimeout(() => {
                generateTarget();
                isCorrect.value = false;
                confettiParticles.value = [];
            }, 600);
        }, 1800);
    }
});

onMounted(() => { mounted.value = true; generateTarget(); });
</script>

<template>
    <div class="ios-container vh-100 overflow-hidden d-flex flex-column p-3 p-md-4">
        <nav class="row align-items-center mb-3 flex-shrink-0">
            <div class="col-3">
                <NuxtLink to="/stem" class="nav-btn-ios shadow-sm text-decoration-none">← Back</NuxtLink>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <div class="target-card shadow-sm border-ios" :class="{ 'bump': isCorrect }">
                    <span class="label">BUILD THE NUMBER</span>
                    <span class="number">{{ targetNumber }}</span>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <div class="score-pill shadow-sm">{{ score }} ⭐</div>
            </div>
        </nav>

        <div class="flex-grow-1 d-flex flex-column overflow-hidden">
            <div v-if="mounted" class="card border-0 rounded-5 shadow-sm h-100 border-ios position-relative overflow-hidden">
                
                <div class="floating-toolbox">
                    <button @click="addTen" class="tool-btn-ios shadow-md" :disabled="isCorrect">
                        <div class="rod-icon-mini">
                            <div v-for="i in 10" :key="i" class="cube-unit micro"></div>
                        </div>
                        <span class="btn-label">ADD 10</span>
                    </button>
                    <button @click="addOne" class="tool-btn-ios shadow-md" :disabled="isCorrect">
                        <div class="cube-unit standalone micro-cube"></div>
                        <span class="btn-label">ADD 1</span>
                    </button>
                </div>

                <div class="work-mat rounded-5 flex-grow-1 d-flex align-items-end justify-content-center p-5 gap-4 gap-md-5 position-relative overflow-hidden">
                    
                    <div class="d-flex align-items-end gap-3">
                        <TransitionGroup name="rod">
                            <div v-for="(t, idx) in userTens" :key="t.id" class="ten-rod shadow-md"
                                :style="{ '--block-color': t.color }" @click="removeTen(idx)">
                                <div class="delete-hint"><span>×</span></div>
                                <div v-for="i in 10" :key="i" class="cube-unit"></div>
                            </div>
                        </TransitionGroup>
                    </div>

                    <div class="ones-container-fixed d-flex align-items-end">
                        <div class="ones-flex-grid">
                            <TransitionGroup name="cube">
                                <div v-for="(o, idx) in userOnes" :key="o.id" class="cube-unit standalone shadow-md"
                                    :style="{ backgroundColor: o.color, borderColor: 'rgba(0,0,0,0.1)' }"
                                    @click="removeOne(idx)">
                                    <div class="delete-hint"><span>×</span></div>
                                </div>
                            </TransitionGroup>
                        </div>
                    </div>

                    <div class="live-counter shadow-lg" :class="{ 'correct': currentValue === targetNumber }">
                        {{ currentValue }}
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
                :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', backgroundColor: p.color, animationDuration: p.duration + 's', '--drift': p.drift + 'px' }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; border: none; }

.target-card { background: white; padding: 10px 40px; border-radius: 25px; border: 5px solid #007AFF; display: flex; flex-direction: column; align-items: center; }
.target-card.bump { transform: scale(1.1); border-color: #34C759; }
.target-card .label { font-size: 0.8rem; font-weight: 900; color: #8E8E93; letter-spacing: 1.5px; }
.target-card .number { font-size: 3rem; font-weight: 900; color: #007AFF; line-height: 1; }
.score-pill { background: #FFD60A; color: #007AFF; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: 4px solid white; }

.work-mat { background: #D1D1D6; border: 5px dashed #AEAEB2; position: relative; }

.floating-toolbox { position: absolute; top: 35px; left: 35px; z-index: 100; display: flex; flex-direction: column; gap: 20px; }
.tool-btn-ios { 
    background: white; border: 4px solid #E5E5EA; border-radius: 25px; 
    padding: 25px 20px; display: flex; flex-direction: column; align-items: center; 
    justify-content: center; min-width: 125px; transition: 0.2s;
}
.btn-label { font-size: 0.85rem; font-weight: 900; color: #007AFF; margin-top: 10px; }

/* RECALIBRATED GEOMETRY */
.cube-unit {
    width: clamp(30px, 6.5vw, 50px);
    height: clamp(30px, 6.5vh, 50px);
    background: #E5E5EA;
    border: 3px solid var(--block-color, #007AFF);
    border-radius: 6px;
    box-shadow: inset -4px -4px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    flex-shrink: 0;
}

.cube-unit.standalone {
    border-width: 4px;
    cursor: pointer;
}

.ten-rod {
    display: flex; flex-direction: column-reverse;
    background: var(--block-color); padding: 4px; border-radius: 12px;
    border: 4px solid var(--block-color); cursor: pointer; position: relative;
}

.delete-hint {
    position: absolute; top: -15px; right: -15px;
    background: #FF3B30; color: white; width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid white; z-index: 10; opacity: 0; transition: opacity 0.2s;
}
.delete-hint span { font-weight: 900; font-size: 24px; line-height: 1; margin-top: -3px; }
.ten-rod:hover .delete-hint, .cube-unit.standalone:hover .delete-hint { opacity: 1; }

/* ONES STACKING */
.ones-container-fixed {
    width: clamp(30px, 6.5vw, 50px);
}
.ones-flex-grid {
    display: flex; 
    flex-direction: column-reverse; /* Force vertical stack from bottom */
    width: 100%; 
    gap: 4px; /* Matches visual spacing of the rod segments */
}

.rod-icon-mini { display: flex; flex-direction: column-reverse; background: #007AFF; padding: 2px; border-radius: 4px; }
.micro { width: 30px; height: 6px; border-radius: 1px; border-width: 1px; }
.micro-cube { width: 35px !important; height: 35px !important; border-width: 2px !important; background: #E5E5EA !important; border-color: #007AFF !important;}

.live-counter {
    position: absolute; bottom: 35px; right: 35px;
    width: 90px; height: 90px; background: white; border: 6px solid #007AFF;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; font-weight: 900; color: #007AFF;
    transition: all 0.3s ease;
}

.live-counter.correct { background: #34C759; border-color: white; color: white; transform: scale(1.1); }

.status-overlay { position: fixed; inset: 0; z-index: 2500; display: flex; align-items: center; justify-content: center; pointer-events: none; }

.pill-ui { 
    font-weight: 900; padding: 25px 50px; border-radius: 60px; border: 10px solid white; 
    background: #FFD60A; color: #007AFF; font-size: 4rem;
    transform: rotate(-5deg);
    animation: hop 0.5s infinite alternate ease-in-out;
}

@keyframes hop {
    from { transform: rotate(-5deg) translateY(0); }
    to { transform: rotate(-5deg) translateY(-20px); }
}

.confetti-holder { position: fixed; top: -50px; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 1999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall { to { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; } }

.rod-enter-active, .cube-enter-active { animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes pop { 0% { transform: scale(0.3); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style>