import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin } from 'lucide-react';
import { COMPANY_PHONE_DISPLAY, COMPANY_CALL_LINK, COMPANY_WHATSAPP_LINK } from '../constants/data';

export default function Header({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'book', label: 'Book Service' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      {/* 1. TOP TICKER BAR: Dark Navy Background with Brand Orange Call Accent */}
      <div style={{
        background: '#091a3c',
        color: '#ffffff',
        fontSize: '12px',
        padding: '7px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#ff6200', fontWeight: 800 }}>⚡</span>
            <span>SAME-DAY DOORSTEP APPLIANCE REPAIR IN <strong>VIJAYAWADA</strong>, <strong>GUNTUR</strong> & <strong>NELLORE</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>CALL</span>
            <a href={COMPANY_CALL_LINK} style={{ color: '#ff6200', fontWeight: 800, textDecoration: 'none' }}>
              {COMPANY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR: Clean White Background with Brand Logo and Orange CTA Button */}
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
          
          {/* Logo matching screenshot */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#091a3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#ffffff' }}></div>
              </div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ff6200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }}></div>
              </div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#091a3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }}></div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#091a3c', letterSpacing: '0.04em', lineHeight: 1 }}>
                DOORSTEP
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#ff6200', letterSpacing: '0.12em', marginTop: '2px' }}>
                SERVICE
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none' }} className="nav-links">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '8px 14px',
                      fontSize: '14.5px',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? '#ff6200' : '#091a3c',
                      borderBottom: isActive ? '2px solid #ff6200' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Action Button: Brand Orange */}
          <div>
            <button
              onClick={() => handleNavClick('book')}
              style={{
                background: '#ff6200',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '14px',
                padding: '10px 22px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 98, 0, 0.35)',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#e05600'}
              onMouseOut={(e) => e.currentTarget.style.background = '#ff6200'}
            >
              Book Service
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}
