<template>
  <div class="microfrontend-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando {{ microfrontend }}...</p>
    </div>
    <div v-else-if="error" class="error">
      <h3>Error al cargar {{ microfrontend }}</h3>
      <p>{{ error }}</p>
      <button @click="retryLoad" class="retry-btn">Reintentar</button>
    </div>
    <iframe 
      v-else
      ref="microfrontendFrame"
      :src="frameUrl"
      class="microfrontend-frame"
      @load="onFrameLoad"
      @error="onFrameError"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  microfrontend: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const error = ref(null)
const microfrontendFrame = ref(null)

// Configuración de los micro frontends
const microfrontendConfig = {
  'it': {
    url: 'http://localhost:3001'
  },
  'gestion-humana': {
    url: 'http://localhost:3002'
  }
}

const frameUrl = computed(() => {
  const config = microfrontendConfig[props.microfrontend]
  return config ? config.url : ''
})

const onFrameLoad = () => {
  loading.value = false
  error.value = null
}

const onFrameError = () => {
  loading.value = false
  error.value = `No se pudo cargar ${props.microfrontend}. Asegúrate de que el servidor esté ejecutándose.`
}

const retryLoad = () => {
  loading.value = true
  error.value = null
  if (microfrontendFrame.value) {
    microfrontendFrame.value.src = frameUrl.value
  }
}

onMounted(() => {
  // Simular tiempo de carga
  setTimeout(() => {
    if (loading.value) {
      onFrameError()
    }
  }, 5000)
})

watch(() => props.microfrontend, () => {
  loading.value = true
  error.value = null
})
</script>

<style scoped>
.microfrontend-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
  color: #dc2626;
}

.error h3 {
  margin-bottom: 8px;
  color: #dc2626;
}

.error p {
  margin-bottom: 16px;
  color: #64748b;
}

.retry-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #2563eb;
}

.microfrontend-frame {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
