import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Películas
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Series
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Búsqueda
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Acción
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Comedia
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terror
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ciencia Ficción
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Animación
                </Link>
              </li>
            </ul>
          </div>

          {/* Películas */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Películas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Populares
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mejor valoradas
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Próximos estrenos
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ahora en cines
                </Link>
              </li>
            </ul>
          </div>

          {/* TV Shows */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Series</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Populares
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mejor valoradas
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  En emisión
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hoy en día
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  TMDB API
                </a>
              </li>
              <li>
                <a href="https://developers.themoviedb.org/3" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentación API
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Términos de TMDB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Netflix Clone. Datos proporcionados por TMDB.</p>
          <p className="mt-2">Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB.</p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <Link to="/legal/aviso-legal" className="hover:text-foreground transition-colors">Aviso Legal</Link>
            <span>•</span>
            <Link to="/legal/privacidad" className="hover:text-foreground transition-colors">Privacidad</Link>
            <span>•</span>
            <Link to="/legal/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
            <span>•</span>
            <Link to="/legal/contratacion" className="hover:text-foreground transition-colors">Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
