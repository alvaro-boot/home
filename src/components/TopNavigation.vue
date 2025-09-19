<template>
  <nav class="top-navigation">
    <div class="nav-left">
      <button @click="toggleSidebar" class="sidebar-toggle">
        <i class="fas fa-bars"></i>
      </button>
      <h1 class="logo">Portal Home</h1>
    </div>
    
    <div class="nav-center">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Buscar..." 
          v-model="searchQuery"
          @keyup.enter="performSearch"
          @input="onSearchInput"
        >
        <div v-if="showSearchSuggestions && searchQuery" class="search-suggestions">
          <div 
            v-for="suggestion in searchSuggestions" 
            :key="suggestion.id"
            class="suggestion-item"
            @click="selectSuggestion(suggestion)"
          >
            <i :class="suggestion.icon"></i>
            <span>{{ suggestion.title }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="nav-right">
      <ThemeToggle />
      
      <div class="notification-container" @click.stop>
        <button 
          @click="toggleNotifications" 
          class="notification-btn"
          :class="{ 'active': showNotifications }"
        >
          <i class="fas fa-bell"></i>
          <span class="notification-badge" v-if="unreadNotifications > 0">{{ unreadNotifications }}</span>
        </button>
        <NotificationDropdown 
          :is-open="showNotifications"
          @notification-read="onNotificationRead"
          @all-notifications-read="onAllNotificationsRead"
          @notification-deleted="onNotificationDeleted"
          @view-all-notifications="viewAllNotifications"
        />
      </div>
      
      <div class="user-menu" @click="toggleUserMenu">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-info">
          <span class="user-name">Usuario</span>
          <span class="user-role">Administrador</span>
        </div>
        <button class="dropdown-toggle">
          <i class="fas fa-chevron-down" :class="{ 'rotated': showUserMenu }"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import NotificationDropdown from './NotificationDropdown.vue'
import ThemeToggle from './ThemeToggle.vue'

export default {
  name: 'TopNavigation',
  components: {
    NotificationDropdown,
    ThemeToggle
  },
  data() {
    return {
      searchQuery: '',
      showNotifications: false,
      showUserMenu: false,
      showSearchSuggestions: false,
      unreadNotifications: 2,
      searchSuggestions: [
        { id: 1, title: 'Dashboard', icon: 'fas fa-tachometer-alt', type: 'page' },
        { id: 2, title: 'IT Management', icon: 'fas fa-laptop-code', type: 'page' },
        { id: 3, title: 'Gestión Humana', icon: 'fas fa-users', type: 'page' },
        { id: 4, title: 'Configuración', icon: 'fas fa-cog', type: 'page' },
        { id: 5, title: 'Usuarios', icon: 'fas fa-user', type: 'feature' },
        { id: 6, title: 'Reportes', icon: 'fas fa-chart-bar', type: 'feature' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar')
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
      this.showUserMenu = false
      this.showSearchSuggestions = false
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
      this.showNotifications = false
      this.showSearchSuggestions = false
    },
    onSearchInput() {
      this.showSearchSuggestions = this.searchQuery.length > 0
      this.showNotifications = false
      this.showUserMenu = false
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        console.log('Buscando:', this.searchQuery)
        this.showSearchSuggestions = false
        // Aquí implementarías la lógica de búsqueda real
      }
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.title
      this.showSearchSuggestions = false
      console.log('Navegando a:', suggestion)
      // Aquí implementarías la navegación
    },
    onNotificationRead(notificationId) {
      console.log('Notificación leída:', notificationId)
      this.unreadNotifications = Math.max(0, this.unreadNotifications - 1)
    },
    onAllNotificationsRead() {
      console.log('Todas las notificaciones leídas')
      this.unreadNotifications = 0
    },
    onNotificationDeleted(notificationId) {
      console.log('Notificación eliminada:', notificationId)
    },
    viewAllNotifications() {
      console.log('Ver todas las notificaciones')
      this.showNotifications = false
    }
  },
  mounted() {
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', () => {
      this.showNotifications = false
      this.showUserMenu = false
      this.showSearchSuggestions = false
    })
  }
}
</script>

<style scoped>
.top-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
  padding: 0 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sidebar-toggle {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.sidebar-toggle:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.logo {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  letter-spacing: -0.5px;
}

.nav-center {
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 15px;
  color: #666;
  z-index: 1;
}

.search-box input {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: none;
  border-radius: 30px;
  background: rgba(255,255,255,0.95);
  font-size: 15px;
  outline: none;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}

.search-box input:focus {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  background: white;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  margin-top: 8px;
  overflow: hidden;
  z-index: 1001;
  border: 1px solid rgba(0,0,0,0.05);
  animation: slideDown 0.2s ease;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.suggestion-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item i {
  color: #667eea;
  width: 16px;
  text-align: center;
}

.suggestion-item span {
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-container {
  position: relative;
}

.notification-btn {
  position: relative;
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.notification-btn:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.notification-btn.active {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255,71,87,0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.1);
  padding: 8px 20px 8px 8px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.user-menu:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  border: 2px solid rgba(255,255,255,0.2);
}

.user-info {
  display: flex;
  flex-direction: column;
  color: white;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  opacity: 0.8;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.dropdown-toggle i.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }
  
  .user-info {
    display: none;
  }
  
  .logo {
    font-size: 18px;
  }
}
</style>
