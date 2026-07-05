export type Project = {
  id: string;
  category: { es: string; en: string };
  name: { es: string; en: string };
  description: { es: string; en: string };
  href: string;
  image: string;
};

/**
 * Proyectos reales entregados a clientes. Añade uno nuevo copiando
 * el mismo formato: id único, imagen de portada en public/projects/,
 * categoría/nombre/descripción en ES y EN, y el href al sitio en producción.
 */
export const projects: Project[] = [
  {
    id: "enjoy-asian-restaurant",
    image: "/projects/enjoy-asian-restaurant.png",
    category: { es: "Restaurante asiático", en: "Asian restaurant" },
    name: { es: "Enjoy Asian Restaurant", en: "Enjoy Asian Restaurant" },
    description: {
      es: "Sushi, teppanyaki y cocina thai frente a la playa de Puerto del Carmen, Lanzarote.",
      en: "Sushi, teppanyaki and Thai cuisine on the beachfront of Puerto del Carmen, Lanzarote.",
    },
    href: "https://www.enjoyasianrestaurants.com",
  },
  {
    id: "bianco-ristorante",
    image: "/projects/bianco-ristorante.png",
    category: { es: "Restaurante italiano", en: "Italian restaurant" },
    name: { es: "Bianco Ristorante", en: "Bianco Ristorante" },
    description: {
      es: "Restaurante italiano y cocktail bar frente al mar en Puerto del Carmen, Lanzarote.",
      en: "Italian beachfront restaurant and cocktail bar in Puerto del Carmen, Lanzarote.",
    },
    href: "https://www.biancoristorantelanzarote.com",
  },
  {
    id: "la-pappardella",
    image: "/projects/la-pappardella.png",
    category: { es: "Restaurante italiano", en: "Italian restaurant" },
    name: { es: "La Pappardella", en: "La Pappardella" },
    description: {
      es: "Auténtica cocina italiana con vistas al Atlántico en Puerto Calero, Lanzarote.",
      en: "Authentic Italian cuisine with Atlantic views in Puerto Calero, Lanzarote.",
    },
    href: "https://la-pappardella-pi.vercel.app",
  },
  {
    id: "pizzeria-gigi",
    image: "/projects/pizzeria-gigi.png",
    category: { es: "Pizzería", en: "Pizzeria" },
    name: { es: "Pizzeria Gigi", en: "Pizzeria Gigi" },
    description: {
      es: "Más de 30 años de pizza artesanal con ingredientes traídos de Italia, en Arrecife.",
      en: "Over 30 years of artisan pizza made with ingredients imported from Italy, in Arrecife.",
    },
    href: "https://pizzeriagigi.vercel.app",
  },
  {
    id: "farmacia-los-robles",
    image: "/projects/farmacia-los-robles.png",
    category: { es: "Farmacia", en: "Pharmacy" },
    name: { es: "Farmacia Los Robles", en: "Farmacia Los Robles" },
    description: {
      es: "Farmacia en Arrecife con salud, cosmética y bienestar desde 2004.",
      en: "Pharmacy in Arrecife offering health, cosmetics and wellness services since 2004.",
    },
    href: "https://farmacia-los-robles.vercel.app",
  },
];
