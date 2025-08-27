<template>
  <header class="header">
    <div class="header-content">
      <h1 class="title">Gestión de Contadores</h1>
      <button 
        class="btn-agregar"
        :disabled="!puedeAgregar"
        @click="$emit('agregar-contador')"
      >
        Agregar Contador
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  
  computed: {
    puedeAgregar() {
      return this.$store.getters.puedeAgregarContador
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #007bff;
  color: white;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.btn-agregar {
  background-color: white;
  color: #007bff;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-agregar:hover:not(:disabled) {
  background-color: #f8f9fa;
  transform: translateY(-1px);
}

.btn-agregar:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .header-content {
    padding: 12px 15px;
    flex-direction: column;
    gap: 12px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .btn-agregar {
    width: 100%;
    padding: 12px;
  }
}
</style>