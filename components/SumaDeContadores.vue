<template>
  <div class="suma-contadores">
    <div class="suma-container">
      <div class="suma-label">
        <span class="icono-suma">∑</span>
        <span class="texto-suma">Suma total:</span>
      </div>
      
      <div class="suma-valor">
        <span class="numero-total">{{ sumaTotal }}</span>
        <span class="unidad">puntos</span>
      </div>
    </div>
    
    <div v-if="hayFiltrosActivos" class="suma-detalle">
      <span class="detalle-texto">
        Suma de {{ contadoresFiltrados.length }} contadores mostrados: 
        <strong>{{ sumaFiltrada }}</strong>
      </span>
    </div>
    
    <div v-if="contadores.length > 0" class="suma-estadisticas">
      <div class="estadistica">
        <span class="stat-label">Promedio:</span>
        <span class="stat-valor">{{ promedioContadores }}</span>
      </div>
      <div class="estadistica">
        <span class="stat-label">Máximo:</span>
        <span class="stat-valor">{{ valorMaximo }}</span>
      </div>
      <div class="estadistica">
        <span class="stat-label">Mínimo:</span>
        <span class="stat-valor">{{ valorMinimo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SumaDeContadores',
  
  computed: {
    contadores() {
      return this.$store.state.contadores
    },
    
    contadoresFiltrados() {
      return this.$store.getters.contadoresFiltrados
    },
    
    sumaTotal() {
      return this.$store.getters.sumaTotal
    },
    
    sumaFiltrada() {
      return this.contadoresFiltrados.reduce((suma, contador) => suma + contador.valor, 0)
    },
    
    hayFiltrosActivos() {
      const filtros = this.$store.state.filtros
      return filtros.mayorQue !== null || filtros.menorQue !== null
    },
    
    promedioContadores() {
      if (this.contadores.length === 0) return '0.0'
      const promedio = this.sumaTotal / this.contadores.length
      return promedio.toFixed(1)
    },
    
    valorMaximo() {
      if (this.contadores.length === 0) return 0
      return Math.max(...this.contadores.map(c => c.valor))
    },
    
    valorMinimo() {
      if (this.contadores.length === 0) return 0
      return Math.min(...this.contadores.map(c => c.valor))
    }
  }
}
</script>

<style scoped>
.suma-contadores {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  text-align: center;
}

.suma-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.suma-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icono-suma {
  font-size: 24px;
  font-weight: bold;
  opacity: 0.9;
}

.texto-suma {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
}

.suma-valor {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.numero-total {
  font-size: 32px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.unidad {
  font-size: 14px;
  opacity: 0.8;
  font-weight: 500;
}

.suma-detalle {
  background-color: rgba(255,255,255,0.15);
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  backdrop-filter: blur(10px);
}

.detalle-texto {
  font-size: 12px;
  opacity: 0.95;
}

.suma-estadisticas {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.2);
}

.estadistica {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-label {
  font-size: 10px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-valor {
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .suma-contadores {
    padding: 16px;
  }
  
  .suma-container {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .numero-total {
    font-size: 28px;
  }
  
  .suma-estadisticas {
    gap: 16px;
  }
  
  .stat-valor {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .suma-estadisticas {
    flex-direction: column;
    gap: 8px;
  }
  
  .estadistica {
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 8px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 4px;
  }
}
</style>