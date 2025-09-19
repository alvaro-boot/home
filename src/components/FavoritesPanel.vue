<template>
  <div class="favorites-panel">
    <div class="panel-header">
      <h3>
        <i class="fas fa-star"></i>
        Favoritos
        <span class="count" v-if="favoritesCount > 0">({{ favoritesCount }})</span>
      </h3>
      <button 
        v-if="favoritesCount > 0" 
        @click="clearAllFavorites" 
        class="clear-btn"
        title="Limpiar todos los favoritos"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
    
    <div v-if="favoritesCount === 0" class="empty-state">
      <i class="fas fa-star"></i>
      <p>No tienes favoritos aún</p>
      <small>Agrega micro frontends a tus favoritos para acceso rápido</small>
    </div>
    
    <div v-else class="favorites-list">
      <div 
        v-for="favorite in favorites" 
        :key="favorite.id"
        class="favorite-item"
        @click="navigateToFavorite(favorite)"
      >
        <div class="favorite-icon" :style="{ background: favorite.color }">
          <i :class="favorite.icon"></i>
        </div>
        <div class="favorite-content">
          <span class="favorite-title">{{ favorite.name }}</span>
          <span class="favorite-description">{{ favorite.description }}</span>
          <span class="favorite-date">Agregado {{ formatDate(favorite.addedAt) }}</span>
        </div>
        <div class="favorite-actions">
          <button 
            @click.stop="removeFromFavorites(favorite.id)"
            class="remove-btn"
            title="Quitar de favoritos"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesPanel',
  data() {
    return {
      favorites: [],
      favoritesCount: 0
    }
  },
  mounted() {
    this.loadFavorites()
  },
  methods: {
    loadFavorites() {
      // Cargar favoritos desde localStorage
      const stored = localStorage.getItem('favorites')
      if (stored) {
        this.favorites = JSON.parse(stored)
        this.favoritesCount = this.favorites.length
      }
    },
    
    removeFromFavorites(id) {
      this.favorites = this.favorites.filter(fav => fav.id !== id)
      this.favoritesCount = this.favorites.length
      this.saveFavorites()
    },
    
    clearAllFavorites() {
      this.favorites = []
      this.favoritesCount = 0
      this.saveFavorites()
    },
    
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    
    navigateToFavorite(favorite) {
      console.log('Navegando a favorito:', favorite)
      // Aquí implementarías la navegación real
      // Por ahora solo mostramos un mensaje
      alert(`Navegando a ${favorite.name} - En desarrollo`)
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'hoy'
      if (diffDays === 2) return 'ayer'
      if (diffDays <= 7) return `hace ${diffDays} días`
      if (diffDays <= 30) return `hace ${Math.ceil(diffDays / 7)} semanas`
      return `hace ${Math.ceil(diffDays / 30)} meses`
    }
  }
}
</script>

<style scoped>
.favorites-panel {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.favorites-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px var(--shadow-color);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-header h3 i {
  color: var(--warning-color);
}

.count {
  background: var(--warning-color);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
}

.clear-btn {
  background: var(--error-color);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.clear-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 48px;
  color: var(--warning-color);
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-state small {
  font-size: 14px;
  color: var(--text-secondary);
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.favorite-item:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.favorite-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.favorite-content {
  flex: 1;
  min-width: 0;
}

.favorite-title {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.favorite-description {
  display: block;
  color: var(--text-secondary);
  font-size: 13px;
  margin-bottom: 4px;
  line-height: 1.4;
}

.favorite-date {
  display: block;
  color: var(--text-tertiary);
  font-size: 12px;
  font-weight: 500;
}

.favorite-actions {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.favorite-item:hover .favorite-actions {
  opacity: 1;
}

.remove-btn {
  background: var(--error-color);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .favorites-panel {
    padding: 20px;
  }
  
  .favorite-item {
    padding: 12px;
  }
  
  .favorite-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .favorite-title {
    font-size: 14px;
  }
  
  .favorite-description {
    font-size: 12px;
  }
}
</style>
