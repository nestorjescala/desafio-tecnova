<template>
  <div class="listador-contadores">
    <!-- Lista vacía - estado inicial -->
    <div v-if="contadores.length === 0 && contadoresFiltrados.length === 0" class="estado-vacio">
      <div class="icono-vacio">📊</div>
      <h3 class="titulo-vacio">¡Comienza creando tu primer contador!</h3>
      <p class="descripcion-vacio">
        No tienes contadores aún. Haz clic en "Agregar Contador" para crear uno.
      </p>
      <button 
        class="btn-crear-primero"
        :disabled="!puedeAgregar"
        @click="$emit('agregar-contador')"
      >
        Agregar contador
      </button>
      <!-- <button 
        class="btn-crear-primero"
        :disabled="!puedeAgregar"
        @click="$emit('crear-contador')"
      >
        Crear mi primer contador
      </button> -->
    </div>
    
    <!-- Sin resultados por filtros -->
    <div v-else-if="contadores.length > 0 && contadoresFiltrados.length === 0" class="sin-resultados">
      <div class="icono-filtro">🔍</div>
      <h3 class="titulo-sin-resultados">No se encontraron contadores</h3>
      <p class="descripcion-sin-resultados">
        Los filtros aplicados no coinciden con ningún contador.
        Intenta ajustar los criterios de búsqueda.
      </p>
    </div>
    
    <!-- Lista de contadores -->
    <div v-else class="grid-contadores">
      <Contador 
        v-for="contador in contadoresFiltrados"
        :key="contador.id"
        :contador="contador"
        @incrementar="incrementarContador"
        @decrementar="decrementarContador"
        @eliminar="eliminarContador"
      />
    </div>
    
    <!-- Información de resultados -->
    <div v-if="contadores.length > 0" class="info-resultados">
      <span class="contador-resultados">
        Mostrando {{ contadoresFiltrados.length }} de {{ contadores.length }} contadores
      </span>
      <span v-if="hayFiltrosActivos" class="filtros-aplicados">
        (filtros aplicados)
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListadorDeContadores',
  
  computed: {
    contadores() {
      return this.$store.state.contadores
    },
    
    contadoresFiltrados() {
      return this.$store.getters.contadoresFiltrados
    },
    
    puedeAgregar() {
      return this.$store.getters.puedeAgregarContador
    },
    
    hayFiltrosActivos() {
      const filtros = this.$store.state.filtros
      return filtros.mayorQue !== null || filtros.menorQue !== null
    }
  },
  
  methods: {
    incrementarContador(id) {
      this.$store.dispatch('modificarContador', { id, accion: 'incrementar' })
    },
    
    decrementarContador(id) {
      this.$store.dispatch('modificarContador', { id, accion: 'decrementar' })
    },
    
    eliminarContador(id) {
      this.$store.dispatch('eliminarContador', id)
    }
  }
}
</script>

<style scoped>
.listador-contadores {
  min-height: 300px;
}

/* Estados vacíos */
.estado-vacio,
.sin-resultados {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: white;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
}

.icono-vacio,
.icono-filtro {
  font-size: 48px;
  margin-bottom: 16px;
}

.titulo-vacio,
.titulo-sin-resultados {
  font-size: 20px;
  font-weight: 600;
  color: #343a40;
  margin: 0 0 8px 0;
}

.descripcion-vacio,
.descripcion-sin-resultados {
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 20px 0;
  max-width: 400px;
  line-height: 1.5;
}

.btn-crear-primero {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-crear-primero:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.btn-crear-primero:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

/* Grid de contadores */
.grid-contadores {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* Información de resultados */
.info-resultados {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 12px;
  color: #6c757d;
}

.contador-resultados {
  font-weight: 500;
}

.filtros-aplicados {
  color: #007bff;
  font-style: italic;
}

@media (max-width: 768px) {
  .grid-contadores {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .estado-vacio,
  .sin-resultados {
    padding: 40px 20px;
  }
  
  .icono-vacio,
  .icono-filtro {
    font-size: 36px;
  }
  
  .titulo-vacio,
  .titulo-sin-resultados {
    font-size: 18px;
  }
}
</style>