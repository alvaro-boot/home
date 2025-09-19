import { ref, computed } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('microfrontend-favorites') || '[]'))

export function useFavorites() {
  const addToFavorites = (microfrontend) => {
    if (!favorites.value.find(fav => fav.id === microfrontend.id)) {
      favorites.value.push({
        ...microfrontend,
        addedAt: new Date().toISOString()
      })
      saveFavorites()
    }
  }

  const removeFromFavorites = (id) => {
    const index = favorites.value.findIndex(fav => fav.id === id)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
    }
  }

  const toggleFavorite = (microfrontend) => {
    const isFavorite = favorites.value.find(fav => fav.id === microfrontend.id)
    if (isFavorite) {
      removeFromFavorites(microfrontend.id)
    } else {
      addToFavorites(microfrontend)
    }
  }

  const isFavorite = (id) => {
    return favorites.value.some(fav => fav.id === id)
  }

  const saveFavorites = () => {
    localStorage.setItem('microfrontend-favorites', JSON.stringify(favorites.value))
  }

  const clearFavorites = () => {
    favorites.value = []
    saveFavorites()
  }

  const favoritesCount = computed(() => favorites.value.length)

  return {
    favorites: computed(() => favorites.value),
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  }
}
