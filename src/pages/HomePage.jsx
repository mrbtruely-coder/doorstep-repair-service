import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { SERVICES, CITIES, COMPANY_PHONE_DISPLAY, COMPANY_WHATSAPP_LINK, COMPANY_CALL_LINK, PLAY_STORE_URL, APP_STORE_URL } from '../constants/data';
import { 
  Clock, ShieldCheck, Star, ArrowRight, Phone, MessageCircle, 
  Wrench, Zap, IndianRupee, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2,
  Apple, Play, Smartphone, QrCode, Tag
} from 'lucide-react';

export default function HomePage({ setActivePage, setSelectedService }) {
  useSEO(getSEOMetadata({ page: 'home' }));

  const [activeFaq, setActiveFaq] = useState(0);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const handleBookNow = (serviceName) => {
    if (serviceName) setSelectedService(serviceName);
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reviews = [
    {
      name: "Suresh Rao",
      city: "Nellore (Magunta Layout)",
      rating: 5,
      appliance: "Washing Machine & Refrigerator Repair",
      text: "My front load washing machine was making severe rattling sounds and leaking water. Within 60 minutes of booking, the technician arrived at my doorstep in Nellore, diagnosed a faulty water pump, replaced it with original parts, and tested the spin cycle thoroughly. Super polite and professional!"
    },
    {
      name: "Lakshmi Narayana",
      city: "Vijayawada (Benz Circle)",
      rating: 5,
      appliance: "Microwave Oven & Geyser Repair",
      text: "Our convection oven stopped heating right during festival preparations. Booked through their website and the technician arrived promptly. Upfront pricing, genuine heating coil replacement with bill & warranty. Best doorstep service in Vijayawada!"
    },
    {
      name: "Venkatesh Kumar",
      city: "Guntur (Brodipet)",
      rating: 5,
      appliance: "Smart LED TV & Split AC Service",
      text: "Smart TV backlight issue resolved on the same day. Transparent diagnosis and polite technicians. Very satisfied with the 90 days warranty and automated email receipt."
    }
  ];

  const standards = [
    {
      icon: <Zap size={24} style={{ color: '#00c2e8' }} />,
      title: "Speedy Arrival",
      desc: "Our verified local technicians reach your home in Vijayawada, Guntur, or Nellore within 60 to 90 minutes of booking confirmation."
    },
    {
      icon: <Award size={24} style={{ color: '#091a3c' }} />,
      title: "Performance First",
      desc: "We perform full diagnostics with precision tools and replace faulty components using 100% genuine brand-certified spare parts."
    },
    {
      icon: <IndianRupee size={24} style={{ color: '#00c2e8' }} />,
      title: "Affordable Pricing",
      desc: "Honest, upfront quote before starting any work. Nominal inspection charge starting at ₹249, fully adjusted into your final repair bill."
    },
    {
      icon: <Wrench size={24} style={{ color: '#091a3c' }} />,
      title: "Certified Technicians",
      desc: "Skill-tested and background-checked technicians with extensive expertise in all major Indian and international appliance brands."
    },
    {
      icon: <Clock size={24} style={{ color: '#00c2e8' }} />,
      title: "Same-Day Resolution",
      desc: "Over 92% of common microwave oven, geyser, refrigerator, TV, and washer issues are resolved right on the spot in a single visit."
    },
    {
      icon: <ShieldCheck size={24} style={{ color: '#091a3c' }} />,
      title: "90-Day Warranty Protection",
      desc: "Every replaced part and service labor is protected under our hassle-free 90-day doorstep warranty guarantee."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Easy Booking",
      desc: "Select your appliance and preferred time slot online or dial 9515661677 directly."
    },
    {
      num: "02",
      title: "Doorstep Arrival",
      desc: "Our verified technician reaches your address in Vijayawada, Guntur, or Nellore within 90 minutes."
    },
    {
      num: "03",
      title: "Inspection & Quote",
      desc: "Comprehensive diagnosis with clear, upfront estimates before repair commences."
    },
    {
      num: "04",
      title: "Expert Repair & Bill",
      desc: "Repaired on spot with genuine spares, automated invoice, and 90-day warranty coverage."
    }
  ];

  const faqs = [
    {
      q: "What is your visiting inspection fee and is it adjustable?",
      a: "Our visiting diagnostic charge starts from a nominal ₹249 to ₹299. When you approve the repair estimate, the visiting inspection fee is fully adjusted against the final service invoice."
    },
    {
      q: "How fast will a technician arrive at my home in Vijayawada, Guntur, or Nellore?",
      a: "We have dedicated local squads across all three cities. An experienced technician typically reaches your doorstep within 60 to 90 minutes of your booking."
    },
    {
      q: "Are the replacement spare parts genuine and covered under warranty?",
      a: "Yes! We only use 100% original, brand-certified spare components. All replaced parts and labor carry a warranty protection ranging from 30 up to 90 days."
    },
    {
      q: "Will I get an automated confirmation email after submitting the booking?",
      a: "Yes, our automated Node.js email system instantly dispatches a full booking summary with technician details to your email address as soon as you confirm."
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '48px 0 60px', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.2fr',
            gap: '50px',
            alignItems: 'center'
          }} className="hero-grid-responsive">
            
            {/* Left Hero Image */}
            <div style={{ position: 'relative' }}>
              <div 
                className="hero-image-wrapper"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -15px rgba(9, 26, 60, 0.12)',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}
              >
                <img
                  src="/hero-technician.jpg"
                  alt="Certified Appliance Repair Technician at Doorstep"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Right Hero Content */}
            <div>
              {/* Badge: Logo Cyan Accent */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ecfeff',
                border: '1px solid rgba(0, 194, 232, 0.25)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#008ba6',
                marginBottom: '16px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00c2e8', display: 'inline-block' }}></span>
                <span>Verified Local Appliance Technicians</span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: '44px',
                fontWeight: 800,
                lineHeight: 1.18,
                color: '#091a3c',
                marginBottom: '16px'
              }}>
                Easy Doorstep Repair <br />
                <span style={{ color: '#00c2e8' }}>Oven, TV, AC, Fridge & Washer</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '28px'
              }}>
                Fast, professional technicians at your doorstep in 90 minutes. Transparent diagnostics &amp; 90-day warranty.
              </p>

              {/* 3 Metric Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Clock size={20} style={{ color: '#00c2e8' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '17px', color: '#091a3c' }}>90 Min</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Doorstep Arrival</div>
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <ShieldCheck size={20} style={{ color: '#00c2e8' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '17px', color: '#091a3c' }}>100%</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Genuine Parts</div>
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Award size={20} style={{ color: '#00c2e8' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '17px', color: '#091a3c' }}>90-Day</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Service Warranty</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons: Deep Navy & Brand Orange */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href={COMPANY_CALL_LINK}
                  className="btn btn-call"
                  style={{ padding: '14px 24px', fontSize: '15px' }}
                >
                  <Phone size={17} /> Call Expert: {COMPANY_PHONE_DISPLAY}
                </a>

                <button
                  onClick={() => handleBookNow()}
                  className="btn btn-primary"
                  style={{ padding: '14px 24px', fontSize: '15px', fontWeight: 700 }}
                >
                  Book Service Online <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section style={{
        background: '#091a3c',
        padding: '36px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'center'
          }} className="stats-grid-responsive">
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#00c2e8' }}>15k+</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Repairs Completed</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#00c2e8' }}>98%</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Happy Customers</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#00c2e8' }}>24/7</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Booking Support</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#00c2e8' }}>100%</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Genuine Spares</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REDEFINING APPLIANCE SERVICE STANDARDS */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title">Redefining Appliance Service Standards</h2>
            <p className="section-subtitle">
              Technicians delivered to your doorstep in Vijayawada, Guntur & Nellore with unmatched speed, transparent rates, and guaranteed craftsmanship.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }} className="standards-grid-responsive">
            {standards.map((st, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(9, 26, 60, 0.04)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#ecfeff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  border: '1px solid rgba(0, 194, 232, 0.25)'
                }}>
                  {st.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091a3c', marginBottom: '8px' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR SIMPLE & SEAMLESS JOURNEY */}
      <section className="section-padding" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Work Process</div>
            <h2 className="section-title">Our Simple & Seamless Journey</h2>
            <p className="section-subtitle">
              Fast, transparent, and completely doorstep-based from start to finish.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }} className="steps-grid-responsive">
            {steps.map((st, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#ecfeff',
                  color: '#008ba6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px',
                  margin: '0 auto 18px',
                  border: '2px solid #00c2e8'
                }}>
                  {st.num}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#091a3c', marginBottom: '8px' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.55' }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DOWNLOAD OUR MOBILE APP (iOS & Play Store) - HIGHLIGHTED SHOWCASE */}
      <section className="section-padding" style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #07152b 0%, #0d274d 50%, #004857 100%)',
            borderRadius: '26px',
            padding: '52px 48px',
            border: '1.5px solid rgba(0, 194, 232, 0.35)',
            boxShadow: '0 24px 60px -15px rgba(0, 194, 232, 0.22), 0 12px 36px -10px rgba(7, 21, 43, 0.45)',
            position: 'relative',
            overflow: 'hidden'
          }} className="app-download-banner">
            
            {/* Background Glow Accents */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 194, 232, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '20%',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 72, 87, 0.4) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div className="app-download-grid">
              
              {/* Left Column: Copy & Store Download Badges */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                
                {/* Highlight Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0, 194, 232, 0.15)',
                  border: '1px solid rgba(0, 194, 232, 0.4)',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#00e1ff',
                  marginBottom: '18px'
                }}>
                  <Smartphone size={15} color="#00e1ff" />
                  <span>Doorstep Repair Mobile App</span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: '38px',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '16px'
                }}>
                  Download Our App on <br />
                  <span style={{ color: '#00c2e8' }}>iOS App Store</span> & <span style={{ color: '#22c55e' }}>Google Play</span>
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '15.5px',
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                  marginBottom: '26px',
                  maxWidth: '520px'
                }}>
                  Book appliance technicians in 60 seconds, track their doorstep arrival in real time on the live map, receive instant digital quotes, and access your 90-day warranty certificates anytime.
                </p>

                {/* 4 App Benefits Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '32px',
                  maxWidth: '540px'
                }} className="app-perks-grid">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontSize: '13.5px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 194, 232, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={14} color="#00e1ff" />
                    </div>
                    <span>Live GPS Technician Tracker</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontSize: '13.5px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 194, 232, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={14} color="#00e1ff" />
                    </div>
                    <span>Instant Digital Bill & Warranty</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontSize: '13.5px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 194, 232, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={14} color="#00e1ff" />
                    </div>
                    <span>Priority 60-Min Doorstep Arrival</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontSize: '13.5px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Tag size={13} color="#22c55e" />
                    </div>
                    <span style={{ color: '#86efac' }}>Flat ₹100 OFF on 1st App Order</span>
                  </div>
                </div>

                {/* Highlighted Store Buttons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '20px'
                }}>
                  {/* Apple App Store Button */}
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#040b17',
                      border: '1.5px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '14px',
                      padding: '12px 22px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#00c2e8';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 194, 232, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <Apple size={28} color="#ffffff" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Download on the</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}>App Store</div>
                    </div>
                  </a>

                  {/* Google Play Store Button */}
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#040b17',
                      border: '1.5px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '14px',
                      padding: '12px 22px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#22c55e';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 25px rgba(34, 197, 94, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <Play size={26} color="#22c55e" fill="#22c55e" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>GET IT ON</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}>Google Play</div>
                    </div>
                  </a>
                </div>

                {/* Rating Note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />
                    ))}
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff', marginLeft: '4px' }}>4.9/5</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>•</span>
                  <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>15,000+ Verified Homeowners in AP</span>
                </div>

              </div>

              {/* Right Column: Interactive App Preview Showcase Card */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '360px',
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '24px',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
                  border: '3px solid rgba(0, 194, 232, 0.5)',
                  position: 'relative'
                }}>
                  {/* Phone Header / Status Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '14px',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Live Service Status</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#008ba6', background: '#ecfeff', padding: '3px 8px', borderRadius: '6px' }}>
                      IN PROGRESS
                    </span>
                  </div>

                  {/* Technician Live Card */}
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: '#e0f2fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284c7'
                      }}>
                        <Wrench size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#091a3c' }}>Technician Assigned</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Ramesh K. • 4.9 ★ (420+ Jobs)</div>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#008ba6', fontWeight: 700 }}>
                        <Clock size={14} /> Arriving in 14 Mins
                      </div>
                      <span style={{ color: '#64748b' }}>Vijayawada Hub</span>
                    </div>
                  </div>

                  {/* Appliance Info Card */}
                  <div style={{
                    padding: '12px 14px',
                    background: '#ecfeff',
                    borderRadius: '12px',
                    border: '1px solid #cffafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px'
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#0891b2', fontWeight: 700, textTransform: 'uppercase' }}>Booked Service</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490' }}>Refrigerator Repair</div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0e7490' }}>₹249 Fee</span>
                  </div>

                  {/* QR Scan Strip */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    background: '#07152b',
                    borderRadius: '12px',
                    color: '#ffffff'
                  }}>
                    <QrCode size={28} color="#00e1ff" />
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff' }}>Scan with Phone Camera</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Auto-detects iOS & Android</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR CLIENTS SAY */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="section-badge">Client Reviews</div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Read authentic feedback from families across Vijayawada, Guntur, and Nellore who trust us for their doorstep repairs.
            </p>
          </div>

          {/* Testimonial Box */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 4px 16px rgba(9, 26, 60, 0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#091a3c',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '17px'
                }}>
                  {reviews[activeReviewIdx].name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#091a3c', margin: 0 }}>
                    {reviews[activeReviewIdx].name}
                  </h4>
                  <div style={{ fontSize: '13px', color: '#008ba6', fontWeight: 700 }}>
                    {reviews[activeReviewIdx].city}
                  </div>
                </div>
              </div>

              {/* Star Rating: Brand Cyan */}
              <div style={{ display: 'flex', gap: '4px', color: '#00c2e8' }}>
                {[...Array(reviews[activeReviewIdx].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#00c2e8" />
                ))}
              </div>
            </div>

            <p style={{
              fontSize: '15.5px',
              color: '#334155',
              lineHeight: 1.75,
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              "{reviews[activeReviewIdx].text}"
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '16px',
              fontSize: '13px',
              color: '#64748b'
            }}>
              <span style={{ fontWeight: 700, color: '#091a3c' }}>
                Service: {reviews[activeReviewIdx].appliance}
              </span>
              <span style={{ color: '#008ba6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={15} /> Verified Customer
              </span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
            <button
              onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Previous Review"
            >
              <ChevronLeft size={18} color="#091a3c" />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIdx(i)}
                  style={{
                    width: activeReviewIdx === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeReviewIdx === i ? '#00c2e8' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Next Review"
            >
              <ChevronRight size={18} color="#091a3c" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. NEED QUICK APPLIANCE REPAIR? Bottom CTA Strip */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '70px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '780px' }}>
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
            color: '#091a3c',
            marginBottom: '14px'
          }}>
            Need Quick Appliance Repair?
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#64748b',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            Our certified technician will arrive at your doorstep in Vijayawada, Guntur, or Nellore with original spare parts and warranty.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <a
              href={COMPANY_CALL_LINK}
              className="btn btn-call"
              style={{ padding: '14px 26px', fontSize: '15px' }}
            >
              <Phone size={17} /> Call: {COMPANY_PHONE_DISPLAY}
            </a>

            <a
              href={COMPANY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '14px 26px', fontSize: '15px' }}
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>

            <button
              onClick={() => handleBookNow()}
              className="btn btn-secondary"
              style={{ padding: '14px 24px', fontSize: '15px' }}
            >
              Book Service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
