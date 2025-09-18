# Portal Home - Dashboard Vue 3

Una aplicación moderna de dashboard construida con Vue 3 que incluye navegación superior, menú lateral y área de dashboard central.

## 🚀 Características

- **Navegación Superior**: Barra de navegación fija con búsqueda, notificaciones y menú de usuario
- **Menú Lateral**: Sidebar colapsible con navegación por secciones
- **Dashboard Central**: Área principal con estadísticas, gráficos y actividad reciente
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Interfaz Moderna**: Diseño atractivo con gradientes y animaciones suaves

## 🛠️ Tecnologías Utilizadas

- Vue 3 (Composition API)
- Vite (Build tool)
- Font Awesome (Iconos)
- CSS3 (Estilos personalizados)

## 📦 Instalación

1. **Clonar o navegar al directorio del proyecto**
   ```bash
   cd home
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   ├── TopNavigation.vue    # Barra de navegación superior
│   ├── Sidebar.vue          # Menú lateral
│   └── Dashboard.vue        # Dashboard principal
├── App.vue                  # Componente raíz
└── main.js                  # Punto de entrada
```

## 🎨 Componentes Principales

### TopNavigation.vue
- Botón para colapsar/expandir sidebar
- Barra de búsqueda
- Notificaciones
- Menú de usuario

### Sidebar.vue
- Navegación por secciones
- Estado colapsible
- Información del footer
- Diseño responsive

### Dashboard.vue
- Tarjetas de estadísticas
- Gráficos (placeholder)
- Lista de productos más vendidos
- Actividad reciente

## 📱 Responsive Design

La aplicación se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Sidebar completo visible
- **Tablet**: Sidebar colapsible
- **Mobile**: Sidebar oculto por defecto, se abre con overlay

## 🎨 Personalización

### Colores Principales
- **Primario**: Gradiente azul-púrpura (#667eea → #764ba2)
- **Fondo**: Gris claro (#f5f6fa)
- **Texto**: Azul oscuro (#2c3e50)
- **Sidebar**: Azul marino (#2c3e50)

### Modificar Estilos
Los estilos están organizados por componente. Para personalizar:

1. Edita los archivos `.vue` individuales
2. Modifica las variables CSS en cada componente
3. Ajusta los gradientes y colores según tu marca

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Construye para producción
- `npm run preview`: Previsualiza build de producción

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando Vue 3**