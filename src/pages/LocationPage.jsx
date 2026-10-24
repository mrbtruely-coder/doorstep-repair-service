import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { 
  CITIES, 
  SERVICE_CATEGORIES, 
  COMPANY_PHONE, 
  COMPANY_PHONE_DISPLAY, 
  COMPANY_CALL_LINK, 
  COMPANY_WHATSAPP_LINK 
} from '../constants/data';
import { 
  MapPin, Phone, MessageCircle, Clock, ShieldCheck, CheckCircle2, 
  ArrowRight, Sparkles, Navigation, AlertCircle, Wrench, ChevronRight 
} from 'lucide-react';

export default function LocationPage({ 
  selectedCity = 'vijayawada', 
  setSelectedCity, 
  setActivePage, 
  setSelectedService 
}) {
  // Normalize current city
  const currentCityId = (selectedCity || 'vijayawada').toLowerCase();
  const cityData = CITIES.find(c => c.id.toLowerCase() === currentCityId) || CITIES[0];

  // 1. Dynamic SEO
  useSEO({
    title: `Doorstep Appliance Repair in ${cityData.name} | 10 KM Radius Express Service`,
    description: `Same-day doorstep appliance repair in ${cityData.name} across a 10 KM radial radius. Certified technicians for AC, Refrigerator, Washing Machine, Microwave Oven, Geyser & TV. Free visit within 10 km. Call 9515661677.`,
    keywords: `${cityData.name} appliance repair, ac service ${cityData.name}, fridge repair ${cityData.name}, washing machine repair ${cityData.name}, 10km radius repair ${cityData.name}`,
    canonicalUrl: `http://localhost:3001/service-center/${cityData.id}`,
    ogType: 'website',
    ogImage: '/hero-technician.jpg'
  });

  const handleBookCategory = (catName) => {
    if (setSelectedService) {
      setSelectedService(catName);
    }
    setActivePage('book', catName);
  };

  const handleViewSubcategories = (catId) => {
    setActivePage('services', catId);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* 1. TOP BREADCRUMB & CITY SELECTOR BAR */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
            <button 
              onClick={() => setActivePage('home')} 
              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
            >
              Home
            </button>
            <ChevronRight size={14} />
            <span>Locations</span>
            <ChevronRight size={14} />
            <strong style={{ color: '#008ba6' }}>{cityData.name} (10 KM Radius)</strong>
          </div>

          {/* Quick City Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Hub:
            </span>
            {CITIES.map((c) => {
              const isSelected = c.id === cityData.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    if (setSelectedCity) setSelectedCity(c.id);
                    window.history.pushState(null, '', `/service-center/${c.id}`);
                  }}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    border: isSelected ? 'none' : '1.5px solid #cbd5e1',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 194, 232, 0.35)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  📍 {c.name}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. LOCATION HERO WITH 10 KM RADIUS SPOTLIGHT */}
      <section style={{
        background: 'linear-gradient(180deg, #ecfeff 0%, #ffffff 100%)',
        padding: '56px 0 40px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Radius Highlight Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#07152b',
              color: '#00c2e8',
              padding: '7px 18px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(7, 21, 43, 0.15)'
            }}>
              <Navigation size={14} color="#00c2e8" />
              <span>10 KM SERVICE RADIUS COVERAGE HUB</span>
            </div>

            {/* City Title */}
            <h1 style={{
              fontSize: '44px',
              fontWeight: 800,
              color: '#091a3c',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '18px'
            }}>
              Doorstep Appliance Repair in <span style={{ color: '#008ba6' }}>{cityData.name}</span>
            </h1>

            {/* Subhead with 10 KM radius mention */}
            <p style={{
              fontSize: '17px',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '820px',
              margin: '0 auto 28px'
            }}>
              Certified multi-brand technicians dispatched directly to your home within <strong>60 to 90 minutes</strong>. 
              Enjoy <strong>₹0 Booking Fee</strong> and comprehensive repair coverage across all residential colonies within a <strong>10 KM radius</strong> of {cityData.hub}.
            </p>

            {/* Central 10 KM Radius Guarantee Card */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #a5f3fc',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 10px 25px -5px rgba(0, 194, 232, 0.15)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              textAlign: 'left',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Navigation size={20} color="#0891b2" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>10 KM Free Radial Reach</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Zero extra travel fee across all colonies</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} color="#0891b2" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>60–90 Min Arrival</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Fast express technician dispatch</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color="#0891b2" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>90 Days Spares Warranty</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Original manufacturer replacement parts</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} color="#0891b2" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Local Hub: {cityData.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{cityData.hub}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePage('book')}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0, 194, 232, 0.4)'
                }}
              >
                Book Service in {cityData.name}
              </button>

              <a
                href={COMPANY_CALL_LINK}
                className="btn btn-secondary"
                style={{
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={16} /> Call Dispatch: {COMPANY_PHONE_DISPLAY}
              </a>

              <a
                href={COMPANY_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={17} /> WhatsApp {cityData.name} Desk
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COLONIES & NEIGHBORHOODS COVERED IN 10 KM RADIUS */}
      <section style={{ padding: '56px 0 48px', background: '#fafbfc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#008ba6'
            }}>
              LOCAL SERVICE COVERAGE
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#091a3c', marginTop: '6px' }}>
              Colonies & Areas Covered Within 10 KM of {cityData.name}
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>
              Our mobile technician vans are stationed across {cityData.name} to guarantee rapid 60–90 min doorstep arrival in all major residential colonies, apartments, and layouts.
            </p>
          </div>

          {/* Colonies Badges Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
            maxWidth: '1100px',
            margin: '0 auto 24px'
          }}>
            {cityData.keyColonies.map((colony, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1e293b',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#ecfeff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={16} color="#0891b2" />
                </div>
                <span>{colony}</span>
              </div>
            ))}
          </div>

          {/* 10 KM Radius Assurance Notice */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#ecfeff',
            border: '1px solid #a5f3fc',
            borderRadius: '14px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#0e7490',
            fontSize: '13.5px',
            fontWeight: 600
          }}>
            <Sparkles size={20} color="#0891b2" style={{ flexShrink: 0 }} />
            <span>
              <strong>10 KM Radial Radius Assurance:</strong> Even if your specific colony or apartment isn't listed above, our service vans cover all locations within a 10 KM radial perimeter from our central hub.
            </span>
          </div>

        </div>
      </section>

      {/* 4. APPLIANCE CATEGORIES AVAILABLE IN THIS CITY */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#008ba6'
            }}>
              DOORSTEP SERVICES AVAILABLE
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#091a3c', marginTop: '6px' }}>
              Repair Categories in {cityData.name}
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>
              Choose your appliance to book doorstep inspection in {cityData.name} or explore all subcategories and fixed pricing.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 194, 232, 0.15)';
                  e.currentTarget.style.borderColor = '#a5f3fc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {/* Category Image Header */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={`${cat.name} in ${cityData.name}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#07152b',
                    color: '#00c2e8',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    10 KM Dispatch
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(4px)',
                    color: '#0f172a',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800
                  }}>
                    {cat.subcategories.length} Subcategories
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '8px' }}>
                    {cat.name} in {cityData.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                    {cat.shortDesc}
                  </p>

                  {/* Subcategories preview chips */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: '#008ba6', letterSpacing: '0.04em', marginBottom: '8px' }}>
                      Key Services Covered:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub.id}
                          style={{
                            background: '#f1f5f9',
                            color: '#334155',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 600
                          }}
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Diagnostic Fee Badge */}
                  <div style={{
                    marginTop: 'auto',
                    padding: '10px 14px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    color: '#334155',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>Diagnostic Fee in {cityData.name}:</span>
                    <strong style={{ color: '#008ba6', fontSize: '13.5px' }}>From ₹249–₹299</strong>
                  </div>

                  {/* Card Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleBookCategory(cat.name)}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Book in {cityData.name}
                    </button>

                    <button
                      onClick={() => handleViewSubcategories(cat.id)}
                      style={{
                        background: '#ffffff',
                        color: '#008ba6',
                        border: '1.5px solid #00c2e8',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Subcategories <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. 10 KM SERVICE RADIUS HIGHLIGHT BANNER */}
      <section style={{
        background: '#07152b',
        color: '#ffffff',
        padding: '56px 0',
        borderRadius: '24px',
        margin: '0 24px'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 194, 232, 0.15)',
            border: '1px solid rgba(0, 194, 232, 0.4)',
            color: '#00c2e8',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            <Navigation size={14} /> 10 KM RADIAL REACH
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Fast Doorstep Dispatch in {cityData.name} Within 90 Minutes
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            No matter which colony you live in within a 10 KM radius of {cityData.hub}, our certified technicians reach you with all needed diagnostic equipment.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivePage('book')}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: 800,
                borderRadius: '10px'
              }}
            >
              Book Technician Now
            </button>

            <a
              href={COMPANY_CALL_LINK}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Phone size={16} /> Call {COMPANY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
