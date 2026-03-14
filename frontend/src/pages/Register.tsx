import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTheme } from '../hooks/useTheme';

export const Register = () => {
  const { isDark } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptPrivacy) {
      alert('Debes aceptar la política de privacidad para continuar');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    // Simular registro
    setTimeout(() => {
      setLoading(false);
      alert('Registro exitoso - Funcionalidad simulada');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
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

        {/* Register Card */}
        <div className={`rounded-2xl p-8 shadow-xl ${isDark ? 'bg-card' : 'bg-white'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
              <span className="text-3xl font-bold text-white">N</span>
            </div>
            <h1 className="text-2xl font-bold">Crear cuenta</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Únete a Netflix Clone hoy mismo
            </p>
          </div>

          {/* Google Register */}
          <Button
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
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09 0-4.36-3.14-8.04-8.08-8.04-4.94 0-8.08 3.68-8.09.79 0 1.48-.16 2.2-.42.64.26 1.26.92 2.21 1.67 3.2.77.81 1.33 1.15 3.02 1.15 2.23 0 4.16-.81 5.62-2.15.09-.06.17-.12.27-.12.41 0 .31.11.6.22.88h-.02c-1.27.69-2.7 1.07-4.2 1.07-2.75 0-5.01-2.01-5.6-4.62H3.42c.62 2.89 2.61 5.18 5.63 6.35 1.55.62 3.24.94 5.01.94.42 0 .85-.06 1.24-.19 1.35-.63.26-1.64.81-3.04.81-5.31 0-4.23-3.35-7.66-7.78-7.66s-7.78 3.43-7.78 7.66c0 2.27.99 4.28 2.57 5.75 4.64.1.16.28.24.43.24.7z"
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

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                Nombre completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

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
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Privacy Policy Section - RGPD Compliant */}
            <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  required
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-input bg-background cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer flex-1">
                  <div className="flex-1">
                    <span className="font-medium">He leído y acepto</span>{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacyDetails(!showPrivacyDetails);
                      }}
                      className="text-primary hover:underline font-medium inline-flex items-center"
                    >
                      la política de privacidad
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-1 transition-transform ${showPrivacyDetails ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6" />
                        <path d="m18 15-6-6 6" />
                      </svg>
                    </button>
                  </div>
                </label>
              </div>

              {showPrivacyDetails && (
                <div className="mt-3 p-4 rounded bg-muted animate-slideUp">
                  <h4 className="font-semibold mb-2">Resumen de la política de privacidad</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Recopilamos tu nombre, correo electrónico y datos de uso para gestionar tu cuenta</li>
                    <li>Tus datos personales se procesan de conformidad con el RGPD</li>
                    <li>Puedes acceder, rectificar, suprimir u oponerte al tratamiento de tus datos en cualquier momento</li>
                    <li>No compartimos tus datos con terceros sin tu consentimiento explícito</li>
                  </ul>
                  <div className="mt-4">
                    <Link
                      to="/legal/privacidad"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Leer política de privacidad completa
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="brand"
              disabled={loading || !acceptPrivacy}
              className="w-full"
              size="lg"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>

          {/* Contact Accordion - ARCO Rights */}
          <div className="mt-8 border-t pt-6">
            <button
              type="button"
              onClick={() => setShowContact(!showContact)}
              className="w-full flex items-center justify-between text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
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
                >
                  <path d="M3 9 9 9 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="m12 14 9 2-9 5" />
                </svg>
                <span>Información de contacto y derechos ARCO</span>
              </div>
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
                className={`transition-transform ${showContact ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6" />
                <path d="m18 15-6-6 6" />
              </svg>
            </button>

            {showContact && (
              <div className="mt-4 animate-slideUp">
                <ul className="text-xs space-y-2 text-muted-foreground list-disc list-inside">
                  <li><strong className="font-medium">Responsable:</strong> Jacobo Nasser Soto.</li>
                  <li><strong className="font-medium">Finalidad:</strong> Gestionar tu cuenta y prestar los servicios de la plataforma.</li>
                  <li><strong className="font-medium">Derechos:</strong> Podrás ejercer tus derechos de acceso, rectificación, limitación y suprimir los datos en este formulario así como el derecho a presentar una reclamación ante una autoridad de control.</li>
                  <li><strong className="font-medium">Información adicional:</strong> En la Política de Privacidad de Dummy Seo encontrarás información adicional sobre la recopilación y el uso de su información personal por parte de Dummy Seo, incluida información sobre acceso, conservación, rectificación, eliminación, seguridad y otros temas.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
