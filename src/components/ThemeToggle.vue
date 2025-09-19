<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :class="{ 'dark': isDark }"
    :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
  >
    <div class="toggle-track">
      <div class="toggle-thumb">
        <i :class="isDark ? 'fas fa-moon' : 'fas fa-sun'"></i>
      </div>
    </div>
    <span class="toggle-label" v-if="showLabel">
      {{ isDark ? 'Oscuro' : 'Claro' }}
    </span>
  </button>
</template>

<script>
import { useTheme } from '../composables/useTheme'

export default {
  name: 'ThemeToggle',
  props: {
    showLabel: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isDark, toggleTheme } = useTheme()
    
    return {
      isDark,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: inherit;
}

.theme-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.theme-toggle.dark:hover {
  background: rgba(255, 255, 255, 0.1);
}

.toggle-track {
  position: relative;
  width: 50px;
  height: 26px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 13px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-toggle.dark .toggle-track {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  color: #f59e0b;
  font-size: 10px;
}

.theme-toggle.dark .toggle-thumb {
  transform: translateX(24px);
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #fbbf24;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  transition: color 0.3s ease;
}

/* Animación de rotación para el ícono */
.toggle-thumb i {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle:hover .toggle-thumb i {
  transform: rotate(15deg);
}

.theme-toggle.dark:hover .toggle-thumb i {
  transform: translateX(24px) rotate(-15deg);
}

/* Efecto de pulso al cambiar tema */
.theme-toggle:active .toggle-thumb {
  transform: scale(0.95);
}

.theme-toggle.dark:active .toggle-thumb {
  transform: translateX(24px) scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .toggle-track {
    width: 44px;
    height: 24px;
  }
  
  .toggle-thumb {
    width: 20px;
    height: 20px;
  }
  
  .theme-toggle.dark .toggle-thumb {
    transform: translateX(20px);
  }
}
</style>
