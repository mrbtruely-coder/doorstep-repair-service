import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { SERVICES, CITIES, COMPANY_PHONE_DISPLAY, COMPANY_CALL_LINK, COMPANY_WHATSAPP_LINK } from '../constants/data';
import { Check, ArrowRight, ShieldCheck, Phone, MessageCircle } from 'lucide-react';

export default function ServicesPage({ setActivePage, setSelectedService }) {
  // Rich Industry-Level SEO Metadata
  useSEO({
    title: 'Professional Home Appliance Services | Same-Day Repair in Vijayawada, Guntur & Nellore',
    description: 'Certified doorstep diagnostics & repairs for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser & Smart TV across Vijayawada, Guntur, and Nellore. 90-day warranty, 100% genuine parts, transparent diagnostics from ₹249. Call or WhatsApp 9515661677.',
    keywords: 'appliance repair services vijayawada, ac repair service guntur, washing machine repair nellore, refrigerator gas refilling, led smart tv repair, microwave oven technician, geyser water heater repair doorstep',
    canonicalUrl: 'http://localhost:3001/services',
    ogType: 'website',
    ogImage: '/service_ac.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Doorstep Repair Service',
      'image': 'http://localhost:3001/hero-technician.jpg',
      'telephone': '+919515661677',
      'priceRange': '₹249 - ₹1999',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Vijayawada',
        'addressRegion': 'Andhra Pradesh',
        'addressCountry': 'IN'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Vijayawada' },
        { '@type': 'City', 'name': 'Guntur' },
        { '@type': 'City', 'name': 'Nellore' }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Appliance Repair Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AC Service & Repair' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Refrigerator Repair' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Washing Machine Repair' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Oven & Microwave Repair' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Geyser & Water Heater Repair' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'LED & Smart TV Repair' } }
        ]
      }
    }
  });

  const handleBook = (name) => {
    if (setSelectedService) setSelectedService(name);
    if (setActivePage) {
      setActivePage('book');
    } else {
      window.location.href = '/book';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Detailed services data with authentic photographs for each appliance
  const serviceCards = [
    {
      id: "ac",
      name: "AC Service & Repair",
      image: "/service_ac.jpg",
      tag: "Verified Job",
      desc: "Expert diagnostics, cooling coils restoration, gas leakage plugging, and high-pressure jet wash wet servicing.",
      bullets: [
        "Complete split AC deep jet wash service",
        "Refrigerant gas charging & leak fix",
        "Control Board (PCB) troubleshooting"
      ],
      price: "From ₹299"
    },
    {
      id: "refrigerator",
      name: "Refrigerator Repair",
      image: "/service_fridge.jpg",
      tag: "Verified Job",
      desc: "Single-door, double-door, and side-by-side low cooling diagnostics, compressor fittings, and defrost sensor repairs.",
      bullets: [
        "Defrost heater & sensor repair",
        "Compressor fittings & gas refilling",
        "Thermostat testing & gaskets check"
      ],
      price: "From ₹399"
    },
    {
      id: "washing-machine",
      name: "Washing Machine Repair",
      image: "/service_washing_machine.jpg",
      tag: "Verified Job",
      desc: "Drum replacements, spin-cycle issues, motor repairs, intake pump issues, and extreme noise calibrations.",
      bullets: [
        "Spin drum & structural bearings repair",
        "Water intake and drain pump fixes",
        "Suspension struts & noise calibration"
      ],
      price: "From ₹349"
    },
    {
      id: "oven",
      name: "Oven & Microwave Repair",
      image: "/service_oven.jpg",
      tag: "Verified Job",
      desc: "Precision magnetron replacements, keypad touchpad sensor repairs, turntable drive fixes, and spark suppression.",
      bullets: [
        "Magnetron & high voltage diode test",
        "Touch capacitive panel & timer fix",
        "Turntable motor & mica sheet replacement"
      ],
      price: "From ₹299"
    },
    {
      id: "geyser",
      name: "Geyser & Water Heater Repair",
      image: "/service_geyser.jpg",
      tag: "Verified Job",
      desc: "Heating element replacements, thermostat resets, pressure relief valve replacements, and copper tank leak seals.",
      bullets: [
        "Heavy-duty copper heating coil change",
        "Thermostat & auto-cutoff replacement",
        "Anti-scaling & tank leak sealing"
      ],
      price: "From ₹299"
    },
    {
      id: "tv",
      name: "LED & Smart TV Repair",
      image: "/service_tv.jpg",
      tag: "Verified Job",
      desc: "Backlight strip replacements, main motherboard diagnostic repair, power card faults, and audio display issues.",
      bullets: [
        "LED backlight replacement & fix",
        "Motherboard & power supply module repairs",
        "Sound card & connectivity calibration"
      ],
      price: "From ₹349"
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. HERO BANNER: Dark Navy Gradient matching screenshot */}
      <section style={{
        background: 'linear-gradient(180deg, #091a3c 0%, #0b2253 100%)',
        color: '#ffffff',
        padding: '70px 0 76px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#00c2e8',
            marginBottom: '16px'
          }}>
            VIJAYAWADA • GUNTUR • NELLORE DOORSTEP REPAIRS
          </div>

          <h1 style={{
            fontSize: '44px',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '18px',
            letterSpacing: '-0.02em'
          }}>
            Professional Home Appliance <br /> Services
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '740px',
            margin: '0 auto'
          }}>
            Certified doorstep diagnostics & repairs for AC, Refrigerator, Washing Machine, Microwave, Geyser & Smart TV across Vijayawada, Guntur, and Nellore.
          </p>
        </div>
      </section>

      {/* 2. 6 SERVICE CARDS WITH AUTHENTIC PHOTOGRAPHS */}
      <section style={{ padding: '64px 0 80px', background: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px'
          }} className="services-showcase-grid">
            {serviceCards.map((card) => (
              <div
                key={card.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px -2px rgba(9, 26, 60, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Card Top Media Banner With Appliance Photo */}
                <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden', background: '#091a3c' }}>
                  <img
                    src={card.image}
                    alt={`${card.name} in Vijayawada, Guntur & Nellore`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* Verified Job Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#ffffff',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#091a3c',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ShieldCheck size={13} style={{ color: '#00c2e8' }} />
                    {card.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '10px' }}>
                    {card.name}
                  </h2>

                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55, marginBottom: '20px', minHeight: '44px' }}>
                    {card.desc}
                  </p>

                  {/* Bullet Points */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1, padding: 0 }}>
                    {card.bullets.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#334155' }}>
                        <Check size={15} style={{ color: '#00c2e8', flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Bottom: Diagnostics Price & Orange Book Service Button */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                        Diagnostics
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#091a3c' }}>
                        {card.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBook(card.name)}
                      style={{
                        background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        padding: '10px 18px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0, 194, 232, 0.35)',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00c2e8 0%, #008ba6 100%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)';
                      }}
                    >
                      Book Service <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK ASSISTANCE STRIP */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '36px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '15px', color: '#091a3c', fontWeight: 600 }}>
            Prefer booking over direct phone call or WhatsApp?
          </span>
          <a href={COMPANY_CALL_LINK} className="btn btn-call" style={{ padding: '10px 20px', fontSize: '14px' }}>
            <Phone size={15} /> Call: {COMPANY_PHONE_DISPLAY}
          </a>
          <a href={COMPANY_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ padding: '10px 20px', fontSize: '14px' }}>
            <MessageCircle size={15} /> Chat on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
