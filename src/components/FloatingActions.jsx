import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_PHONE_DISPLAY, COMPANY_CALL_LINK, COMPANY_WHATSAPP_LINK } from '../constants/data';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999
      }}
      aria-label="Floating Quick Actions"
    >
      {/* 1. TOP: Dark Navy Direct Call Button */}
      <a
        href={COMPANY_CALL_LINK}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#091a3c', // Deep Navy Blue from screenshot
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(9, 26, 60, 0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          const tip = e.currentTarget.querySelector('.tooltip');
          if (tip) tip.style.opacity = '1';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          const tip = e.currentTarget.querySelector('.tooltip');
          if (tip) tip.style.opacity = '0';
        }}
        aria-label="Call 9515661677"
        title="Direct Call"
      >
        <Phone size={22} />
        <span
          className="tooltip"
          style={{
            position: 'absolute',
            right: '62px',
            background: 'rgba(9, 26, 60, 0.95)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          Call {COMPANY_PHONE_DISPLAY}
        </span>
      </a>

      {/* 2. MIDDLE: Vibrant Orange WhatsApp / Chat Message Button */}
      <a
        href={COMPANY_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#ff6200', // Vibrant Orange from screenshot
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(255, 98, 0, 0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          const tip = e.currentTarget.querySelector('.tooltip');
          if (tip) tip.style.opacity = '1';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          const tip = e.currentTarget.querySelector('.tooltip');
          if (tip) tip.style.opacity = '0';
        }}
        aria-label="Chat on WhatsApp"
        title="WhatsApp Support"
      >
        <MessageCircle size={24} />
        <span
          className="tooltip"
          style={{
            position: 'absolute',
            right: '62px',
            background: 'rgba(255, 98, 0, 0.95)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          WhatsApp {COMPANY_PHONE_DISPLAY}
        </span>
      </a>

      {/* 3. BOTTOM: Up Direction Arrow to Move Top of the Page */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#091a3c', // Matching dark navy style
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            position: 'relative'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            const tip = e.currentTarget.querySelector('.tooltip');
            if (tip) tip.style.opacity = '1';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            const tip = e.currentTarget.querySelector('.tooltip');
            if (tip) tip.style.opacity = '0';
          }}
          aria-label="Scroll to top of the page"
          title="Move to top"
        >
          <ArrowUp size={22} />
          <span
            className="tooltip"
            style={{
              position: 'absolute',
              right: '58px',
              background: 'rgba(9, 26, 60, 0.9)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: 0,
              transition: 'opacity 0.2s ease'
            }}
          >
            Move to Top
          </span>
        </button>
      )}
    </div>
  );
}
