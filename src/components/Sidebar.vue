<template>
  <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in menuItems" :key="item.id">
            <a 
              href="#"
              @click.prevent="selectMenuItem(item)"
              class="nav-link"
              :class="{ active: activeMenuItem === item.id }"
            >
              <i :class="item.icon"></i>
              <span class="nav-text" v-show="!isCollapsed">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer" v-show="!isCollapsed">
        <div class="footer-info">
          <p>Portal v1.0</p>
          <p>© 2024 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenuItem: 1, // Dashboard activo por defecto
      menuItems: [
        {
          id: 1,
          name: 'Dashboard',
          path: '/',
          icon: 'fas fa-tachometer-alt'
        },
        {
          id: 2,
          name: 'IT',
          path: '/it',
          icon: 'fas fa-laptop-code'
        },
        {
          id: 3,
          name: 'Gestión Humana',
          path: '/gestion-humana',
          icon: 'fas fa-users'
        }
      ]
    }
  },
  methods: {
    selectMenuItem(item) {
      this.activeMenuItem = item.id
      this.$router.push(item.path)
      this.$emit('menu-selected', item)
      console.log(`Seleccionado: ${item.name}`)
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 70px;
  left: 0;
  width: 280px;
  height: calc(100vh - 70px);
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  overflow-y: auto;
  border-right: 1px solid rgba(255,255,255,0.1);
  box-shadow: 4px 0 32px rgba(0,0,0,0.1);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  flex: 1;
  padding: 30px 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0 15px;
}

.nav-item {
  margin-bottom: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.nav-link:hover {
  background: rgba(255,255,255,0.05);
  color: white;
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(102,126,234,0.3);
  transform: translateX(8px);
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.nav-link i {
  font-size: 20px;
  width: 24px;
  text-align: center;
  margin-right: 16px;
  transition: transform 0.3s ease;
}

.nav-link:hover i {
  transform: scale(1.1);
}

.nav-text {
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 15px;
}

.sidebar-collapsed .nav-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  margin-left: 0;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 18px 10px;
}

.sidebar-collapsed .nav-link i {
  margin-right: 0;
}

.sidebar-footer {
  padding: 25px 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.footer-info {
  text-align: center;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}

.footer-info p {
  margin: 4px 0;
}

/* Scrollbar personalizada */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  transition: background 0.3s ease;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 250px;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .sidebar-collapsed {
    width: 250px;
  }
}
</style>
