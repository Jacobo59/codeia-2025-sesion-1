# Netflix Clone - TMDB API

Una aplicación tipo Netflix construida con React 18, Vite, Tailwind CSS y shadcn/ui, que consume directamente la API de TMDB (The Movie Database).

## Tecnologías

- **Frontend**: React 18 con TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Routing**: React Router DOM
- **API**: TMDB API (The Movie Database)

## Características

- 🏠 **Home**: Hero banner con contenido destacado y filas horizontales de películas y series
- 🎬 **Movies**: Catálogo de películas populares, top rated y upcoming
- 📺 **TV Shows**: Catálogo de series populares, top rated y on the air
- 🔍 **Search**: Búsqueda en tiempo real de películas, series y personas
- 📋 **Detalle**: Páginas completas de detalle con información, reparto, videos y contenido similar
- 📱 **Responsive Design**: Optimizado para móvil y desktop

## Instalación

### 1. Clonar el repositorio

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega tu API key de TMDB:

```bash
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**¿Cómo obtener una API key de TMDB?**

1. Ve a [themoviedb.org](https://www.themoviedb.org/)
2. Crea una cuenta gratuita
3. Ve a Settings > API en tu perfil
4. Solicita una API Key (Developer)
5. Completa el formulario básico
6. Recibirás la key en tu correo y en la página de configuración

### 4. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run preview` | Previsualiza el build de producción |

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/              # Componentes de shadcn/ui
│   │   ├── layout/          # Header, Footer
│   │   ├── media/           # MediaCard, MediaGrid, MediaRow, HeroBanner
│   │   ├── search/          # SearchBar, SearchResults
│   │   └── detail/          # CastSection, SimilarMedia, VideoPlayer
│   ├── config/
│   │   └── tmdb.config.ts   # Configuración de TMDB
│   ├── hooks/
│   │   ├── useMedia.ts      # Hooks para contenido de media
│   │   ├── useSearch.ts     # Hooks para búsqueda
│   │   ├── useGenres.ts     # Hooks para géneros
│   │   └── useInfiniteScroll.ts # Hook para scroll infinito
│   ├── lib/
│   │   ├── utils.ts         # Utilidades de shadcn/ui
│   │   └── constants.ts     # Constantes de la aplicación
│   ├── pages/
│   │   ├── Home.tsx         # Página principal
│   │   ├── Movies.tsx       # Página de películas
│   │   ├── TVShows.tsx      # Página de series
│   │   ├── Search.tsx       # Página de búsqueda
│   │   └── MediaDetail.tsx  # Página de detalle
│   ├── services/
│   │   ├── tmdb.service.ts  # Llamadas a la API de TMDB
│   │   └── api.client.ts    # Cliente HTTP base
│   ├── types/
│   │   └── tmdb.types.ts    # Tipos de TypeScript para TMDB
│   ├── App.tsx              # Componente principal con routing
│   └── main.tsx             # Punto de entrada
├── .env                     # Variables de entorno (no versionado)
├── .env.example             # Ejemplo de variables de entorno
├── components.json          # Configuración de shadcn/ui
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/movies` | Catálogo de películas |
| `/tv-shows` | Catálogo de series |
| `/search` | Búsqueda de contenido |
| `/movie/:id` | Detalle de película |
| `/tv/:id` | Detalle de serie |

## API de TMDB Utilizada

La aplicación utiliza los siguientes endpoints de TMDB:

- **Trending**: `/trending/all/{time_window}`
- **Popular**: `/movie/popular`, `/tv/popular`
- **Top Rated**: `/movie/top_rated`, `/tv/top_rated`
- **Upcoming/On The Air**: `/movie/upcoming`, `/tv/on_the_air`
- **Details**: `/movie/{id}`, `/tv/{id}`
- **Credits**: `/movie/{id}/credits`, `/tv/{id}/credits`
- **Videos**: `/movie/{id}/videos`, `/tv/{id}/videos`
- **Similar**: `/movie/{id}/similar`, `/tv/{id}/similar`
- **Search**: `/search/multi`, `/search/movie`, `/search/tv`, `/search/person`
- **Genres**: `/genre/movie/list`, `/genre/tv/list`

## Notas Importantes

- La API key de TMDB está expuesta en el frontend (aceptable para este proyecto)
- Para producción, se recomienda implementar un backend como proxy
- La API de TMDB tiene límites de rate limiting, por lo que se recomienda implementar caching

## Créditos

- Datos provistos por [TMDB](https://www.themoviedb.org/)
- Este producto usa la API de TMDB pero no está respaldado ni certificado por TMDB

## Licencia

Este proyecto es solo para fines educativos.
