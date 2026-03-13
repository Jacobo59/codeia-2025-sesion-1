import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Monitor, Search } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme, setLightTheme, setDarkTheme, setSystemTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-4 w-4" />;
    if (theme === 'dark') return <Moon className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center rounded-lg bg-red-600 p-2">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">Netflix Clone</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/movies') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/tv-shows') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/search"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/search') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Search
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle theme">
                  {getThemeIcon()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={setLightTheme}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={setDarkTheme}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={setSystemTheme}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Button (Mobile) */}
            <Link to="/search" className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            {/* Search Input (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search movies, TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex justify-around border-t py-2">
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </Link>
        <Link
          to="/movies"
          className={`flex flex-col items-center text-xs ${
            isActive('/movies') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m7 7 10 10" />
            <path d="m17 7-10 10" />
          </svg>
          Movies
        </Link>
        <Link
          to="/tv-shows"
          className={`flex flex-col items-center text-xs ${
            isActive('/tv-shows') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M8 21V7" />
            <path d="M16 21V7" />
          </svg>
          TV
        </Link>
        <Link
          to="/search"
          className={`flex flex-col items-center text-xs ${
            isActive('/search') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Search className="h-5 w-5 mb-1" />
          Search
        </Link>
      </nav>
    </header>
  );
};
