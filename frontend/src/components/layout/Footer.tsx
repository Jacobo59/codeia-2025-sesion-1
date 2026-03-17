import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Github, X, ChevronDown } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="border-t border-border bg-zinc-900 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity">
              <Film className="h-6 w-6" />
              <span>Netflix Clone</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu plataforma de streaming para descubrir y explorar películas y series de TV.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 transition-colors">
                <X className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegación - Mobile Accordion */}
          <div className="md:block">
            <button
              onClick={() => toggleSection('navegacion')}
              className="w-full flex items-center justify-between font-semibold md:justify-start mb-4 md:mb-0"
            >
              Navegación
              <ChevronDown className={`md:hidden h-4 w-4 transition-transform ${openSection === 'navegacion' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 md:block ${openSection === 'navegacion' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Películas
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Series
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Búsqueda
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías - Mobile Accordion */}
          <div className="md:block">
            <button
              onClick={() => toggleSection('categorias')}
              className="w-full flex items-center justify-between font-semibold md:justify-start mb-4 md:mb-0"
            >
              Categorías
              <ChevronDown className={`md:hidden h-4 w-4 transition-transform ${openSection === 'categorias' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 md:block ${openSection === 'categorias' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link to="/movies?tab=popular" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Populares
                </Link>
              </li>
              <li>
                <Link to="/movies?tab=trending" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Tendencias
                </Link>
              </li>
              <li>
                <Link to="/movies?tab=top-rated" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Mejor valoradas
                </Link>
              </li>
              <li>
                <Link to="/movies?tab=upcoming" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Próximos estrenos
                </Link>
              </li>
            </ul>
          </div>

          {/* Géneros - Mobile Accordion */}
          <div className="md:block">
            <button
              onClick={() => toggleSection('generos')}
              className="w-full flex items-center justify-between font-semibold md:justify-start mb-4 md:mb-0"
            >
              Géneros
              <ChevronDown className={`md:hidden h-4 w-4 transition-transform ${openSection === 'generos' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 md:block ${openSection === 'generos' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link to="/movies?genre=28" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Acción
                </Link>
              </li>
              <li>
                <Link to="/movies?genre=35" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Comedia
                </Link>
              </li>
              <li>
                <Link to="/movies?genre=18" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link to="/movies?genre=27" className="text-sm text-muted-foreground hover:text-red-500 transition-colors">
                  Terror
                </Link>
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
