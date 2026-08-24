// Mock blogs data to serve as fallback when the backend API returns a 500 error
export const MOCK_BLOGS = {
  en: [
    {
      blog_id: 101,
      title: "Renting in Málaga: The Ultimate Guide for Digital Nomads",
      blog_content: `
        <p>Málaga has fast become one of Europe's top destinations for digital nomads, remote workers, and expats. With over 300 days of sunshine a year, a vibrant cultural scene, and excellent connectivity, it’s easy to see why.</p>
        <h3>Finding the Right Area</h3>
        <p>Depending on your lifestyle, you might prefer different neighborhoods. <strong>La Malagueta</strong> is perfect if you want to be close to the beach, while <strong>Centro Histórico</strong> offers historic charm and endless restaurants. For a cooler, artistic vibe, check out <strong>SOHO</strong>.</p>
        <h3>Rental Costs and Requirements</h3>
        <p>Usually, long-term rentals in Spain require a minimum stay of 6 to 12 months. However, platforms like FlexsiRent offer flexible monthly terms which are perfect for stays of 1 to 11 months without excessive paperwork.</p>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-15T10:00:00Z"
    },
    {
      blog_id: 102,
      title: "Top 5 Neighborhoods to Live in Madrid for Young Professionals",
      blog_content: `
        <p>Madrid is a city of distinct neighborhoods (barrios), each with its own unique personality. If you are moving to the Spanish capital for work or study, here are the top places to live:</p>
        <ol>
          <li><strong>Malasaña:</strong> The hipster heart of Madrid, filled with vintage shops and lively cafes.</li>
          <li><strong>Chueca:</strong> Trendy, cosmopolitan, and highly welcoming with a fantastic nightlife.</li>
          <li><strong>Chamberí:</strong> A traditional, quieter neighborhood with beautiful architecture and great tapas spots.</li>
          <li><strong>Salamanca:</strong> Upscale, safe, and home to luxury boutiques and top-tier restaurants.</li>
          <li><strong>La Latina:</strong> Famous for Sunday El Rastro market and traditional tapas bars.</li>
        </ol>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-20T12:00:00Z"
    },
    {
      blog_id: 103,
      title: "How to Secure Mid-Term Stays in Spain Without the Stress",
      blog_content: `
        <p>Securing a flat for a few months in Spain can be challenging. Traditional landlords prefer 5-year contracts, and holiday rentals are too expensive for monthly stays. That is where mid-term (1 to 11 months) rentals come in.</p>
        <h3>Key Documents You Need</h3>
        <p>When renting mid-term, you typically need to prove your identity (passport or NIE) and your financial capability (employment contract, university registration, or bank statements). Undergoing quick digital verification is standard on modern platforms.</p>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-25T14:00:00Z"
    }
  ],
  es: [
    {
      blog_id: 101,
      title: "Alquilar en Málaga: La guía definitiva para nómadas digitales",
      blog_content: `
        <p>Málaga se ha convertido rápidamente en uno de los destinos favoritos de Europa para nómadas digitales y profesionales remotos. Con más de 300 días de sol al año y una oferta cultural vibrante, es fácil entender el porqué.</p>
        <h3>Elegir la zona adecuada</h3>
        <p>Dependiendo de tu estilo de vida, preferirás un barrio u otro. <strong>La Malagueta</strong> es perfecta para estar junto al mar, mientras que el <strong>Centro Histórico</strong> ofrece encanto y una gran oferta gastronómica. Para un ambiente más artístico, destaca <strong>SOHO</strong>.</p>
        <h3>Costes de alquiler y requisitos</h3>
        <p>Normalmente, los alquileres de larga duración exigen un mínimo de 6 a 12 meses. Sin embargo, plataformas como FlexsiRent facilitan alquileres mensuales flexibles, ideales para estancias de 1 a 11 meses sin burocracia excesiva.</p>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-15T10:00:00Z"
    },
    {
      blog_id: 102,
      title: "Los 5 mejores barrios de Madrid para profesionales jóvenes",
      blog_content: `
        <p>Madrid es una ciudad con barrios muy marcados y personalizados. Si te trasladas a la capital por trabajo o estudios, estas son las mejores opciones:</p>
        <ol>
          <li><strong>Malasaña:</strong> El corazón moderno de Madrid, lleno de tiendas vintage y cafeterías animadas.</li>
          <li><strong>Chueca:</strong> Cosmopolita y acogedor, con una fantástica vida nocturna.</li>
          <li><strong>Chamberí:</strong> Un barrio residencial tradicional con arquitectura señorial y excelentes zonas de tapas.</li>
          <li><strong>Salamanca:</strong> Exclusivo, seguro y sede de las principales firmas de moda y restauración.</li>
          <li><strong>La Latina:</strong> Famoso por su ambiente de cañas los domingos y sus tabernas tradicionales.</li>
        </ol>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-20T12:00:00Z"
    },
    {
      blog_id: 103,
      title: "Cómo asegurar alquileres de media estancia en España sin estrés",
      blog_content: `
        <p>Reservar un piso por unos meses en España puede ser complejo. Los propietarios tradicionales prefieren contratos de 5 años y los alquileres turísticos son excesivamente caros. La solución ideal es el alquiler de media estancia (1 a 11 meses).</p>
        <h3>Documentación clave que necesitarás</h3>
        <p>Por lo general, deberás acreditar tu identidad (pasaporte o NIE) y tu solvencia económica (contrato de trabajo, matrícula universitaria o extractos bancarios). Realizar una verificación digital rápida es el estándar en las plataformas modernas.</p>
      `,
      blogImage: [
        { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" }
      ],
      created_at: "2026-06-25T14:00:00Z"
    }
  ]
};

/**
 * Helper to get fallback blogs based on active language/locale.
 */
export function getFallbackBlogs(locale) {
  const cleanLocale = (locale || "en").toLowerCase();
  return MOCK_BLOGS[cleanLocale] || MOCK_BLOGS["en"];
}
