# Reglas de Implementación - Netflix Clone

## Stack Tecnológico

```yaml
Frontend:
  - Framework: React 18
  - Lenguaje: TypeScript
  - Build Tool: Vite
  - Estilos: Tailwind CSS
  - Componentes UI: shadcn/ui
  - Routing: React Router DOM v6
  - HTTP Cliente: Fetch API nativo

API:
  - Fuente de Datos: TMDB (The Movie Database)
  - Patrón: Consumo directo desde frontend
  - Autenticación: API Key en variables de entorno
```

## Arquitectura del Proyecto

### Estructura de Directorios

```
frontend/src/
├── assets/           # Assets estáticos (imágenes, iconos)
├── components/       # Componentes reutilizables
│   ├── ui/         # Componentes base de shadcn/ui
│   ├── layout/     # Header, Footer, Navigation
│   ├── media/      # Componentes de media (Card, Grid, Banner)
│   ├── search/     # Componentes de búsqueda
│   └── detail/     # Componentes de páginas de detalle
├── config/         # Configuraciones (TMDB, etc.)
├── hooks/          # Custom Hooks de React
├── lib/            # Utilidades y constantes
├── pages/          # Páginas de la aplicación
├── services/       # Llamadas a API
└── types/          # Tipos de TypeScript
```

## Reglas de Código

### 1. Convención de Nombres

```typescript
// Componentes: PascalCase
const MediaCard = () => {};

// Hooks: camelCase con prefijo "use"
const useMedia = () => {};

// Servicios: camelCase con prefijo del recurso
const getMovieDetails = () => {};

// Tipos/Interfaces: PascalCase
interface MovieDetails {};

// Constantes: UPPER_SNAKE_CASE
const IMAGE_SIZES = {};

// Funciones: camelCase
const formatDate = () => {};
```

### 2. Tipado Estricto

```typescript
// ✅ Bien: Siempre tipar las respuestas
const { data, loading } = useTrendingAll();

// ❌ Mal: Evitar any
const data: any = fetchSomething();
```

### 3. Componentes Funcionales

```typescript
// ✅ Bien: Componentes funcionales con hooks
export const MediaCard = ({ media }: MediaCardProps) => {
  const [hover, setHover] = useState(false);

  return <div className={hover ? 'scale-105' : ''}>{/* ... */}</div>;
};

// ❌ Mal: No usar componentes de clase
class MediaCard extends React.Component {
  // ...
}
```

### 4. Manejo de Estados

```typescript
// ✅ Bien: Hooks personalizados para lógica compleja
const { data, loading, error } = useMedia();

// ✅ Bien: Estados simples en componentes
const [isOpen, setIsOpen] = useState(false);

// ❌ Mal: Lógica de API directamente en el componente
const [data, setData] = useState([]);
useEffect(() => {
  fetch('/api').then(setData);
}, []);
```

## Reglas de UI/UX

### 1. Diseño Responsive

```tsx
// ✅ Bien: Usar clases de Tailwind responsive
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  {/* ... */}
</div>
```

### 2. Estados de Carga

```tsx
// ✅ Bien: Mostrar skeletons durante carga
{loading ? (
  <MediaCardSkeleton />
) : (
  <MediaCard media={media} />
)}
```

### 3. Manejo de Errores

```tsx
// ✅ Bien: Manejar errores amigablemente
{error ? (
  <div className="text-destructive">Failed to load content</div>
) : (
  <Content />
)}
```

### 4. Accesibilidad

```tsx
// ✅ Bien: Usar atributos ARIA apropiados
<button aria-label="Close menu" onClick={onClose}>
  <X />
</button>

// ✅ Bien: Navegación por teclado
<div onKeyDown={(e) => e.key === 'Escape' && onClose()}>
```

## Reglas de API

### 1. Cliente HTTP

```typescript
// ✅ Bien: Usar el cliente centralizado
import { tmdbService } from '../services/tmdb.service';

const { data } = await tmdbService.getMovieDetails(id);

// ❌ Mal: Fetch directo en componentes
const data = await fetch(`https://api.themoviedb.org/3/movie/${id}`);
```

### 2. Debouncing en Búsqueda

```typescript
// ✅ Bien: Usar hook de debounce
const debouncedQuery = useDebounce(query, 500);
useSearchMulti(debouncedQuery);
```

### 3. Manejo de Errores de API

```typescript
// ✅ Bien: Manejar errores específicos
try {
  const data = await tmdbService.getMovieDetails(id);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      // Not found
    } else if (error.status === 429) {
      // Rate limited
    }
  }
}
```

## Reglas de Estilos

### 1. Uso de Tailwind

```tsx
// ✅ Bien: Clases de utilidad
<div className="flex items-center justify-between p-4 rounded-lg border">
  {/* ... */}
