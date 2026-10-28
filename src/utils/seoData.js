/**
 * SEO Metadata Generator for Doorstep Repair Service
 * 
 * Strict Formula Applied to Every Page:
 * Based on: DOMAIN URL (doorsteprepairservices.com) + TARGET CITIES (Vijayawada, Guntur, Nellore) + TARGET SERVICES (AC, Fridge, Washing Machine, Oven, Geyser, TV)
 * 
 * 1. Keywords: STRICTLY SMALL LETTERS (lowercase), strictly LESS THAN 10 words (< 10 words total)
 * 2. Title: EXACTLY up to ~90 characters (80 - 90 chars target)
 * 3. Description: EXACTLY up to ~250 characters (235 - 250 chars target)
 * 4. Open Graph Type (og:type): "home appliance service doorsteprepairservices.com" for all pages
 */

import { areaToSlug } from './slugUtils';
import { SERVICE_CATEGORIES } from '../constants/data';

// Standard business domain OG type requested by user:
export const OG_TYPE_BUSINESS = "home appliance service doorsteprepairservices.com";

// Helper to enforce keywords in SMALL LETTERS and strictly < 10 words total
export function formatSEOKeywords(inputKeywords, maxWords = 9) {
  const items = Array.isArray(inputKeywords) ? inputKeywords : String(inputKeywords || '').split(',');
  const selectedPhrases = [];
  let totalWordCount = 0;

  for (const item of items) {
    const trimmed = item.trim().toLowerCase(); // Enforce small letters
    if (!trimmed) continue;
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (totalWordCount + words.length <= maxWords) {
      selectedPhrases.push(trimmed);
      totalWordCount += words.length;
    }
  }

  // Fallback if the first phrase was longer than maxWords
  if (selectedPhrases.length === 0 && items.length > 0) {
    const firstWords = items[0].trim().toLowerCase().split(/\s+/).filter(Boolean).slice(0, maxWords);
    return firstWords.join(' ');
  }

  return selectedPhrases.join(', ').toLowerCase();
}

// Helper to enforce description up to 250 characters
export function formatSEODescription(desc, maxChars = 250) {
  if (!desc) return '';
  let clean = desc.trim().replace(/\s+/g, ' ');
  if (clean.length <= maxChars) return clean;

  let truncated = clean.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxChars - 20) {
    truncated = truncated.slice(0, lastSpace);
  }
  truncated = truncated.replace(/[,;:\s]+$/, '');
  if (!/[.!?]$/.test(truncated)) {
    truncated += '.';
  }
  return truncated.length <= maxChars ? truncated : truncated.slice(0, maxChars - 1) + '.';
}

// Helper to enforce title up to 90 characters
export function formatSEOTitle(title, maxChars = 90) {
  if (!title) return '';
  let clean = title.trim().replace(/\s+/g, ' ');
  if (clean.length <= maxChars) return clean;

  let truncated = clean.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxChars - 15) {
    truncated = truncated.slice(0, lastSpace);
  }
  return truncated.trim().replace(/[\s|–-]+$/, '');
}

// Clean text helper (removes extra symbols/parentheses from area names)
export const cleanAreaName = (area) => {
  if (!area) return '';
  return area.replace(/\(.*?\)/g, '').split('&')[0].split('/')[0].trim();
};

/**
 * Generate SEO Metadata based on route parameters
 */
