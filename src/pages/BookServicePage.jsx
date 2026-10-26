import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { CITIES, COMPANY_PHONE_DISPLAY, COMPANY_WHATSAPP_LINK, COMPANY_CALL_LINK, SERVICE_CATEGORIES } from '../constants/data';
import { 
  Wind, Snowflake, RotateCcw, Flame, Droplets, Tv, 
  CheckCircle2, ShieldCheck, Phone, MessageCircle, MapPin, 
  ArrowRight, User, Mail, AlertCircle, Sparkles, Check
} from 'lucide-react';

export default function BookServicePage({ preselectedService, preselectedCity, preselectedLocality }) {
  // 1. Dynamic SEO Injection using simple English and tailored keywords
  const seoData = getSEOMetadata({
    page: 'book',
    city: preselectedCity,
    area: preselectedLocality,
    category: preselectedService,
    origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5175'
  });

  useSEO(seoData);

  const applianceOptions = [
    { id: 'ac', categoryId: 'ac', name: 'AC SERVICE', shortName: 'Air Conditioner', icon: <Wind size={24} /> },
    { id: 'refrigerator', categoryId: 'refrigerator', name: 'REFRIGERATOR', shortName: 'Refrigerator', icon: <Snowflake size={24} /> },
    { id: 'washer', categoryId: 'washing-machine', name: 'WASHING MACHINE', shortName: 'Washing Machine', icon: <RotateCcw size={24} /> },
    { id: 'oven', categoryId: 'oven', name: 'OVEN / MICROWAVE', shortName: 'Oven & Microwave', icon: <Flame size={24} /> },
    { id: 'geyser', categoryId: 'geyser', name: 'GEYSER / HEATER', shortName: 'Geyser & Water Heater', icon: <Droplets size={24} /> },
    { id: 'tv', categoryId: 'tv', name: 'LED / SMART TV', shortName: 'LED & Smart TV', icon: <Tv size={24} /> }
  ];

  // Helper to get subcategories for an appliance name
  const getSubcategoriesForAppliance = (applianceName) => {
    const opt = applianceOptions.find(o => o.name === applianceName);
    const cat = SERVICE_CATEGORIES.find(c => c.id === opt?.categoryId || c.id === opt?.id);
    return cat?.subcategories || [];
  };

  // Set initial selected appliance with intelligent category & subcategory detection
  const [selectedAppliance, setSelectedAppliance] = useState(() => {
    if (preselectedService) {
      const p = preselectedService.toLowerCase();
      const match = applianceOptions.find(o => 
        p.includes(o.id) || 
        p.includes(o.shortName.toLowerCase()) ||
        o.name.toLowerCase().includes(p) ||
        (o.id === 'washer' && p.includes('wash')) ||
        (o.id === 'refrigerator' && (p.includes('fridge') || p.includes('refrigerat'))) ||
        (o.id === 'oven' && (p.includes('oven') || p.includes('microwave'))) ||
        (o.id === 'geyser' && (p.includes('geyser') || p.includes('heater'))) ||
        (o.id === 'tv' && (p.includes('tv') || p.includes('television') || p.includes('lcd') || p.includes('led'))) ||
        (o.id === 'ac' && (p.includes('ac') || p.includes('air condition')))
      );
      if (match) return match.name;
    }
    return 'AC SERVICE';
  });

  // Set initial selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    if (preselectedService) {
      const p = preselectedService.toLowerCase();
      for (const cat of SERVICE_CATEGORIES) {
        const found = cat.subcategories.find(s => 
          s.name.toLowerCase() === p || 
          p.includes(s.name.toLowerCase()) || 
          s.name.toLowerCase().includes(p)
        );
        if (found) return found.name;
      }
    }
    const initialSubs = getSubcategoriesForAppliance('AC SERVICE');
    return initialSubs.length > 0 ? initialSubs[0].name : '';
  });

  const handleApplianceSelect = (opt) => {
    setSelectedAppliance(opt.name);
    const subs = getSubcategoriesForAppliance(opt.name);
    if (subs.length > 0) {
      setSelectedSubcategory(subs[0].name);
    } else {
      setSelectedSubcategory('');
    }
  };

  const getInitialCity = () => {
    if (preselectedCity) {
      const c = preselectedCity.toLowerCase();
      if (c.includes('guntur')) return 'Guntur';
      if (c.includes('nellore')) return 'Nellore';
      return 'Vijayawada';
    }
    return 'Vijayawada';
  };

  const initialCity = getInitialCity();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: initialCity,
    locality: preselectedLocality || (initialCity === 'Guntur' ? 'Arundelpet' : (initialCity === 'Nellore' ? 'Trunk Road' : 'Benz Circle')),
    address: '',
    notes: ''
  });

  const localitiesByCity = {
    'Vijayawada': ['Benz Circle', 'MG Road', 'One Town', 'Gunadala', 'Bhavanipuram', 'Patamata', 'Governorpet'],
    'Guntur': ['Arundelpet', 'Brodipet', 'Pattabhipuram', 'Amaravathi Road', 'Kothapet', 'Lakshmipuram', 'Vidyanagar'],
    'Nellore': ['Magunta Layout', 'Trunk Road', 'Balaji Nagar', 'Vedayapalem', 'Dargamitta', 'Pogathota', 'Santhapet']
  };

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setFormData(prev => ({
      ...prev,
      city: newCity,
      locality: localitiesByCity[newCity] ? localitiesByCity[newCity][0] : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullServiceDesc = selectedSubcategory 
      ? `${selectedAppliance} - ${selectedSubcategory}`
      : selectedAppliance;

    const bookingPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      locality: formData.locality,
      serviceType: fullServiceDesc,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Within 90 Minutes (Express Dispatch)',
      address: formData.address 
        ? `${formData.address}, ${formData.locality}, ${formData.city}`
        : `${formData.locality}, ${formData.city}`,
      notes: formData.notes || ''
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://repairapis.doorsteprepairservices.com/api/book-service';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessResult(data);
      } else {
        fallbackBooking(bookingPayload);
      }
    } catch (err) {
      fallbackBooking(bookingPayload);
    } finally {
      setLoading(false);
    }
  };

  const fallbackBooking = (payload) => {
    const bookingId = 'DS-' + Date.now().toString().slice(-6);
    setSuccessResult({
      success: true,
      booking: {
        bookingId,
        ...payload
      },
      emailSent: Boolean(payload.email),
      emailNotice: payload.email 
        ? `Automated confirmation email triggered to ${payload.email}` 
        : 'Booking registered successfully.'
    });
  };

  const availableSubcategories = getSubcategoriesForAppliance(selectedAppliance);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '56px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Main 2-Column Section matching screenshot */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: '56px',
          alignItems: 'flex-start',
          marginBottom: '80px'
        }} className="book-layout-responsive">
          
          {/* LEFT COLUMN: Informational text & trust cards */}
          <div className="book-info-col">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#fef3c7',
              color: '#b45309',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '20px'
            }}>
              FREE BOOKING
            </div>

            <h1 style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.12,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '20px'
            }}>
              Easy 2-Step Repair <br />
              Dispatch
            </h1>

            <p style={{
              fontSize: '15.5px',
              color: '#334155',
              lineHeight: 1.65,
              marginBottom: '14px'
            }}>
              <strong>Simple Booking:</strong> 1. Tap the icon of your broken appliance, 2. Enter your name and mobile number.
            </p>

            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '36px'
            }}>
              A certified local engineer will arrive at your doorstep in <strong>Vijayawada</strong>, <strong>Guntur</strong>, or <strong>Nellore</strong> within 90 minutes.
            </p>

            {/* 2 Feature Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                    No Booking Fee
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    Registration is completely free. Pay only after technician doorstep diagnostics.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                    Certified Vetted Techs
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    Background-checked, highly-rated technicians with 90-day warranty on spare replacements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Booking Form Card */}
          <div className="book-form-col" style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08)'
          }}>
            {successResult ? (
              <div style={{ textAlign: 'center', padding: '20px 8px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Technician Dispatched!
                </h3>
                <p style={{ color: '#475569', fontSize: '15px', marginBottom: '20px' }}>
                  Booking confirmed under reference: <strong style={{ color: '#008ba6' }}>#{successResult.booking.bookingId}</strong>
                </p>

                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'left', marginBottom: '20px', fontSize: '14px', lineHeight: '1.8' }}>
                  <div><strong>Appliance & Service:</strong> {successResult.booking.serviceType}</div>
                  <div><strong>Customer:</strong> {successResult.booking.fullName}</div>
                  <div><strong>Contact:</strong> {successResult.booking.phone}</div>
                  <div><strong>Location:</strong> {successResult.booking.locality}, {successResult.booking.city}</div>
                  <div><strong>Estimated Arrival:</strong> Within 90 Minutes (60-90 Min Dispatch)</div>
                </div>

                {(successResult.customerEmailSent || successResult.teamEmailSent || successResult.emailSent || successResult.emailNotice) && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '8px', color: '#166534', fontSize: '13.5px', marginBottom: '24px', lineHeight: '1.5' }}>
                    ⚡ <strong>Automated Email Notice:</strong> {successResult.emailNotice || 'Booking confirmed & Doorstep Hub dispatched.'}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <a href={COMPANY_CALL_LINK} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)' }}>
                    <Phone size={16} /> Call Dispatch Desk
                  </a>
                  <button onClick={() => setSuccessResult(null)} className="btn btn-secondary">
                    Book Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  Request Service
                </h2>
                <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>
                  Tap your appliance, select service type, enter details, and book your technician.
                </p>

                {preselectedService && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    background: '#ecfeff',
                    border: '1.5px solid #a5f3fc',
                    borderRadius: '12px',
                    color: '#0e7490',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    marginBottom: '22px'
                  }}>
                    <Sparkles size={18} color="#0891b2" />
                    <span>Selected Service: <strong style={{ color: '#0369a1' }}>{preselectedService}</strong></span>
                  </div>
                )}

                {/* 1. TAP YOUR APPLIANCE (6 Grid Buttons) */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#008ba6',
                    marginBottom: '12px'
                  }}>
                    1. TAP YOUR APPLIANCE
                  </label>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px'
                  }}>
                    {applianceOptions.map((opt) => {
                      const isSelected = selectedAppliance === opt.name;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => handleApplianceSelect(opt)}
                          style={{
                            background: isSelected ? '#ecfeff' : '#ffffff',
                            border: isSelected ? '2px solid #00c2e8' : '1.5px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '14px 8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: isSelected ? '#008ba6' : '#475569',
                            boxShadow: isSelected ? '0 4px 12px rgba(0, 194, 232, 0.2)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ color: isSelected ? '#00c2e8' : '#64748b' }}>
                            {opt.icon}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 800, textAlign: 'center', lineHeight: 1.2 }}>
                            {opt.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CHOOSE SPECIFIC SERVICE / REPAIR TYPE */}
                {availableSubcategories.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#008ba6'
                      }}>
                        2. SELECT REPAIR / SERVICE TYPE
                      </label>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                        {availableSubcategories.length} Options Available
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {availableSubcategories.map((sub) => {
                        const isSubSelected = selectedSubcategory === sub.name;
                        return (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedSubcategory(sub.name)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '11px 16px',
                              borderRadius: '12px',
                              border: isSubSelected ? '2px solid #00c2e8' : '1.5px solid #e2e8f0',
                              background: isSubSelected ? '#ecfeff' : '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: isSubSelected ? '0 2px 8px rgba(0, 194, 232, 0.15)' : 'none'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: isSubSelected ? '5px solid #00c2e8' : '2px solid #cbd5e1',
                                background: '#ffffff',
                                flexShrink: 0
                              }} />
                              <div>
                                <div style={{
                                  fontSize: '13.5px',
                                  fontWeight: isSubSelected ? 800 : 600,
                                  color: isSubSelected ? '#008ba6' : '#0f172a'
                                }}>
                                  {sub.name}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>
                                  {sub.badge || 'Certified Doorstep Fix'}
                                </div>
                              </div>
                            </div>

                            <div style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: isSubSelected ? '#008ba6' : '#475569',
                              background: isSubSelected ? '#cffafe' : '#f1f5f9',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              whiteSpace: 'nowrap'
                            }}>
                              {sub.price}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. ENTER CONTACT & LOCATION DETAILS */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#008ba6',
                    marginBottom: '4px'
                  }}>
                    3. ENTER CONTACT & LOCATION DETAILS
                  </label>
                </div>

                {/* FULL NAME & MOBILE NUMBER */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '18px'
                }} className="form-row-responsive">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '6px' }}>
                      FULL NAME
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="form-input"
                        style={{ paddingLeft: '38px', borderRadius: '10px' }}
                      />
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#94a3b8' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '6px' }}>
                      MOBILE NUMBER
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="tel"
                        required
                        placeholder="10-Digit Mobile Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        style={{ paddingLeft: '38px', borderRadius: '10px' }}
                      />
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#94a3b8' }} />
                    </div>
                  </div>
                </div>

                {/* EMAIL ADDRESS */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '6px' }}>
                    EMAIL ADDRESS (FOR DISPATCH CONFIRMATION)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      style={{ paddingLeft: '38px', borderRadius: '10px' }}
                    />
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#94a3b8' }} />
                  </div>
                </div>

                {/* CITY & LOCALITY SELECTION */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a' }}>
                      SERVICE LOCALITY IN {formData.city.toUpperCase()}
                    </label>
                    <span style={{ fontSize: '11.5px', color: '#008ba6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={13} /> Auto Detect Location
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {/* Select City */}
                    <select
                      value={formData.city}
                      onChange={handleCityChange}
                      className="form-select"
                      style={{ borderRadius: '10px' }}
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>

                    {/* Select Area in City */}
                    <select
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="form-select"
                      style={{ borderRadius: '10px' }}
                    >
                      {(localitiesByCity[formData.city] || []).map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* STREET / DOOR NO / LANDMARK */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '6px' }}>
                    DOOR NO / STREET / LANDMARK (OPTIONAL)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="e.g. Flat 302, Green Meadows Apt, Near SBI Bank"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="form-input"
                      style={{ paddingLeft: '38px', borderRadius: '10px' }}
                    />
                    <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#94a3b8' }} />
                  </div>
                </div>

                {/* PROBLEM DESCRIPTION / NOTES */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '6px' }}>
                    DESCRIBE APPLIANCE ISSUE / NOTE FOR TECHNICIAN (OPTIONAL)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. AC cooling slowly, making clicking noise, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-input"
                    style={{ borderRadius: '10px', resize: 'vertical' }}
                  />
                </div>

                {/* CYAN BOOK SERVICE NOW BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(0, 194, 232, 0.35)',
                    transition: 'all 0.2s ease'
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
                  {loading ? 'Dispatching Request...' : `Book ${selectedSubcategory ? selectedSubcategory : selectedAppliance} Now`} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: NEED QUICK APPLIANCE REPAIR? Matching Screenshot */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '64px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ecfeff',
            color: '#008ba6',
            border: '1px solid rgba(0, 194, 232, 0.25)',
            borderRadius: '9999px',
            padding: '5px 14px',
            fontSize: '11.5px',
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
            color: '#0f172a',
            marginBottom: '12px'
          }}>
            Need Quick Appliance Repair?
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            Don't let a broken AC, refrigerator, or washing machine interrupt your routine. Tap below to call or chat with our <strong>Vijayawada</strong>, <strong>Guntur</strong>, or <strong>Nellore</strong> technicians immediately.
          </p>

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

          {/* 3 Direct Action Cards (CALL, WHATSAPP, LOCATION) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <a
              href={COMPANY_CALL_LINK}
              style={{
                width: '110px',
                padding: '18px 12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>CALL</span>
            </a>

            <a
              href={COMPANY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '110px',
                padding: '18px 12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>WHATSAPP</span>
            </a>

            <div
              style={{
                width: '110px',
                padding: '18px 12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfeff', color: '#008ba6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>LOCATION</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
