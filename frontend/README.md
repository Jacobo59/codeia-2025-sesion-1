# Netflix Clone 🎬

Un clon de Netflix desarrollado con React, TypeScript, Vite y TailwindCSS.

## ✨ Características

- 🎬 Catálogo de películas y series de TMDB
- 🔍 Búsqueda de contenido
- 🌓 Temas: claro, oscuro y sistema
- 🔐 Autenticación con Google OAuth
- 📱 Diseño responsivo
- ⚡ Rápido y optimizado con Vite

## 🚀 Tecnologías

- **Frontend**: React 19.2.4 + TypeScript
- **Estilos**: TailwindCSS 4.2.1
- **Routing**: React Router DOM 7.13.1
- **Iconos**: Lucide React
- **Autenticación**: @react-oauth/google
- **API**: TMDB (The Movie Database)

## 📦 Instalación

\`\`\`bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd frontend

# Instalar dependencias
npm install
\`\`\`

## 🔑 Configuración de Variables de Entorno

Crea un archivo \`.env\` en la raíz del proyecto basándote en \`.env.example\`:

\`\`\`env
# TMDB API Configuration
VITE_TMDB_API_KEY=tu_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Google OAuth
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
\`\`\`

### Obtener API Key de TMDB

1. Ve a [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Regístrate e inicia sesión
3. Ve a "Settings" → "API"
4. Crea una nueva API Key

### Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita "Google+ API"
4. Ve a "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configura:
   - **Type**: Web application
   - **Authorized JavaScript origins**: \`http://localhost:5173\`

## 🏃 Scripts Disponibles

\`\`\`bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/          # Componentes de UI (Button, Input, etc.)
│   │   └── layout/      # Layout (Header, Footer)
│   ├── contexts/        # Contextos de React
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom hooks
│   │   └── useTheme.ts
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Movies.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── .env.example
\`\`\`

## 🎨 Temas

La aplicación soporta tres temas:
- **Claro**: Para preferencias claras
- **Oscuro**: Para preferencias oscuras
- **Sistema**: Sigue la preferencia del sistema operativo

## 🔐 Autenticación

El login con Google OAuth permite:
- Autenticación segura sin contraseñas
- Foto de perfil y nombre de Google
- Persistencia de sesión en localStorage
- Logout en un clic

## 📝 Licencia

Este proyecto es un clon con fines educativos.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Claude Code

---

⚠️ **Nota**: No subas el archivo \`.env\` con tus credenciales reales. Usa el \`.env.example\` como referencia.
