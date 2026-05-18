import React, { useState } from 'react';
import { PlayCircle, Calendar, ExternalLink, Users } from 'lucide-react';
import { clinicians, supportStaff, type Clinician, type SupportStaff } from './data';

const FONT = 'gotham, sans-serif';
const TEAL = '#006E8E';
const TEAL_DARK = '#004F66';

function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const suffixes = new Set(['iv', 'iii', 'ii', 'jr', 'sr', 'md', 'phd', 'ms', 'cgc']);
  const filtered = words.filter((w) => !suffixes.has(w.toLowerCase().replace(/[.,]/g, '')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return filtered[0][0].toUpperCase();
}

// ─── Clinician Card — v1 pattern (tall card, inline bio expand, full CTAs) ───
interface ClinicianCardProps {
  clinician: Clinician;
}

const ClinicianCard: React.FC<ClinicianCardProps> = ({ clinician }) => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        boxShadow: 'var(--oav-card-shadow)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
      }}
    >
      {/* Top row — identity */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Headshot / initials */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: `3px solid ${TEAL}`,
            background: TEAL,
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {clinician.photo && !imgError ? (
            <img
              src={clinician.photo}
              alt={clinician.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' as const, objectPosition: 'center top', display: 'block' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: TEAL,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 600,
                color: '#ffffff',
                fontFamily: FONT,
              }}
            >
              {getInitials(clinician.name)}
            </div>
          )}
        </div>

        {/* Identity block */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2px', flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {clinician.name}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, lineHeight: 1.5 }}>
            {clinician.credentials} · {clinician.title}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 300, color: TEAL, fontFamily: FONT, marginTop: '2px' }}>
            {clinician.specialty}
          </div>
          {/* Type badge */}
          <div style={{ marginTop: '4px' }}>
            <span
              style={{
                background: '#E7F5F8',
                color: TEAL,
                border: `1px solid #B9DEE6`,
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 300,
                fontFamily: FONT,
                display: 'inline-block',
              }}
            >
              {clinician.type}
            </span>
          </div>
        </div>
      </div>

      {/* Bio section — 4-line clamp with inline expand */}
      <div>
        <div
          style={
            bioExpanded
              ? { fontSize: '14px', color: '#000000', lineHeight: 1.7, fontFamily: FONT }
              : {
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: 1.7,
                  fontFamily: FONT,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }
          }
        >
          {clinician.bio}
        </div>
        <button
          onClick={() => setBioExpanded(!bioExpanded)}
          style={{
            fontSize: '13px',
            color: '#005EB8',
            fontWeight: 300,
            marginTop: '4px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: FONT,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#004A93'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#005EB8'; }}
        >
          {bioExpanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* CTA row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '8px',
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--oav-border)',
        }}
      >
        {/* Watch video CTA — when available */}
        {clinician.hasVideo && (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 300,
              color: '#005EB8',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: FONT,
              textAlign: 'left' as const,
            }}
          >
            <PlayCircle size={16} color="#005EB8" style={{ flexShrink: 0 }} />
            <span>Watch video</span>
          </button>
        )}

        {/* Register CTA */}
        {clinician.hasSession && (
          <button
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: registerHovered ? TEAL_DARK : TEAL,
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 300,
              width: '100%',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
            }}
          >
            <Calendar size={14} color="#ffffff" style={{ flexShrink: 0 }} />
            <span>{clinician.sessionLabel}</span>
          </button>
        )}

        {/* Schedule appointment CTA */}
        <a
          href={clinician.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--oav-border)',
            color: '#000000',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 300,
            width: '100%',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: FONT,
            textDecoration: 'none',
            boxSizing: 'border-box' as const,
          }}
        >
          <span>View profile at City of Hope</span>
          <ExternalLink size={13} color="#9CA3AF" style={{ flexShrink: 0 }} />
        </a>
      </div>
    </div>
  );
};

// ─── Support Staff Card ────────────────────────────────────────────────────────
const SupportStaffCard: React.FC<{ staff: SupportStaff }> = ({ staff }) => {
  const initials = staff.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff', fontFamily: FONT }}>{initials}</span>
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>{staff.name}</div>
        <div style={{ fontSize: '13px', fontWeight: 300, color: '#374151', fontFamily: FONT, marginTop: '2px' }}>
          {staff.role}
        </div>
        <span
          style={{
            display: 'inline-block',
            marginTop: '4px',
            background: '#E7F5F8',
            color: TEAL,
            border: '1px solid #B9DEE6',
            borderRadius: '9999px',
            padding: '1px 8px',
            fontSize: '11px',
            fontFamily: FONT,
          }}
        >
          {staff.type}
        </span>
      </div>
    </div>
  );
};

// ─── TeamSection ──────────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => (
  <section style={{ background: 'var(--oav-page-bg)', padding: '56px 0' }}>
    <div className="team-section-inner">

      {/* Presenting clinicians heading */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#000000', margin: 0, lineHeight: 1.3, fontFamily: FONT }}>
          Meet the Team
        </h2>
        <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '8px', marginBottom: 0, fontFamily: FONT, lineHeight: 1.5 }}>
          City of Hope Amyloidosis Program — presenting physicians
        </p>
      </div>

      {/* 2-column clinician card grid */}
      <div
        className="team-card-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
      >
        {clinicians.map((clinician) => (
          <ClinicianCard key={clinician.id} clinician={clinician} />
        ))}
      </div>

      {/* Support staff section */}
      <div style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <Users size={18} color={TEAL} style={{ flexShrink: 0 }} />
          <h2 style={{ fontSize: '22px', fontWeight: 300, color: '#000000', margin: 0, fontFamily: FONT }}>
            Multidisciplinary Care Team
          </h2>
        </div>
        <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 20px 0', fontFamily: FONT, lineHeight: 1.5 }}>
          The City of Hope Amyloidosis Program is supported by a dedicated team of nurses, nurse practitioners, and research staff.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
          className="team-card-grid"
        >
          {supportStaff.map((s) => (
            <SupportStaffCard key={s.id} staff={s} />
          ))}
        </div>
      </div>

    </div>
  </section>
);
