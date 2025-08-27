<template>
  <div class="ordenar-contadores">
    <h3 class="section-title">Ordenar por:</h3>
    
    <div class="ordenar-options">
      <div class="criterio-group">
        <label class="radio-label">
          <input 
            type="radio" 
            name="criterio" 
            value="nombre"
            :checked="criterioActual === 'nombre'"
            @change="cambiarCriterio('nombre')"
          >
          <span class="radio-text">Nombre</span>
        </label>
        
        <label class="radio-label">
          <input 
            type="radio" 
            name="criterio" 
            value="valor"
            :checked="criterioActual === 'valor'"
            @change="cambiarCriterio('valor')"
          >
          <span class="radio-text">Valor</span>
        </label>
      </div>
      
      <div class="direccion-group">
        <button 
          class="btn-direccion"
          :class="{ active: direccionActual === 'asc' }"
          @click="cambiarDireccion('asc')"
        >
          ↑ Ascendente
        </button>
        
        <button 
          class="btn-direccion"
          :class="{ active: direccionActual === 'desc' }"
          @click="cambiarDireccion('desc')"
        >
          ↓ Descendente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdenarContadores',
  
  computed: {
    criterioActual() {
      return this.$store.state.ordenamiento.criterio
    },
    
    direccionActual() {
      return this.$store.state.ordenamiento.direccion
    }
  },
  
  methods: {
    cambiarCriterio(criterio) {
      this.$emit('ordenar-por-' + criterio, criterio, this.direccionActual)
    },
    
    cambiarDireccion(direccion) {
      this.$emit('ordenar-por-' + this.criterioActual, this.criterioActual, direccion)
    }
  }
}
</script>

<style scoped>
.ordenar-contadores {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #343a40;
}

.ordenar-options {
  display: flex;
  gap: 20px;
  align-items: center;
}

.criterio-group {
  display: flex;
  gap: 12px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.radio-label input[type="radio"] {
  margin: 0;
}

.radio-text {
  color: #495057;
}

.direccion-group {
  display: flex;
  gap: 8px;
}

.btn-direccion {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #495057;
}

.btn-direccion:hover {
  background-color: #e9ecef;
}

.btn-direccion.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

@media (max-width: 768px) {
  .ordenar-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .criterio-group {
    width: 100%;
  }
  
  .direccion-group {
    width: 100%;
  }
  
  .btn-direccion {
    flex: 1;
    text-align: center;
  }
}
</style>