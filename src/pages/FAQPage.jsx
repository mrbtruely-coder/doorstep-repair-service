import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { COMPANY_PHONE_DISPLAY, COMPANY_WHATSAPP_LINK, COMPANY_CALL_LINK, CITIES } from '../constants/data';
import { 
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, 
  Phone, MessageCircle, MapPin, CheckCircle2, ShieldCheck, Clock, Award 
} from 'lucide-react';

export default function FAQPage({ setActivePage }) {
  // 1. Industry-Level Location & Services Rich SEO Metadata
  useSEO({
    title: 'Frequently Answered Questions | Appliance Repair in Vijayawada, Guntur & Nellore',
    description: 'Find answers to common questions regarding doorstep appliance repair in Vijayawada, Guntur, and Nellore. Initial diagnostics from ₹249, 60-90 min same-day arrival, 90-day warranty on AC, Refrigerator, Washing Machine, Microwave & TV. Call 9515661677.',
    keywords: 'appliance repair faq, doorstep service charges vijayawada, ac repair cost guntur, fridge warranty nellore, washing machine technician arrival, microwave oven repair charges, certified technicians andhra pradesh',
    canonicalUrl: 'http://localhost:3001/faq',
    ogType: 'website',
    ogImage: '/hero-technician.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What are your initial diagnostic and service charges?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Our nominal visiting and diagnosis charge starts at ₹249 - ₹299. When you approve the repair estimate and proceed with service, the diagnostic inspection fee is 100% adjusted into the final invoice.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do you offer same-day doorstep repairs inside Vijayawada, Guntur, and Nellore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! We provide express same-day doorstep repairs across Vijayawada, Guntur, and Nellore. Our certified field technician reaches your address within 60 to 90 minutes of booking.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are the replacement spare parts genuine? Do they carry a warranty?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, we only utilize 100% OEM brand-certified spare parts (compressors, motors, magnetrons, heating coils, backlights, and PCBs). All parts and service labor carry an official 30 to 90-day doorstep warranty.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Which specific locations and surrounding areas do you service?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We cover all major residential neighborhoods in Vijayawada (Benz Circle, MG Road, One Town, Gunadala, Patamata), Guntur (Arundelpet, Brodipet, Pattabhipuram, Amaravathi Road), and Nellore (Magunta Layout, Trunk Road, Balaji Nagar, Vedayapalem, Santhapet).'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are your field technician staff background-checked and certified?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Absolutely. Every technician undergoes identity verification, police background checks, and rigorous technical certification for all major appliance brands.'
          }
        }
      ]
    }
  });

  const [activeFaq, setActiveFaq] = useState(0);
  const [activeCityTab, setActiveCityTab] = useState('All');
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const faqs = [
    {
      q: "What are your initial diagnostic and service charges?",
      a: "Our nominal doorstep diagnostic inspection starts from ₹249 to ₹299 depending on the appliance. If you approve our quotation and proceed with the repair on the spot, the initial inspection fee is 100% waived/adjusted against the total repair invoice."
    },
    {
      q: "Do you offer same-day doorstep repairs inside Vijayawada, Guntur & Nellore?",
      a: "Yes! Over 92% of our service requests across Vijayawada, Guntur, and Nellore are executed on the same day. Our field technician will arrive with essential diagnostic tools and high-demand spares within 60 to 90 minutes of booking confirmation."
    },
    {
      q: "Are the replacement spare parts genuine? Do they carry a warranty?",
      a: "Yes, we exclusively install 100% original, brand-approved spare parts. Every replacement part (compressors, coils, magnetrons, washing machine motors, TV LED backlight strips, PCBs) is accompanied by an authentic 30 to 90-day warranty card."
    },
    {
      q: "Which specific locations and surrounding areas do you service?",
      a: "We maintain localized service squads across:\n• Vijayawada: Benz Circle, MG Road, One Town, Gunadala, Bhavanipuram, Patamata, Governorpet.\n• Guntur: Arundelpet, Brodipet, Pattabhipuram, Amaravathi Road, Kothapet, Vidyanagar.\n• Nellore: Magunta Layout, Trunk Road, Balaji Nagar, Vedayapalem, Dargamitta, Pogathota, Santhapet."
    },
    {
      q: "Are your field technician staff background-checked and certified?",
      a: "Every single technician on our platform has undergone strict Aadhaar/identity verification, police background checks, and hands-on skill evaluations for Samsung, LG, Whirlpool, IFB, Bosch, Daikin, Voltas, Sony, Panasonic, and other major brands."
    },
    {
      q: "Will I get an automated confirmation email after submitting the booking?",
      a: "Yes! As soon as you submit the Book Service form, our automated Node.js notification engine generates a confirmation receipt with your Booking Reference Number, technician dispatch schedule, and direct helpline contact."
    }
  ];

  const clientReviews = [
    {
      name: "Ravi Kumar K.",
      location: "Harinathapuram in Nellore",
      rating: 5,
      serviceTag: "AC SERVICE & GAS LEAK FIX",
      time: "3 days ago",
      text: "Extremely professional AC servicing! I booked a deep jet wash service. The technician arrived within 1 hour, diagnosed the gas leak in the condenser, fixed it right in front of me, and charged very reasonably. Highly recommended for Nellore residents!"
    },
    {
      name: "Srinivas Rao M.",
      location: "Benz Circle in Vijayawada",
      rating: 5,
      serviceTag: "MICROWAVE OVEN & GEYSER REPAIR",
      time: "5 days ago",
      text: "Our microwave oven stopped heating suddenly and our geyser was tripping the MCB. The technician arrived punctually at Benz Circle, replaced the heating element and magnetron, and gave a 90-day warranty receipt. Very polite and prompt."
    },
    {
      name: "Praveen Varma",
      location: "Brodipet in Guntur",
      rating: 5,
      serviceTag: "WASHING MACHINE & FRIDGE REPAIR",
      time: "1 week ago",
      text: "Great experience! Washing machine drum was vibrating wildly and fridge wasn't cooling. Replaced drum suspension and gas refill done in a single visit with upfront pricing. Automated email confirmation is very convenient."
    }
  ];

  const handleBookNow = () => {
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* 1. FAQ HERO SECTION */}
      <section className="faq-hero-section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#e0f2fe',
            color: '#0369a1',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            FAQ
          </div>

          <h1 className="faq-page-title">
            Frequently Answered Questions
          </h1>

          <p className="faq-page-subtitle" style={{
            color: '#64748b'
          }}>
            Got queries regarding warranties, bookings, or pricing? Find rapid answers right here.
          </p>
        </div>
      </section>

      {/* 2. FAQ ACCORDION LIST matching screenshot */}
      <section style={{ paddingBottom: '70px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: isOpen ? '#f8fafc' : '#ffffff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      fontSize: '15.5px',
                      fontWeight: 700,
                      color: '#0f172a',
                      paddingRight: '16px',
                      lineHeight: 1.4
                    }}>
                      {faq.q}
                    </span>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? '#e0f2fe' : '#f1f5f9',
                      color: isOpen ? '#0284c7' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isOpen ? <ChevronUp size={16} /> : <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: '#475569',
                      fontSize: '14.5px',
                      lineHeight: '1.7',
                      borderTop: '1px solid #f1f5f9',
                      whiteSpace: 'pre-line'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED REVIEWS SECTION matching screenshot */}
      <section style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '70px 0 80px'
      }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#e0f2fe',
            color: '#0369a1',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            VERIFIED REVIEWS
          </div>

          <h2 className="faq-section-title">
            What Our Nellore, Vijayawada & Guntur Clients Say
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            marginBottom: '36px',
            lineHeight: 1.6
          }}>
            Read real feedback from homeowners, doctors, and businesses who choose Doorstep Repair Service.
          </p>

          {/* Testimonial Card */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '36px',
            textAlign: 'left',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#0284c7',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '15px'
                }}>
                  {clientReviews[activeReviewIdx].name.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>
                    {clientReviews[activeReviewIdx].name}
                  </h4>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                    {clientReviews[activeReviewIdx].location}
                  </div>
                </div>
              </div>

              {/* 5 Stars */}
              <div style={{ display: 'flex', gap: '3px', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" />
                ))}
              </div>
            </div>

            <p style={{
              fontSize: '15px',
              fontStyle: 'italic',
              color: '#334155',
              lineHeight: 1.75,
              marginBottom: '20px'
            }}>
              "{clientReviews[activeReviewIdx].text}"
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '14px',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <span style={{
                background: '#f1f5f9',
                color: '#0284c7',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                {clientReviews[activeReviewIdx].serviceTag}
              </span>
              <span>{clientReviews[activeReviewIdx].time}</span>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? clientReviews.length - 1 : prev - 1))}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {clientReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIdx(i)}
                  style={{
                    width: activeReviewIdx === i ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: activeReviewIdx === i ? '#0284c7' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveReviewIdx((prev) => (prev === clientReviews.length - 1 ? 0 : prev + 1))}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. RAPID RESPONSE HELPLINE & CTA STRIP matching screenshot */}
      <section style={{ padding: '70px 0 80px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
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

          <h2 className="faq-section-title">
            Need Quick Appliance Repair?
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            Don't let a broken AC, refrigerator, or washing machine interrupt your routine. Tap below to call or chat with our <strong>Vijayawada</strong>, <strong>Guntur</strong>, or <strong>Nellore</strong> technicians immediately.
          </p>

          {/* 3 Call/WhatsApp/Book Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a
              href={COMPANY_CALL_LINK}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Phone size={16} /> CALL SUPPORT: {COMPANY_PHONE_DISPLAY}
            </a>

            <a
              href={COMPANY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#10b981',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
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
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Book Online
            </button>
          </div>

          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#94a3b8',
            marginBottom: '18px'
          }}>
            TAP ICONS BELOW TO CONNECT WITH US DIRECTLY
          </div>

          {/* 3 Direct Small Cards */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href={COMPANY_CALL_LINK} style={{ width: '90px', padding: '14px 8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={16} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>CALL</span>
            </a>

            <a href={COMPANY_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ width: '90px', padding: '14px 8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={16} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>WHATSAPP</span>
            </a>

            <div style={{ width: '90px', padding: '14px 8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfeff', color: '#008ba6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={16} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>LOCATION</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
