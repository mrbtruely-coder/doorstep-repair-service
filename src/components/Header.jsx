import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MessageCircle, Menu, X, MapPin, 
  ChevronDown, ChevronUp, ArrowRight,
  Wind, Snowflake, RotateCcw, Flame, Droplets, Tv, Sparkles
} from 'lucide-react';
import { 
  COMPANY_PHONE_DISPLAY, 
  COMPANY_CALL_LINK, 
  COMPANY_WHATSAPP_LINK,
  SERVICE_CATEGORIES,
  CITIES 
} from '../constants/data';

// Service Hubs & Cities: Vijayawada, Guntur & Nellore
const HEADER_LOCATIONS = [
  { id: 'vijayawada', name: 'Vijayawada', desc: 'Benz Circle & Patamata Hub' },
  { id: 'guntur', name: 'Guntur', desc: 'Arundelpet & Brodipet Hub' },
  { id: 'nellore', name: 'Nellore', desc: 'Trunk Road & Magunta Layout Hub' }
];

export default function Header({ activePage, setActivePage }) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'categories' | 'locations' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (pageId, categoryId = null) => {
    setActivePage(pageId, categoryId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Map category icons
  const categoryIconMap = {
    'ac': <Wind size={20} color="#0096b7" />,
    'refrigerator': <Snowflake size={20} color="#0096b7" />,
    'washing-machine': <RotateCcw size={20} color="#0096b7" />,
    'oven': <Flame size={20} color="#0096b7" />,
    'geyser': <Droplets size={20} color="#0096b7" />,
    'tv': <Tv size={20} color="#0096b7" />
  };

  // Curated concise descriptions matching screenshot reference
  const categorySummaries = {
    'ac': 'Split & Cassette AC, deep jet wash & eco gas refill...',
    'refrigerator': 'Single, double door, frost-free & gas leak fixes...',
    'washing-machine': 'Front load & top load motor, drum & PCB repairs...',
    'oven': 'Convectional & microwave magnetron, timer & heating fixes...',
    'geyser': 'Instant & electric water heaters, copper coil replacement...',
    'tv': 'LED, Smart & Android TV display panel, backlight repair...'
  };

  const isCategoriesActive = activePage === 'services';
  const isLocationsActive = activePage === 'location';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e2e8f0' }} ref={navRef}>
      {/* 1. TOP TICKER BAR: Dark Navy Background with Logo Cyan Call Accent */}
      <div style={{
        background: '#07152b',
        color: '#ffffff',
        fontSize: '11.5px',
        padding: '6px 0'
      }} className="header-top-ticker">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: '1 1 auto', minWidth: '0' }} className="header-ticker-text">
            <span style={{ color: '#00c2e8', fontWeight: 800 }}>⚡</span>
            <span style={{ fontSize: '11px', lineHeight: 1.3 }}>SAME-DAY DOORSTEP REPAIR IN <strong>VIJAYAWADA</strong>, <strong>GUNTUR</strong> & <strong>NELLORE</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }} className="header-ticker-call">
            <span>CALL</span>
            <a href={COMPANY_CALL_LINK} style={{ color: '#00c2e8', fontWeight: 800, textDecoration: 'none' }}>
              {COMPANY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', position: 'relative' }}>
          
          {/* Official Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <img 
              src="/logo.png" 
              alt="Doorstep Repair Services - Fast Fixes. Happier Homes." 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Desktop Navigation Links */}
          <ul className="desktop-nav-links">
            
            {/* Home Link */}
            <li>
              <button
                onClick={() => handleNavClick('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '14.5px',
                  fontWeight: activePage === 'home' ? 800 : 600,
                  color: activePage === 'home' ? '#00c2e8' : '#091a3c',
                  borderBottom: activePage === 'home' ? '2px solid #00c2e8' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                Home
              </button>
            </li>

            {/* CATEGORIES DROPDOWN TRIGGER */}
            <li style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleDropdown('categories')}
                style={{
                  background: openDropdown === 'categories' ? '#ecfeff' : (isCategoriesActive ? '#f0fbfd' : 'transparent'),
                  border: 'none',
                  padding: '7px 14px',
                  fontSize: '14.5px',
                  fontWeight: openDropdown === 'categories' || isCategoriesActive ? 700 : 600,
                  color: openDropdown === 'categories' || isCategoriesActive ? '#008ba6' : '#091a3c',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s ease'
                }}
                onMouseOver={(e) => {
                  if (openDropdown !== 'categories') e.currentTarget.style.color = '#008ba6';
                }}
                onMouseOut={(e) => {
                  if (openDropdown !== 'categories' && !isCategoriesActive) e.currentTarget.style.color = '#091a3c';
                }}
              >
                <span>Services</span>
                {openDropdown === 'categories' ? (
                  <ChevronUp size={16} color="#008ba6" strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={16} color="#64748b" strokeWidth={2} />
                )}
              </button>

              {/* CATEGORIES FLOATING DROPDOWN CARD (Matching Reference Image) */}
              {openDropdown === 'categories' && (
                <div 
                  className="header-dropdown-card"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    width: '380px',
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    zIndex: 1100,
                    overflow: 'hidden'
                  }}
                >
                  {/* Card Section Header */}
                  <div style={{
                    padding: '16px 20px 8px 20px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#07152b'
                  }}>
                    OUR APPLIANCE SERVICES
                  </div>

                  {/* List of 6 Categories */}
                  <div style={{ padding: '4px 8px' }}>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => handleNavClick('services', cat.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#ecfeff';
                          const title = e.currentTarget.querySelector('.cat-title');
                          if (title) title.style.color = '#008ba6';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          const title = e.currentTarget.querySelector('.cat-title');
                          if (title) title.style.color = '#0f172a';
                        }}
                      >
                        {/* Rounded squircle icon container */}
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '11px',
                          background: '#f0fbfd',
                          border: '1px solid #cffafe',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {categoryIconMap[cat.id] || <Sparkles size={20} color="#0096b7" />}
                        </div>

                        {/* Title and Subtitle */}
                        <div style={{ overflow: 'hidden' }}>
                          <div 
                            className="cat-title"
                            style={{
                              fontSize: '14px',
                              fontWeight: 700,
                              color: '#0f172a',
                              transition: 'color 0.15s ease'
                            }}
                          >
                            {cat.name}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            lineHeight: 1.35,
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {categorySummaries[cat.id] || cat.shortDesc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown Card Footer */}
                  <div 
                    onClick={() => handleNavClick('services', null)}
                    style={{
                      padding: '13px 20px',
                      borderTop: '1px solid #f1f5f9',
                      background: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#ecfeff';
                      e.currentTarget.style.color = '#008ba6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#0096b7';
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#008ba6' }}>
                      Explore All Services
                    </span>
                    <ArrowRight size={15} color="#008ba6" />
                  </div>
                </div>
              )}
            </li>

            {/* LOCATIONS DROPDOWN TRIGGER */}
            <li style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleDropdown('locations')}
                style={{
                  background: openDropdown === 'locations' ? '#ecfeff' : 'transparent',
                  border: 'none',
                  padding: '7px 14px',
                  fontSize: '14.5px',
                  fontWeight: openDropdown === 'locations' ? 700 : 600,
                  color: openDropdown === 'locations' ? '#008ba6' : '#091a3c',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s ease'
                }}
                onMouseOver={(e) => {
                  if (openDropdown !== 'locations') e.currentTarget.style.color = '#008ba6';
                }}
                onMouseOut={(e) => {
                  if (openDropdown !== 'locations') e.currentTarget.style.color = '#091a3c';
                }}
              >
                <span>Locations</span>
                {openDropdown === 'locations' ? (
                  <ChevronUp size={16} color="#008ba6" strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={16} color="#64748b" strokeWidth={2} />
                )}
              </button>

              {/* LOCATIONS FLOATING DROPDOWN CARD */}
              {openDropdown === 'locations' && (
                <div 
                  className="header-dropdown-card"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    width: '270px',
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid #e2e8f0',
                    zIndex: 1100,
                    overflow: 'hidden'
                  }}
                >
                  {/* Card Section Header */}
                  <div style={{
                    padding: '16px 20px 8px 20px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#07152b'
                  }}>
                    SERVICE HUBS & CITIES
                  </div>

                  {/* List of Service Cities - Vijayawada, Guntur & Nellore */}
                  <div style={{ padding: '4px 8px' }}>
                    {HEADER_LOCATIONS.map((city) => (
                      <div
                        key={city.id}
                        onClick={() => handleNavClick('location', city.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#ecfeff';
                          const title = e.currentTarget.querySelector('.city-title');
                          if (title) title.style.color = '#008ba6';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          const title = e.currentTarget.querySelector('.city-title');
                          if (title) title.style.color = '#0f172a';
                        }}
                      >
                        {/* Rounded squircle pin container */}
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: '#f0fbfd',
                          border: '1px solid #cffafe',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <MapPin size={18} color="#0096b7" />
                        </div>

                        {/* City Name Only */}
                        <span 
                          className="city-title"
                          style={{
                            fontSize: '14.5px',
                            fontWeight: 700,
                            color: '#0f172a',
                            transition: 'color 0.15s ease'
                          }}
                        >
                          {city.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown Card Footer */}
                  <div 
                    onClick={() => handleNavClick('location', 'all')}
                    style={{
                      padding: '13px 20px',
                      borderTop: '1px solid #f1f5f9',
                      background: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#ecfeff';
                      e.currentTarget.style.color = '#008ba6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#0096b7';
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#008ba6' }}>
                      All City Hubs & Coverage
                    </span>
                    <ArrowRight size={15} color="#008ba6" />
                  </div>
                </div>
              )}
            </li>

            {/* Book Service Link */}
            <li>
              <button
                onClick={() => handleNavClick('book')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '14.5px',
                  fontWeight: activePage === 'book' ? 800 : 600,
                  color: activePage === 'book' ? '#00c2e8' : '#091a3c',
                  borderBottom: activePage === 'book' ? '2px solid #00c2e8' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                Book Service
              </button>
            </li>

            {/* FAQs Link */}
            <li>
              <button
                onClick={() => handleNavClick('faq')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '14.5px',
                  fontWeight: activePage === 'faq' ? 800 : 600,
                  color: activePage === 'faq' ? '#00c2e8' : '#091a3c',
                  borderBottom: activePage === 'faq' ? '2px solid #00c2e8' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                FAQs
              </button>
            </li>

            {/* Contact Link */}
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '14.5px',
                  fontWeight: activePage === 'contact' ? 800 : 600,
                  color: activePage === 'contact' ? '#00c2e8' : '#091a3c',
                  borderBottom: activePage === 'contact' ? '2px solid #00c2e8' : '2px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                Contact Us
              </button>
            </li>
          </ul>

          {/* Right Action: CTA Button & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => handleNavClick('book')}
              className="header-book-btn"
              style={{
                background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '14px',
                padding: '10px 22px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 194, 232, 0.35)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00c2e8 0%, #008ba6 100%)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)'}
            >
              Book Service
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </nav>

        {/* 3. MOBILE MENU DRAWER (Responsive Accordion for Categories & Locations) */}
        {mobileMenuOpen && (
          <div style={{
            padding: '16px 0 24px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              onClick={() => handleNavClick('home')}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                background: 'transparent',
                fontWeight: 700,
                color: '#091a3c',
                fontSize: '15px'
              }}
            >
              Home
            </button>

            {/* Mobile Categories Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: mobileCategoriesOpen ? '#ecfeff' : 'transparent',
                  borderRadius: '8px',
                  fontWeight: 700,
                  color: mobileCategoriesOpen ? '#008ba6' : '#091a3c',
                  fontSize: '15px'
                }}
              >
                <span>Services</span>
                {mobileCategoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {mobileCategoriesOpen && (
                <div style={{ padding: '6px 14px 10px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleNavClick('services', cat.id)}
                      style={{
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      {categoryIconMap[cat.id]}
                      <span>{cat.name}</span>
                    </div>
                  ))}
                  <div
                    onClick={() => handleNavClick('services', null)}
                    style={{
                      padding: '8px 10px',
                      color: '#008ba6',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Explore All Services →
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Locations Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: mobileLocationsOpen ? '#ecfeff' : 'transparent',
                  borderRadius: '8px',
                  fontWeight: 700,
                  color: mobileLocationsOpen ? '#008ba6' : '#091a3c',
                  fontSize: '15px'
                }}
              >
                <span>Locations</span>
                {mobileLocationsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {mobileLocationsOpen && (
                <div style={{ padding: '6px 14px 10px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {HEADER_LOCATIONS.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => handleNavClick('location', city.id)}
                      style={{
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      <MapPin size={16} color="#008ba6" />
                      <span>{city.name}</span>
                    </div>
                  ))}
                  <div
                    onClick={() => handleNavClick('location', 'all')}
                    style={{
                      padding: '8px 10px',
                      color: '#008ba6',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    All City Hubs & Coverage →
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('book')}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                background: 'transparent',
                fontWeight: 700,
                color: '#091a3c',
                fontSize: '15px'
              }}
            >
              Book Service
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                background: 'transparent',
                fontWeight: 700,
                color: '#091a3c',
                fontSize: '15px'
              }}
            >
              FAQs
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                background: 'transparent',
                fontWeight: 700,
                color: '#091a3c',
                fontSize: '15px'
              }}
            >
              Contact Us
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
