<template>
  <div class="filtrar-contadores">
    <h3 class="section-title">Filtrar contadores:</h3>
    
    <div class="filtros-container">
      <div class="filtro-group">
        <label class="filtro-label">Mayor que:</label>
        <input 
          type="number" 
          class="filtro-input"
          :value="filtroMayor"
          min="0"
          max="19"
          placeholder="Ej: 5"
          @input="actualizarFiltroMayor($event.target.value)"
        >
      </div>
      
      <div class="filtro-group">
        <label class="filtro-label">Menor que:</label>
        <input 
          type="number" 
          class="filtro-input"
          :value="filtroMenor"
          min="1"
          max="20"
          placeholder="Ej: 15"
          @input="actualizarFiltroMenor($event.target.value)"
        >
      </div>
      
      <button 
        class="btn-limpiar"
        :disabled="!hayFiltrosActivos"
        @click="limpiarTodosFiltros"
      >
        Limpiar Filtros
      </button>
    </div>
    
    <div v-if="hayFiltrosActivos" class="filtros-activos">
      <span class="filtros-texto">Filtros activos:</span>
      <span v-if="filtroMayor !== null" class="filtro-tag">
        > {{ filtroMayor }}
      </span>
      <span v-if="filtroMenor !== null" class="filtro-tag">
         {{ filtroMenor }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltrarContadores',
  
  computed: {
    filtroMayor() {
      return this.$store.state.filtros.mayorQue
    },
    
    filtroMenor() {
      return this.$store.state.filtros.menorQue
    },
    
    hayFiltrosActivos() {
      return this.filtroMayor !== null || this.filtroMenor !== null
    }
  },
  
  methods: {
    actualizarFiltroMayor(valor) {
      const numero = valor === '' ? null : parseInt(valor)
      if (numero === null || (numero >= 0 && numero <= 19)) {
        this.$emit('filtrar-mayor', numero)
      }
    },
    
    actualizarFiltroMenor(valor) {
      const numero = valor === '' ? null : parseInt(valor)
      if (numero === null || (numero >= 1 && numero <= 20)) {
        this.$emit('filtrar-menor', numero)
      }
    },
    
    limpiarTodosFiltros() {
      this.$emit('limpiar-filtros')
    }
  }
}
</script>

<style scoped>
.filtrar-contadores {
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

.filtros-container {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.filtro-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filtro-label {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.filtro-input {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.filtro-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.btn-limpiar {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: fit-content;
}

.btn-limpiar:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-limpiar:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.filtros-activos {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filtros-texto {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.filtro-tag {
  background-color: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .filtros-container {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .filtro-group {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  .filtro-input {
    width: 100px;
  }
  
  .btn-limpiar {
    padding: 10px;
  }
}
</style>