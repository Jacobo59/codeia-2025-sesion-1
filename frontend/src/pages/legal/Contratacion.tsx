import { Link } from 'react-router-dom';

export const Contratacion = () => {
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

      <h1 className="text-4xl font-bold mb-8">Condiciones Generales de Contratación</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Objeto del Contrato</h2>
          <p className="text-muted-foreground">
            Las presentes Condiciones Generales regulan el uso del servicio de catálogo de películas y series ofrecido por Netflix Clone, accesible a través de este sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Aceptación</h2>
          <p className="text-muted-foreground">
            El uso de este sitio web implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en estas Condiciones Generales de Contratación.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Servicios Ofrecidos</h2>
          <p className="text-muted-foreground">
            Netflix Clone ofrece los siguientes servicios:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Navegación y búsqueda de películas y series</li>
            <li>Visualización de información detallada sobre cada título</li>
            <li>Acceso a valoraciones y críticas</li>
            <li>Recomendaciones basadas en preferencias del usuario</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Carácter Gratuito</h2>
          <p className="text-muted-foreground">
            El acceso y uso de este sitio web es gratuito. Netflix Clone se reserva el derecho a modificar en cualquier momento las condiciones y características del servicio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Obligaciones del Usuario</h2>
          <p className="text-muted-foreground">
            El usuario se compromete a:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Utilizar el servicio de manera lícita y respetuosa</li>
            <li>No realizar actividades que puedan dañar el sitio web</li>
            <li>No reproducir, distribuir o explotar comercialmente los contenidos</li>
            <li>Respetar los derechos de propiedad intelectual de terceros</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Propiedad Intelectual</h2>
          <p className="text-muted-foreground">
            Todos los contenidos mostrados en este sitio web (imágenes, descripciones, datos de películas y series) son propiedad de sus respectivos titulares. Netflix Clone actúa únicamente como intermediario mostrando información proporcionada por TMDB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitación de Responsabilidad</h2>
          <p className="text-muted-foreground">
            Netflix Clone no se hace responsable de:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Daños derivados del uso o imposibilidad de uso del servicio</li>
            <li>La precisión, calidad o actualización de la información mostrada</li>
            <li>Daños causados por virus o elementos maliciosos en el sitio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Modificación de las Condiciones</h2>
          <p className="text-muted-foreground">
            Netflix Clone se reserva el derecho a modificar estas Condiciones Generales en cualquier momento. Los usuarios serán notificados de los cambios significativos a través del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Duración y Terminación</h2>
          <p className="text-muted-foreground">
            Estas condiciones tienen vigencia indefinida mientras no se modifique. Netflix Clone puede interrumpir el servicio temporal o definitivamente sin previo aviso.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Legislación Aplicable y Jurisdicción</h2>
          <p className="text-muted-foreground">
            Estas Condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del titular.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contacto</h2>
          <p className="text-muted-foreground">
            Para cualquier consulta relacionada con estas condiciones, puede contactarnos en: contacto@netflixclone.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Fecha de Actualización</h2>
          <p className="text-muted-foreground">
            Última actualización: {currentYear}
          </p>
        </section>
      </div>
    </div>
  );
};
