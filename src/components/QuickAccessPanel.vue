<template>
  <div class="quick-access-panel">
    <div class="panel-header">
      <h3>Acceso Rápido</h3>
      <button @click="toggleEditMode" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
    </div>
    
    <div class="shortcuts-grid">
      <div 
        v-for="shortcut in shortcuts" 
        :key="shortcut.id"
        class="shortcut-item"
        :class="{ 'editing': editMode }"
        @click="!editMode && executeShortcut(shortcut)"
        @dragstart="editMode && handleDragStart($event, shortcut)"
        @dragover.prevent
        @drop="editMode && handleDrop($event, shortcut)"
        draggable="editMode"
      >
        <div class="shortcut-icon" :style="{ background: shortcut.color }">
          <i :class="shortcut.icon"></i>
        </div>
        <div class="shortcut-content">
          <span class="shortcut-title">{{ shortcut.title }}</span>
          <span class="shortcut-description">{{ shortcut.description }}</span>
        </div>
        <div class="shortcut-actions" v-if="editMode">
          <button @click.stop="editShortcut(shortcut)" class="action-btn edit">
            <i class="fas fa-edit"></i>
          </button>
          <button @click.stop="removeShortcut(shortcut.id)" class="action-btn remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="shortcut-badge" v-if="shortcut.badge">
          {{ shortcut.badge }}
        </div>
      </div>
      
      <div 
        v-if="editMode && shortcuts.length < 8" 
        class="add-shortcut"
        @click="showAddShortcut = true"
      >
        <i class="fas fa-plus"></i>
        <span>Agregar atajo</span>
      </div>
    </div>
    
    <!-- Modal para agregar/editar atajo -->
    <div v-if="showAddShortcut || editingShortcut" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingShortcut ? 'Editar Atajo' : 'Nuevo Atajo' }}</h3>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="saveShortcut" class="modal-form">
          <div class="form-group">
            <label>Título</label>
            <input 
              v-model="formData.title" 
              type="text" 
              required 
              placeholder="Ej: Nuevo Usuario"
            >
          </div>
          
          <div class="form-group">
            <label>Descripción</label>
            <input 
              v-model="formData.description" 
              type="text" 
              placeholder="Descripción breve del atajo"
            >
          </div>
          
          <div class="form-group">
            <label>Ícono</label>
            <div class="icon-selector">
              <button 
                v-for="icon in availableIcons" 
                :key="icon"
                type="button"
                @click="formData.icon = icon"
                class="icon-option"
                :class="{ 'selected': formData.icon === icon }"
              >
                <i :class="icon"></i>
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label>Color</label>
            <div class="color-selector">
              <button 
                v-for="color in availableColors" 
                :key="color"
                type="button"
                @click="formData.color = color"
                class="color-option"
                :class="{ 'selected': formData.color === color }"
                :style="{ background: color }"
              ></button>
            </div>
          </div>
          
          <div class="form-group">
            <label>Acción</label>
            <select v-model="formData.action" required>
              <option value="">Seleccionar acción</option>
              <option value="navigate">Navegar a página</option>
              <option value="function">Ejecutar función</option>
              <option value="external">Enlace externo</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-cancel">
              Cancelar
            </button>
            <button type="submit" class="btn-save">
              {{ editingShortcut ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickAccessPanel',
  data() {
    return {
      editMode: false,
      showAddShortcut: false,
      editingShortcut: null,
      draggedShortcut: null,
      formData: {
        title: '',
        description: '',
        icon: 'fas fa-star',
        color: '#667eea',
        action: '',
        target: ''
      },
      availableIcons: [
        'fas fa-user-plus',
        'fas fa-file-alt',
        'fas fa-chart-bar',
        'fas fa-cog',
        'fas fa-download',
        'fas fa-upload',
        'fas fa-search',
        'fas fa-bell',
        'fas fa-calendar',
        'fas fa-envelope',
        'fas fa-phone',
        'fas fa-home',
        'fas fa-users',
        'fas fa-laptop',
        'fas fa-database',
        'fas fa-shield-alt'
      ],
      availableColors: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#f5576c',
        '#4facfe',
        '#00f2fe',
        '#43e97b',
        '#38f9d7',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#06b6d4'
      ],
      shortcuts: [
        {
          id: 1,
          title: 'Nuevo Usuario',
          description: 'Crear usuario',
          icon: 'fas fa-user-plus',
          color: '#667eea',
          action: 'navigate',
          target: '/users/new',
          badge: null
        },
        {
          id: 2,
          title: 'Reportes',
          description: 'Ver reportes',
          icon: 'fas fa-chart-bar',
          color: '#f093fb',
          action: 'navigate',
          target: '/reports',
          badge: '3'
        },
        {
          id: 3,
          title: 'Configuración',
          description: 'Ajustes del sistema',
          icon: 'fas fa-cog',
          color: '#4facfe',
          action: 'navigate',
          target: '/settings',
          badge: null
        },
        {
          id: 4,
          title: 'Backup',
          description: 'Respaldar datos',
          icon: 'fas fa-download',
          color: '#43e97b',
          action: 'function',
          target: 'backup',
          badge: null
        }
      ]
    }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode
    },
    
    executeShortcut(shortcut) {
      console.log('Ejecutando atajo:', shortcut)
      
      switch (shortcut.action) {
        case 'navigate':
          this.$router.push(shortcut.target)
          break
        case 'function':
          this.executeFunction(shortcut.target)
          break
        case 'external':
          window.open(shortcut.target, '_blank')
          break
      }
    },
    
    executeFunction(functionName) {
      // Aquí implementarías las funciones específicas
      console.log('Ejecutando función:', functionName)
    },
    
    editShortcut(shortcut) {
      this.editingShortcut = shortcut
      this.formData = { ...shortcut }
      this.showAddShortcut = true
    },
    
    removeShortcut(id) {
      const index = this.shortcuts.findIndex(s => s.id === id)
      if (index > -1) {
        this.shortcuts.splice(index, 1)
      }
    },
    
    saveShortcut() {
      if (this.editingShortcut) {
        // Actualizar atajo existente
        const index = this.shortcuts.findIndex(s => s.id === this.editingShortcut.id)
        if (index > -1) {
          this.shortcuts[index] = { ...this.formData, id: this.editingShortcut.id }
        }
      } else {
        // Crear nuevo atajo
        const newShortcut = {
          ...this.formData,
          id: Date.now()
        }
        this.shortcuts.push(newShortcut)
      }
      
      this.closeModal()
    },
    
    closeModal() {
      this.showAddShortcut = false
      this.editingShortcut = null
      this.formData = {
        title: '',
        description: '',
        icon: 'fas fa-star',
        color: '#667eea',
        action: '',
        target: ''
      }
    },
    
    handleDragStart(event, shortcut) {
      this.draggedShortcut = shortcut
      event.dataTransfer.effectAllowed = 'move'
    },
    
    handleDrop(event, targetShortcut) {
      if (!this.draggedShortcut || this.draggedShortcut.id === targetShortcut.id) {
        return
      }
      
      const draggedIndex = this.shortcuts.findIndex(s => s.id === this.draggedShortcut.id)
      const targetIndex = this.shortcuts.findIndex(s => s.id === targetShortcut.id)
      
      // Reordenar array
      const draggedItem = this.shortcuts.splice(draggedIndex, 1)[0]
      this.shortcuts.splice(targetIndex, 0, draggedItem)
      
      this.draggedShortcut = null
    }
  }
}
</script>