</div>

// ❌ Mal: CSS inline
<div style={{ display: 'flex', padding: '16px' }}>
  {/* ... */}
</div>
```

### 2. Colores del Sistema

```tsx
// ✅ Bien: Usar variables CSS del tema
<div className="bg-background text-foreground">
  {/* ... */}
</div>

// ✅ Bien: Usar colores semánticos
<div className="bg-primary text-primary-foreground">
  {/* ... */}
</div>
```

### 3. Espaciado Consistente

```tsx
// ✅ Bien: Usar escalas de espaciado
<div className="p-4 m-2 gap-4">
  {/* ... */}
</div>
```

## Reglas de Performance

### 1. Lazy Loading

```tsx
// ✅ Bien: Lazy loading de imágenes
<img src={posterUrl} loading="lazy" alt={title} />
```

### 2. Code Splitting

```tsx
// ✅ Bien: Lazy loading de componentes pesados
const VideoPlayer = lazy(() => import('./VideoPlayer'));
```

### 3. Memoización

```tsx
// ✅ Bien: Memoizar componentes pesados
export const MediaCard = memo(({ media }: MediaCardProps) => {
  // ...
});

// ✅ Bien: Memoizar cálculos costosos
const sortedData = useMemo(
  () => data.sort((a, b) => b.popularity - a.popularity),
  [data]
);
```

## Reglas de Testing

### 1. Tests de Hooks

```typescript
// ✅ Bien: Test de hook personalizado
describe('useMedia', () => {
  it('should fetch media data', async () => {
    const { result } = renderHook(() => useMedia());
    await waitFor(() => expect(result.current.data).toBeDefined());
  });
});
```

### 2. Tests de Componentes

```typescript
// ✅ Bien: Test de componente
describe('MediaCard', () => {
  it('should render media title', () => {
    render(<MediaCard media={mockMedia} />);
    expect(screen.getByText('Movie Title')).toBeInTheDocument();
  });
});
```

## Reglas de Git y Commits

### Convención de Commits

```bash
# Formato: <tipo>(<alcance>): <descripción>
feat(home): add hero banner component
fix(search): debounce not working
docs(readme): update installation instructions
style(components): fix indentation
refactor(services): extract API client
test(hooks): add tests for useMedia
chore(deps): upgrade dependencies
```

### Branches

```bash
main           # Producción
develop        # Desarrollo
feature/*      # Nueva funcionalidad
bugfix/*       # Corrección de bug
hotfix/*       # Fix urgente en producción
```

## Reglas de Seguridad

### 1. Variables de Entorno

```typescript
// ✅ Bien: Acceder a variables de entorno
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// ❌ Mal: Hardcoded values
const apiKey = '1234567890';
```

### 2. Validación de Inputs

```typescript
// ✅ Bien: Validar inputs de usuario
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (!query.trim()) return;

  // ...
};
```

## Reglas de Documentación

### 1. JSDoc para Funciones

```typescript
/**
 * Fetches movie details from TMDB API
 * @param id - The movie ID
 * @returns Promise with movie details
 */
export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  // ...
};
```

### 2. Comentarios de Código

```typescript
// ✅ Bien: Comentar cuando sea necesario
// Debounce search to avoid excessive API calls
const debouncedQuery = useDebounce(query, 500);

// ❌ Mal: Comentarios obvios
// Set state to true
setIsLoading(true);
```

## Reglas de Tema Claro/Oscuro

### 1. Variables CSS del Tema

```css
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  /* ... */
}
```

### 2. Hook de Tema

```typescript
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
```

## Reglas de Filtros y Paginación

### 1. Componente de Filtros

```typescript
interface FilterOptions {
  genre?: number;
  year?: number;
  sortBy?: string;
  rating?: number;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  // ...
};
```

### 2. Componente de Paginación

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // ...
};
```

## Checklist antes de Commit

- [ ] Código sigue las convenciones de nomenclatura
- [ ] Componentes tienen PropTypes o TypeScript
- [ ] Estados de carga y error están manejados
- [ ] Tests pasan (si aplica)
- [ ] No hay console.log en producción
- [ ] Código está formateado (Prettier)
- [ ] No hay errores de ESLint
- [ ] Variables sensibles están en .env
- [ ] Commit message sigue la convención
