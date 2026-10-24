import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { 
  SERVICE_CATEGORIES, 
  COMPANY_PHONE_DISPLAY, 
  COMPANY_CALL_LINK, 
  COMPANY_WHATSAPP_LINK 
} from '../constants/data';
import { 
  Check, ArrowRight, ArrowLeft, ShieldCheck, Phone, MessageCircle, 
  Sparkles, Clock, Wrench, ChevronRight, Award, Zap
} from 'lucide-react';

export default function ServicesPage({ 
  setActivePage, 
  setSelectedService, 
  selectedCategory: externalCategory, 
  setSelectedCategory: setExternalCategory 
}) {
  // Rich SEO Metadata
  useSEO({
    title: 'Appliance Repair Categories & Subcategories | Doorstep Repair Services',
    description: 'Browse complete categories and subcategories for Oven, Geyser, TV, AC, Washing Machine & Refrigerator repair in Vijayawada, Guntur, and Nellore. 90-day warranty, transparent pricing.',
    keywords: 'convectional oven repair, microwave repair, electric geyser, instant geyser, lcd tv, smart tv repair, tv mounting, split ac, cassette ac, front load washer, top load washing machine, double door fridge repair',
    canonicalUrl: 'http://localhost:3001/services',
    ogType: 'website',
    ogImage: '/service_ac.jpg'
  });

  // Internal or external category state
  const [internalCategory, setInternalCategory] = useState(null);
  const currentCategoryId = externalCategory !== undefined ? externalCategory : internalCategory;

  const handleSelectCategory = (categoryId) => {
    if (setExternalCategory) {
      setExternalCategory(categoryId);
    } else {
      setInternalCategory(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearCategory = () => {
    if (setExternalCategory) {
      setExternalCategory(null);
    } else {
      setInternalCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (serviceName) => {
    if (setSelectedService) setSelectedService(serviceName);
    if (setActivePage) {
      setActivePage('book');
    } else {
      window.location.href = '/book';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find currently active category object if selected
  const activeCategory = currentCategoryId 
    ? SERVICE_CATEGORIES.find(c => c.id === currentCategoryId) 
    : null;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. HERO BANNER: Dark Navy Gradient with Cyan Accents */}
      <section style={{
        background: 'linear-gradient(180deg, #07152b 0%, #091a3c 100%)',
        color: '#ffffff',
        padding: '60px 0 66px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Breadcrumb Nav */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#94a3b8',
            marginBottom: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button 
              onClick={() => setActivePage ? setActivePage('home') : (window.location.href = '/')}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
            >
              Home
            </button>
            <ChevronRight size={13} />
            <button 
              onClick={handleClearCategory}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeCategory ? '#00c2e8' : '#ffffff', 
                fontWeight: activeCategory ? 600 : 700,
                cursor: 'pointer', 
                padding: 0 
              }}
            >
              Services
            </button>
            {activeCategory && (
              <>
                <ChevronRight size={13} />
                <span style={{ color: '#00c2e8', fontWeight: 700 }}>
                  {activeCategory.name}
                </span>
              </>
            )}
          </div>

          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#00c2e8',
            marginBottom: '14px'
          }}>
            VIJAYAWADA • GUNTUR • NELLORE DOORSTEP REPAIRS
          </div>

          <h1 style={{
            fontSize: '40px',
            fontWeight: 800,
            lineHeight: 1.18,
            color: '#ffffff',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            {activeCategory 
              ? `${activeCategory.title}`
              : 'Our Appliance Repair Categories'
            }
          </h1>

          <p style={{
            fontSize: '15.5px',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            {activeCategory 
              ? activeCategory.shortDesc
              : 'Choose any appliance category below to see detailed subcategories, transparent pricing, and instant doorstep technician booking.'
            }
          </p>

          {/* Quick Filter Pill Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '32px'
          }}>
            <button
              onClick={handleClearCategory}
              style={{
                background: !activeCategory ? '#00c2e8' : 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: !activeCategory ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All Categories ({SERVICE_CATEGORIES.length})
            </button>
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  style={{
                    background: isSelected ? '#00c2e8' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. CONDITIONAL VIEW: SUBCATEGORY DETAIL VIEW OR MAIN CATEGORIES GRID */}
      {activeCategory ? (
        /* ========================================================
           VIEW B: SUBCATEGORIES LIST PAGE FOR THE SELECTED CATEGORY
           ======================================================== */
        <section style={{ padding: '56px 0 80px', background: '#f8fafc' }}>
          <div className="container">
            
            {/* Top Back Button & Category Banner */}
            <div style={{ marginBottom: '32px' }}>
              <button
                onClick={handleClearCategory}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  color: '#091a3c',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#00c2e8';
                  e.currentTarget.style.color = '#00c2e8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#091a3c';
                }}
              >
                <ArrowLeft size={16} /> Back to All Appliance Categories
              </button>

              {/* Spotlight Banner Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr',
                gap: '32px',
                alignItems: 'center',
                boxShadow: '0 4px 16px rgba(9, 26, 60, 0.05)'
              }} className="category-spotlight-responsive">
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#ecfeff',
                    color: '#008ba6',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    marginBottom: '12px',
                    border: '1px solid rgba(0, 194, 232, 0.25)'
                  }}>
                    <ShieldCheck size={13} style={{ color: '#00c2e8' }} /> {activeCategory.tag}
                  </div>

                  <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>
                    {activeCategory.name} Subcategories
                  </h2>

                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                    Select your exact {activeCategory.name.toLowerCase()} type below. Our doorstep technicians carry original brand spare parts, certified multimeters, and pressure tools.
                  </p>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 700, color: '#091a3c' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} style={{ color: '#00c2e8' }} /> 90-Day Warranty
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} style={{ color: '#00c2e8' }} /> Genuine OEM Spares
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} style={{ color: '#00c2e8' }} /> Arrival in 90 Mins
                    </div>
                  </div>
                </div>

                <div style={{
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '2px solid rgba(0, 194, 232, 0.2)',
                  boxShadow: '0 8px 20px rgba(0, 194, 232, 0.15)'
                }}>
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Subcategories Grid */}
            <h3 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#091a3c',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Available Subcategory Services ({activeCategory.subcategories.length})
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: activeCategory.subcategories.length >= 3 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
              gap: '24px'
            }} className="subcategories-grid-responsive">
              {activeCategory.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1.5px solid #e2e8f0',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(9, 26, 60, 0.04)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#00c2e8';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 194, 232, 0.18)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(9, 26, 60, 0.04)';
                  }}
                >
                  <div>
                    {/* Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#ecfeff',
                      color: '#008ba6',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      marginBottom: '12px'
                    }}>
                      <Sparkles size={12} style={{ color: '#00c2e8' }} /> {sub.badge}
                    </div>

                    <h4 style={{ fontSize: '19px', fontWeight: 800, color: '#091a3c', marginBottom: '10px' }}>
                      {sub.name}
                    </h4>

                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55, marginBottom: '20px' }}>
                      {sub.shortDesc}
                    </p>

                    {/* Common Issues Checklist */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Common Problems Solved:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {sub.issues.map((issue, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                            <Check size={14} style={{ color: '#00c2e8', flexShrink: 0 }} />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom: Price and CTA */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Inspection Charge</div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#091a3c' }}>{sub.price}</div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#16a34a', fontWeight: 700, background: '#f0fdf4', padding: '3px 8px', borderRadius: '4px' }}>
                        Adjusted in Bill
                      </span>
                    </div>

                    <button
                      onClick={() => handleBook(sub.name)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '14px',
                        padding: '12px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0, 194, 232, 0.35)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00c2e8 0%, #008ba6 100%)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)';
                      }}
                    >
                      Book {sub.name} <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      ) : (
        /* ========================================================
           VIEW A: MAIN CATEGORIES LISTING (WITH AUTHENTIC IMAGES)
           ======================================================== */
        <section style={{ padding: '64px 0 80px', background: '#f8fafc' }}>
          <div className="container">
            
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <div className="section-badge">Choose Appliance Category</div>
              <h2 className="section-title">Select an Appliance to View Subcategories</h2>
              <p className="section-subtitle">
                Click on any appliance below to see its exact subcategory repairs, service pricing, and book your verified local technician.
              </p>
            </div>

            {/* 6 Category Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px'
            }} className="services-showcase-grid">
              {SERVICE_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(9, 26, 60, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#00c2e8';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 194, 232, 0.18)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(9, 26, 60, 0.04)';
                  }}
                >
                  {/* Category Image Header */}
                  <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden', background: '#091a3c' }}>
                    <img
                      src={cat.image}
                      alt={`${cat.name} in Vijayawada, Guntur & Nellore`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.3s ease'
                      }}
                    />

                    {/* Subcategories Count Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(7, 21, 43, 0.85)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: '9999px',
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      color: '#00c2e8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(0, 194, 232, 0.3)'
                    }}>
                      <span>{cat.subcategories.length} Subcategories</span>
                    </div>

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
                      {cat.tag}
                    </div>
                  </div>

                  {/* Category Card Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#091a3c', marginBottom: '8px' }}>
                      {cat.name}
                    </h3>

                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55, marginBottom: '18px', minHeight: '42px' }}>
                      {cat.shortDesc}
                    </p>

                    {/* Subcategories Preview Chips */}
                    <div style={{ marginBottom: '20px', flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Included Subcategories:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {cat.subcategories.map((sub) => (
                          <span
                            key={sub.id}
                            style={{
                              background: '#f1f5f9',
                              color: '#334155',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0'
                            }}
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div style={{
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>
                          Diagnostic from
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#091a3c' }}>
                          ₹249 - ₹399
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCategory(cat.id);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '13px',
                          padding: '10px 18px',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(0, 194, 232, 0.35)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
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
                        Explore Subcategories <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 3. QUICK ASSISTANCE STRIP */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '36px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '15px', color: '#091a3c', fontWeight: 600 }}>
            Need help selecting the right service?
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
