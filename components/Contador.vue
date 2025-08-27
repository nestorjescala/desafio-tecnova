<template>
  <div class="contador-card">
    <div class="contador-header">
      <h4 class="contador-nombre">{{ contador.nombre }}</h4>
      <button 
        class="btn-eliminar"
        @click="confirmarEliminacion"
        title="Eliminar contador"
      >
        ✕
      </button>
    </div>
    
    <div class="contador-body">
      <div class="valor-container">
        <span class="valor-numero">{{ contador.valor }}</span>
        <div class="valor-barra">
          <div 
            class="valor-progreso"
            :style="{ width: porcentajeProgreso + '%' }"
          ></div>
        </div>
      </div>
      
      <div class="controles">
        <button 
          class="btn-control btn-decrementar"
          :disabled="!puedeDecrementar"
          @click="decrementar"
          title="Decrementar"
        >
          −
        </button>
        
        <button 
          class="btn-control btn-incrementar"
          :disabled="!puedeIncrementar"
          @click="incrementar"
          title="Incrementar"
        >
          +
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
    },
    
    porcentajeProgreso() {
      return (this.contador.valor / 20) * 100
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
.contador-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  position: relative;
}

.contador-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.contador-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.contador-nombre {
  font-size: 16px;
  font-weight: 600;
  color: #343a40;
  margin: 0;
  word-break: break-word;
  flex: 1;
  margin-right: 8px;
}

.btn-eliminar {
  background-color: transparent;
  border: none;
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-eliminar:hover {
  background-color: #dc3545;
  color: white;
}

.contador-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.valor-container {
  text-align: center;
}

.valor-numero {
  font-size: 32px;
  font-weight: 700;
  color: #007bff;
  display: block;
  margin-bottom: 8px;
}

.valor-barra {
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.valor-progreso {
  height: 100%;
  background: linear-gradient(90deg, #28a745 0%, #ffc107 50%, #dc3545 100%);
  transition: width 0.3s ease;
  border-radius: 3px;
}

.controles {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-control {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-decrementar {
  background-color: #dc3545;
  color: white;
}

.btn-decrementar:hover:not(:disabled) {
  background-color: #c82333;
  transform: scale(1.1);
}

.btn-incrementar {
  background-color: #28a745;
  color: white;
}

.btn-incrementar:hover:not(:disabled) {
  background-color: #218838;
  transform: scale(1.1);
}

.btn-control:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  transform: none;
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
  .contador-card {
    padding: 16px;
  }
  
  .valor-numero {
    font-size: 28px;
  }
  
  .btn-control {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
}
</style>