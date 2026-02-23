<!-- <template>
  <div class="min-vh-100 bg-ios-system d-flex align-items-center py-5">
    <div class="container text-center">
      <header class="mb-5">
        <h1 class="ios-display fw-bold mb-1">Kid Learning Hub</h1>
        <p class="text-secondary fw-medium fs-5">Choose your learning path</p>
      </header>
      
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-5">
          <NuxtLink to="/literacy" class="text-decoration-none">
            <div class="ios-widget bg-white border shadow-sm p-5 transition-hover">
              <div class="ios-glyph bg-primary-soft text-primary mb-4">📚</div>
              <h2 class="h3 fw-bold text-dark mb-2">Literacy</h2>
              <p class="text-secondary mb-4">Reading & Phonics</p>
              <div class="btn btn-primary rounded-pill px-5 fw-bold">Open</div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-12 col-md-5">
          <NuxtLink to="/stem" class="text-decoration-none">
            <div class="ios-widget bg-white border shadow-sm p-5 transition-hover">
              <div class="ios-glyph bg-success-soft text-success mb-4">🧩</div>
              <h2 class="h3 fw-bold text-dark mb-2">STEM</h2>
              <p class="text-secondary mb-4">Patterns & Logic</p>
              <div class="btn btn-success rounded-pill px-5 fw-bold">Open</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-ios-system { background-color: #F2F2F7; }
.ios-display { font-size: 40px; letter-spacing: -0.02em; }
.ios-widget { border-radius: 28px; transition: all 0.2s ease; border: 1px solid #E5E5EA !important; }
.ios-widget:hover { transform: scale(1.02); background-color: #FAFAFA; }
.ios-glyph { width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 20px; font-size: 2.5rem; }
.bg-primary-soft { background-color: #E5F1FF; }
.bg-success-soft { background-color: #EAF9EE; }
</style> -->


<template>
  <div class="min-vh-100 bg-ios-system d-flex align-items-center py-5">
    <div class="container px-4">
      <header class="text-center mb-5 animate-slide-up">
        <h1 class="ios-display fw-bold mb-1">Learning Hub</h1>
        <p class="text-secondary fw-medium fs-5">Choose your adventure</p>
      </header>
      
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-5">
          <NuxtLink to="/literacy" class="text-decoration-none h-100 d-block">
            <div class="ios-widget bg-white border-0 shadow-sm p-5 text-center h-100 transition-active">
              <div class="ios-glyph-box bg-blue-soft mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
              </div>
              <h2 class="h3 fw-bold text-dark mb-2">LITERACY</h2>
              <p class="text-secondary mb-4 small">Reading & Phonics</p>
              <div class="btn btn-ios-blue rounded-pill px-5 py-2 fw-bold py-2">Open</div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-12 col-md-5">
          <NuxtLink to="/stem" class="text-decoration-none h-100 d-block">
            <div class="ios-widget bg-white border-0 shadow-sm p-5 text-center h-100 transition-active">
              <div class="ios-glyph-box bg-green-soft mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#34C759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              </div>
              <h2 class="h3 fw-bold text-dark mb-2">STEM</h2>
              <p class="text-secondary mb-4 small">Patterns, Coding, and Math</p>
              <div class="btn btn-ios-green rounded-pill px-5 py-2 fw-bold py-2">Open</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-ios-system { background-color: #F2F2F7; }
.ios-display { font-size: 34px; letter-spacing: -0.02em; color: #000; }
.ios-widget { border-radius: 28px; transition: all 0.2s ease; }
.transition-active:active { transform: scale(0.97); }

.ios-glyph-box {
  width: 72px; height: 72px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  border-radius: 18px;
}

.bg-blue-soft { background-color: #E5F1FF; }
.btn-ios-blue { background-color: #007AFF; color: white; }
.bg-green-soft { background-color: #EAF9EE; }
.btn-ios-green { background-color: #34C759; color: white; }

.animate-slide-up { animation: slideUp 0.6s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>