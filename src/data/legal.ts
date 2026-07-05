export type LegalSection = {
  heading: { es: string; en: string };
  paragraphs: { es: string[]; en: string[] };
};

export type LegalPage = {
  slug: string;
  title: { es: string; en: string };
  intro: { es: string; en: string };
  sections: LegalSection[];
};

const OWNER = "Almficode";
const EMAIL = "almfi.code@gmail.com";
const PHONE = "+34 653 48 37 03";

export const legalPages: LegalPage[] = [
  {
    slug: "aviso-legal",
    title: { es: "Aviso legal", en: "Legal notice" },
    intro: {
      es: `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos del titular de este sitio web.`,
      en: `In compliance with Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), users are hereby informed of the identifying details of the owner of this website.`,
    },
    sections: [
      {
        heading: { es: "1. Datos identificativos", en: "1. Identifying details" },
        paragraphs: {
          es: [
            `Titular: ${OWNER}.`,
            `Correo electrónico de contacto: ${EMAIL}.`,
            `Teléfono de contacto: ${PHONE}.`,
            `Actividad: diseño y desarrollo de sitios web, integración de inteligencia artificial, automatización de procesos y mantenimiento web.`,
          ],
          en: [
            `Owner: ${OWNER}.`,
            `Contact email: ${EMAIL}.`,
            `Contact phone: ${PHONE}.`,
            `Activity: website design and development, artificial intelligence integration, process automation and website maintenance.`,
          ],
        },
      },
      {
        heading: { es: "2. Objeto", en: "2. Purpose" },
        paragraphs: {
          es: [
            `El presente aviso legal regula el uso del sitio web de ${OWNER}. La navegación por este sitio atribuye la condición de usuario e implica la aceptación plena de todas las disposiciones incluidas en este aviso legal.`,
            `${OWNER} se reserva el derecho a modificar cualquier tipo de información que pudiera aparecer en el sitio web, sin obligación de preavisar a los usuarios, entendiéndose como suficiente la publicación en este mismo sitio.`,
          ],
          en: [
            `This legal notice governs the use of the ${OWNER} website. Browsing this site grants the status of user and implies full acceptance of every provision included in this legal notice.`,
            `${OWNER} reserves the right to modify any information that may appear on the website without prior notice to users; publication on this site shall be deemed sufficient notice.`,
          ],
        },
      },
      {
        heading: { es: "3. Propiedad intelectual e industrial", en: "3. Intellectual and industrial property" },
        paragraphs: {
          es: [
            `Todos los contenidos de este sitio web (textos, imágenes, diseños, logotipos, código fuente y demás elementos) son titularidad de ${OWNER} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.`,
            `Queda prohibida la reproducción, distribución, comunicación pública o transformación de dichos contenidos sin la autorización expresa de ${OWNER}.`,
          ],
          en: [
            `All content on this website (texts, images, designs, logos, source code and other elements) is owned by ${OWNER} or by third parties who have authorised its use, and is protected by intellectual and industrial property regulations.`,
            `Reproduction, distribution, public communication or transformation of said content without the express authorisation of ${OWNER} is prohibited.`,
          ],
        },
      },
      {
        heading: { es: "4. Responsabilidad", en: "4. Liability" },
        paragraphs: {
          es: [
            `${OWNER} no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, interrupciones, virus informáticos o desconexiones motivadas por causas ajenas a su control, ni de los contenidos de sitios de terceros enlazados desde esta web.`,
          ],
          en: [
            `${OWNER} shall not be liable for any damage arising from interference, interruptions, computer viruses or disconnections caused by circumstances beyond its control, nor for the content of third-party sites linked from this website.`,
          ],
        },
      },
      {
        heading: { es: "5. Legislación aplicable", en: "5. Applicable law" },
        paragraphs: {
          es: [
            `La relación entre ${OWNER} y el usuario se regirá por la normativa española vigente. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a derecho.`,
          ],
          en: [
            `The relationship between ${OWNER} and the user shall be governed by current Spanish law. Any dispute shall be submitted to the competent courts in accordance with the law.`,
          ],
        },
      },
    ],
  },
  {
    slug: "privacidad",
    title: { es: "Política de privacidad", en: "Privacy policy" },
    intro: {
      es: `De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa a los usuarios sobre el tratamiento de sus datos personales.`,
      en: `In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 on the Protection of Personal Data and guarantee of digital rights (LOPDGDD), users are informed about the processing of their personal data.`,
    },
    sections: [
      {
        heading: { es: "1. Responsable del tratamiento", en: "1. Data controller" },
        paragraphs: {
          es: [`Responsable: ${OWNER}. Correo electrónico: ${EMAIL}. Teléfono: ${PHONE}.`],
          en: [`Controller: ${OWNER}. Email: ${EMAIL}. Phone: ${PHONE}.`],
        },
      },
      {
        heading: { es: "2. Datos que se recogen y finalidad", en: "2. Data collected and purpose" },
        paragraphs: {
          es: [
            `Este sitio web no dispone de formularios propios de recogida de datos. Los datos personales que el usuario facilite voluntariamente al contactar por WhatsApp, correo electrónico o teléfono (nombre, número de teléfono, dirección de correo y el contenido del mensaje) se utilizarán exclusivamente para atender su consulta, elaborar presupuestos y gestionar la relación comercial.`,
            `La base jurídica del tratamiento es el consentimiento del usuario al iniciar el contacto y, en su caso, la ejecución de un contrato o medidas precontractuales.`,
          ],
          en: [
            `This website does not include its own data collection forms. Personal data voluntarily provided by users when contacting us via WhatsApp, email or phone (name, phone number, email address and the content of the message) will be used exclusively to answer the enquiry, prepare quotes and manage the business relationship.`,
            `The legal basis for processing is the user's consent when initiating contact and, where applicable, the performance of a contract or pre-contractual measures.`,
          ],
        },
      },
      {
        heading: { es: "3. Conservación de los datos", en: "3. Data retention" },
        paragraphs: {
          es: [
            `Los datos se conservarán durante el tiempo necesario para atender la solicitud y, en su caso, durante los plazos legalmente exigidos para atender posibles responsabilidades.`,
          ],
          en: [
            `Data will be kept for as long as necessary to deal with the request and, where applicable, for the periods legally required to address potential liabilities.`,
          ],
        },
      },
      {
        heading: { es: "4. Destinatarios", en: "4. Recipients" },
        paragraphs: {
          es: [
            `No se cederán datos a terceros salvo obligación legal. Los proveedores tecnológicos utilizados (alojamiento web, mensajería) pueden actuar como encargados del tratamiento conforme a sus propias políticas de privacidad.`,
          ],
          en: [
            `Data will not be transferred to third parties except where legally required. The technology providers used (web hosting, messaging) may act as data processors in accordance with their own privacy policies.`,
          ],
        },
      },
      {
        heading: { es: "5. Derechos del usuario", en: "5. User rights" },
        paragraphs: {
          es: [
            `El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un correo a ${EMAIL}, indicando el derecho que desea ejercer.`,
            `Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa.`,
          ],
          en: [
            `Users may exercise their rights of access, rectification, erasure, objection, restriction of processing and portability by sending an email to ${EMAIL}, indicating the right they wish to exercise.`,
            `Users also have the right to file a complaint with the Spanish Data Protection Agency (www.aepd.es) if they consider that the processing does not comply with the regulations.`,
          ],
        },
      },
    ],
  },
  {
    slug: "cookies",
    title: { es: "Política de cookies", en: "Cookie policy" },
    intro: {
      es: `Esta política explica qué son las cookies, qué tipo de cookies utiliza este sitio web y cómo puedes gestionarlas.`,
      en: `This policy explains what cookies are, which types of cookies this website uses and how you can manage them.`,
    },
    sections: [
      {
        heading: { es: "1. ¿Qué son las cookies?", en: "1. What are cookies?" },
        paragraphs: {
          es: [
            `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario para recordar información sobre su visita, como el idioma preferido u otras opciones de configuración.`,
          ],
          en: [
            `Cookies are small text files that websites store on the user's device to remember information about their visit, such as preferred language or other settings.`,
          ],
        },
      },
      {
        heading: { es: "2. Cookies utilizadas en este sitio", en: "2. Cookies used on this site" },
        paragraphs: {
          es: [
            `Este sitio web utiliza únicamente cookies y tecnologías de almacenamiento técnicas estrictamente necesarias para su funcionamiento: recordar el idioma seleccionado y el estado de la pantalla de carga durante la sesión. Estas cookies no requieren consentimiento según la normativa vigente.`,
            `No utilizamos cookies analíticas, publicitarias ni de seguimiento de terceros.`,
          ],
          en: [
            `This website only uses cookies and technical storage strictly necessary for its operation: remembering the selected language and the loading screen state during the session. These cookies do not require consent under current regulations.`,
            `We do not use analytics, advertising or third-party tracking cookies.`,
          ],
        },
      },
      {
        heading: { es: "3. Cookies de terceros", en: "3. Third-party cookies" },
        paragraphs: {
          es: [
            `Algunos servicios enlazados desde esta web (como WhatsApp o Calendly) pueden instalar sus propias cookies cuando el usuario accede a ellos. Dichas cookies se rigen por las políticas de privacidad de sus respectivos titulares.`,
          ],
          en: [
            `Some services linked from this website (such as WhatsApp or Calendly) may set their own cookies when the user accesses them. Those cookies are governed by the privacy policies of their respective owners.`,
          ],
        },
      },
      {
        heading: { es: "4. Cómo gestionar las cookies", en: "4. How to manage cookies" },
        paragraphs: {
          es: [
            `El usuario puede configurar su navegador para bloquear o eliminar las cookies. A continuación se indican los enlaces de ayuda de los principales navegadores: Chrome, Firefox, Safari y Edge disponen de secciones específicas en sus ajustes de privacidad para gestionar cookies.`,
            `Ten en cuenta que bloquear las cookies técnicas puede afectar al correcto funcionamiento de algunas partes del sitio.`,
          ],
          en: [
            `Users can configure their browser to block or delete cookies. The main browsers — Chrome, Firefox, Safari and Edge — provide specific sections in their privacy settings to manage cookies.`,
            `Please note that blocking technical cookies may affect the proper functioning of some parts of the site.`,
          ],
        },
      },
    ],
  },
];
