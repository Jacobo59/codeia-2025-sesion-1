import { Link } from 'react-router-dom';

export const AvisoLegal = () => {
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

      <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Información General</h2>
          <p className="text-muted-foreground">
            En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se pone a disposición de los usuarios la siguiente información:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li><strong>Titular:</strong> Netflix Clone</li>
            <li><strong>Domicilio:</strong> [Dirección del titular]</li>
            <li><strong>Correo electrónico:</strong> contacto@netflixclone.com</li>
            <li><strong>Finalidad:</strong> Plataforma de visualización de catálogo de películas y series</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Objeto</h2>
          <p className="text-muted-foreground">
            Este sitio web es una aplicación de demostración que permite a los usuarios navegar y buscar información sobre películas y series de televisión. Todos los datos son proporcionados por The Movie Database (TMDB).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Propiedad Intelectual</h2>
          <p className="text-muted-foreground">
            Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB. Todos los derechos de las películas, series, carteles y contenidos audiovisuales mostrados en este sitio pertenecen a sus respectivos propietarios.
          </p>
          <p className="text-muted-foreground mt-4">
            Los elementos de diseño, código fuente, marcas, logotipos y demás elementos que componen este sitio web son propiedad exclusiva de Netflix Clone o han sido licenciados por terceros.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Responsabilidad</h2>
          <p className="text-muted-foreground">
            Netflix Clone no se hace responsable de los daños y perjuicios que pudieran derivarse del uso de este sitio web ni de la información contenida en el mismo. Asimismo, no garantiza la disponibilidad ni continuidad del funcionamiento del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Legislación Aplicable</h2>
          <p className="text-muted-foreground">
            Estas condiciones generales se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del titular del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
          <p className="text-muted-foreground">
            Para cualquier consulta relacionada con este Aviso Legal, puede contactarnos a través del correo electrónico: contacto@netflixclone.com
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