<style scoped>
.quick-access-panel {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.quick-access-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px var(--shadow-color);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 700;
}

.edit-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: var(--accent-primary);
  color: white;
  transform: translateY(-1px);
}

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.shortcut-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 80px;
}

.shortcut-item:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.shortcut-item.editing {
  cursor: move;
}

.shortcut-icon {
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

.shortcut-content {
  flex: 1;
  min-width: 0;
}

.shortcut-title {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.shortcut-description {
  display: block;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.4;
}

.shortcut-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.shortcut-item:hover .shortcut-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s ease;
}

.action-btn.edit {
  background: var(--info-color);
  color: white;
}

.action-btn.remove {
  background: var(--error-color);
  color: white;
}

.action-btn:hover {
  transform: scale(1.1);
}

.shortcut-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--error-color);
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.add-shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: var(--bg-secondary);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 80px;
  color: var(--text-secondary);
}

.add-shortcut:hover {
  border-color: var(--accent-primary);
  background: var(--bg-tertiary);
  color: var(--accent-primary);
}

.add-shortcut i {
  font-size: 24px;
}

.add-shortcut span {
  font-size: 14px;
  font-weight: 500;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.icon-selector,
.color-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: 8px;
  margin-top: 8px;
}

.icon-option,
.color-option {
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.icon-option:hover,
.color-option:hover {
  border-color: var(--accent-primary);
  transform: scale(1.1);
}

.icon-option.selected,
.color-option.selected {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.btn-cancel,
.btn-save {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-cancel:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-save {
  background: var(--accent-primary);
  color: white;
}

.btn-save:hover {
  background: var(--accent-secondary);
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
  .shortcuts-grid {
    grid-template-columns: 1fr;
  }
  
  .shortcut-item {
    padding: 12px;
  }
  
  .shortcut-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
