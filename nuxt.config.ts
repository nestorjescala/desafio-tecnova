export default {
  // Global page headers
  head: {
    title: 'Gestión de Contadores',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Aplicación para gestionar contadores' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxt/typescript-build'
  ],

  // Modules
  modules: [],

  // Vuex store
  store: true,

  // Build Configuration
  build: {}
}
