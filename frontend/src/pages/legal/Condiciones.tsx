import { Link } from 'react-router-dom';

export const Condiciones = () => {
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

      <h1 className="text-4xl font-bold mb-8">Condiciones de Uso</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Aceptación de las Condiciones</h2>
          <p className="text-muted-foreground">
            El acceso y utilización de este sitio web implica la aceptación plena y sin reservas de todas y cada una de las condiciones generales de uso incluidas en el presente documento. En caso de desacuerdo, el usuario debe abstenerse de utilizar este sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Objeto del Sitio Web</h2>
          <p className="text-muted-foreground">
            Este sitio web es una plataforma de demostración que proporciona información sobre películas y series de televisión mediante la API de TMDB. No permite el streaming ni la descarga de contenido protegido por derechos de autor.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Uso del Sitio Web</h2>
          <p className="text-muted-foreground">
            El usuario se compromete a utilizar el sitio web de conformidad con la legislación vigente, las presentes condiciones y las buenas costumbres. Queda prohibido:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Realizar actividades contrarias a la ley, la moral y el orden público</li>
            <li>Efectuar cualquier acto que pueda dañar o inutilizar los sistemas del sitio web</li>
            <li>Intentar acceder a áreas restringidas sin autorización</li>
            <li>Reproducir o distribuir el contenido protegido por derechos de autor</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitación de Responsabilidad</h2>
          <p className="text-muted-foreground">
            Netflix Clone no se hace responsable de los daños y perjuicios que pudieran derivarse del uso de este sitio web. Asimismo, no garantiza la disponibilidad, continuidad ni ausencia de errores en el funcionamiento del sitio.
          </p>
          <p className="text-muted-foreground mt-4">
            Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB. La exactitud de la información proporcionada depende exclusivamente de TMDB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Propiedad Intelectual</h2>
          <p className="text-muted-foreground">
            Todos los derechos de propiedad intelectual sobre el contenido de este sitio web, incluyendo但不限于 código, diseño, imágenes, textos y logotipos, son propiedad exclusiva de Netflix Clone o de sus licenciantes.
          </p>
          <p className="text-muted-foreground mt-4">
            Los datos sobre películas y series son propiedad de The Movie Database (TMDB). Cualquier uso no autorizado del contenido puede constituir una vulneración de las leyes de propiedad intelectual.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Protección de Datos</h2>
          <p className="text-muted-foreground">
            Netflix Clone se compromete a proteger la privacidad de los usuarios conforme a lo establecido en la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales y el Reglamento General de Protección de Datos (RGPD).
          </p>
          <p className="text-muted-foreground mt-4">
            Para más información, consulte nuestra Política de Privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Modificación de las Condiciones</h2>
          <p className="text-muted-foreground">
            Netflix Clone se reserva el derecho de modificar en cualquier momento las presentes condiciones generales de uso. Los cambios serán efectivos desde el momento de su publicación en el sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Legislación Aplicable y Jurisdicción</h2>
          <p className="text-muted-foreground">
            Estas condiciones generales de uso se rigen por la legislación española. Para cualquier controversia que pudiera surgir en relación con el uso del sitio web, las partes se someten a los Juzgados y Tribunales del domicilio del titular del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
          <p className="text-muted-foreground">
            Para cualquier consulta relacionada con estas Condiciones de Uso, puede contactarnos a través del correo electrónico: contacto@netflixclone.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Fecha de Actualización</h2>
          <p className="text-muted-foreground">
            Última actualización: {currentYear}
          </p>
        </section>
      </div>
    </div>
  );
};
