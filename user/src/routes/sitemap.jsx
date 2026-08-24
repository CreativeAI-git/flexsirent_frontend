import axios from "axios";
import { BASE_URL, webPropertiesAPI, blogsAPI } from "../shared/routes/apiURLs";
import { generateSlug } from "../shared/utils/slugs";

export async function loader() {
  const languages = ["en", "es"];
  const staticPaths = [
    "",
    "/become-a-host",
    "/properties",
    "/blogs",
    "/help",
    "/terms-and-condotions",
    "/privacy-policy",
    "/cancellation-policy",
  ];

  const cities = ["pune", "mumbai", "madrid", "barcelona"];
  const neighborhoodMap = {
    pune: ["koregaon-park", "kalyani-nagar", "viman-nagar", "baner", "hinjewadi"],
    mumbai: ["bandra", "andheri", "juhu", "colaba", "powai"],
    madrid: ["sol", "chueca", "malasana", "retiro", "salamanca"],
    barcelona: ["gracia", "gothic-quarter", "eixample", "el-born", "poblenou"]
  };

  let properties = [];
  let blogs = [];

  try {
    const [propRes, blogRes] = await Promise.all([
      axios.get(`${BASE_URL}${webPropertiesAPI}`),
      axios.get(`${BASE_URL}${blogsAPI}`),
    ]);
    properties = propRes.data?.data || [];
    blogs = blogRes.data?.data || [];
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static paths for each language
  for (const lang of languages) {
    for (const path of staticPaths) {
      const url = `https://flexsirent.com/${lang}${path}`;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  // Add City and Neighborhood Page paths
  for (const city of cities) {
    for (const lang of languages) {
      const cityUrl = `https://flexsirent.com/${lang}/c/${city}`;
      xml += `  <url>\n`;
      xml += `    <loc>${cityUrl}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;

      const hoods = neighborhoodMap[city] || [];
      for (const hood of hoods) {
        const hoodUrl = `https://flexsirent.com/${lang}/c/${city}/${hood}`;
        xml += `  <url>\n`;
        xml += `    <loc>${hoodUrl}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.80</priority>\n`;
        xml += `  </url>\n`;
      }
    }
  }

  // Add property detail paths
  for (const prop of properties) {
    for (const lang of languages) {
      const url = `https://flexsirent.com/${lang}/l/${prop.property_id}`;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  // Add blog detail paths
  for (const blog of blogs) {
    const slug = generateSlug(blog.title, blog.blog_id);
    for (const lang of languages) {
      const url = `https://flexsirent.com/${lang}/blog-details/${slug}`;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


