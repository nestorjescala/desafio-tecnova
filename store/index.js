import { v4 as uuidv4 } from 'uuid'

// Estado inicial
export const state = () => ({
  contadores: [],
  filtros: {
    mayorQue: null,
    menorQue: null
  },
  ordenamiento: {
    criterio: 'nombre', // 'nombre' | 'valor'
    direccion: 'asc' // 'asc' | 'desc'
  },
  modalVisible: false
})

// Mutaciones
export const mutations = {
  AGREGAR_CONTADOR(state, contador) {
    state.contadores.push(contador)
    // Guardar en localStorage
    if (process.client) {
      localStorage.setItem('contadores-app', JSON.stringify({ contadores: state.contadores }))
    }
  },
  
  INCREMENTAR_CONTADOR(state, id) {
    const contador = state.contadores.find(c => c.id === id)
    if (contador && contador.valor < 20) {
      contador.valor++
      // Guardar en localStorage
      if (process.client) {
        localStorage.setItem('contadores-app', JSON.stringify({ contadores: state.contadores }))
      }
    }
  },
  
  DECREMENTAR_CONTADOR(state, id) {
    const contador = state.contadores.find(c => c.id === id)
    if (contador && contador.valor > 0) {
      contador.valor--
      // Guardar en localStorage
      if (process.client) {
        localStorage.setItem('contadores-app', JSON.stringify({ contadores: state.contadores }))
      }
    }
  },
  
  ELIMINAR_CONTADOR(state, id) {
    state.contadores = state.contadores.filter(c => c.id !== id)
    // Guardar en localStorage
    if (process.client) {
      localStorage.setItem('contadores-app', JSON.stringify({ contadores: state.contadores }))
    }
  },
  
  SET_FILTRO_MAYOR(state, valor) {
    state.filtros.mayorQue = valor
  },
  
  SET_FILTRO_MENOR(state, valor) {
    state.filtros.menorQue = valor
  },
  
  LIMPIAR_FILTROS(state) {
    state.filtros.mayorQue = null
    state.filtros.menorQue = null
  },
  
  SET_ORDENAMIENTO(state, { criterio, direccion }) {
    state.ordenamiento.criterio = criterio
    state.ordenamiento.direccion = direccion
  },
  
  TOGGLE_MODAL(state, visible) {
    state.modalVisible = visible
  },
  
  CARGAR_CONTADORES(state, contadores) {
    state.contadores = contadores
  },
  
  CARGAR_FILTROS(state, { filtros, ordenamiento }) {
    if (filtros) {
      state.filtros = { ...state.filtros, ...filtros }
    }
    if (ordenamiento) {
      state.ordenamiento = { ...state.ordenamiento, ...ordenamiento }
    }
  }
}

// Acciones
export const actions = {
  agregarContador({ commit, state }, nombre) {
    // Validaciones
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre del contador no puede estar vacío')
    }
    
    if (nombre.length > 20) {
      throw new Error('El nombre del contador no puede tener más de 20 caracteres')
    }
    
    if (state.contadores.length >= 20) {
      throw new Error('No se pueden crear más de 20 contadores')
    }
    
    const nuevoContador = {
      id: uuidv4(),
      nombre: nombre.trim(),
      valor: 0,
      fechaCreacion: new Date().toISOString()
    }
    
    commit('AGREGAR_CONTADOR', nuevoContador)
  },
  
  modificarContador({ commit }, { id, accion }) {
    if (accion === 'incrementar') {
      commit('INCREMENTAR_CONTADOR', id)
    } else if (accion === 'decrementar') {
      commit('DECREMENTAR_CONTADOR', id)
    }
  },
  
  eliminarContador({ commit }, id) {
    commit('ELIMINAR_CONTADOR', id)
  },
  
  aplicarFiltros({ commit, state }) {
    // Guardar filtros en sessionStorage
    if (process.client) {
      const filtrosData = {
        filtros: state.filtros,
        ordenamiento: state.ordenamiento
      }
      sessionStorage.setItem('filtros-app', JSON.stringify(filtrosData))
    }
  },
  
  cambiarOrdenamiento({ commit, dispatch }, { criterio, direccion }) {
    commit('SET_ORDENAMIENTO', { criterio, direccion })
    dispatch('aplicarFiltros')
  },
  
  inicializarApp({ commit }) {
    if (process.client) {
      // Cargar contadores desde localStorage
      try {
        const contadoresData = localStorage.getItem('contadores-app')
        if (contadoresData) {
          const { contadores } = JSON.parse(contadoresData)
          if (Array.isArray(contadores)) {
            commit('CARGAR_CONTADORES', contadores)
          }
        }
      } catch (error) {
        console.error('Error cargando contadores:', error)
      }
      
      // Cargar filtros desde sessionStorage
      try {
        const filtrosData = sessionStorage.getItem('filtros-app')
        if (filtrosData) {
          const data = JSON.parse(filtrosData)
          commit('CARGAR_FILTROS', data)
        }
      } catch (error) {
        console.error('Error cargando filtros:', error)
      }
    }
  }
}

// Getters
export const getters = {
  contadoresFiltrados(state) {
    let contadores = [...state.contadores]
    
    // Aplicar filtros
    if (state.filtros.mayorQue !== null) {
      contadores = contadores.filter(c => c.valor > state.filtros.mayorQue)
    }
    
    if (state.filtros.menorQue !== null) {
      contadores = contadores.filter(c => c.valor < state.filtros.menorQue)
    }
    
    // Aplicar ordenamiento
    contadores.sort((a, b) => {
      let valorA, valorB
      
      if (state.ordenamiento.criterio === 'nombre') {
        valorA = a.nombre.toLowerCase()
        valorB = b.nombre.toLowerCase()
      } else {
        valorA = a.valor
        valorB = b.valor
      }
      
      if (state.ordenamiento.direccion === 'asc') {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
      }
    })
    
    return contadores
  },
  
  sumaTotal(state) {
    return state.contadores.reduce((suma, contador) => suma + contador.valor, 0)
  },
  
  puedeAgregarContador(state) {
    return state.contadores.length < 20
  },
  
  contadorPorId: (state) => (id) => {
    return state.contadores.find(contador => contador.id === id)
  }
}