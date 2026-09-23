import type { Metadata } from 'next'
import React from 'react'

import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Aviso de privacidad | Radar Mex',
  description:
    'Aviso de privacidad de Radar Mex. Conoce cómo tratamos tus datos personales conforme a la legislación mexicana aplicable.',
}

export default function PrivacidadPage() {
  return (
    <LegalDocument title="Aviso de privacidad" updatedAt="23 de septiembre de 2026">
      <p>
        En Radar Mex respetamos tu privacidad. Este aviso describe cómo tratamos los datos
        personales que pudieran recabarse a través de este sitio web, de conformidad con la Ley
        Federal de Protección de Datos Personales en Posesión de los Particulares y demás
        normativa aplicable en México.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos personales es Radar Mex (en adelante, «Radar
        Mex» o «nosotros»). Para ejercer tus derechos o aclarar dudas sobre este aviso, puedes
        contactarnos a través de los canales oficiales publicados en el Sitio.
      </p>

      <h2>2. Datos que podemos recabar</h2>
      <p>Según el uso que hagas del Sitio, podríamos tratar:</p>
      <ul>
        <li>
          Datos de identificación y contacto que nos proporciones voluntariamente (por ejemplo,
          nombre o correo electrónico en formularios).
        </li>
        <li>
          Datos técnicos de navegación (dirección IP, tipo de navegador, páginas visitadas,
          fecha/hora de acceso) mediante cookies o tecnologías similares.
        </li>
        <li>Información estadística agregada sobre el uso del Sitio.</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Los datos personales se tratan para las siguientes finalidades:</p>
      <ul>
        <li>Operar, mantener y mejorar el Sitio.</li>
        <li>Responder solicitudes, comentarios o comunicaciones que nos envíes.</li>
        <li>Analizar el uso del Sitio de forma agregada para mejorar contenidos y experiencia.</li>
        <li>Cumplir obligaciones legales aplicables.</li>
      </ul>

      <h2>4. Cookies y tecnologías similares</h2>
      <p>
        El Sitio puede utilizar cookies propias o de terceros para recordar preferencias (por
        ejemplo, el tema claro/oscuro), medir audiencia o mejorar el rendimiento. Puedes configurar
        tu navegador para rechazar o eliminar cookies; ten en cuenta que algunas funciones del Sitio
        podrían verse afectadas.
      </p>

      <h2>5. Transferencias</h2>
      <p>
        No vendemos tus datos personales. Podríamos compartir información con proveedores que nos
        auxilian en la operación del Sitio (alojamiento, analítica u otros servicios técnicos),
        únicamente en la medida necesaria para prestar dichos servicios y bajo obligaciones de
        confidencialidad. También podremos revelar datos cuando lo exija la ley o una autoridad
        competente.
      </p>

      <h2>6. Conservación</h2>
      <p>
        Conservaremos los datos personales solo durante el tiempo necesario para las finalidades
        descritas o el que exija la legislación aplicable.
      </p>

      <h2>7. Derechos ARCO y revocación del consentimiento</h2>
      <p>
        Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos
        personales (derechos ARCO), así como a revocar el consentimiento otorgado, en los términos
        de la ley. Para ejercerlos, envía tu solicitud a través de los canales de contacto del
        Sitio, indicando claramente tu petición y los datos necesarios para atenderla.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Implementamos medidas administrativas, técnicas y físicas razonables para proteger los datos
        personales contra daño, pérdida, alteración, destrucción o uso no autorizado. Ningún
        sistema es totalmente seguro; te recomendamos no enviar información sensible por canales no
        cifrados.
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        El Sitio no está dirigido a menores de edad. Si eres padre, madre o tutor y crees que un
        menor nos ha proporcionado datos personales, contáctanos para gestionar su eliminación
        cuando proceda.
      </p>

      <h2>10. Cambios a este aviso</h2>
      <p>
        Podemos actualizar este aviso de privacidad en cualquier momento. La versión vigente se
        publicará en esta página con su fecha de actualización.
      </p>

      <h2>11. Consentimiento</h2>
      <p>
        Al utilizar el Sitio, reconoces haber leído este aviso de privacidad. Cuando la ley lo
        requiera, te solicitaremos tu consentimiento de forma expresa para finalidades específicas.
      </p>
    </LegalDocument>
  )
}
