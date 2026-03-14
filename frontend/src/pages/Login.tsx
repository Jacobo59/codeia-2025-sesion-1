import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTheme } from '../hooks/useTheme';

export const Login = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simular login con Google
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la lógica real de autenticación con Google
      alert('Login con Google - Funcionalidad simulada');
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular login con email
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la lógica real de autenticación
      alert('Login con email - Funcionalidad simulada');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al inicio
        </Link>

        {/* Login Card */}
        <div className={`rounded-2xl p-8 shadow-xl ${isDark ? 'bg-card' : 'bg-white'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
              <span className="text-3xl font-bold text-white">N</span>
            </div>
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Bienvenido de nuevo a Netflix Clone
            </p>
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full mb-4"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09 0-4.36-3.14-8.04-8.08-8.04-4.94 0-8.08 3.68-8.08 8.09 0 4.35 3.2 8.09 7.68 8.09.79 0 1.48-.16 2.2-.42.64.26 1.26.92 2.21 1.67 3.2.77.81 1.33 1.15 3.02 1.15 2.23 0 4.16-.81 5.62-2.15.09-.06.17-.12.27-.12.41 0 .31.11.6.22.88h-.02c-1.27.69-2.7 1.07-4.2 1.07-2.75 0-5.01-2.01-5.6-4.62H3.42c.62 2.89 2.61 5.18 5.63 6.35 1.55.62 3.24.94 5.01.94.42 0 .85-.06 1.24-.19 1.35-.63.26-1.64.81-3.04.81-5.31 0-4.23-3.35-7.66-7.78-7.66s-7.78 3.43-7.78 7.66c0 2.27.99 4.28 2.57 5.75 4.64.1.16.28.24.43.24.7z"
                fill="currentColor"
              />
            </svg>
            Continuar con Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={`px-2 ${isDark ? 'bg-card' : 'bg-white'} text-muted-foreground`}>
                o
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Recordarme</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Regístrate gratis
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p className="mb-2">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link to="/legal/terminos" className="text-primary hover:underline">
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link to="/legal/privacidad" className="text-primary hover:underline">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
