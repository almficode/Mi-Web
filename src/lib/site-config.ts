export const siteConfig = {
  name: "Almficode",
  url: "https://almficode.com", // TODO: sustituir por el dominio definitivo
  email: "almfi.code@gmail.com",
  whatsappNumber: "34653483703", // +34 653 48 37 03
  social: {
    instagram: "#", // TODO: enlace real de Instagram
    linkedin: "#", // TODO: enlace real de LinkedIn
    x: "#", // TODO: enlace real de X/Twitter
  },
  calendlyUrl: "https://calendly.com/almficode/consulta", // TODO: enlace real de Calendly
} as const;

export function whatsappHref(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
