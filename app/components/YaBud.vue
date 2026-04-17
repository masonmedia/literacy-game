<template>
  <!-- Success overlay: "Ya Bud!" celebration -->
  <Transition name="ios-pop-fade">
    <div v-if="show" class="ya-bud-overlay">
      <div class="ya-bud-pill shadow-lg text-center d-flex flex-column align-items-center">
        <div class="thumbs-up-icon my-3">👍</div>
        <div class="fw-black">Ya Bud!</div>
        <slot />
      </div>
    </div>
  </Transition>

  <!-- Confetti layer -->
  <div class="confetti-holder">
    <div v-for="p in particles" :key="p.id" class="particle"
      :style="{
        left: p.x + '%',
        width: p.size + 'px',
        height: (p.size * 0.7) + 'px',
        backgroundColor: p.color,
        animationDuration: p.duration + 's',
        animationDelay: (p.delay ?? 0) + 's',
        '--drift': p.drift + 'px'
      }">
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show:          { type: Boolean, default: false },
  confettiCount: { type: Number,  default: 150 },
});

const particles = ref([]);
const COLORS = ['#007AFF', '#FFD60A', '#FF2D55', '#34C759', '#AF52DE'];

const spawnConfetti = () => {
  particles.value = Array.from({ length: props.confettiCount }).map(() => ({
    id:       Math.random(),
    x:        Math.random() * 100,
    size:     Math.random() * 15 + 10,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 2.5 + Math.random() * 1.5,
    delay:    Math.random() * 0.5,
    drift:    (Math.random() - 0.5) * 200,
  }));
};

watch(() => props.show, (val) => {
  if (val) spawnConfetti();
  else particles.value = [];
});
</script>

<style scoped>
.fw-black { font-weight: 900; }

.ya-bud-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.ya-bud-pill {
  font-weight: 900;
  padding: 20px 50px;
  border-radius: 60px;
  border: 10px solid white;
  background: #FFD60A;
  color: #007AFF;
  font-size: 3rem;
  transform: rotate(-5deg);
  animation: hop 0.5s infinite alternate ease-in-out;
}

.thumbs-up-icon { font-size: 5.5rem; line-height: 1; }

@keyframes hop {
  from { transform: rotate(-5deg) translateY(0); }
  to   { transform: rotate(-5deg) translateY(-20px); }
}

/* Transition */
.ios-pop-fade-enter-active { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ios-pop-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.ios-pop-fade-leave-to     { opacity: 0; transform: scale(0.8); }
@keyframes pop-in { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }

/* Confetti */
.confetti-holder { position: fixed; inset: 0; top: -50px; pointer-events: none; z-index: 2999; }
.particle { position: absolute; border-radius: 3px; animation: fall linear forwards; }
@keyframes fall {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); opacity: 0; }
}
</style>
