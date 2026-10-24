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
      {/* 1. TOP TICKER BAR: Dark Navy Background with Logo Cyan Call Accent */}
      <div style={{
        background: '#07152b',
        color: '#ffffff',
        fontSize: '12px',
        padding: '7px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#00c2e8', fontWeight: 800 }}>⚡</span>
            <span>SAME-DAY DOORSTEP APPLIANCE REPAIR IN <strong>VIJAYAWADA</strong>, <strong>GUNTUR</strong> & <strong>NELLORE</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>CALL</span>
            <a href={COMPANY_CALL_LINK} style={{ color: '#00c2e8', fontWeight: 800, textDecoration: 'none' }}>
              {COMPANY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR: Clean White Background with Official Logo and Cyan CTA Button */}
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
          
          {/* Official Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <img 
              src="/logo.png" 
              alt="Doorstep Repair Services - Fast Fixes. Happier Homes." 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
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
                      color: isActive ? '#00c2e8' : '#091a3c',
                      borderBottom: isActive ? '2px solid #00c2e8' : '2px solid transparent',
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

          {/* Right Action Button: Logo Cyan */}
          <div>
            <button
              onClick={() => handleNavClick('book')}
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
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00c2e8 0%, #008ba6 100%)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)'}
            >
              Book Service
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}
