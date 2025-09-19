import { ref, computed, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme) => {
    if (['light', 'dark'].includes(newTheme)) {
      theme.value = newTheme
    }
  }

  // Aplicar tema al documento
  const applyTheme = () => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme.value)
    
    // Actualizar meta theme-color para móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.content = theme.value === 'dark' ? '#1e293b' : '#667eea'
    }
  }

  // Guardar tema en localStorage
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }, { immediate: true })

  return {
    theme: computed(() => theme.value),
    isDark,
    isLight,
    toggleTheme,
    setTheme,
    applyTheme
  }
}
