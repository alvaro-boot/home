<template>
  <div class="notification-dropdown" v-if="isOpen" @click.stop>
    <div class="dropdown-header">
      <h3>Notificaciones</h3>
      <button @click="markAllAsRead" class="mark-all-btn" v-if="unreadCount > 0">
        Marcar todas como leídas
      </button>
    </div>
    
    <div class="notifications-list">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification-item"
        :class="{ 'unread': !notification.read }"
        @click="markAsRead(notification.id)"
      >
        <div class="notification-icon" :class="notification.type">
          <i :class="notification.icon"></i>
        </div>
        <div class="notification-content">
          <p class="notification-title">{{ notification.title }}</p>
          <p class="notification-message">{{ notification.message }}</p>
          <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
        </div>
        <button 
          @click.stop="deleteNotification(notification.id)"
          class="delete-btn"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div v-if="notifications.length === 0" class="empty-state">
        <i class="fas fa-bell-slash"></i>
        <p>No hay notificaciones</p>
      </div>
    </div>
    
    <div class="dropdown-footer">
      <button @click="viewAllNotifications" class="view-all-btn">
        Ver todas las notificaciones
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationDropdown',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      notifications: [
        {
          id: 1,
          type: 'success',
          icon: 'fas fa-check-circle',
          title: 'Sistema actualizado',
          message: 'El sistema se ha actualizado correctamente a la versión 2.1.0',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
          read: false
        },
        {
          id: 2,
          type: 'warning',
          icon: 'fas fa-exclamation-triangle',
          title: 'Mantenimiento programado',
          message: 'Se realizará mantenimiento el domingo de 2:00 AM a 4:00 AM',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
          read: false
        },
        {
          id: 3,
          type: 'info',
          icon: 'fas fa-user-plus',
          title: 'Nuevo usuario',
          message: 'Juan Pérez se ha registrado en el sistema',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
          read: true
        },
        {
          id: 4,
          type: 'error',
          icon: 'fas fa-exclamation-circle',
          title: 'Error en backup',
          message: 'El backup automático falló. Revisar configuración.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
          read: true
        }
      ]
    }
  },
  computed: {
    unreadCount() {
      return this.notifications.filter(n => !n.read).length
    }
  },
  methods: {
    markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
        this.$emit('notification-read', notificationId)
      }
    },
    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true
      })
      this.$emit('all-notifications-read')
    },
    deleteNotification(notificationId) {
      const index = this.notifications.findIndex(n => n.id === notificationId)
      if (index > -1) {
        this.notifications.splice(index, 1)
        this.$emit('notification-deleted', notificationId)
      }
    },
    viewAllNotifications() {
      this.$emit('view-all-notifications')
    },
    formatTime(timestamp) {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (minutes < 1) return 'Ahora'
      if (minutes < 60) return `Hace ${minutes} min`
      if (hours < 24) return `Hace ${hours}h`
      return `Hace ${days}d`
    }
  }
}
</script>

<style scoped>
.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
  backdrop-filter: blur(20px);
  z-index: 1001;
  margin-top: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.2);
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.dropdown-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 18px;
  font-weight: 700;
}

.mark-all-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mark-all-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.notification-item:hover {
  background: rgba(102, 126, 234, 0.02);
}

.notification-item.unread {
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
}

.notification-item.unread::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
}

.notification-icon.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.notification-icon.warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.notification-icon.info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.notification-icon.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  margin: 0 0 4px 0;
  color: #1e293b;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
}

.notification-message {
  margin: 0 0 8px 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
}

.delete-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
  opacity: 0;
}

.notification-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  color: #94a3b8;
  text-align: center;
}

.empty-state i {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(0,0,0,0.05);
  background: rgba(248, 250, 252, 0.5);
}

.view-all-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Scrollbar personalizada */
.notifications-list::-webkit-scrollbar {
  width: 6px;
}

.notifications-list::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
}

.notifications-list::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.notifications-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}
</style>
