<template>
  <nav class="game-nav row align-items-center flex-shrink-0 mb-3 px-2">
    <!-- Left slot: back button + optional action buttons -->
    <div class="col-4 d-flex align-items-center gap-2">
      <NuxtLink :to="backTo" class="nav-btn-ios border-ios rounded-pill text-decoration-none text-center fw-bold shadow-sm">
        ← {{ backLabel }}
      </NuxtLink>
      <slot name="left" />
    </div>

    <!-- Center slot: mode pills, segmented controls, etc. -->
    <div class="col-4 d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <slot name="center" />
    </div>

    <!-- Right slot: score pill + optional right-side controls -->
    <div class="col-4 d-flex align-items-center justify-content-end gap-2">
      <slot name="right" />
      <div v-if="score !== null" class="score-pill shadow-sm fw-black">{{ score }} ⭐</div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  backTo:    { type: String, default: '/' },
  backLabel: { type: String, default: 'Back' },
  score:     { type: Number, default: null },
});
</script>

<style scoped>
.border-ios { border: 4px solid #E5E5EA !important; }
.fw-black   { font-weight: 900; }

.nav-btn-ios {
  background: white;
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 700;
  color: #007AFF;
  cursor: pointer;
  white-space: nowrap;
}

.score-pill {
  background: #FFD60A;
  color: #007AFF;
  padding: 12px 25px;
  border-radius: 50px;
  border: 4px solid white;
  white-space: nowrap;
}
</style>
