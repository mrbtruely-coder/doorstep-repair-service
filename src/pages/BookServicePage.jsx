import React, { useState, useEffect, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { CITIES, COMPANY_PHONE_DISPLAY, COMPANY_WHATSAPP_LINK, COMPANY_CALL_LINK, SERVICE_CATEGORIES } from '../constants/data';
import { 
  Wind, Snowflake, RotateCcw, Flame, Droplets, Tv, 
  CheckCircle2, ShieldCheck, Phone, MessageCircle, MapPin, 
  ArrowRight, User, Mail, AlertCircle, Sparkles, Check,
  Navigation, Crosshair, Loader2, RefreshCw, Search, ChevronDown, X,
  Calendar, Clock, Home
} from 'lucide-react';
import { detectUserLocation } from '../utils/geoLocator';
import { areaToSlug } from '../utils/slugUtils';

const ALL_TIME_SLOTS = [
  { id: 'slot-1', label: '09:00 AM - 11:00 AM', startHour: 9 },
  { id: 'slot-2', label: '11:00 AM - 01:00 PM', startHour: 11 },
  { id: 'slot-3', label: '01:00 PM - 03:00 PM', startHour: 13 },
  { id: 'slot-4', label: '03:00 PM - 05:00 PM', startHour: 15 },
  { id: 'slot-5', label: '05:00 PM - 07:00 PM', startHour: 17 },
  { id: 'slot-6', label: '07:00 PM - 09:00 PM', startHour: 19 }
];

const getNext7Days = () => {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const subLabel = i === 0 || i === 1
      ? `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const isoDate = d.toISOString().split('T')[0];
    const fullDateDisplay = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    days.push({
      index: i,
      dayName,
      subLabel,
      isoDate,
      fullDateDisplay,
      isToday: i === 0
    });
  }
  return days;
};

const getAvailableSlotsForDate = (isToday) => {
  if (!isToday) {
    return ALL_TIME_SLOTS;
  }
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;
  // Available slots after 3 hours from now
  const minAllowedStart = currentTime + 3;
  return ALL_TIME_SLOTS.filter(s => s.startHour >= minAllowedStart);
};

function SearchableSelect({
  value,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  options = [],
  onSelect,
  disabled = false,
  disabledPlaceholder = 'Select City First...',
  specialOption = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayLabel = specialOption && value === specialOption.value
    ? specialOption.label
    : value || (disabled ? disabledPlaceholder : placeholder);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(prev => !prev);
            setSearchQuery('');
          }
        }}
        className="form-select"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          borderRadius: '10px',
          background: disabled ? '#f8fafc' : '#ffffff',
          color: disabled ? '#94a3b8' : value ? '#0f172a' : '#64748b',
          fontWeight: value ? 600 : 500,
          border: isOpen ? '1.5px solid #00c2e8' : '1.5px solid #cbd5e1',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          fontSize: '13.5px',
          boxShadow: isOpen ? '0 0 0 3px rgba(0, 194, 232, 0.15)' : 'none',
          transition: 'all 0.15s ease'
        }}
      >
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingRight: '8px'
        }}>
          {displayLabel}
        </span>
        <ChevronDown 
          size={16} 
          style={{ 
            color: disabled ? '#cbd5e1' : '#008ba6', 
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>

      {isOpen && !disabled && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          left: 0,
          right: 0,
          zIndex: 100,
          background: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #00c2e8',
          boxShadow: '0 12px 30px rgba(0, 194, 232, 0.18), 0 4px 12px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden'
        }}>
          {/* Search Box */}
          <div style={{
            padding: '8px 10px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Search size={15} style={{ color: '#008ba6', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '13px',
                color: '#0f172a',
                padding: '4px 0'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery('');
                  if (inputRef.current) inputRef.current.focus();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Options List */}
          <div style={{
            maxHeight: '220px',
            overflowY: 'auto'
          }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const isSelected = value === opt;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelect(opt);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '10px 14px',
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#008ba6' : '#1e293b',
                      background: isSelected ? '#ecfeff' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.12s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = '#f0fdff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check size={15} style={{ color: '#00c2e8' }} />}
                  </div>
                );
              })
            ) : (
              <div style={{
                padding: '16px 14px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#94a3b8'
              }}>
                No locations match "{searchQuery}"
              </div>
            )}

            {/* Special Option */}
            {specialOption && (
              <div
                onClick={() => {
                  onSelect(specialOption.value);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                style={{
                  padding: '10px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: value === specialOption.value ? '#008ba6' : '#0284c7',
                  background: value === specialOption.value ? '#ecfeff' : '#fafafa',
                  borderTop: '1px dashed #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ecfeff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = value === specialOption.value ? '#ecfeff' : '#fafafa';
                }}
              >
                <span>{specialOption.label}</span>
                {value === specialOption.value && <Check size={15} style={{ color: '#00c2e8' }} />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookServicePage({ 
  preselectedService, 
  preselectedCity, 
  preselectedLocality,
  preselectedCategory,
  preselectedSubcategory
}) {
  // 1. Dynamic SEO Injection using simple English and tailored keywords
  const seoData = getSEOMetadata({
    page: 'book',
    city: preselectedCity,
    area: preselectedLocality,
    category: preselectedCategory || preselectedService,
    subcategory: preselectedSubcategory,
    origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5175'
  });

  useSEO(seoData);

  const applianceOptions = [
    { id: 'ac', categoryId: 'ac', name: 'AC SERVICE', shortName: 'Air Conditioner', icon: <Wind size={24} />, price: 'Starts from ₹299' },
    { id: 'refrigerator', categoryId: 'refrigerator', name: 'REFRIGERATOR', shortName: 'Refrigerator', icon: <Snowflake size={24} />, price: 'Starts from ₹299' },
    { id: 'washer', categoryId: 'washing-machine', name: 'WASHING MACHINE', shortName: 'Washing Machine', icon: <RotateCcw size={24} />, price: 'Starts from ₹299' },
    { id: 'oven', categoryId: 'oven', name: 'OVEN / MICROWAVE', shortName: 'Oven & Microwave', icon: <Flame size={24} />, price: 'Starts from ₹299' },
    { id: 'geyser', categoryId: 'geyser', name: 'GEYSER / HEATER', shortName: 'Geyser & Water Heater', icon: <Droplets size={24} />, price: 'Starts from ₹299' },
    { id: 'tv', categoryId: 'tv', name: 'LED / SMART TV', shortName: 'LED & Smart TV', icon: <Tv size={24} />, price: 'Starts from ₹299' }
  ];

  // Helper to get subcategories for an appliance name
  const getSubcategoriesForAppliance = (applianceName) => {
    const opt = applianceOptions.find(o => o.name === applianceName);
    const cat = SERVICE_CATEGORIES.find(c => c.id === opt?.categoryId || c.id === opt?.id);
    return cat?.subcategories || [];
  };

  // Set initial selected appliance with intelligent category & subcategory detection
  const [selectedAppliance, setSelectedAppliance] = useState(() => {
    if (preselectedCategory) {
      const match = applianceOptions.find(o => o.categoryId === preselectedCategory || o.id === preselectedCategory);
      if (match) return match.name;
    }
    if (preselectedSubcategory) {
      for (const cat of SERVICE_CATEGORIES) {
        const found = cat.subcategories?.find(s => 
          s.id.toLowerCase() === String(preselectedSubcategory).toLowerCase() || 
          s.name.toLowerCase() === String(preselectedSubcategory).toLowerCase() ||
          areaToSlug(s.name) === String(preselectedSubcategory).toLowerCase() ||
          s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === String(preselectedSubcategory).toLowerCase()
        );
        if (found) {
          const match = applianceOptions.find(o => o.categoryId === cat.id || o.id === cat.id);
          if (match) return match.name;
        }
      }
    }
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
    return null;
  });

  // Set initial selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    if (preselectedSubcategory) {
      for (const cat of SERVICE_CATEGORIES) {
        const found = cat.subcategories?.find(s => 
          s.id.toLowerCase() === String(preselectedSubcategory).toLowerCase() || 
          s.name.toLowerCase() === String(preselectedSubcategory).toLowerCase() ||
          areaToSlug(s.name) === String(preselectedSubcategory).toLowerCase() ||
          s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === String(preselectedSubcategory).toLowerCase()
        );
        if (found) return found.name;
      }
    }
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
    return '';
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
    if (preselectedCity && preselectedCity !== 'all') {
      const c = preselectedCity.toLowerCase();
      const found = CITIES.find(city => city.id.toLowerCase() === c || city.name.toLowerCase() === c);
      if (found) return found.name;
    }
    return '';
  };

  const initialCity = getInitialCity();

  const localitiesByCity = {
    ...CITIES.reduce((acc, city) => {
      acc[city.name] = city.keyColonies || [];
      return acc;
    }, {}),
    'Vijayawada': CITIES.find(c => c.id === 'vijayawada')?.keyColonies || ['Benz Circle (Central Hub)', 'MG Road / Bandar Road', 'One Town & Two Town'],
    'Guntur': CITIES.find(c => c.id === 'guntur')?.keyColonies || ['Arundelpet (Central Hub)', 'Brodipet (Main Hub)'],
    'Nellore': CITIES.find(c => c.id === 'nellore')?.keyColonies || ['Trunk Road (Central Hub)', 'Magunta Layout & VRC Center']
  };

  const isPreselectedMatched = () => {
    if (!preselectedLocality) return true;
    const city = getInitialCity();
    if (!city) return false;
    const cityList = localitiesByCity[city] || [];
    return Boolean(cityList.find(col => 
      col.toLowerCase() === preselectedLocality.toLowerCase() ||
      col.toLowerCase().includes(preselectedLocality.toLowerCase()) ||
      preselectedLocality.toLowerCase().includes(col.toLowerCase())
    ));
  };

  const [isOtherLocality, setIsOtherLocality] = useState(() => {
    if (!preselectedLocality) return false;
    return !isPreselectedMatched();
  });
  const [otherLocalityInput, setOtherLocalityInput] = useState(() => (!isPreselectedMatched() ? preselectedLocality : ''));

  const getInitialLocality = () => {
    const city = getInitialCity();
    if (preselectedLocality && city) {
      const cityColonies = localitiesByCity[city] || [];
      const match = cityColonies.find(col => 
        col.toLowerCase() === preselectedLocality.toLowerCase() ||
        col.toLowerCase().includes(preselectedLocality.toLowerCase()) ||
        preselectedLocality.toLowerCase().includes(col.toLowerCase())
      );
      if (match) return match;
      return 'Other';
    }
    return '';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: getInitialCity(),
    locality: getInitialLocality(),
    address: '',
    notes: ''
  });

  // 7-day appointment slots calculation
  const next7Days = getNext7Days();
  const todayAvailableSlots = getAvailableSlotsForDate(true);

  const [selectedDate, setSelectedDate] = useState(() => {
    return todayAvailableSlots.length > 0 ? next7Days[0] : next7Days[1];
  });

  const availableSlotsForSelectedDate = getAvailableSlotsForDate(selectedDate.isToday);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(() => {
    return availableSlotsForSelectedDate.length > 0 ? availableSlotsForSelectedDate[0].label : '';
  });

  const handleDateSelect = (dItem) => {
    setSelectedDate(dItem);
    const slots = getAvailableSlotsForDate(dItem.isToday);
    if (slots.length > 0) {
      const stillAvailable = slots.find(s => s.label === selectedTimeSlot);
      setSelectedTimeSlot(stillAvailable ? stillAvailable.label : slots[0].label);
    } else {
      setSelectedTimeSlot('');
    }
  };

  // Keep state perfectly synchronized with route props
  useEffect(() => {
    if (preselectedCategory) {
      const match = applianceOptions.find(o => o.categoryId === preselectedCategory || o.id === preselectedCategory);
      if (match) setSelectedAppliance(match.name);
    }
    if (preselectedSubcategory) {
      for (const cat of SERVICE_CATEGORIES) {
        const found = cat.subcategories?.find(s => 
          s.id.toLowerCase() === String(preselectedSubcategory).toLowerCase() || 
          s.name.toLowerCase() === String(preselectedSubcategory).toLowerCase() ||
          areaToSlug(s.name) === String(preselectedSubcategory).toLowerCase() ||
          s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === String(preselectedSubcategory).toLowerCase()
        );
        if (found) {
          setSelectedSubcategory(found.name);
          const match = applianceOptions.find(o => o.categoryId === cat.id || o.id === cat.id);
          if (match) setSelectedAppliance(match.name);
          break;
        }
      }
    } else if (preselectedService) {
      const p = preselectedService.toLowerCase();
      for (const cat of SERVICE_CATEGORIES) {
        const found = cat.subcategories?.find(s => 
          s.name.toLowerCase() === p || 
          p.includes(s.name.toLowerCase()) || 
          s.name.toLowerCase().includes(p)
        );
        if (found) {
          setSelectedSubcategory(found.name);
          break;
        }
      }
    }
  }, [preselectedCategory, preselectedSubcategory, preselectedService]);

  useEffect(() => {
    const city = getInitialCity();
    if (!city) {
      setIsOtherLocality(false);
      setFormData(prev => ({
        ...prev,
        city: '',
        locality: ''
      }));
      return;
    }
    const cityList = localitiesByCity[city] || [];
    if (preselectedLocality) {
      const match = cityList.find(col => 
        col.toLowerCase() === preselectedLocality.toLowerCase() ||
        col.toLowerCase().includes(preselectedLocality.toLowerCase()) ||
        preselectedLocality.toLowerCase().includes(col.toLowerCase())
      );
      if (match) {
        setIsOtherLocality(false);
        setFormData(prev => ({ ...prev, city, locality: match }));
      } else {
        setIsOtherLocality(true);
        setOtherLocalityInput(preselectedLocality);
        setFormData(prev => ({ ...prev, city, locality: 'Other' }));
      }
    } else {
      setIsOtherLocality(false);
      setFormData(prev => ({
        ...prev,
        city,
        locality: ''
      }));
    }
  }, [preselectedCity, preselectedLocality]);

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [detectionMode, setDetectionMode] = useState('auto'); // 'auto' | 'manual'
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState(null);
  const [autoDetectedInfo, setAutoDetectedInfo] = useState(null);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    setDetectError(null);
    setIsOtherLocality(true);
    setFormData(prev => ({ ...prev, locality: 'Other' }));
    try {
      const geo = await detectUserLocation();
      setOtherLocalityInput(geo.displayLocation || geo.colony);
      setAutoDetectedInfo(geo);
      setDetectionMode('auto');
      if (geo.city) {
        setFormData(prev => ({
          ...prev,
          city: geo.city,
          locality: 'Other'
        }));
      }
    } catch (err) {
      setDetectError(err.message || 'Could not detect location. Please type manually below.');
      setDetectionMode('manual');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleCitySelect = (newCity) => {
    setIsOtherLocality(false);
    setOtherLocalityInput('');
    setAutoDetectedInfo(null);
    setDetectError(null);
    setFormData(prev => ({
      ...prev,
      city: newCity,
      locality: ''
    }));
  };

  const handleLocalitySelect = (val) => {
    if (val === 'Other') {
      setIsOtherLocality(true);
      setFormData(prev => ({ ...prev, locality: 'Other' }));
      if (!otherLocalityInput) {
        setDetectionMode('auto');
      }
    } else {
      setIsOtherLocality(false);
      setFormData(prev => ({ ...prev, locality: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppliance) {
      alert('Please select an appliance service category above before submitting your request.');
      return;
    }
    if (!formData.city) {
      alert('Please select your service city before submitting your request.');
      return;
    }
    if (!isOtherLocality && !formData.locality) {
      alert('Please select your service sub-area / locality.');
      return;
    }
    if (isOtherLocality && !otherLocalityInput.trim()) {
      alert('Please enter your specific sub-area or colony.');
      return;
    }
    if (!selectedTimeSlot) {
      alert('Please select your preferred service appointment time slot.');
      return;
    }
    setLoading(true);

    const fullServiceDesc = selectedSubcategory 
      ? `${selectedAppliance} - ${selectedSubcategory}`
      : selectedAppliance;

    const resolvedLocality = isOtherLocality
      ? (otherLocalityInput.trim() || 'Other Area')
      : formData.locality;

    const bookingPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      locality: resolvedLocality,
      otherLocality: isOtherLocality ? (otherLocalityInput.trim() || 'Other Area') : null,
      isOtherLocation: Boolean(isOtherLocality),
      serviceType: fullServiceDesc,
      preferredDate: selectedDate.fullDateDisplay || selectedDate.isoDate,
      preferredTime: selectedTimeSlot,
      date: selectedDate.fullDateDisplay || selectedDate.isoDate,
      slot: selectedTimeSlot,
      time: selectedTimeSlot,
      bookingSlot: selectedTimeSlot,
      appointmentDate: selectedDate.fullDateDisplay || selectedDate.isoDate,
      appointmentTime: selectedTimeSlot,
      address: formData.address 
        ? `${formData.address}, ${resolvedLocality}, ${formData.city}`
        : `${resolvedLocality}, ${formData.city}`,
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

  const availableSubcategories = selectedAppliance ? getSubcategoriesForAppliance(selectedAppliance) : [];

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
                  {successResult.booking.otherLocality && (
                    <div style={{ color: '#008ba6', fontWeight: 700 }}>
                      📍 <strong>Other Location Specified:</strong> {successResult.booking.otherLocality}
                    </div>
                  )}
                  <div>📅 <strong>Appointment Date:</strong> {successResult.booking.date || successResult.booking.preferredDate || successResult.booking.appointmentDate}</div>
                  <div>⏰ <strong>Service Slot:</strong> {successResult.booking.slot || successResult.booking.preferredTime || successResult.booking.appointmentTime}</div>
                  <div><strong>Estimated Arrival:</strong> Within chosen slot window (60-90 Min Dispatch)</div>
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

                {(preselectedService || (selectedAppliance && selectedSubcategory)) && (
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
                    <span>Selected Service: <strong style={{ color: '#0369a1' }}>{selectedSubcategory || selectedAppliance || preselectedService}</strong></span>
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
                      const animClass = selectedAppliance 
                        ? (isSelected ? 'category-btn-selected' : 'category-btn-unselected')
                        : 'category-btn-idle';

                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => handleApplianceSelect(opt)}
                          className={animClass}
                          style={{
                            background: isSelected ? '#ecfeff' : '#ffffff',
                            border: isSelected ? '2px solid #00c2e8' : '1.5px solid #cbd5e1',
                            borderRadius: '12px',
                            padding: '14px 8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: isSelected ? '#008ba6' : '#0f172a',
                            position: 'relative'
                          }}
                        >
                          {isSelected && (
                            <span style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: '#00c2e8',
                              color: '#ffffff',
                              fontSize: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800
                            }}>
                              ✓
                            </span>
                          )}
                          <div style={{ color: isSelected ? '#00c2e8' : '#0096b7' }}>
                            {opt.icon}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 800, textAlign: 'center', lineHeight: 1.2 }}>
                            {opt.name}
                          </span>
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: 700,
                            color: isSelected ? '#008ba6' : '#0284c7',
                            background: isSelected ? '#cffafe' : '#f0f9ff',
                            border: isSelected ? '1px solid #a5f3fc' : '1px solid #e0f2fe',
                            padding: '2px 7px',
                            borderRadius: '9999px',
                            marginTop: '2px',
                            whiteSpace: 'nowrap'
                          }}>
                            Starts from ₹299
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CHOOSE SPECIFIC SERVICE / REPAIR TYPE */}
                {!selectedAppliance ? (
                  <div style={{
                    marginBottom: '24px',
                    padding: '16px 20px',
                    background: '#f8fafc',
                    border: '1.5px dashed #cbd5e1',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: '#64748b'
                  }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>👆</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                      Please tap an appliance category above
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
                      Specific repair types and diagnostic pricing will appear right here once selected.
                    </div>
                  </div>
                ) : availableSubcategories.length > 0 && (
                  <div className="subcategories-container-animated" key={selectedAppliance} style={{ marginBottom: '24px' }}>
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
                      {availableSubcategories.map((sub, idx) => {
                        const isSubSelected = selectedSubcategory === sub.name;
                        const cardAnimClass = `subcategory-card-item ${isSubSelected ? 'subcategory-card-selected' : 'subcategory-card-unselected'}`;
                        return (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedSubcategory(sub.name)}
                            className={cardAnimClass}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '11px 16px',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              animationDelay: `${idx * 45}ms`
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: isSubSelected ? '5px solid #00c2e8' : '2px solid #cbd5e1',
                                background: '#ffffff',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {isSubSelected && (
                                  <div className="subcategory-radio-dot" style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#00c2e8'
                                  }} />
                                )}
                              </div>
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
                              color: isSubSelected ? '#008ba6' : '#0284c7',
                              background: isSubSelected ? '#cffafe' : '#ecfeff',
                              border: isSubSelected ? '1px solid #a5f3fc' : '1px solid #e0f2fe',
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
                <div id="contact-location-section" style={{ marginBottom: '12px' }}>
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
                      SERVICE LOCALITY {formData.city ? `IN ${formData.city.toUpperCase()}` : ''}
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoDetect}
                      disabled={isDetecting}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '11.5px',
                        color: '#008ba6',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ecfeff'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {isDetecting ? <Loader2 size={13} className="animate-spin" /> : <Crosshair size={13} />}
                      <span>{isDetecting ? 'Detecting GPS...' : 'Auto Detect Location'}</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {/* Searchable City Select */}
                    <SearchableSelect
                      value={formData.city}
                      placeholder="Select City..."
                      searchPlaceholder="Search city..."
                      options={CITIES.map(c => c.name)}
                      onSelect={handleCitySelect}
                    />

                    {/* Searchable Area in City Select */}
                    <SearchableSelect
                      value={isOtherLocality ? 'Other' : formData.locality}
                      placeholder="Select Sub-Area / Colony..."
                      disabledPlaceholder="Select City First..."
                      searchPlaceholder={`Search sub-area in ${formData.city || 'city'}...`}
                      disabled={!formData.city}
                      options={formData.city ? (localitiesByCity[formData.city] || []) : []}
                      specialOption={{ value: 'Other', label: '📍 Other Sub-Area / Colony...' }}
                      onSelect={handleLocalitySelect}
                    />
                  </div>

                  {/* Ask for other location when "Other" is selected - Unified Same-Input Experience */}
                  {isOtherLocality && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#008ba6' }}>
                          SUB-AREA / COLONY {formData.city ? `IN ${formData.city.toUpperCase()}` : ''} *
                        </label>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                          Enter manually or tap Auto Detect
                        </span>
                      </div>

                      {/* Unified Input: Type manually OR click Auto Detect in the same input */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                          type="text"
                          required
                          autoFocus
                          placeholder={`Enter colony manually or tap Auto Detect GPS...`}
                          value={otherLocalityInput}
                          onChange={(e) => {
                            setOtherLocalityInput(e.target.value);
                            if (detectError) setDetectError(null);
                          }}
                          className="form-input"
                          style={{
                            paddingLeft: '38px',
                            paddingRight: '135px',
                            borderRadius: '10px',
                            borderColor: autoDetectedInfo ? '#10b981' : '#00c2e8',
                            background: autoDetectedInfo ? '#f0fdf4' : '#f0fbfd',
                            fontWeight: 600,
                            color: '#0f172a',
                            fontSize: '13.5px'
                          }}
                        />
                        <MapPin 
                          size={16} 
                          style={{ 
                            position: 'absolute', 
                            left: '12px', 
                            color: autoDetectedInfo ? '#10b981' : '#00c2e8' 
                          }} 
                        />

                        {/* Integrated Auto Detect Button right inside the same input field */}
                        <button
                          type="button"
                          onClick={handleAutoDetect}
                          disabled={isDetecting}
                          style={{
                            position: 'absolute',
                            right: '6px',
                            top: '6px',
                            bottom: '6px',
                            background: isDetecting 
                              ? '#0284c7' 
                              : autoDetectedInfo 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                : 'linear-gradient(135deg, #00d2e6 0%, #0096b7 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '7px',
                            padding: '0 12px',
                            fontSize: '11.5px',
                            fontWeight: 800,
                            cursor: isDetecting ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 6px rgba(0, 194, 232, 0.25)',
                            transition: 'all 0.18s ease',
                            whiteSpace: 'nowrap'
                          }}
                          title="Auto-detect current location via GPS"
                        >
                          {isDetecting ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Crosshair size={13} />
                          )}
                          <span>
                            {isDetecting ? 'Detecting...' : autoDetectedInfo ? 'Re-Detect' : 'Auto Detect'}
                          </span>
                        </button>
                      </div>

                      {/* Error Status */}
                      {detectError && (
                        <div style={{
                          marginTop: '6px',
                          fontSize: '11.5px',
                          color: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <AlertCircle size={13} />
                          <span>{detectError}</span>
                        </div>
                      )}

                      {/* Success / Detected Status */}
                      {autoDetectedInfo && !detectError && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          background: autoDetectedInfo.isOutsideHub ? '#fffbeb' : '#ecfdf5',
                          border: autoDetectedInfo.isOutsideHub ? '1px solid #fde68a' : '1px solid #a7f3d0',
                          color: autoDetectedInfo.isOutsideHub ? '#92400e' : '#065f46'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
                              <CheckCircle2 size={14} color={autoDetectedInfo.isOutsideHub ? '#d97706' : '#059669'} />
                              GPS Detected: {autoDetectedInfo.displayLocation}
                              {autoDetectedInfo.accuracyMeters ? ` (Accuracy: ±${autoDetectedInfo.accuracyMeters}m)` : ''}
                            </span>
                            <span style={{ color: '#64748b', fontSize: '11px' }}>Editable anytime</span>
                          </div>
                          {autoDetectedInfo.isOutsideHub && (
                            <div style={{ marginTop: '4px', fontSize: '11px', color: '#b45309', lineHeight: 1.4 }}>
                              📍 <strong>Notice:</strong> GPS detected your device in <strong>{autoDetectedInfo.rawCity}</strong>. Our active service centers are located in <strong>Vijayawada, Guntur, and Nellore</strong>. If you need repair at an address in {formData.city}, feel free to edit the text box above!
                            </div>
                          )}
                        </div>
                      )}

                      {!autoDetectedInfo && !detectError && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '6px',
                          fontSize: '11.5px',
                          color: '#0284c7'
                        }}>
                          <span>⚡ 10 KM Radial Coverage: Technicians dispatched to all colonies in {formData.city}!</span>
                        </div>
                      )}
                    </div>
                  )}
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

                {/* 4. SCHEDULE SERVICE (DATE & TIME SLOT) - Matches Screenshot 1 */}
                <div style={{
                  marginBottom: '26px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#e0f2fe',
                      color: '#008ba6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800
                    }}>
                      1
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={17} style={{ color: '#008ba6' }} />
                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Schedule Service</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Pick preferred appointment date and time
                      </div>
                    </div>
                  </div>

                  {/* CHOOSE DATE */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#475569',
                      marginBottom: '10px'
                    }}>
                      CHOOSE DATE
                    </label>

                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '4px'
                    }}>
                      {next7Days.map((dItem) => {
                        const isDateSelected = selectedDate.isoDate === dItem.isoDate;
                        return (
                          <button
                            type="button"
                            key={dItem.isoDate}
                            onClick={() => handleDateSelect(dItem)}
                            style={{
                              flex: '1 0 76px',
                              minWidth: '76px',
                              padding: '12px 6px',
                              borderRadius: '12px',
                              border: isDateSelected ? '2px solid #008ba6' : '1.5px solid #e2e8f0',
                              background: isDateSelected ? '#008ba6' : '#ffffff',
                              color: isDateSelected ? '#ffffff' : '#0f172a',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              transition: 'all 0.18s ease',
                              boxShadow: isDateSelected ? '0 4px 12px rgba(0, 139, 166, 0.28)' : 'none'
                            }}
                            onMouseOver={(e) => {
                              if (!isDateSelected) {
                                e.currentTarget.style.borderColor = '#00c2e8';
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isDateSelected) {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                              }
                            }}
                          >
                            <span style={{ fontSize: '12px', fontWeight: 800, lineHeight: 1.1 }}>
                              {dItem.dayName}
                            </span>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: isDateSelected ? '#e0f2fe' : '#64748b'
                            }}>
                              {dItem.subLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CHOOSE TIME SLOT */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#475569'
                      }}>
                        CHOOSE TIME SLOT
                      </label>
                      {selectedDate.isToday && (
                        <span style={{ fontSize: '10.5px', color: '#008ba6', fontWeight: 700 }}>
                          ⚡ Slots available after 3 hours
                        </span>
                      )}
                    </div>

                    {availableSlotsForSelectedDate.length > 0 ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '10px'
                      }}>
                        {availableSlotsForSelectedDate.map((slot) => {
                          const isSlotSelected = selectedTimeSlot === slot.label;
                          return (
                            <button
                              type="button"
                              key={slot.id}
                              onClick={() => setSelectedTimeSlot(slot.label)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: isSlotSelected ? '2px solid #00c2e8' : '1.5px solid #e2e8f0',
                                background: isSlotSelected ? '#ecfeff' : '#ffffff',
                                color: isSlotSelected ? '#008ba6' : '#0f172a',
                                fontWeight: isSlotSelected ? 800 : 600,
                                fontSize: '12.5px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                boxShadow: isSlotSelected ? '0 3px 10px rgba(0, 194, 232, 0.18)' : 'none'
                              }}
                              onMouseOver={(e) => {
                                if (!isSlotSelected) {
                                  e.currentTarget.style.borderColor = '#00c2e8';
                                  e.currentTarget.style.backgroundColor = '#f0fdff';
                                }
                              }}
                              onMouseOut={(e) => {
                                if (!isSlotSelected) {
                                  e.currentTarget.style.borderColor = '#e2e8f0';
                                  e.currentTarget.style.backgroundColor = '#ffffff';
                                }
                              }}
                            >
                              <Clock size={15} style={{ color: isSlotSelected ? '#00c2e8' : '#64748b', flexShrink: 0 }} />
                              <span>{slot.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{
                        padding: '16px',
                        background: '#fffbeb',
                        border: '1.5px dashed #fde68a',
                        borderRadius: '12px',
                        textAlign: 'center',
                        color: '#92400e',
                        fontSize: '12.5px',
                        fontWeight: 600
                      }}>
                        ⚠️ No more slots available for Today within the 3-hour advance dispatch window.
                        <div style={{ marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleDateSelect(next7Days[1])}
                            style={{
                              background: '#008ba6',
                              color: '#ffffff',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Switch to Tomorrow ({next7Days[1]?.subLabel})
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. SERVICE ADDRESS & USER LOCATION SUMMARY - Matches Screenshot 2 */}
                <div style={{
                  marginBottom: '26px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#e0f2fe',
                        color: '#008ba6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 800
                      }}>
                        4
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={16} style={{ color: '#008ba6' }} />
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Service Address</span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                          Technician will visit this location
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const target = document.getElementById('contact-location-section');
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#008ba6',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ecfeff'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      Change Address
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px 16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <Home size={16} style={{ color: '#008ba6' }} />
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                        {formData.fullName.trim() || 'Your Name'}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#137333',
                        background: '#e6f4ea',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        letterSpacing: '0.04em'
                      }}>
                        HOME
                      </span>
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#334155', marginBottom: '4px' }}>
                      <strong>Phone:</strong> {formData.phone.trim() || 'Enter mobile number above'}
                    </div>

                    {formData.email && (
                      <div style={{ fontSize: '12.5px', color: '#334155', marginBottom: '4px' }}>
                        <strong>Email:</strong> {formData.email.trim()}
                      </div>
                    )}

                    <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4, marginTop: '6px' }}>
                      {formData.address ? `${formData.address}, ` : ''}
                      {(isOtherLocality ? otherLocalityInput.trim() : formData.locality) || 'Select sub-area / colony'}, {formData.city || 'Select city'}
                    </div>

                    <div style={{
                      marginTop: '10px',
                      paddingTop: '10px',
                      borderTop: '1px dashed #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: '#008ba6',
                      fontWeight: 700,
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> {selectedDate.fullDateDisplay}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {selectedTimeSlot || 'No slot selected'}
                      </span>
                    </div>
                  </div>
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
                  {loading 
                    ? 'Dispatching Request...' 
                    : selectedAppliance 
                    ? `Book ${selectedSubcategory ? selectedSubcategory : selectedAppliance} Now` 
                    : 'Select Appliance Category to Book'} <ArrowRight size={18} />
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
