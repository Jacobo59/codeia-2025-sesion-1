import { Link } from 'react-router-dom';

export const Privacidad = () => {
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

      <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Responsable del Tratamiento</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Responsable:</strong> Netflix Clone</li>
            <li><strong>Contacto:</strong> contacto@netflixclone.com</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Datos Recopilados</h2>
          <p className="text-muted-foreground">
            Este sitio web puede recopilar los siguientes tipos de datos:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de conexión.</li>
            <li><strong>Datos de cookies:</strong> Información almacenada en su dispositivo para mejorar la experiencia de navegación.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Finalidad del Tratamiento</h2>
          <p className="text-muted-foreground">
            Los datos recopilados se utilizan con las siguientes finalidades:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>Prestar los servicios solicitados por el usuario</li>
            <li>Mejorar la funcionalidad y experiencia de usuario del sitio web</li>
            <li>Analizar el tráfico y el comportamiento de los usuarios</li>
            <li>Garantizar la seguridad del sitio web</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Base Legal</h2>
          <p className="text-muted-foreground">
            El tratamiento de sus datos personales se basa en el consentimiento del usuario y en el interés legítimo para la mejora del servicio, conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Destinatarios</h2>
          <p className="text-muted-foreground">
            Los datos personales no serán comunicados a terceros, salvo obligación legal o cuando sea necesario para la prestación del servicio. Los datos podrán ser tratados por proveedores de servicios autorizados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Derechos del Usuario</h2>
          <p className="text-muted-foreground">
            El usuario tiene derecho a:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li><strong>Acceso:</strong> Solicitar información sobre sus datos personales</li>
            <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
            <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</li>
            <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento de sus datos</li>
            <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado</li>
            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Para ejercer estos derechos, puede contactarnos en: contacto@netflixclone.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Conservación de Datos</h2>
          <p className="text-muted-foreground">
            Los datos personales se conservarán mientras exista una relación con el usuario o mientras sea necesario para cumplir con las obligaciones legales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Seguridad</h2>
          <p className="text-muted-foreground">
            Netflix Clone adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
          <p className="text-muted-foreground">
            Para más información sobre el uso de cookies, consulte nuestra Política de Cookies.
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
