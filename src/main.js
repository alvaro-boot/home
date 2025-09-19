import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import HomeView from './components/Dashboard.vue'

// Configuración del router principal
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/it',
      name: 'it',
      component: () => import('./components/MicroFrontendContainer.vue'),
      props: { microfrontend: 'it' }
    },
    {
      path: '/gestion-humana',
      name: 'gestion-humana',
      component: () => import('./components/MicroFrontendContainer.vue'),
      props: { microfrontend: 'gestion-humana' }
    }
  ]
})

// Configuración de Single SPA para el home
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return createApp(App).use(router).mount(this.el)
    }
  },
  handleInstance(app, props) {
    app.use(router)
  }
})

// Exportar las funciones de ciclo de vida de Single SPA
export const { bootstrap, mount, unmount } = vueLifecycles

// Para desarrollo independiente y producción
const app = createApp(App)
app.use(router)
app.mount('#app')