<script setup>
import { ref } from 'vue'
import TopNavigation from './components/TopNavigation.vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'

const sidebarCollapsed = ref(false)
const sidebarMobileOpen = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const closeMobileSidebar = () => {
  sidebarMobileOpen.value = false
}
</script>

<template>
  <div class="app">
    <TopNavigation @toggle-sidebar="toggleSidebar" />
    
    <Sidebar 
      :is-collapsed="sidebarCollapsed"
      :class="{ 'mobile-open': sidebarMobileOpen }"
    />
    
    <div 
      class="main-content"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
      @click="closeMobileSidebar"
    >
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

.main-content {
  margin-left: 280px;
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: calc(100vh - 70px);
}

.main-content.sidebar-collapsed {
  margin-left: 70px;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>
