import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { getSEOMetadata } from '../utils/seoData';
import { ShieldCheck, FileText } from 'lucide-react';

export default function TermsPage() {
  useSEO(getSEOMetadata({ page: 'terms' }));

  return (
    <div className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <div className="section-badge">Legal Documentation</div>
          <h1 className="section-title">Terms & Conditions</h1>
          <p className="section-subtitle">Last updated: October 2026</p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 16px rgba(9, 26, 60, 0.04)', lineHeight: '1.8', color: '#334155' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>1. Service Scope & Booking</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            Doorstep Repair Service provides on-demand doorstep repair and maintenance services for residential appliances including Microwave Ovens, Geysers, LED/Smart TVs, Air Conditioners, Refrigerators, and Washing Machines across Vijayawada, Guntur, and Nellore.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>2. Inspection Charges & Estimates</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            A standard visiting inspection fee (₹249 - ₹299) is applicable upon technician doorstep diagnosis. If the customer accepts the repair estimate and proceeds with service, the inspection fee will be 100% adjusted against the overall service invoice.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>3. Warranty Coverage</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            Repaired units and replaced spare parts carry a limited warranty ranging from 30 to 90 days depending on component type. The warranty is strictly limited to the specific defect serviced. Any subsequent physical damages, power surges, or water hazards are excluded.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>4. Customer Safety & Verification</h2>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>
            All field professionals carry identity verification. Customers are advised to verify technician credentials upon arrival and ensure a responsible adult is present during the service.
          </p>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#091a3c', marginBottom: '12px' }}>5. Automated Notifications</h2>
          <p style={{ color: '#64748b' }}>
            By submitting a booking request, you authorize our Node.js notification system to dispatch automated booking confirmations and technician updates to your provided email and contact number.
          </p>
        </div>
      </div>
    </div>
  );
}
