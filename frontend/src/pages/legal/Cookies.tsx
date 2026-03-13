import { Link } from 'react-router-dom';

export const Cookies = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
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

      <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. ¿Qué son las Cookies?</h2>
          <p className="text-muted-foreground">
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para recordar sus preferencias y mejorar su experiencia de navegación.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Tipos de Cookies que Utilizamos</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Cookies Técnicas</h3>
          <p className="text-muted-foreground">
            Son necesarias para el funcionamiento del sitio web. Permiten la navegación y el uso de las funciones básicas.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Cookies de Análisis</h3>
          <p className="text-muted-foreground">
            Nos permiten analizar el uso del sitio web para mejorar la experiencia de usuario. Recogen información sobre las páginas visitadas, el tiempo de permanencia, etc.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Cookies de Personalización</h3>
          <p className="text-muted-foreground">
            Permiten recordar sus preferencias para ofrecerle una experiencia personalizada (tema, idioma, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Cookies de Terceros</h2>
          <p className="text-muted-foreground">
            Este sitio web puede utilizar cookies de terceros como:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li><strong>TMDB API:</strong> Para obtener datos de películas y series</li>
            <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio web</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Gestión de Cookies</h2>
          <p className="text-muted-foreground">
            Puede configurar su navegador para rechazar cookies o eliminar las ya instaladas. Tenga en cuenta que esto puede afectar al funcionamiento del sitio web.
          </p>
          <div className="mt-4 space-y-2 text-muted-foreground">
            <p><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
            <p><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos de sitios</p>
            <p><strong>Safari:</strong> Preferencias → Privacidad → Administrar datos de sitios web</p>
            <p><strong>Edge:</strong> Configuración → Cookies y permisos de sitios → Cookies y datos de sitios</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Actualización de la Política</h2>
          <p className="text-muted-foreground">
            Netflix Clone puede actualizar esta política de cookies periódicamente para reflejar cambios en las cookies que utilizamos. Recomendamos revisar esta política regularmente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
          <p className="text-muted-foreground">
            Para cualquier consulta sobre el uso de cookies, puede contactarnos en: contacto@netflixclone.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Fecha de Actualización</h2>
          <p className="text-muted-foreground">
            Última actualización: {currentYear}
          </p>
        </section>
      </div>
    </div>
  );
};
