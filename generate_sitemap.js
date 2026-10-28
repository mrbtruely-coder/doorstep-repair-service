import fs from 'fs';
import { CITIES, SERVICE_CATEGORIES } from './src/constants/data.js';
import { areaToSlug } from './src/utils/slugUtils.js';

const domain = 'https://doorsteprepairservices.com';
const lastMod = new Date().toISOString().split('T')[0];

const routes = [];

// 1. Core pages
routes.push({ path: '', priority: '1.0', changefreq: 'daily' });
routes.push({ path: '/services', priority: '0.9', changefreq: 'daily' });
routes.push({ path: '/service-center', priority: '0.9', changefreq: 'daily' });
routes.push({ path: '/book', priority: '0.9', changefreq: 'daily' });
routes.push({ path: '/about', priority: '0.7', changefreq: 'monthly' });
routes.push({ path: '/faq', priority: '0.7', changefreq: 'monthly' });
routes.push({ path: '/contact', priority: '0.8', changefreq: 'monthly' });
routes.push({ path: '/terms', priority: '0.5', changefreq: 'monthly' });
routes.push({ path: '/policy', priority: '0.5', changefreq: 'monthly' });

// 2. Service categories (/services/:category)
SERVICE_CATEGORIES.forEach(cat => {
  routes.push({ path: `/services/${cat.id}`, priority: '0.8', changefreq: 'weekly' });
});

// 3. City Hubs (/service-center/:city)
CITIES.forEach(city => {
  routes.push({ path: `/service-center/${city.id}`, priority: '0.9', changefreq: 'weekly' });
  
  // 4. All sub-areas/colonies (/service-center/:city/:area)
  city.keyColonies.forEach(colony => {
    const slug = areaToSlug(colony);
    routes.push({ path: `/service-center/${city.id}/${slug}`, priority: '0.8', changefreq: 'weekly' });
    
    // 5. High-intent Area + Service routes (/service-center/:city/:area/:category)
    SERVICE_CATEGORIES.forEach(cat => {
      routes.push({ path: `/service-center/${city.id}/${slug}/${cat.id}`, priority: '0.7', changefreq: 'weekly' });
    });
  });
});

// XML generation with XSL stylesheet header for clean browser styling
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const r of routes) {
  xml += '  <url>\n';
  xml += `    <loc>${domain}${r.path}${r.path === '' ? '/' : ''}</loc>\n`;
  xml += `    <lastmod>${lastMod}</lastmod>\n`;
  xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
  xml += `    <priority>${r.priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync('./public/sitemap.xml', xml);
console.log(`Created comprehensive public/sitemap.xml with ${routes.length} industry-level indexed URLs!`);
