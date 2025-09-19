<template>
  <div class="datetime-widget">
    <div class="date-section">
      <div class="day-name">{{ currentDate.dayName }}</div>
      <div class="date-number">{{ currentDate.day }}</div>
      <div class="month-year">
        <div class="month">{{ currentDate.month }}</div>
        <div class="year">{{ currentDate.year }}</div>
      </div>
    </div>
    
    <div class="time-section">
      <div class="time">{{ currentTime }}</div>
      <div class="timezone">{{ timezone }}</div>
    </div>
    
    <div class="additional-info">
      <div class="info-item">
        <i class="fas fa-calendar-week"></i>
        <span>Semana {{ weekNumber }}</span>
      </div>
      <div class="info-item">
        <i class="fas fa-clock"></i>
        <span>{{ timeOfDay }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DateTimeWidget',
  data() {
    return {
      currentTime: '',
      currentDate: {
        dayName: '',
        day: '',
        month: '',
        year: ''
      },
      timezone: 'GMT-5',
      weekNumber: 0,
      timeOfDay: '',
      updateInterval: null
    }
  },
  methods: {
    updateDateTime() {
      const now = new Date()
      
      // Actualizar hora
      this.currentTime = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      
      // Actualizar fecha
      this.currentDate = {
        dayName: now.toLocaleDateString('es-CO', { weekday: 'long' }),
        day: now.getDate().toString().padStart(2, '0'),
        month: now.toLocaleDateString('es-CO', { month: 'short' }),
        year: now.getFullYear()
      }
      
      // Calcular número de semana
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000))
      this.weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7)
      
      // Determinar momento del día
      const hour = now.getHours()
      if (hour >= 5 && hour < 12) {
        this.timeOfDay = 'Mañana'
      } else if (hour >= 12 && hour < 18) {
        this.timeOfDay = 'Tarde'
      } else if (hour >= 18 && hour < 22) {
        this.timeOfDay = 'Noche'
      } else {
        this.timeOfDay = 'Madrugada'
      }
    },
    
    startClock() {
      this.updateDateTime()
      // Actualizar cada segundo
      this.updateInterval = setInterval(this.updateDateTime, 1000)
    },
    
    stopClock() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
        this.updateInterval = null
      }
    }
  },
  
  mounted() {
    this.startClock()
  },
  
  onUnmounted() {
    this.stopClock()
  }
}
</script>

<style scoped>
.datetime-widget {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  min-height: 200px;
}

.datetime-widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px var(--shadow-color);
}

.date-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.day-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: capitalize;
  min-width: 120px;
}

.date-number {
  font-size: 48px;
  font-weight: 800;
  color: var(--accent-primary);
  line-height: 1;
  min-width: 60px;
  text-align: center;
}

.month-year {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.month {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: capitalize;
}

.year {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.time-section {
  text-align: center;
  margin-bottom: 24px;
}

.time {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.timezone {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  background: var(--bg-secondary);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid var(--border-color);
}

.additional-info {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex: 1;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: var(--bg-tertiary);
  transform: translateY(-1px);
}

.info-item i {
  color: var(--accent-primary);
  font-size: 16px;
  width: 16px;
  text-align: center;
}

.info-item span {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
}

/* Animación para el tiempo */
.time {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .datetime-widget {
    padding: 20px;
  }
  
  .date-section {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .day-name {
    min-width: auto;
  }
  
  .date-number {
    font-size: 40px;
  }
  
  .time {
    font-size: 28px;
  }
  
  .additional-info {
    flex-direction: column;
    gap: 12px;
  }
  
  .info-item {
    justify-content: center;
  }
}
</style>
