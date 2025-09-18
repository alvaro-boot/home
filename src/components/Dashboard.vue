<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <div class="dashboard-actions">
        <button class="btn btn-primary">
          <i class="fas fa-plus"></i>
          Nuevo
        </button>
        <button class="btn btn-secondary">
          <i class="fas fa-download"></i>
          Exportar
        </button>
      </div>
    </div>

    <!-- Tarjetas de estadísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon users">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>1,234</h3>
          <p>Usuarios Activos</p>
          <span class="stat-change positive">+12%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon sales">
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="stat-content">
          <h3>$45,678</h3>
          <p>Ventas del Mes</p>
          <span class="stat-change positive">+8%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orders">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="stat-content">
          <h3>567</h3>
          <p>Órdenes</p>
          <span class="stat-change negative">-2%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="stat-content">
          <h3>$89,012</h3>
          <p>Ingresos</p>
          <span class="stat-change positive">+15%</span>
        </div>
      </div>
    </div>

    <!-- Gráficos y contenido principal -->
    <div class="dashboard-content">
      <div class="chart-section">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Ventas por Mes</h3>
            <div class="chart-controls">
              <select v-model="selectedPeriod">
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
              </select>
            </div>
          </div>
          <div class="chart-placeholder">
            <i class="fas fa-chart-area"></i>
            <p>Gráfico de ventas</p>
            <small>Aquí iría el gráfico real</small>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>Productos Más Vendidos</h3>
          </div>
          <div class="product-list">
            <div class="product-item" v-for="product in topProducts" :key="product.id">
              <div class="product-info">
                <span class="product-name">{{ product.name }}</span>
                <span class="product-sales">{{ product.sales }} ventas</span>
              </div>
              <div class="product-progress">
                <div class="progress-bar" :style="{ width: product.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <div class="activity-card">
          <div class="activity-header">
            <h3>Actividad Reciente</h3>
            <button class="btn-link">Ver todo</button>
          </div>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="activity-icon" :class="activity.type">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-content">
                <p class="activity-text">{{ activity.text }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      selectedPeriod: '30d',
      topProducts: [
        { id: 1, name: 'Producto A', sales: 245, percentage: 85 },
        { id: 2, name: 'Producto B', sales: 189, percentage: 65 },
        { id: 3, name: 'Producto C', sales: 156, percentage: 54 },
        { id: 4, name: 'Producto D', sales: 123, percentage: 42 },
        { id: 5, name: 'Producto E', sales: 98, percentage: 34 }
      ],
      recentActivities: [
        {
          id: 1,
          type: 'success',
          icon: 'fas fa-check-circle',
          text: 'Nueva venta completada',
          time: 'Hace 5 minutos'
        },
        {
          id: 2,
          type: 'info',
          icon: 'fas fa-user-plus',
          text: 'Nuevo usuario registrado',
          time: 'Hace 15 minutos'
        },
        {
          id: 3,
          type: 'warning',
          icon: 'fas fa-exclamation-triangle',
          text: 'Stock bajo en Producto A',
          time: 'Hace 1 hora'
        },
        {
          id: 4,
          type: 'success',
          icon: 'fas fa-chart-line',
          text: 'Meta de ventas alcanzada',
          time: 'Hace 2 horas'
        }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 30px;
  margin-top: 70px;
  margin-left: 280px;
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: calc(100vh - 70px);
}

.dashboard.sidebar-collapsed {
  margin-left: 70px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 5px;
}

.dashboard-header h2 {
  color: #1e293b;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.05);
  letter-spacing: -0.5px;
}

.dashboard-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(255,255,255,0.1);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255,255,255,0.8);
  color: #475569;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(255,255,255,0.2);
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.95);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
}

.stat-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-icon::before {
  opacity: 1;
}

.stat-icon.users { 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 24px rgba(102,126,234,0.3);
}
.stat-icon.sales { 
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 8px 24px rgba(240,147,251,0.3);
}
.stat-icon.orders { 
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 8px 24px rgba(79,172,254,0.3);
}
.stat-icon.revenue { 
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  box-shadow: 0 8px 24px rgba(67,233,123,0.3);
}

.stat-content h3 {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-content p {
  color: #64748b;
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 500;
}

.stat-change {
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.stat-change.positive {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #15803d;
  border: 1px solid rgba(21,128,61,0.2);
}

.stat-change.negative {
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  color: #dc2626;
  border: 1px solid rgba(220,38,38,0.2);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.chart-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chart-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.chart-header h3 {
  color: #1e293b;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.chart-controls select {
  padding: 10px 16px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  background: rgba(255,255,255,0.8);
  color: #475569;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.chart-controls select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
}

.chart-placeholder {
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  color: #64748b;
  border: 2px dashed rgba(100,116,139,0.2);
  transition: all 0.3s ease;
}

.chart-placeholder:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.chart-placeholder i {
  font-size: 56px;
  margin-bottom: 20px;
  color: #667eea;
  opacity: 0.6;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-weight: 500;
  color: #2c3e50;
}

.product-sales {
  color: #7f8c8d;
  font-size: 14px;
}

.product-progress {
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.recent-activity {
  display: flex;
  flex-direction: column;
}

.activity-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  height: fit-content;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.activity-header h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.activity-icon.success { background: #27ae60; }
.activity-icon.info { background: #3498db; }
.activity-icon.warning { background: #f39c12; }

.activity-content {
  flex: 1;
}

.activity-text {
  color: #2c3e50;
  margin: 0 0 5px 0;
  font-size: 14px;
}

.activity-time {
  color: #7f8c8d;
  font-size: 12px;
}

@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    margin-left: 0;
    padding: 15px;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
