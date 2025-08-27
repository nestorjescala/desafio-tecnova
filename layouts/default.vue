<template>
  <div class="app-container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    // Inicializar la aplicación cargando datos desde localStorage y sessionStorage
    this.$store.dispatch('inicializarApp')
  }
}
</script>