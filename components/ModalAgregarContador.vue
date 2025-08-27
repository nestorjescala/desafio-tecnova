<template>
  <div v-if="visible" class="modal-overlay" @click="cerrarModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-titulo">Agregar nuevo contador</h2>
        <button 
          class="btn-cerrar"
          @click="cerrarModal"
          title="Cerrar modal"
        >
          ✕
        </button>
      </div>
      
      <form @submit.prevent="agregarContador" class="modal-form">
        <div class="campo-grupo">
          <label for="nombre-contador" class="campo-label">
            Nombre del contador:
          </label>
          <input 
            id="nombre-contador"
            ref="inputNombre"
            v-model="nombreContador"
            type="text"
            class="campo-input"
            :class="{ 'input-error': hayError }"
            placeholder="Ej: Tareas completadas"
            maxlength="20"
            @input="limpiarError"
            @keyup.escape="cerrarModal"
          >
          <div class="campo-info">
            <span class="contador-caracteres" :class="{ 'limite-cerca': caracteresRestantes <= 5 }">
              {{ caracteresRestantes }} caracteres restantes
            </span>
          </div>
          
          <div v-if="hayError" class="mensaje-error">
            <span class="icono-error">⚠️</span>
            <span class="texto-error">{{ mensajeError }}</span>
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            type="button"
            class="btn-modal btn-cancelar"
            @click="cerrarModal"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            class="btn-modal btn-agregar"
            :disabled="!puedeAgregar"
          >
            Agregar contador
          </button>
        </div>
      </form>
      
      <div v-if="contadores.length >= 20" class="limite-alcanzado">
        <div class="icono-limite">🚫</div>
        <p class="mensaje-limite">
          Has alcanzado el límite máximo de 20 contadores.
          Elimina algunos contadores para poder agregar nuevos.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalAgregarContador',
  
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      nombreContador: '',
      hayError: false,
      mensajeError: ''
    }
  },
  
  computed: {
    contadores() {
      return this.$store.state.contadores
    },
    
    caracteresRestantes() {
      return 20 - this.nombreContador.length
    },
    
    puedeAgregar() {
      return this.nombreContador.trim().length > 0 && 
             this.nombreContador.length <= 20 && 
             this.contadores.length < 20 &&
             !this.nombreExiste
    },
    
    nombreExiste() {
      return this.contadores.some(contador => 
        contador.nombre.toLowerCase() === this.nombreContador.trim().toLowerCase()
      )
    }
  },
  
  watch: {
    visible(nuevoValor) {
      if (nuevoValor) {
        this.$nextTick(() => {
          if (this.$refs.inputNombre) {
            this.$refs.inputNombre.focus()
          }
        })
      } else {
        this.resetearFormulario()
      }
    }
  },
  
  methods: {
    agregarContador() {
      
      if (!this.validarNombre()) {
        return
      }
      
      // Emitir solo el nombre en lugar del objeto completo
      this.$emit('agregar', this.nombreContador.trim())
      this.cerrarModal()
    },
    
    validarNombre() {
      const nombre = this.nombreContador.trim()
      
      if (nombre.length === 0) {
        this.mostrarError('El nombre del contador no puede estar vacío')
        return false
      }
      
      if (nombre.length > 20) {
        this.mostrarError('El nombre no puede exceder 20 caracteres')
        return false
      }
      
      if (this.nombreExiste) {
        this.mostrarError('Ya existe un contador con este nombre')
        return false
      }
      
      if (this.contadores.length >= 20) {
        this.mostrarError('Has alcanzado el límite máximo de 20 contadores')
        return false
      }
      
      return true
    },
    
    mostrarError(mensaje) {
      this.hayError = true
      this.mensajeError = mensaje
    },
    
    limpiarError() {
      this.hayError = false
      this.mensajeError = ''
    },
    
    cerrarModal() {
      this.$emit('cerrar')
    },
    
    resetearFormulario() {
      this.nombreContador = ''
      this.limpiarError()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: modalEntrada 0.3s ease-out;
}

@keyframes modalEntrada {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 24px;
}

.modal-titulo {
  font-size: 20px;
  font-weight: 600;
  color: #343a40;
  margin: 0;
}

.btn-cerrar {
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-cerrar:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.modal-form {
  padding: 0 24px 24px 24px;
}

.campo-grupo {
  margin-bottom: 24px;
}

.campo-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 8px;
}

.campo-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.campo-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.campo-input.input-error {
  border-color: #dc3545;
}

.campo-input.input-error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.campo-info {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.contador-caracteres {
  font-size: 12px;
  color: #6c757d;
  transition: color 0.2s ease;
}

.contador-caracteres.limite-cerca {
  color: #ffc107;
  font-weight: 500;
}

.mensaje-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
}

.icono-error {
  font-size: 14px;
}

.texto-error {
  font-size: 12px;
  color: #721c24;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-modal {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
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

.btn-agregar {
  background-color: #007bff;
  color: white;
}

.btn-agregar:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-agregar:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.limite-alcanzado {
  padding: 20px 24px;
  text-align: center;
  border-top: 1px solid #e9ecef;
  background-color: #fff3cd;
}

.icono-limite {
  font-size: 32px;
  margin-bottom: 8px;
}

.mensaje-limite {
  font-size: 14px;
  color: #856404;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header {
    padding: 20px 20px 0 20px;
  }
  
  .modal-form {
    padding: 0 20px 20px 20px;
  }
  
  .modal-titulo {
    font-size: 18px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-modal {
    width: 100%;
  }
}
</style>