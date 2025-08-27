<template>
  <footer class="app-footer">
    <div class="footer-content">
      <SumaDeContadores />
      
      <div class="footer-info">
        <span class="app-version">Gestión de Contadores v1.0</span>
        <span class="separator">•</span>
        <span class="contador-limite">
          {{ contadores.length }}/20 contadores
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  
  computed: {
    contadores() {
      return this.$store.state.contadores
    }
  }
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
}

.app-version {
  font-weight: 500;
}

.separator {
  color: #dee2e6;
}

.contador-limite {
  font-weight: 500;
  color: #495057;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 16px 0;
    margin-top: 30px;
  }
  
  .footer-content {
    padding: 0 16px;
    gap: 12px;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
  
  .separator {
    display: none;
  }
}
</style>