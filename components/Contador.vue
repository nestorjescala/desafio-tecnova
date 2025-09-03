<template>
  <div class="contador-item">
    <div class="contador-contenido">
      <input 
        type="text" 
        class="contador-input"
        :value="contador.nombre"
        readonly
      />
      
      <div class="contador-controles">
        <button 
          class="btn-control btn-decrementar"
          :disabled="!puedeDecrementar"
          @click="decrementar"
          title="Decrementar"
        >
          −
        </button>
        
        <span class="contador-valor">{{ contador.valor }}</span>
        
        <button 
          class="btn-control btn-incrementar"
          :disabled="!puedeIncrementar"
          @click="incrementar"
          title="Incrementar"
        >
          +
        </button>
        
        <button 
          class="btn-eliminar"
          @click="confirmarEliminacion"
          title="Eliminar contador"
        >
          🗑️
        </button>
      </div>
    </div>
    
    <!-- Modal de confirmación de eliminación -->
    <div v-if="mostrarConfirmacion" class="modal-overlay" @click="cancelarEliminacion">
      <div class="modal-confirmacion" @click.stop>
        <div class="modal-header">
          <h3 class="modal-titulo">Confirmar eliminación</h3>
        </div>
        <div class="modal-body">
          <p class="modal-mensaje">
            ¿Estás seguro de que deseas eliminar el contador 
            <strong>"{{ contador.nombre }}"</strong>?
          </p>
          <p class="modal-advertencia">
            Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="modal-footer">
          <button 
            class="btn-modal btn-cancelar"
            @click="cancelarEliminacion"
          >
            Cancelar
          </button>
          <button 
            class="btn-modal btn-confirmar"
            @click="eliminarContador"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contador',
  
  props: {
    contador: {
      type: Object,
      required: true,
      validator(value) {
        return value && 
               typeof value.id === 'string' && 
               typeof value.nombre === 'string' && 
               typeof value.valor === 'number'
      }
    }
  },
  
  data() {
    return {
      mostrarConfirmacion: false
    }
  },
  
  computed: {
    puedeIncrementar() {
      return this.contador.valor < 20
    },
    
    puedeDecrementar() {
      return this.contador.valor > 0
    }
  },
  
  methods: {
    incrementar() {
      if (this.puedeIncrementar) {
        this.$emit('incrementar', this.contador.id)
      }
    },
    
    decrementar() {
      if (this.puedeDecrementar) {
        this.$emit('decrementar', this.contador.id)
      }
    },
    
    confirmarEliminacion() {
      this.mostrarConfirmacion = true
    },
    
    cancelarEliminacion() {
      this.mostrarConfirmacion = false
    },
    
    eliminarContador() {
      this.$emit('eliminar', this.contador.id)
      this.mostrarConfirmacion = false
    }
  }
}
</script>

<style scoped>
.contador-item {
  background-color: #007bff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 4px;
  position: relative;
}

.contador-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.contador-input {
  flex: 1;
  background-color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  outline: none;
  min-width: 0;
}

.contador-controles {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.btn-control {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-control:hover:not(:disabled) {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.btn-control:disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
}

.contador-valor {
  background-color: white;
  color: #333;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
  font-size: 14px;
}

.btn-eliminar {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-eliminar:hover {
  background-color: #dc3545;
  color: white;
  transform: scale(1.05);
}

/* Modal de confirmación */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-confirmacion {
  background-color: white;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.modal-header {
  padding: 20px 20px 0 20px;
}

.modal-titulo {
  font-size: 18px;
  font-weight: 600;
  color: #343a40;
  margin: 0;
}

.modal-body {
  padding: 16px 20px;
}

.modal-mensaje {
  font-size: 14px;
  color: #495057;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.modal-advertencia {
  font-size: 12px;
  color: #dc3545;
  margin: 0;
  font-style: italic;
}

.modal-footer {
  padding: 0 20px 20px 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-modal {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancelar {
  background-color: #6c757d;
  color: white;
}

.btn-cancelar:hover {
  background-color: #5a6268;
}

.btn-confirmar {
  background-color: #dc3545;
  color: white;
}

.btn-confirmar:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .contador-contenido {
    gap: 8px;
  }
  
  .contador-controles {
    gap: 4px;
  }
  
  .btn-control,
  .btn-eliminar {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
  
  .contador-valor {
    padding: 4px 8px;
    min-width: 32px;
    font-size: 12px;
  }
}
</style>
