import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { ShieldCheck, Award, Users, CheckCircle, MapPin } from 'lucide-react';
import { CITIES } from '../constants/data';

export default function AboutPage({ setActivePage }) {
  useSEO(getSEOMetadata({ page: 'about' }));

  return (
    <div className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <div className="section-badge">Our Story & Mission</div>
          <h1 className="section-title">About Doorstep Repair Service</h1>
          <p className="section-subtitle">
            Providing reliable, same-day doorstep home appliance repair solutions across <strong>Vijayawada, Guntur, and Nellore</strong>.
          </p>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '40px', marginBottom: '40px', boxShadow: '0 4px 16px rgba(9, 26, 60, 0.04)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: '#091a3c' }}>
            Who We Are
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#64748b', marginBottom: '20px' }}>
            Doorstep Repair Service was founded with a single mission: to eliminate the burden of transporting broken, heavy appliances to faraway repair centers. We bring verified, company-trained technicians directly to your living room or kitchen.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#64748b', marginBottom: '24px' }}>
            Whether it is an Oven not heating before dinner, a Washing Machine stopping mid-cycle, a Smart TV losing its display, or an AC needing summer jet-servicing, we dispatch skilled local technicians equipped with diagnostic instruments and OEM-grade spare components.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '32px' }}>
            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#00c2e8', marginBottom: '12px' }}><ShieldCheck size={28} /></div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091a3c', marginBottom: '6px' }}>100% Genuine Parts</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55 }}>Original brand-matched coils, PCBs, motors, and compressors.</p>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#00c2e8', marginBottom: '12px' }}><Award size={28} /></div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091a3c', marginBottom: '6px' }}>90-Day Warranty</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55 }}>Free follow-up service if the repaired issue reoccurs within warranty period.</p>
            </div>

            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: '#00c2e8', marginBottom: '12px' }}><Users size={28} /></div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091a3c', marginBottom: '6px' }}>Background-Verified</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.55 }}>Every doorstep professional is identity-checked and police-verified for safety.</p>
            </div>
          </div>
        </div>

        {/* Cities presence */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>
            Our Strategic Service Locations
          </h3>
          <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '16px' }}>
            We maintain full-fledged field technician teams stationed in:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {CITIES.map((c) => (
              <div key={c.id} style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: '#091a3c', marginBottom: '4px' }}>
                  <MapPin size={16} color="#00c2e8" /> {c.name} Hub
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{c.hub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
