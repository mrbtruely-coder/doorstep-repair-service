import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { Lock, ShieldCheck } from 'lucide-react';

export default function PolicyPage() {
  useSEO(getSEOMetadata({ page: 'policy' }));

  return (
    <div className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <div className="section-badge">Data Protection</div>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-subtitle">Last updated: October 2026</p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 16px rgba(9, 26, 60, 0.04)', lineHeight: '1.8', color: '#334155' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            When you book a service or contact us, we collect details necessary to fulfill your doorstep appointment, including: your name, telephone number, email address, physical address/landmark, city (Vijayawada, Guntur, or Nellore), and details regarding your faulty appliance.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>2. How We Use Your Data</h2>
          <p style={{ marginBottom: '12px', color: '#64748b' }}>
            We strictly utilize your data to:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '20px', color: '#64748b' }}>
            <li>Assign and dispatch the nearest verified field technician to your address.</li>
            <li>Send automatic booking confirmations and status receipts to your email address via our Node.js backend.</li>
            <li>Coordinate arrival schedules via phone calls or WhatsApp messages.</li>
            <li>Manage 90-day warranty claims and service records.</li>
          </ul>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>3. Data Confidentiality & Zero Spam</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            We do not sell, rent, or trade your contact info or personal details to any 3rd party marketing brokers. Your information remains strictly within Doorstep Repair Service for servicing purposes.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>4. Contact Support</h2>
          <p style={{ color: '#64748b' }}>
            For any inquiries regarding data protection or to request deletion of your records, reach out directly at <strong>support@doorsteprepairs.in</strong> or phone <strong>9515661677</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
