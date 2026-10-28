import { useEffect } from 'react';

/**
 * Hook to inject dynamic SEO metadata into document head:
 * - <title>
 * - <meta name="description">
 * - <meta name="keywords">
 * - <meta name="robots">
 * - Open Graph: og:title, og:description, og:url, og:type, og:image
 * - Twitter Card: twitter:card, twitter:title, twitter:description
 * - Canonical link tag
 * - JSON-LD Structured Data (Schema.org Service/LocalBusiness)
 */
export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl = window.location.href,
  ogType = 'home appliance service doorsteprepairservices.com',
  ogImage = '/hero-technician.jpg',
  structuredData = null
}) {
  useEffect(() => {
    // 1. Title Tag
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'author', 'Doorstep Repair Service');
    setMetaTag('name', 'geo.region', 'IN-AP');
    setMetaTag('name', 'geo.placename', 'Vijayawada, Guntur, Nellore');

    // 3. Open Graph (OG) Tags for Social & WhatsApp link previews
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:site_name', 'Doorstep Repair Service');
    setMetaTag('property', 'og:locale', 'en_IN');
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : window.location.origin + ogImage;
      setMetaTag('property', 'og:image', fullImageUrl);
    }

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : window.location.origin + ogImage;
      setMetaTag('name', 'twitter:image', fullImageUrl);
    }

    // 5. Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema (Structured Data)
    let schemaScript = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (structuredData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'seo-schema');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, structuredData]);
}
