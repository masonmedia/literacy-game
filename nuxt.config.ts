// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap' }
      ]
    }
  },
  // TMDB Key should be in .env
  runtimeConfig: {
    public: {
      // Ensure this matches your .env key exactly
      tmdbApiKey: process.env.NUXT_PUBLIC_TMDB_API_KEY 
    }
  }
})
