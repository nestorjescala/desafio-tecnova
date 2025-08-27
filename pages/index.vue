<template>
  <div class="app-container">
    <Header @agregar-contador="mostrarModal" />
    
    <main class="main-content">
      <div class="controls-section">
        <OrdenarContadores 
          @ordenar-por-nombre="cambiarOrdenamiento"
          @ordenar-por-valor="cambiarOrdenamiento"
        />
        <FiltrarContadores 
          @filtrar-mayor="aplicarFiltroMayor"
          @filtrar-menor="aplicarFiltroMenor"
          @limpiar-filtros="limpiarFiltros"
        />
      </div>
      
      <ListadorDeContadores @agregar-contador="mostrarModal" />
    </main>
    
    <Footer>
      <SumaDeContadores />
    </Footer>
    
    <ModalAgregarContador 
      :visible="$store.state.modalVisible"
      @agregar="agregarContador"
      @cerrar="ocultarModal"
    />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  
  mounted() {
    // Inicializar la aplicación cargando datos del storage
    this.$store.dispatch('inicializarApp')
  },
  
  methods: {
    mostrarModal() {
      this.$store.commit('TOGGLE_MODAL', true)
    },
    
    ocultarModal() {
      this.$store.commit('TOGGLE_MODAL', false)
    },
    
    async agregarContador(contadorData) {
      try {
        await this.$store.dispatch('agregarContador', contadorData)
        this.ocultarModal()
      } catch (error) {
        // El error será manejado por el componente modal
        console.error('Error al agregar contador:', error.message)
      }
    },
    
    cambiarOrdenamiento(criterio, direccion) {
      this.$store.dispatch('cambiarOrdenamiento', { criterio, direccion })
    },
    
    aplicarFiltroMayor(valor) {
      this.$store.commit('SET_FILTRO_MAYOR', valor)
      this.$store.dispatch('aplicarFiltros')
    },
    
    aplicarFiltroMenor(valor) {
      this.$store.commit('SET_FILTRO_MENOR', valor)
      this.$store.dispatch('aplicarFiltros')
    },
    
    limpiarFiltros() {
      this.$store.commit('LIMPIAR_FILTROS')
      this.$store.dispatch('aplicarFiltros')
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.controls-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .controls-section {
    flex-direction: column;
    gap: 15px;
  }
  
  .main-content {
    padding: 15px;
  }
}
</style>