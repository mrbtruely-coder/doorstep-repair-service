/**
 * SEO Metadata Generator for Doorstep Repair Service
 * 
 * Rules strictly followed:
 * 1. Simple, friendly English language for all titles and descriptions.
 * 2. Every city, sub-area, and service has unique metadata.
 * 3. Keywords strategy:
 *    - City URLs: Service-based keywords + (City + Service) keywords.
 *    - Area URLs: (City + Service + Area) keywords + (City + Service) keywords.
 *    - Service URLs: Specific Service-based keywords + appliance repair keywords.
 *    - Service + City / Area: Tailored mix of Service + City + Area keywords.
 */

// Core appliance services offered
export const CORE_SERVICES = [
  { id: 'ac', name: 'AC Service & Repair', short: 'AC' },
  { id: 'refrigerator', name: 'Refrigerator Repair', short: 'Fridge' },
  { id: 'washing-machine', name: 'Washing Machine Repair', short: 'Washing Machine' },
  { id: 'oven', name: 'Microwave & Oven Repair', short: 'Oven' },
  { id: 'geyser', name: 'Geyser & Water Heater Repair', short: 'Geyser' },
  { id: 'tv', name: 'LED & Smart TV Repair', short: 'Smart TV' }
];

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
  origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5175'
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

    // City + Service + Area keywords rule
    const keywords = [
      `${cLow} ${aLow} ac repair`,
      `${aLow} washing machine repair ${cLow}`,
      `${aLow} refrigerator service ${cLow}`,
      `${aLow} microwave oven repair ${cLow}`,
      `${aLow} geyser repair ${cLow}`,
      `${aLow} smart tv repair ${cLow}`,
      `${aLow} doorstep appliance repair ${cLow}`,
      `${cLow} ${aLow} home service`,
      `${cLow} ac repair`,
      `${cLow} washing machine service`,
      `${cLow} fridge repair`
    ].join(', ');

    return {
      title: `Appliance Repair in ${cleanArea}, ${cityName} | Fast Doorstep Service`,
      description: `Need quick appliance repair in ${cleanArea}, ${cityName}? Our certified local technicians fix AC, washing machine, fridge, TV, oven, and geyser at your doorstep within 90 minutes. Call 9515661677.`,
      keywords,
      canonicalUrl: `${origin}/service-center/${cLow}?area=${encodeURIComponent(cleanArea)}`,
      ogType: 'website',
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
    
    // Service-based keywords for city-based URLs + Cities + Service keywords
    const keywords = [
      // Service based keywords
      'home appliance repair',
      'ac service',
      'washing machine repair',
      'refrigerator service',
      'microwave oven repair',
      'geyser repair',
      'smart tv repair',
      'doorstep appliance repair',
      // City + service keywords
      `${cLow} ac repair`,
      `${cLow} washing machine repair`,
      `${cLow} refrigerator service`,
      `${cLow} microwave oven repair`,
      `${cLow} geyser repair`,
      `${cLow} tv repair`,
      `${cLow} doorstep appliance repair`,
      `appliance service center ${cLow}`,
      `same day repair ${cLow}`
    ].join(', ');

    return {
      title: `Doorstep Home Appliance Repair in ${cityName} | Fast 90-Min Service`,
      description: `Trusted home appliance repair in ${cityName}. We fix ACs, washing machines, refrigerators, microwave ovens, geysers, and TVs at your home in 90 minutes with 90-day warranty. Call 9515661677.`,
      keywords,
      canonicalUrl: `${origin}/service-center/${cLow}`,
      ogType: 'website',
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
    
    // Detailed metadata per category
    const categoryMap = {
      'ac': {
        name: 'Air Conditioner',
        title: cleanArea 
          ? `AC Repair in ${cleanArea}, ${cityName} | Fast Doorstep Cooling Service`
          : isCityValid 
            ? `AC Repair Service in ${cityName} | Split & Cassette AC Service`
            : 'AC Repair & Service | Split & Cassette AC Gas Refill & Jet Wash',
        description: `Professional AC repair and maintenance at your doorstep. We fix cooling issues, gas leakage, water dripping, PCB board errors, and provide power jet cleaning with 90-day warranty. Call 9515661677.`,
        serviceKeywords: 'ac repair, split ac service, cassette ac repair, ac gas refill, ac jet wash, ac not cooling repair, ac water leaking, ac installation, doorstep ac technician',
        image: '/service_ac.jpg'
      },
      'refrigerator': {
        name: 'Refrigerator',
        title: cleanArea 
          ? `Refrigerator Repair in ${cleanArea}, ${cityName} | Same-Day Gas Refill`
          : isCityValid 
            ? `Refrigerator Repair Service in ${cityName} | Single & Double Door Fridge Fix`
            : 'Refrigerator Repair & Gas Refill | Single, Double & Side-by-Side Fridge Service',
        description: `Fast doorstep refrigerator repair. Expert technicians for cooling issues, compressor problems, gas refilling, defrost issues, and thermostat replacement across all brands. Call 9515661677.`,
        serviceKeywords: 'refrigerator repair, fridge service, single door fridge repair, double door refrigerator repair, fridge gas refill, compressor replacement, fridge not cooling, doorstep fridge technician',
        image: '/service_fridge.jpg'
      },
      'washing-machine': {
        name: 'Washing Machine',
        title: cleanArea 
          ? `Washing Machine Repair in ${cleanArea}, ${cityName} | Quick Doorstep Fix`
          : isCityValid 
            ? `Washing Machine Repair Service in ${cityName} | Front & Top Load Experts`
            : 'Washing Machine Repair | Front Load & Top Load Automatic Machine Service',
        description: `Certified washing machine repair at home. We resolve drum spinning issues, water drainage problems, vibration, motor faults, and PCB motherboard errors with genuine spare parts. Call 9515661677.`,
        serviceKeywords: 'washing machine repair, front load washing machine service, top load washer repair, washing machine drum not spinning, washing machine water leakage, pcb board repair, doorstep washer technician',
        image: '/service_washing_machine.jpg'
      },
      'oven': {
        name: 'Microwave & Oven',
        title: cleanArea 
          ? `Microwave Oven Repair in ${cleanArea}, ${cityName} | Doorstep Service`
          : isCityValid 
            ? `Microwave & Oven Repair Service in ${cityName} | Fast Same-Day Fix`
            : 'Microwave & Convection Oven Repair Service | Doorstep Technician',
        description: `Quick and safe microwave oven repair at your doorstep. We repair magnetrons, heating coils, unresponsive touchpads, sparking, and turntable issues across all major brands. Call 9515661677.`,
        serviceKeywords: 'microwave repair, oven repair, convection oven service, microwave not heating, microwave sparking fix, magnetron replacement, oven touchpad repair, doorstep oven repair',
        image: '/service_oven.jpg'
      },
      'geyser': {
        name: 'Geyser & Water Heater',
        title: cleanArea 
          ? `Geyser Repair in ${cleanArea}, ${cityName} | Fast Heating Element Replacement`
          : isCityValid 
            ? `Geyser & Water Heater Repair Service in ${cityName} | Instant & Storage Geyser`
            : 'Electric & Instant Geyser Repair Service | Water Heater Doorstep Fix',
        description: `Safe doorstep geyser and water heater repair. We fix water heating issues, thermostat failures, electric current leakage, tank dripping, and heating coil replacements within 60-90 minutes. Call 9515661677.`,
        serviceKeywords: 'geyser repair, water heater service, electric geyser repair, instant geyser repair, geyser heating coil replacement, thermostat fix, geyser water leakage, doorstep geyser technician',
        image: '/service_geyser.jpg'
      },
      'tv': {
        name: 'Smart & LED TV',
        title: cleanArea 
          ? `Smart & LED TV Repair in ${cleanArea}, ${cityName} | Display & Board Fix`
          : isCityValid 
            ? `LED & Smart TV Repair Service in ${cityName} | Screen, Audio & Wall Mounting`
            : 'LED & Smart TV Repair Service | Android TV Screen & Motherboard Repair',
        description: `Specialized LED, OLED, and Smart Android TV repair at your doorstep. We solve blank screen, backlight strip failure, sound issues, motherboard repair, and precision wall mounting. Call 9515661677.`,
        serviceKeywords: 'tv repair, led tv repair, smart tv service, android tv motherboard repair, tv backlight replacement, tv display panel fix, tv wall mounting installation, doorstep tv technician',
        image: '/service_tv.jpg'
      }
    };

    const serviceData = categoryMap[catLow] || categoryMap['ac'];

    // If city or area is also active, merge keywords as per user rule
    const keywordsList = [serviceData.serviceKeywords];
    if (isCityValid) {
      keywordsList.push(`${normCity} ${serviceData.name.toLowerCase()} repair`);
      keywordsList.push(`${normCity} appliance service`);
    }
    if (cleanArea && isCityValid) {
      keywordsList.push(`${cleanArea.toLowerCase()} ${serviceData.name.toLowerCase()} repair ${normCity}`);
    }

    return {
      title: serviceData.title,
      description: serviceData.description,
      keywords: keywordsList.join(', '),
      canonicalUrl: `${origin}/services/${catLow}`,
      ogType: 'article',
      ogImage: serviceData.image,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': serviceData.name + ' Service',
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
    return {
      title: 'Appliance Repair Services & Categories | Doorstep Repair Service',
      description: 'Explore all doorstep appliance repair services for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser, and Smart TV in Vijayawada, Guntur & Nellore. Book online for 90-min arrival.',
      keywords: 'appliance repair services, ac repair, fridge repair, washing machine repair, microwave service, geyser repair, tv repair, doorstep technician vijayawada guntur nellore',
      canonicalUrl: `${origin}/services`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 5. ALL CITIES HUBS OVERVIEW PAGE (/service-center)
  if (page === 'location') {
    return {
      title: 'Doorstep Appliance Repair Service Hubs | Vijayawada, Guntur & Nellore',
      description: 'Certified doorstep appliance repair across Vijayawada, Guntur, and Nellore within 10 km radius. Quick 90-minute arrival for AC, fridge, washer, oven, geyser & TV. Call 9515661677.',
      keywords: 'appliance repair vijayawada, appliance repair guntur, appliance repair nellore, doorstep repair service andhra pradesh, ac repair near me, fridge repair near me',
      canonicalUrl: `${origin}/service-center`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 6. BOOK SERVICE PAGE (/book)
  if (page === 'book') {
    return {
      title: 'Book Service Online | Same-Day Appliance Repair at Doorstep',
      description: 'Book certified technicians in 2 simple steps for AC, fridge, washing machine, oven, geyser, or TV. Fast 90-min arrival in Vijayawada, Guntur, and Nellore. Zero booking fee.',
      keywords: 'book doorstep service, appliance repair booking online, ac technician vijayawada, fridge repair guntur, washing machine booking nellore, oven service dispatch, geyser technician doorstep',
      canonicalUrl: `${origin}/book`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 7. ABOUT US PAGE (/about)
  if (page === 'about') {
    return {
      title: 'About Doorstep Repair Service | Trusted Local Appliance Experts',
      description: 'Learn about Doorstep Repair Service. Serving Vijayawada, Guntur, and Nellore with certified technicians, genuine spare parts, and a 90-day warranty on all appliance repairs.',
      keywords: 'about doorstep repair, appliance repair company, certified technicians andhra pradesh, reliable home service',
      canonicalUrl: `${origin}/about`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 8. FAQ PAGE (/faq)
  if (page === 'faq') {
    return {
      title: 'Frequently Asked Questions (FAQ) | Doorstep Repair Service',
      description: 'Find answers to common questions about appliance repair pricing, 90-minute arrival, 90-day warranty, genuine spare parts, and doorstep service coverage in Vijayawada, Guntur, and Nellore.',
      keywords: 'appliance repair faq, doorstep service questions, repair warranty, repair pricing vijayawada guntur nellore',
      canonicalUrl: `${origin}/faq`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 9. CONTACT US PAGE (/contact)
  if (page === 'contact') {
    return {
      title: 'Contact Us | Doorstep Appliance Repair Helpline & Support',
      description: 'Get in touch with Doorstep Repair Service. Direct helpline: +91 9515661677, WhatsApp chat support, and service dispatch hubs in Vijayawada, Guntur, and Nellore.',
      keywords: 'contact doorstep repair, appliance repair phone number, ac repair customer care, doorstep repair helpline 9515661677',
      canonicalUrl: `${origin}/contact`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 10. TERMS & CONDITIONS PAGE (/terms)
  if (page === 'terms') {
    return {
      title: 'Terms of Service | Doorstep Appliance Repair Service',
      description: 'Read the terms of service, transparent pricing policy, and warranty conditions for Doorstep Repair Service in Vijayawada, Guntur, and Nellore.',
      keywords: 'terms of service, appliance repair warranty terms, doorstep service policies',
      canonicalUrl: `${origin}/terms`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // 11. PRIVACY POLICY PAGE (/policy)
  if (page === 'policy') {
    return {
      title: 'Privacy Policy | Doorstep Appliance Repair Service',
      description: 'Our privacy policy explains how we collect and protect your booking details when you request doorstep appliance repair services.',
      keywords: 'privacy policy, customer data protection, doorstep repair privacy',
      canonicalUrl: `${origin}/policy`,
      ogType: 'website',
      ogImage: '/hero-technician.jpg'
    };
  }

  // DEFAULT / HOMEPAGE
  return {
    title: 'Doorstep Repair Service | Same-Day Appliance Repair in Vijayawada, Guntur & Nellore',
    description: 'Fast doorstep repair for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser & Smart TV in Vijayawada, Guntur & Nellore. Verified local technicians at your home in 90 mins with 90-day warranty. Call 9515661677.',
    keywords: 'doorstep repair, appliance repair vijayawada, ac repair guntur, fridge repair nellore, washing machine technician, microwave repair, geyser repair, tv repair',
    canonicalUrl: `${origin}/`,
    ogType: 'website',
    ogImage: '/hero-technician.jpg'
  };
}
