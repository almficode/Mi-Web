export type BlogPost = {
  slug: string;
  date: string;
  readingMinutes: number;
  category: { es: string; en: string };
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  content: { es: string[]; en: string[] };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "chatbot-ia-2026",
    date: "2026-05-12",
    readingMinutes: 5,
    category: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    title: {
      es: "Por qué tu web necesita un chatbot con IA en 2026",
      en: "Why your website needs an AI chatbot in 2026",
    },
    excerpt: {
      es: "La atención al cliente ya no descansa nunca. Así es como un chatbot con IA cambia la forma en que tu negocio capta y retiene clientes.",
      en: "Customer support never sleeps anymore. Here's how an AI chatbot changes the way your business captures and retains customers.",
    },
    content: {
      es: [
        "Cada minuto que un visitante espera una respuesta es una oportunidad que se enfría. En 2026, los negocios que compiten de verdad ya no dependen únicamente de un formulario de contacto: tienen un asistente disponible las 24 horas, capaz de responder dudas, cualificar clientes potenciales y escalar la conversación a una persona real cuando hace falta.",
        "Un chatbot con IA bien entrenado no es un árbol de decisiones rígido de hace diez años. Entiende el lenguaje natural, conoce el catálogo o los servicios de tu negocio al detalle, y aprende de cada conversación para responder mejor la siguiente vez. La diferencia se nota especialmente fuera del horario comercial, en fines de semana, o durante picos de tráfico tras una campaña.",
        "En Almficode integramos estos asistentes directamente en tu web, conectados a tu información real: precios, disponibilidad, horarios o procesos internos. El resultado es un chatbot que no improvisa, que capta datos de contacto de forma natural y que reduce la carga de tu equipo en las preguntas repetitivas.",
        "Si tu negocio recibe consultas similares una y otra vez, o pierdes clientes potenciales fuera de horario, es probablemente el momento de automatizar esa primera conversación con Inteligencia Artificial.",
      ],
      en: [
        "Every minute a visitor waits for a reply is an opportunity cooling off. In 2026, businesses that truly compete no longer rely solely on a contact form: they have an assistant available 24 hours a day, able to answer questions, qualify leads, and hand off the conversation to a real person when needed.",
        "A well-trained AI chatbot is not the rigid decision tree of ten years ago. It understands natural language, knows your catalog or services in detail, and learns from every conversation to answer better the next time. The difference is especially noticeable outside business hours, on weekends, or during traffic spikes after a campaign.",
        "At Almficode we integrate these assistants directly into your website, connected to your real information: pricing, availability, schedules or internal processes. The result is a chatbot that doesn't improvise, captures contact details naturally, and reduces your team's load on repetitive questions.",
        "If your business gets the same questions over and over, or loses leads outside business hours, it's probably time to automate that first conversation with Artificial Intelligence.",
      ],
    },
  },
  {
    slug: "senales-automatizacion",
    date: "2026-04-03",
    readingMinutes: 4,
    category: { es: "Automatización", en: "Automation" },
    title: {
      es: "5 señales de que tu negocio necesita automatización",
      en: "5 signs your business needs automation",
    },
    excerpt: {
      es: "Si tu equipo repite las mismas tareas manuales cada semana, probablemente estés perdiendo tiempo y dinero que la automatización puede recuperar.",
      en: "If your team repeats the same manual tasks every week, you're probably losing time and money that automation can recover.",
    },
    content: {
      es: [
        "La automatización no es solo para grandes empresas con departamentos de IT. Cualquier negocio que dependa de tareas repetitivas puede beneficiarse de conectar sus herramientas y dejar que trabajen solas.",
        "1. Copias datos manualmente entre aplicaciones — Si copias y pegas información entre tu web, tu hoja de cálculo y tu CRM, ese proceso puede automatizarse en minutos y sin errores humanos.",
        "2. Respondes los mismos emails una y otra vez — Confirmaciones, recordatorios o seguimientos repetitivos son candidatos perfectos para automatizar.",
        "3. Pierdes clientes potenciales por falta de seguimiento — Un flujo automatizado puede contactar a cada lead en el momento exacto, sin que se te olvide.",
        "4. Tu equipo dedica horas a tareas administrativas — Generación de informes, facturas o actualizaciones de estado pueden ejecutarse solas.",
        "5. Tus herramientas no se hablan entre sí — Si usas varias plataformas que no están conectadas, cada desconexión es tiempo perdido.",
        "En Almficode auditamos tus procesos actuales y diseñamos automatizaciones a medida que conectan las herramientas que ya usas, sin necesidad de cambiar todo tu flujo de trabajo.",
      ],
      en: [
        "Automation isn't just for large companies with IT departments. Any business that relies on repetitive tasks can benefit from connecting its tools and letting them work on their own.",
        "1. You copy data manually between apps — If you copy and paste information between your website, your spreadsheet and your CRM, that process can be automated in minutes without human error.",
        "2. You answer the same emails over and over — Repetitive confirmations, reminders or follow-ups are perfect candidates for automation.",
        "3. You lose leads due to lack of follow-up — An automated flow can reach out to every lead at the exact right moment, without you having to remember.",
        "4. Your team spends hours on admin tasks — Report generation, invoices or status updates can run on their own.",
        "5. Your tools don't talk to each other — If you use several platforms that aren't connected, every disconnect is wasted time.",
        "At Almficode we audit your current processes and design custom automations that connect the tools you already use, without needing to change your entire workflow.",
      ],
    },
  },
  {
    slug: "nextjs-vs-wordpress",
    date: "2026-02-18",
    readingMinutes: 6,
    category: { es: "Desarrollo web", en: "Web development" },
    title: {
      es: "Next.js vs WordPress: qué elegir para tu negocio en 2026",
      en: "Next.js vs WordPress: what to choose for your business in 2026",
    },
    excerpt: {
      es: "Ambas opciones pueden construir una web, pero no todas escalan igual, cargan igual de rápido, ni se integran igual de bien con IA.",
      en: "Both options can build a website, but they don't scale the same, don't load equally fast, and don't integrate equally well with AI.",
    },
    content: {
      es: [
        "WordPress sigue siendo una opción válida para blogs sencillos o webs de contenido que no necesitan mucho más que un editor visual. Pero cuando el rendimiento, la seguridad y la integración de funcionalidades avanzadas importan, las diferencias con un desarrollo a medida en Next.js se notan rápido.",
        "Velocidad de carga: Next.js genera páginas optimizadas desde el servidor, con carga casi instantánea. WordPress, al depender de plugins y bases de datos consultadas en cada visita, suele ser más lento salvo que se invierta mucho en optimización adicional.",
        "Seguridad: cada plugin de WordPress es una puerta de entrada potencial. Un desarrollo a medida en Next.js reduce drásticamente esa superficie de ataque.",
        "Escalabilidad: añadir un chatbot con IA, automatizaciones o integraciones personalizadas es mucho más flexible en código propio que dentro de las limitaciones de un plugin de WordPress.",
        "Mantenimiento a largo plazo: sin actualizaciones constantes de decenas de plugins, un proyecto en Next.js es más predecible y estable con el tiempo.",
        "Si tu negocio depende de tu web para captar y convertir clientes, la inversión en un desarrollo a medida se recupera rápidamente en velocidad, conversiones y tranquilidad.",
      ],
      en: [
        "WordPress is still a valid option for simple blogs or content sites that don't need much more than a visual editor. But when performance, security and advanced feature integration matter, the differences with a custom Next.js build show up quickly.",
        "Loading speed: Next.js generates optimized pages from the server, with near-instant load times. WordPress, relying on plugins and database queries on every visit, tends to be slower unless a lot is invested in extra optimization.",
        "Security: every WordPress plugin is a potential entry point. A custom Next.js build drastically reduces that attack surface.",
        "Scalability: adding an AI chatbot, automations or custom integrations is far more flexible in custom code than within the limitations of a WordPress plugin.",
        "Long-term maintenance: without constant updates for dozens of plugins, a Next.js project is more predictable and stable over time.",
        "If your business depends on your website to capture and convert customers, the investment in a custom build pays off quickly in speed, conversions and peace of mind.",
      ],
    },
  },
];