export function getSEOMetadata({
  page = 'home',
  city = null,
  area = null,
  category = null,
  subcategory = null,
  origin = typeof window !== 'undefined' ? window.location.origin : 'https://doorsteprepairservices.com'
}) {
  const normCity = city ? city.toLowerCase().trim() : null;
  const isCityValid = normCity && ['vijayawada', 'guntur', 'nellore'].includes(normCity);
  const cityName = isCityValid 
    ? normCity.charAt(0).toUpperCase() + normCity.slice(1) 
    : 'Vijayawada';
  
  const cleanArea = cleanAreaName(area);

  // 1. AREA BASED URL (City + Area specified, e.g. /service-center/vijayawada?area=Benz+Circle)
  if (cleanArea && isCityValid) {
    const cLow = normCity;
    const aLow = cleanArea.toLowerCase();

    // Keywords: strictly small letters, strictly < 10 words (e.g. 7-8 words total)
    const rawKeywords = [
      'appliance repair',
      aLow,
      cLow,
      'doorstep technician service'
    ];

    const rawTitle = `Appliance Repair in ${cleanArea}, ${cityName} | Same-Day Doorstep Service Hub`;
    const rawDesc = `Need quick appliance repair in ${cleanArea}, ${cityName}? Certified technicians fix AC, fridge, washing machine, oven, geyser, and TV at your home in 90 mins with 90-day warranty and genuine spares. Call 9515661677 today.`;

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/service-center/${cLow}/${areaToSlug(cleanArea)}`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Doorstep Repair Service - ${cleanArea}, ${cityName}`,
        'description': `Same-day doorstep appliance repair in ${cleanArea}, ${cityName}.`,
        'telephone': '+919515661677',
        'areaServed': `${cleanArea}, ${cityName}`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': cleanArea,
          'addressRegion': cityName,
          'addressCountry': 'IN'
        }
      }
    };
  }

  // 2. CITY BASED URL (e.g. /service-center/vijayawada, /service-center/guntur, /service-center/nellore)
  if (page === 'location' && isCityValid) {
    const cLow = normCity;
    
    // Keywords: strictly small letters, strictly < 10 words (e.g. 7 words total)
    const rawKeywords = [
      'doorstep appliance repair',
      cLow,
      'certified technician service'
    ];

    const rawTitle = `Doorstep Appliance Repair in ${cityName} | Fast 90-Min Home Service Hub`;
    const rawDesc = `Trusted home appliance repair in ${cityName}. Certified technicians fix AC, washing machine, refrigerator, microwave oven, geyser and TV at your home within 90 minutes with 90-day warranty & genuine parts. Call 9515661677 now.`;

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/service-center/${cLow}`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Doorstep Repair Service - ${cityName}`,
        'description': `Fast, verified home appliance repair service across ${cityName} within 10 km radius.`,
        'telephone': '+919515661677',
        'areaServed': cityName,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': cityName,
          'addressRegion': 'Andhra Pradesh',
          'addressCountry': 'IN'
        }
      }
    };
  }

  // 3. SERVICE / CATEGORY BASED URL (e.g. /services/ac, /services/oven, /services/washing-machine)
  if (page === 'services' && category) {
    const catLow = category.toLowerCase();
    
    const categoryMap = {
      'ac': {
        name: 'AC',
        fullName: 'Air Conditioner',
        title: cleanArea 
          ? `AC Repair in ${cleanArea}, ${cityName} | Fast Doorstep Cooling Service Hub`
          : isCityValid 
            ? `AC Repair Service in ${cityName} | Split & Cassette AC Doorstep Hub`
            : 'AC Repair & Service in Vijayawada, Guntur & Nellore | Doorstep Cooling Hub',
        description: cleanArea && isCityValid
          ? `Expert AC repair in ${cleanArea}, ${cityName}. Certified technicians solve cooling issues, gas leakages, water dripping and PCB errors with 90-day warranty and 90-min doorstep arrival. Genuine spare parts. Call 9515661677.`
          : isCityValid
            ? `Top-rated AC service in ${cityName}. Doorstep split, window and cassette AC repairs, power jet cleaning, gas charging and PCB repairs by certified technicians with 90-day warranty & OEM spares. Call 9515661677.`
            : 'Professional doorstep AC repair and maintenance in Vijayawada, Guntur & Nellore. Certified technicians fix cooling issues, gas leaks, water dripping, PCB board errors and deep jet cleaning with 90-day warranty. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['ac repair', cleanArea.toLowerCase(), normCity, 'doorstep cooling service']
          : isCityValid 
            ? ['ac repair', normCity, 'split cassette ac', 'doorstep technician']
            : ['ac repair', 'split ac', 'gas refill', 'doorstep technician'],
        image: '/service_ac.jpg'
      },
      'refrigerator': {
        name: 'Refrigerator',
        fullName: 'Refrigerator',
        title: cleanArea 
          ? `Refrigerator Repair in ${cleanArea}, ${cityName} | Doorstep Fridge Service`
          : isCityValid 
            ? `Refrigerator Repair Service in ${cityName} | Single & Double Door Fridge`
            : 'Refrigerator Repair in Vijayawada, Guntur & Nellore | Doorstep Fridge Hub',
        description: cleanArea && isCityValid
          ? `Fast refrigerator repair in ${cleanArea}, ${cityName}. Expert doorstep technicians fix cooling issues, compressor faults, gas refilling and thermostat problems with 90-day warranty & 90-min dispatch. Call 9515661677.`
          : isCityValid
            ? `Certified refrigerator repair in ${cityName}. Doorstep technicians for single door, double door and side-by-side fridges. Fast compressor replacement, gas charging and 90-day warranty. Call 9515661677 today.`
            : 'Doorstep refrigerator repair in Vijayawada, Guntur and Nellore. Certified technicians fix fridge cooling problems, compressor faults, gas refilling and defrost issues across all leading brands with 90-day warranty. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['fridge repair', cleanArea.toLowerCase(), normCity, 'doorstep technician']
          : isCityValid
            ? ['fridge repair', normCity, 'refrigerator service', 'doorstep technician']
            : ['refrigerator repair', 'fridge gas refill', 'doorstep technician'],
        image: '/service_fridge.jpg'
      },
      'washing-machine': {
        name: 'Washing Machine',
        fullName: 'Washing Machine',
        title: cleanArea 
          ? `Washing Machine Repair in ${cleanArea}, ${cityName} | Doorstep Service Hub`
          : isCityValid 
            ? `Washing Machine Repair in ${cityName} | Front & Top Load Doorstep Hub`
            : 'Washing Machine Repair in Vijayawada, Guntur & Nellore | Doorstep Hub',
        description: cleanArea && isCityValid
          ? `Professional washing machine repair in ${cleanArea}, ${cityName}. Certified technicians fix drum spinning, drainage issues, motor faults and PCB boards with 90-day warranty & 90-min arrival. Call 9515661677.`
          : isCityValid
            ? `Trusted washing machine repair in ${cityName}. Same-day doorstep service for front load, top load and semi-automatic washers with genuine spare parts, 90-day warranty and certified engineers. Call 9515661677.`
            : 'Certified washing machine repair in Vijayawada, Guntur and Nellore. We resolve drum spinning issues, water drainage problems, vibration, motor faults and PCB motherboard errors with 90-day warranty & OEM spares. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['washing machine repair', cleanArea.toLowerCase(), normCity, 'doorstep service']
          : isCityValid
            ? ['washing machine repair', normCity, 'washer doorstep service']
            : ['washing machine repair', 'automatic washer fix', 'doorstep technician'],
        image: '/service_washing_machine.jpg'
      },
      'oven': {
        name: 'Microwave Oven',
        fullName: 'Microwave & Oven',
        title: cleanArea 
          ? `Microwave Oven Repair in ${cleanArea}, ${cityName} | Doorstep Service Hub`
          : isCityValid 
            ? `Microwave & Oven Repair in ${cityName} | Fast Doorstep Heating Service`
            : 'Microwave Oven Repair in Vijayawada, Guntur & Nellore | Doorstep Hub',
        description: cleanArea && isCityValid
          ? `Safe microwave oven repair in ${cleanArea}, ${cityName}. Certified doorstep technicians fix magnetron heating issues, touchpads, sparking and turntables with 90-day warranty and 90-min dispatch. Call 9515661677.`
          : isCityValid
            ? `Doorstep microwave oven repair in ${cityName}. Certified technicians repair solo, grill and convection ovens with genuine spare parts, 90-day warranty and fast 90-minute arrival. Call 9515661677 now.`
            : 'Safe and fast microwave oven repair in Vijayawada, Guntur & Nellore. We repair magnetrons, heating coils, touchpads, sparking and turntable issues across all major brands with 90-day service warranty. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['microwave repair', cleanArea.toLowerCase(), normCity, 'oven doorstep service']
          : isCityValid
            ? ['microwave repair', normCity, 'oven service', 'doorstep technician']
            : ['microwave oven repair', 'convection oven service', 'doorstep technician'],
        image: '/service_oven.jpg'
      },
      'geyser': {
        name: 'Geyser',
        fullName: 'Geyser & Water Heater',
        title: cleanArea 
          ? `Geyser Repair Service in ${cleanArea}, ${cityName} | Doorstep Heating Hub`
          : isCityValid 
            ? `Geyser & Water Heater Repair in ${cityName} | Fast Doorstep Service Hub`
            : 'Geyser & Water Heater Repair in Vijayawada, Guntur & Nellore | Doorstep Hub',
        description: cleanArea && isCityValid
          ? `Reliable geyser repair in ${cleanArea}, ${cityName}. Certified technicians fix water heating, thermostats, electrical current leakage and tank dripping with 90-day warranty & 90-min arrival. Call 9515661677.`
          : isCityValid
            ? `Expert geyser and water heater repair in ${cityName}. Fast doorstep heating element replacements, thermostat repairs and leakage fixes with 90-day warranty by certified technicians. Call 9515661677.`
            : 'Safe doorstep geyser and water heater repair in Vijayawada, Guntur & Nellore. We fix water heating issues, thermostat failures, electrical leakage, tank dripping and coil replacements with 90-day warranty. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['geyser repair', cleanArea.toLowerCase(), normCity, 'water heater service']
          : isCityValid
            ? ['geyser repair', normCity, 'water heater doorstep service']
            : ['geyser repair service', 'water heater fix', 'doorstep technician'],
        image: '/service_geyser.jpg'
      },
      'tv': {
        name: 'Smart TV',
        fullName: 'Smart & LED TV',
        title: cleanArea 
          ? `Smart & LED TV Repair in ${cleanArea}, ${cityName} | Doorstep Screen Hub`
          : isCityValid 
            ? `LED & Smart TV Repair in ${cityName} | Panel, Audio & Motherboard Hub`
            : 'LED & Smart TV Repair in Vijayawada, Guntur & Nellore | Doorstep Screen Hub',
        description: cleanArea && isCityValid
          ? `Expert LED & Smart TV repair in ${cleanArea}, ${cityName}. Certified technicians fix display panels, backlight failure, motherboard errors and wall mounts with 90-day warranty & 90-min arrival. Call 9515661677.`
          : isCityValid
            ? `Specialized LED, OLED and Smart TV repair in ${cityName}. Certified doorstep engineers fix blank screens, audio problems, power supply and motherboards with 90-day warranty & OEM spares. Call 9515661677.`
            : 'Specialized LED, OLED and Smart Android TV repair in Vijayawada, Guntur & Nellore. We solve blank screens, backlight failure, sound issues, motherboard repair and wall mounts with 90-day warranty. Call 9515661677.',
        keywords: cleanArea && isCityValid
          ? ['tv repair', cleanArea.toLowerCase(), normCity, 'led screen fix']
          : isCityValid
            ? ['tv repair', normCity, 'led smart tv', 'doorstep service']
            : ['smart tv repair', 'led tv technician', 'doorstep service'],
        image: '/service_tv.jpg'
      }
    };

    const serviceData = categoryMap[catLow] || categoryMap['ac'];

    let canonical = `${origin}/services/${catLow}`;
    if (cleanArea && isCityValid) {
      canonical = subcategory 
        ? `${origin}/service-center/${normCity}/${areaToSlug(cleanArea)}/${catLow}/${subcategory}`
        : `${origin}/service-center/${normCity}/${areaToSlug(cleanArea)}/${catLow}`;
    }

    return {
      title: formatSEOTitle(serviceData.title, 90),
      description: formatSEODescription(serviceData.description, 250),
      keywords: formatSEOKeywords(serviceData.keywords, 9),
      canonicalUrl: canonical,
      ogType: OG_TYPE_BUSINESS,
      ogImage: serviceData.image,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': serviceData.fullName + ' Service',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Doorstep Repair Service',
          'telephone': '+919515661677'
        }
      }
    };
  }

  // 4. ALL SERVICES OVERVIEW PAGE (/services)
  if (page === 'services') {
    const rawTitle = 'Appliance Repair Services in Vijayawada, Guntur & Nellore | Doorstep Hub';
    const rawDesc = 'Explore certified doorstep appliance repairs for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser and Smart TV in Vijayawada, Guntur & Nellore. Quick 90-minute arrival with 90-day warranty. Call 9515661677.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['appliance repair services', 'vijayawada', 'guntur', 'nellore', 'doorstep technician'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/services`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 5. ALL CITIES HUBS OVERVIEW PAGE (/service-center)
  if (page === 'location') {
    const rawTitle = 'Doorstep Appliance Repair in Vijayawada, Guntur & Nellore | Certified Hubs';
    const rawDesc = 'Certified doorstep appliance repair hubs across Vijayawada, Guntur, and Nellore within 10 km radius. Quick 90-minute arrival for AC, fridge, washer, oven, geyser & TV with 90-day warranty. Call 9515661677.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['appliance repair service center', 'vijayawada', 'guntur', 'nellore'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/service-center`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 6. BOOK SERVICE PAGE (/book)
  if (page === 'book') {
    let canonicalUrl = `${origin}/book`;
    let rawTitle = 'Book Appliance Repair Online in Vijayawada, Guntur & Nellore | Fast Hub';
    let rawDesc = 'Book certified technicians online in 2 steps for AC, fridge, washing machine, oven, geyser, or TV. Fast 90-minute arrival in Vijayawada, Guntur, and Nellore with 90-day warranty & OEM spares. Call 9515661677.';
    // Small letters, strictly < 10 words (e.g. 8 words)
    let rawKeywords = ['book appliance repair', 'vijayawada', 'guntur', 'nellore', 'doorstep booking'];

    if (city && city !== 'all' && area && category && subcategory) {
      const areaSlug = areaToSlug(area);
      canonicalUrl = `${origin}/service-center/${city.toLowerCase()}/${areaSlug}/${category}/${subcategory}/book`;
      const catObj = SERVICE_CATEGORIES.find(c => c.id === category);
      const subObj = catObj?.subcategories?.find(s => s.id === subcategory);
      const subName = subObj ? subObj.name : subcategory;
      rawTitle = `Book ${subName} in ${area}, ${cityName} | Doorstep Service Hub`;
      rawDesc = `Book fast doorstep ${subName} in ${area}, ${cityName}. Verified technician dispatch within 60-90 minutes, OEM spare parts and 90-day service warranty. Zero advance fee. Call 9515661677 now.`;
      rawKeywords = [`book ${subName.toLowerCase().split(' ')[0]}`, cleanArea.toLowerCase(), cityName.toLowerCase(), 'doorstep service'];
    } else if (city && city !== 'all' && area) {
      const areaSlug = areaToSlug(area);
      canonicalUrl = `${origin}/service-center/${city.toLowerCase()}/${areaSlug}/book`;
      rawTitle = `Book Appliance Repair in ${area}, ${cityName} | Doorstep Service Hub`;
      rawDesc = `Book fast doorstep appliance repair in ${area}, ${cityName}. Certified technicians dispatched within 90 minutes for AC, fridge, washing machine and TV with 90-day warranty. Call 9515661677.`;
      rawKeywords = ['book repair', cleanArea.toLowerCase(), cityName.toLowerCase(), 'doorstep service'];
    }

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 7. ABOUT US PAGE (/about)
  if (page === 'about') {
    const rawTitle = 'About Doorstep Repair Service | Certified Technicians in Vijayawada & AP';
    const rawDesc = 'Learn about Doorstep Repair Service. Serving Vijayawada, Guntur, and Nellore with certified technicians, genuine OEM spare parts, 90-minute doorstep response, and 90-day service warranty on all repairs.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['about doorstep repair', 'certified appliance technicians', 'andhra pradesh'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/about`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 8. FAQ PAGE (/faq)
  if (page === 'faq') {
    const rawTitle = 'Appliance Repair FAQ | Service Charges & Warranty in Vijayawada & AP';
    const rawDesc = 'Find answers to common questions about appliance repair pricing, 90-minute arrival, 90-day warranty, genuine spare parts, and doorstep service coverage in Vijayawada, Guntur, and Nellore. Call 9515661677.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['appliance repair faq', 'doorstep service questions', 'repair warranty'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/faq`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 9. CONTACT US PAGE (/contact)
  if (page === 'contact') {
    const rawTitle = 'Contact Doorstep Repair Service | Helpline 9515661677 in Vijayawada & AP';
    const rawDesc = 'Get in touch with Doorstep Repair Service. Direct helpline +91 9515661677, WhatsApp chat support, and fast technician dispatch hubs across Vijayawada, Guntur, and Nellore. Same-day appliance fix.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['contact doorstep repair', 'appliance repair phone', 'technician helpline'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/contact`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 10. TERMS & CONDITIONS PAGE (/terms)
  if (page === 'terms') {
    const rawTitle = 'Terms of Service & Warranty Policy | Doorstep Repair in Vijayawada & AP';
    const rawDesc = 'Read our transparent terms of service, fair diagnostic pricing policy, and 90-day warranty conditions for Doorstep Repair Service in Vijayawada, Guntur, and Nellore. Certified customer care.';
    // Small letters, strictly < 10 words (e.g. 8 words)
    const rawKeywords = ['terms of service', 'appliance repair terms', 'doorstep service warranty'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/terms`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // 11. PRIVACY POLICY PAGE (/policy)
  if (page === 'policy') {
    const rawTitle = 'Privacy Policy & Data Protection | Doorstep Repair in Vijayawada & AP';
    const rawDesc = 'Our privacy policy explains how we collect and protect your booking details when you request doorstep appliance repair services in Vijayawada, Guntur, and Nellore. 100% secure customer confidentiality.';
    // Small letters, strictly < 10 words (e.g. 7 words)
    const rawKeywords = ['privacy policy', 'customer data protection', 'doorstep repair privacy'];

    return {
      title: formatSEOTitle(rawTitle, 90),
      description: formatSEODescription(rawDesc, 250),
      keywords: formatSEOKeywords(rawKeywords, 9),
      canonicalUrl: `${origin}/policy`,
      ogType: OG_TYPE_BUSINESS,
      ogImage: '/hero-technician.jpg'
    };
  }

  // DEFAULT / HOMEPAGE
  const defaultTitle = 'Doorstep Repair Service | Same-Day Appliance Repair in Vijayawada, Guntur & Nellore AP';
  const defaultDesc = 'Fast doorstep repair for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser & Smart TV in Vijayawada, Guntur & Nellore. Verified local technicians at your home in 90 mins with 90-day warranty. Call 9515661677.';
  // Small letters, strictly < 10 words (e.g. 7 words)
  const defaultKeywords = ['doorstep repair', 'appliance service', 'vijayawada', 'guntur', 'nellore'];

  return {
    title: formatSEOTitle(defaultTitle, 90),
    description: formatSEODescription(defaultDesc, 250),
    keywords: formatSEOKeywords(defaultKeywords, 9),
    canonicalUrl: `${origin}/`,
    ogType: OG_TYPE_BUSINESS,
    ogImage: '/hero-technician.jpg'
  };
}
