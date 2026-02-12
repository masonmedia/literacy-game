<template>
  <div class="ios-container vh-100 p-3 p-md-5 overflow-auto">
    <nav>
      <NuxtLink to="/" class="nav-btn-ios shadow-sm text-decoration-none d-inline-block">← Home</NuxtLink>
    </nav>

    <div class="text-center mb-5">
      <h1 class="display-3 fw-bold text-dark tracking-tight">STEM Lab</h1>
      <p class="text-secondary fw-bold text-uppercase tracking-wider">Explore • Build • Solve</p>
    </div>

    <div class="row g-5 justify-content-center max-width-lg mx-auto">
      <div class="col-12 col-md-6 col-lg-5">
        <NuxtLink to="/stem/patterns" class="stem-card patterns shadow-sm text-decoration-none d-flex flex-column p-4 rounded-5 gap-4">
          <div class="card-icon-flat">🧩</div>
          <div class="card-content d-flex flex-column gap-3">
            <h2 class="h1 fw-bold text-white mb-0">Pattern Engine</h2>
            <p class="text-white opacity-85 fw-medium fs-5">Complete sequences with shapes and symbols.</p>
          </div>
          <div class="play-pill-left shadow-sm">Play Now</div>
        </NuxtLink>
      </div>

      <div class="col-12 col-md-6 col-lg-5">
        <NuxtLink to="/stem/counting" class="stem-card counting shadow-sm text-decoration-none d-flex flex-column p-4 rounded-5 gap-4">
          <div class="card-icon-flat">🧊</div>
          <div class="card-content d-flex flex-column gap-3">
            <h2 class="h1 fw-bold text-white mb-0">Cube Counter</h2>
            <p class="text-white opacity-85 fw-medium fs-5">Build numbers up to 50 with Base-Ten blocks.</p>
          </div>
          <div class="play-pill-left shadow-sm">Play Now</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ios-container { background-color: #F2F2F7; min-height: 100vh; }
.nav-btn-ios { background: white; padding: 12px 25px; border-radius: 15px; color: #007AFF; font-weight: 700; }

.stem-card {
  height: 100%; min-height: 380px;
  transition: all 0.2s ease;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
}
.stem-card:hover { transform: translateY(-8px); filter: brightness(1.05); }

.patterns { background-color: #FF3B30; } 
.counting { background-color: #007AFF; }

.card-icon-flat { font-size: 6rem; line-height: 1; }

.play-pill-left {
  align-self: flex-start;
  background: #FFD60A; color: #007AFF;
  padding: 12px 30px; border-radius: 20px;
  font-weight: 900; text-transform: uppercase;
  margin-top: auto;
}
.max-width-lg { max-width: 1100px; }
</style>