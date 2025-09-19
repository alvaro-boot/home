<template>
  <div class="weather-widget">
    <div class="weather-header">
      <div class="location">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ location }}</span>
      </div>
      <button @click="refreshWeather" class="refresh-btn" :disabled="loading">
        <i class="fas fa-sync-alt" :class="{ 'spinning': loading }"></i>
      </button>
    </div>
    
    <div class="weather-main" v-if="!loading && weather">
      <div class="temperature">
        <div class="temp-value">{{ Math.round(weather.temperature) }}°</div>
        <div class="temp-unit">C</div>
      </div>
      <div class="weather-icon">
        <i :class="getWeatherIcon(weather.condition)"></i>
      </div>
    </div>
    
    <div class="weather-details" v-if="!loading && weather">
      <div class="detail-item">
        <i class="fas fa-eye"></i>
        <span>{{ weather.humidity }}%</span>
      </div>
      <div class="detail-item">
        <i class="fas fa-wind"></i>
        <span>{{ weather.windSpeed }} km/h</span>
      </div>
      <div class="detail-item">
        <i class="fas fa-thermometer-half"></i>
        <span>{{ weather.feelsLike }}°</span>
      </div>
    </div>
    
    <div class="loading-state" v-if="loading">
      <div class="spinner"></div>
      <p>Cargando clima...</p>
    </div>
    
    <div class="error-state" v-if="error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ error }}</p>
      <button @click="refreshWeather" class="retry-btn">Reintentar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'WeatherWidget',
  data() {
    return {
      weather: null,
      loading: false,
      error: null,
      location: 'Bogotá, CO',
      updateInterval: null
    }
  },
  methods: {
    async fetchWeather() {
      this.loading = true
      this.error = null
      
      try {
        // Simular datos de clima (en producción usarías una API real)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy']
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
        
        this.weather = {
          temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
          condition: randomCondition,
          humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          feelsLike: Math.floor(Math.random() * 15) + 15
        }
      } catch (err) {
        this.error = 'Error al cargar datos del clima'
        console.error('Error fetching weather:', err)
      } finally {
        this.loading = false
      }
    },
    
    getWeatherIcon(condition) {
      const icons = {
        'sunny': 'fas fa-sun',
        'cloudy': 'fas fa-cloud',
        'rainy': 'fas fa-cloud-rain',
        'partly-cloudy': 'fas fa-cloud-sun'
      }
      return icons[condition] || 'fas fa-cloud'
    },
    
    refreshWeather() {
      this.fetchWeather()
    },
    
    startAutoUpdate() {
      // Actualizar cada 10 minutos
      this.updateInterval = setInterval(() => {
        this.fetchWeather()
      }, 10 * 60 * 1000)
    },
    
    stopAutoUpdate() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
        this.updateInterval = null
      }
    }
  },
  
  mounted() {
    this.fetchWeather()
    this.startAutoUpdate()
  },
  
  onUnmounted() {
    this.stopAutoUpdate()
  }
}
</script>

<style scoped>
.weather-widget {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  min-height: 200px;
}

.weather-widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px var(--shadow-color);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.location i {
  color: var(--accent-primary);
}

.refresh-btn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--bg-tertiary);
  color: var(--accent-primary);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.weather-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.temperature {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.temp-value {
  font-size: 48px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.temp-unit {
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 600;
}

.weather-icon {
  font-size: 48px;
  color: var(--warning-color);
  opacity: 0.8;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.detail-item i {
  color: var(--accent-primary);
  font-size: 16px;
}

.detail-item span {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: var(--text-secondary);
  text-align: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.error-state i {
  font-size: 32px;
  color: var(--error-color);
  margin-bottom: 12px;
}

.retry-btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: var(--accent-secondary);
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
  .weather-widget {
    padding: 16px;
  }
  
  .temp-value {
    font-size: 36px;
  }
  
  .weather-icon {
    font-size: 36px;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .detail-item {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 12px;
  }
}
</style>
