import type { Metadata } from 'next'
import React from 'react'

import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Términos y condiciones | Radar Mex',
  description:
    'Términos y condiciones de uso del sitio web de Radar Mex. Consulta las reglas de acceso, contenido y responsabilidad.',
}

export default function TerminosPage() {
  return (
    <LegalDocument title="Términos y condiciones" updatedAt="23 de septiembre de 2026">
      <p>
        Bienvenido a Radar Mex. Al acceder o utilizar este sitio web, aceptas los presentes términos
        y condiciones. Si no estás de acuerdo con ellos, te pedimos que no utilices el sitio.
      </p>

      <h2>1. Identificación</h2>
      <p>
        Este sitio es operado por Radar Mex (en adelante, «Radar Mex», «nosotros» o «el Sitio»). El
        objeto del Sitio es ofrecer información periodística, análisis y contenidos de interés
        general.
      </p>

      <h2>2. Uso del sitio</h2>
      <p>Te comprometes a utilizar el Sitio de forma lícita y respetuosa. Queda prohibido:</p>
      <ul>
        <li>Usar el Sitio para actividades ilegales o no autorizadas.</li>
        <li>Intentar vulnerar la seguridad, el funcionamiento o la integridad del Sitio.</li>
        <li>
          Reproducir, distribuir o explotar comercialmente el contenido sin autorización previa y
          por escrito, salvo lo permitido por la ley aplicable.
        </li>
        <li>Suplantar la identidad de otra persona o entidad.</li>
      </ul>

      <h2>3. Contenido</h2>
      <p>
        El contenido publicado en Radar Mex —incluyendo textos, imágenes, gráficos, logotipos y
        demás materiales— es propiedad de Radar Mex o de sus respectivos titulares y está protegido
        por las leyes de propiedad intelectual aplicables.
      </p>
      <p>
        La información se ofrece con fines informativos. Aunque procuramos la exactitud y
        actualización de los contenidos, no garantizamos que estén libres de errores, omisiones o
        que sean adecuados para un propósito particular.
      </p>

      <h2>4. Enlaces a terceros</h2>
      <p>
        El Sitio puede incluir enlaces a sitios o servicios de terceros. Radar Mex no controla ni es
        responsable del contenido, políticas o prácticas de dichos sitios. El acceso a ellos es bajo
        tu propia responsabilidad.
      </p>

      <h2>5. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley, Radar Mex no será responsable por daños directos,
        indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del
        Sitio, ni por decisiones tomadas con base en la información publicada.
      </p>

      <h2>6. Disponibilidad del servicio</h2>
      <p>
        Podemos modificar, suspender o interrumpir total o parcialmente el Sitio en cualquier
        momento, con o sin previo aviso, por mantenimiento, actualización o causas de fuerza mayor.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de actualizar estos términos en cualquier momento. La versión
        vigente se publicará en esta página con su fecha de actualización. El uso continuado del
        Sitio tras los cambios implica la aceptación de los mismos.
      </p>

      <h2>8. Legislación aplicable</h2>
      <p>
        Estos términos se rigen por las leyes aplicables en los Estados Unidos Mexicanos. Cualquier
        controversia se someterá a los tribunales competentes conforme a la legislación mexicana.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para consultas relacionadas con estos términos, puedes contactarnos a través de los canales
        oficiales publicados en el Sitio.
      </p>
    </LegalDocument>
  )
}
