import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { SERVICES, CITIES, COMPANY_PHONE_DISPLAY, COMPANY_WHATSAPP_LINK, COMPANY_CALL_LINK } from '../constants/data';
import { 
  Clock, ShieldCheck, Star, ArrowRight, Phone, MessageCircle, 
  Wrench, Zap, DollarSign, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2 
} from 'lucide-react';

export default function HomePage({ setActivePage, setSelectedService }) {
  useSEO({
    title: 'Doorstep Repair Service | Same-Day Appliance Repair in Vijayawada, Guntur & Nellore',
    description: 'Easy doorstep repair for Oven, Geyser, TV, AC, Fridge & Washer in Vijayawada, Guntur & Nellore. Professional local technicians at your doorstep in 90 mins with 90-day warranty. Call 9515661677.',
    keywords: 'doorstep repair, appliance repair vijayawada, ac repair guntur, fridge repair nellore, washing machine technician'
  });

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
      icon: <Zap size={24} style={{ color: '#ff6200' }} />,
      title: "Speedy Arrival",
      desc: "Our verified local technicians reach your home in Vijayawada, Guntur, or Nellore within 60 to 90 minutes of booking confirmation."
    },
    {
      icon: <Award size={24} style={{ color: '#091a3c' }} />,
      title: "Performance First",
      desc: "We perform full diagnostics with precision tools and replace faulty components using 100% genuine brand-certified spare parts."
    },
    {
      icon: <DollarSign size={24} style={{ color: '#ff6200' }} />,
      title: "Affordable Pricing",
      desc: "Honest, upfront quote before starting any work. Nominal inspection charge starting at ₹249, fully adjusted into your final repair bill."
    },
    {
      icon: <Wrench size={24} style={{ color: '#091a3c' }} />,
      title: "Certified Technicians",
      desc: "Skill-tested and background-checked technicians with extensive expertise in all major Indian and international appliance brands."
    },
    {
      icon: <Clock size={24} style={{ color: '#ff6200' }} />,
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
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(9, 26, 60, 0.12)',
                border: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}>
                <img
                  src="/hero-technician.jpg"
                  alt="Certified Appliance Repair Technician at Doorstep"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Right Hero Content */}
            <div>
              {/* Badge: Orange Accent */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff7ed',
                border: '1px solid rgba(255, 98, 0, 0.25)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#ff6200',
                marginBottom: '16px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6200', display: 'inline-block' }}></span>
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
                <span style={{ color: '#ff6200' }}>Oven, TV, AC, Fridge & Washer</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                lineHeight: 1.6,
                marginBottom: '28px'
              }}>
                Hyderabad&apos;s certified local technicians at your doorstep in 90 minutes. Transparent diagnostics &amp; 90-day warranty.
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
                  <Clock size={20} style={{ color: '#ff6200' }} />
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
                  <ShieldCheck size={20} style={{ color: '#ff6200' }} />
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
                  <Award size={20} style={{ color: '#ff6200' }} />
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
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff6200' }}>15k+</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Repairs Completed</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff6200' }}>98%</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Happy Customers</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff6200' }}>24/7</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>Booking Support</div>
            </div>

            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff6200' }}>100%</div>
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
                  background: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  border: '1px solid rgba(255, 98, 0, 0.2)'
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
                  background: '#fff7ed',
                  color: '#ff6200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px',
                  margin: '0 auto 18px',
                  border: '2px solid #ff6200'
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

      {/* 5. WHAT OUR CLIENTS SAY */}
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
                  <div style={{ fontSize: '13px', color: '#ff6200', fontWeight: 700 }}>
                    {reviews[activeReviewIdx].city}
                  </div>
                </div>
              </div>

              {/* Star Rating: Brand Orange */}
              <div style={{ display: 'flex', gap: '4px', color: '#ff6200' }}>
                {[...Array(reviews[activeReviewIdx].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#ff6200" />
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
              <span style={{ color: '#ff6200', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                    background: activeReviewIdx === i ? '#ff6200' : '#cbd5e1',
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
            background: '#fff7ed',
            color: '#ff6200',
            border: '1px solid rgba(255, 98, 0, 0.25)',
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
