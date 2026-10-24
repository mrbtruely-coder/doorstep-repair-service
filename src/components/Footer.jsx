import React from 'react';
import { SERVICES, CITIES } from '../constants/data';
import { Apple, Play, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const navigateTo = (pageId) => {
    if (setActivePage) {
      setActivePage(pageId);
    } else {
      window.location.href = `/${pageId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceLocations = [
    { city: 'Vijayawada', area: 'Benz Circle & MG Road' },
    { city: 'Vijayawada', area: 'One Town & Gunadala' },
    { city: 'Guntur', area: 'Arundelpet & Brodipet' },
    { city: 'Guntur', area: 'Pattabhipuram & Amaravathi Rd' },
    { city: 'Nellore', area: 'Magunta Layout & Trunk Rd' },
    { city: 'Nellore', area: 'Balaji Nagar & Vedayapalem' }
  ];

  return (
    <footer
      style={{
        backgroundColor: '#051129', // Deep dark navy from screenshot
        color: '#94a3b8',
        padding: '60px 0 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        marginTop: 'auto',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="container" style={{ maxWidth: '1220px' }}>
        
        {/* Main 4-Column Grid matching screenshot */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1.1fr 1.1fr 1fr',
          gap: '40px',
          marginBottom: '48px'
        }} className="footer-responsive-grid">
          
          {/* Col 1: Logo, Description & Mobile App Badges */}
          <div>
            {/* Official Brand Logo on Crisp White Container for Contrast */}
            <div 
              onClick={() => navigateTo('home')}
              style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginBottom: '18px' }}
            >
              <div style={{
                background: '#ffffff',
                padding: '6px 14px',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Doorstep Repair Services - Fast Fixes. Happier Homes." 
                  style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            <p style={{
              fontSize: '13.5px',
              color: '#8da2c0',
              lineHeight: 1.65,
              marginBottom: '22px',
              maxWidth: '330px'
            }}>
              Door Step Service is Andhra Pradesh’s premium appliance repair and maintenance company. We specialize in fast AC, Refrigerator, Washing Machine, Microwave, Geyser, and TV diagnostics right at your home in Vijayawada, Guntur, and Nellore.
            </p>

            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a658a', marginBottom: '10px' }}>
              EXPERIENCE ON MOBILE APP
            </div>

            {/* App Store & Google Play Badges matching screenshot */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{
                background: '#091a3c',
                border: '1px solid #1e355b',
                borderRadius: '8px',
                padding: '6px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <Apple size={18} color="#ffffff" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '8px', color: '#8da2c0', textTransform: 'uppercase' }}>DOWNLOAD ON THE</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>App Store</div>
                </div>
              </div>

              <div style={{
                background: '#091a3c',
                border: '1px solid #1e355b',
                borderRadius: '8px',
                padding: '6px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <Play size={16} color="#ffffff" fill="#ffffff" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '8px', color: '#8da2c0', textTransform: 'uppercase' }}>GET IT ON</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Google Play</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: OUR REPAIR SERVICES with Orange Underline */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}>
                OUR REPAIR SERVICES
              </h4>
              <div style={{ width: '32px', height: '2.5px', background: '#00c2e8', borderRadius: '2px' }}></div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', padding: 0 }}>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => navigateTo('services')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#8da2c0',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.15s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SERVICE LOCATIONS with Orange Underline */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}>
                SERVICE LOCATIONS
              </h4>
              <div style={{ width: '32px', height: '2.5px', background: '#00c2e8', borderRadius: '2px' }}></div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', padding: 0 }}>
              {serviceLocations.map((loc, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo('contact')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#8da2c0',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.15s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
                  >
                    {loc.area} ({loc.city})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: QUICK LINKS with Orange Underline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px',
                lineHeight: 1.2
              }}>
                QUICK LINKS
              </h4>
              <div style={{ width: '32px', height: '2.5px', background: '#00c2e8', borderRadius: '2px' }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(90px, 1fr) minmax(110px, 1fr)',
              columnGap: '28px',
              rowGap: '12px',
              alignItems: 'start'
            }}>
              <button
                onClick={() => navigateTo('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('faq')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                FAQs
              </button>

              <button
                onClick={() => navigateTo('services')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                Services
              </button>

              <button
                onClick={() => navigateTo('contact')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                Contact Us
              </button>

              <button
                onClick={() => navigateTo('book')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                Book Service
              </button>

              <button
                onClick={() => navigateTo('policy')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8da2c0',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#8da2c0'}
              >
                Privacy Policy
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Divider Line matching screenshot */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '22px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12.5px',
            color: '#657e9e'
          }}>
            <div>
              &copy; {new Date().getFullYear()} DOORSTEP REPAIR SERVICES. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Made with</span>
              <Heart size={13} fill="#ef4444" color="#ef4444" />
              <span>for Vijayawada, Guntur & Nellore residents.</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
