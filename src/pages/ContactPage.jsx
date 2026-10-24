import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { COMPANY_PHONE_DISPLAY, COMPANY_CALL_LINK, COMPANY_WHATSAPP_LINK, CITIES } from '../constants/data';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ setActivePage }) {
  const [selectedCityId, setSelectedCityId] = useState('vijayawada');

  const cityDetails = {
    vijayawada: {
      name: 'Vijayawada',
      dispatchAddress: 'Benz Circle, Near DV Manor, MG Road, Vijayawada, Andhra Pradesh 520010',
      coverage: 'Benz Circle, MG Road, One Town, Gunadala, Bhavanipuram, Patamata',
      embedMapUrl: 'https://maps.google.com/maps?q=Benz+Circle+Vijayawada+Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed'
    },
    guntur: {
      name: 'Guntur',
      dispatchAddress: 'Main Road, Arundelpet 4th Line, Brodipet, Guntur, Andhra Pradesh 522002',
      coverage: 'Arundelpet, Brodipet, Pattabhipuram, Amaravathi Road, Kothapet, Vidyanagar',
      embedMapUrl: 'https://maps.google.com/maps?q=Arundelpet+Guntur+Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed'
    },
    nellore: {
      name: 'Nellore',
      dispatchAddress: 'Trunk Road, Near Magunta Layout, Balaji Nagar, Nellore, Andhra Pradesh 524001',
      coverage: 'Magunta Layout, Trunk Road, Balaji Nagar, Vedayapalem, Santhapet, Dargamitta',
      embedMapUrl: 'https://maps.google.com/maps?q=Magunta+Layout+Nellore+Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed'
    }
  };

  const currentCity = cityDetails[selectedCityId] || cityDetails.vijayawada;

  // 1. Industry-Level Location & Services Rich SEO Metadata
  useSEO({
    title: 'Contact Us | Doorstep Appliance Repair Helpline & Support',
    description: 'Get in touch with Doorstep Repair Service. Direct helpline: +91 9515661677, WhatsApp chat support, and service dispatch hubs in Vijayawada, Guntur, and Nellore.',
    keywords: 'contact doorstep repair, appliance repair phone number, ac repair customer care, doorstep repair helpline 9515661677, vijayawada repair center, guntur repair center, nellore repair center',
    canonicalUrl: 'http://localhost:3001/contact',
    ogType: 'website',
    ogImage: '/hero-technician.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Doorstep Repair Service',
      'image': 'http://localhost:3001/hero-technician.jpg',
      'telephone': '+919515661677',
      'priceRange': '₹249 - ₹1999',
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '07:00',
          'closes': '21:00'
        }
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': currentCity.dispatchAddress,
        'addressLocality': currentCity.name,
        'addressRegion': 'Andhra Pradesh',
        'addressCountry': 'IN'
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Vijayawada' },
        { '@type': 'City', 'name': 'Guntur' },
        { '@type': 'City', 'name': 'Nellore' }
      ]
    }
  });

  const handleBookNow = () => {
    if (setActivePage) {
      setActivePage('book');
    } else {
      window.location.href = '/book';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '56px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Top Centered Header matching screenshot */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#e0f2fe',
            color: '#0284c7',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            LOCATE US
          </div>

          <h1 style={{
            fontSize: '44px',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '14px',
            letterSpacing: '-0.02em'
          }}>
            Our Service Area in <span style={{ color: '#0284c7' }}>{currentCity.name}</span>
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            maxWidth: '760px',
            margin: '0 auto 24px',
            lineHeight: 1.6
          }}>
            We operate fully equipped service vans across <strong>Vijayawada</strong>, <strong>Guntur</strong>, and <strong>Nellore</strong>, delivering rapid doorstep restoration whenever you book support.
          </p>

          {/* City Switcher Tabs */}
          <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '6px' }}>
            {CITIES.map((c) => {
              const isSelected = selectedCityId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCityId(c.id)}
                  style={{
                    background: isSelected ? '#ffffff' : 'transparent',
                    color: isSelected ? '#0284c7' : '#64748b',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {c.name} Hub
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Section: 3 Info Cards on Left + Interactive Map on Right matching screenshot */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.35fr',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '80px'
        }} className="contact-grid-responsive">
          
          {/* LEFT: 3 Contact & Dispatch Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Card 1: Dispatch Hub Address */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '4px' }}>
                  DISPATCH HUB ADDRESS
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  DOOR STEP SERVICE ({currentCity.name.toUpperCase()})
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '8px' }}>
                  {currentCity.dispatchAddress}
                </p>
                <div style={{ fontSize: '12px', color: '#008ba6', fontWeight: 700 }}>
                  Coverage: {currentCity.coverage}
                </div>
              </div>
            </div>

            {/* Card 2: Service Helpline */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '4px' }}>
                  SERVICE HELPLINE
                </div>
                <div style={{ fontSize: '14.5px', color: '#334155', marginBottom: '4px' }}>
                  Phone: <strong style={{ color: '#0284c7', fontSize: '16px' }}>{COMPANY_PHONE_DISPLAY}</strong>
                </div>
                <div style={{ fontSize: '14.5px', color: '#334155' }}>
                  WhatsApp: <strong style={{ color: '#16a34a', fontSize: '16px' }}>{COMPANY_PHONE_DISPLAY}</strong>
                </div>
              </div>
            </div>

            {/* Card 3: Working Hours */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '4px' }}>
                  WORKING HOURS
                </div>
                <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  Monday – Sunday: 7:00 AM – 9:00 PM
                </h4>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  EMERGENCY DISPATCH: 24 HOURS ACTIVE
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Interactive Location Map matching screenshot */}
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.08)',
            height: '390px',
            background: '#f8fafc'
          }}>
            {/* Embedded Live Google Map */}
            <iframe
              title={`Doorstep Service Bounds in ${currentCity.name}`}
              src={currentCity.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top Right Overlay: SERVICE BOUNDS Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#091a3c',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: '8px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {currentCity.name.toUpperCase()} SERVICE BOUNDS
            </div>

            {/* Top Left Floating Google Maps Pill */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '10px 14px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{currentCity.name} Hub</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Andhra Pradesh, India</div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(currentCity.dispatchAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ExternalLink size={12} /> Open in Maps
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Rapid Response Helpline matching screenshot */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '64px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ecfeff',
            color: '#008ba6',
            border: '1px solid rgba(0, 194, 232, 0.25)',
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '16px'
          }}>
            ⚡ RAPID RESPONSE HELPLINE
          </div>

          <h2 style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '12px'
          }}>
            Need Quick Appliance Repair?
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 32px'
          }}>
            Don't let a broken AC, refrigerator, washing machine, microwave, geyser, or TV interrupt your routine. Tap below to call or chat with our <strong>Vijayawada</strong>, <strong>Guntur</strong>, or <strong>Nellore</strong> technicians immediately.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <a
              href={COMPANY_CALL_LINK}
              style={{
                background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 194, 232, 0.35)'
              }}
            >
              <Phone size={16} /> CALL SUPPORT NOW: {COMPANY_PHONE_DISPLAY}
            </a>

            <a
              href={COMPANY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#10b981',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>

            <button
              onClick={handleBookNow}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Book Online
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
