import React, { useState } from 'react';
import { PlayCircle, Calendar, ExternalLink, X } from 'lucide-react';
import { clinicians, supportStaff, type Clinician, type SupportStaff } from './data';

const FONT = 'gotham, sans-serif';

function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const suffixes = new Set(['iv', 'iii', 'ii', 'jr', 'sr', 'md', 'phd', 'ms', 'cgc']);
  const filtered = words.filter((w) => !suffixes.has(w.toLowerCase().replace(/[.,]/g, '')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return filtered[0][0].toUpperCase();
}

// ─── Bio Modal ────────────────────────────────────────────────────────────────
interface BioModalProps {
  clinician: Clinician;
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({ clinician, onClose }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 24px',
            borderBottom: '1px solid #E8E8E8',
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '3px solid #006E8E',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#006E8E',
            }}
          >
            {clinician.photo && !imgError ? (
              <img
                src={clinician.photo}
                alt={clinician.name}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
                {getInitials(clinician.name)}
              </span>
            )}
          </div>

          {/* Identity */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
              {clinician.name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.credentials} · {clinician.title}
            </div>
            <div style={{ fontSize: '13px', color: '#006E8E', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.specialty}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              fontFamily: FONT,
            }}
          >
            {clinician.bio}
          </p>

          {/* Session info box */}
          {clinician.hasSession && (
            <div
              style={{
                background: '#E7F5F8',
                border: '1px solid #B9DEE6',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: '#006E8E',
                  fontFamily: FONT,
                  marginBottom: '4px',
                }}
              >
                Session: {clinician.sessionDate}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: FONT,
                  marginBottom: '6px',
                }}
              >
                {clinician.sessionTitle}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: FONT,
                }}
              >
                {clinician.sessionDescription}
              </p>
            </div>
          )}

          {/* Appointment CTA */}
          <a
            href={clinician.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid #E8E8E8',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 300,
              cursor: 'pointer',
              fontFamily: FONT,
              width: '100%',
              justifyContent: 'center',
              textDecoration: 'none',
              color: '#000000',
              boxSizing: 'border-box' as const,
            }}
          >
            Schedule an appointment
            <ExternalLink size={13} color="#4B5563" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Compact horizontal card ──────────────────────────────────────────────────
// Client feedback: cards too tall, too much text.
// v2: horizontal layout, photo + name + specialty left, CTAs right, modal for full bio.
interface CompactCardProps {
  clinician: Clinician;
}

const CompactCard: React.FC<CompactCardProps> = ({ clinician }) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  return (
    <>
      <div
        className="compact-card"
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          boxShadow: 'var(--oav-card-shadow)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Photo — smaller than v1 (60px vs 80px) */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #006E8E',
            background: '#006E8E',
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(clinician.name)}
            </span>
          )}
        </div>

        {/* Identity — flex-grows to fill space */}
        <div className="compact-card-identity" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {clinician.name}
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#4B5563',
              fontFamily: FONT,
              marginTop: '3px',
              whiteSpace: 'nowrap' as const,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {clinician.specialty}
          </div>
          {clinician.hasSession && (
            <div style={{ fontSize: '12px', color: '#006E8E', fontFamily: FONT, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={11} color="#006E8E" />
              <span>{clinician.sessionDate}</span>
            </div>
          )}
        </div>

        {/* CTAs — stacked on the right */}
        <div
          className="compact-card-ctas"
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '6px',
            flexShrink: 0,
            alignItems: 'flex-end',
          }}
        >
          {/* View bio modal */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#005EB8',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: FONT,
              textDecoration: 'underline',
              whiteSpace: 'nowrap' as const,
            }}
          >
            View more
          </button>

          {/* Register CTA — only if has session */}
          {clinician.hasSession && (
            <button
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#004F66' : '#006E8E',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
                transition: 'background 0.15s ease',
              }}
            >
              <Calendar size={11} color="#ffffff" />
              Register
            </button>
          )}

          {/* Watch video — if available */}
          {clinician.hasVideo && (
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 300,
                color: '#005EB8',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
              }}
            >
              <PlayCircle size={13} color="#005EB8" />
              Watch video
            </button>
          )}
        </div>
      </div>

      {/* Bio modal */}
      {modalOpen && (
        <BioModal clinician={clinician} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

// ─── Support Staff Card ───────────────────────────────────────────────────────
interface SupportStaffCardProps {
  staff: SupportStaff;
}

const SupportStaffCard: React.FC<SupportStaffCardProps> = ({ staff }) => (
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
    {/* Avatar */}
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#006E8E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
        {staff.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
      </span>
    </div>

    {/* Info */}
    <div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
        {staff.name}{staff.credentials ? `, ${staff.credentials}` : ''}
      </div>
      <div style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, marginTop: '2px' }}>
        {staff.role}
      </div>
    </div>
  </div>
);

// ─── TeamSection v2 ───────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '48px 0',
    }}
  >
    <div className="team-section-inner">
      {/* Section heading */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 300,
            color: '#000000',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#4B5563',
            marginTop: '6px',
            marginBottom: 0,
            fontFamily: FONT,
          }}
        >
          City of Hope presenters featured in the July amyloidosis spotlight series
        </p>
      </div>

      {/* Compact card list — single column for scannability */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {clinicians.map((clinician) => (
          <CompactCard key={clinician.id} clinician={clinician} />
        ))}
      </div>

      {/* ── Critical Supportive Staff ── */}
      <div style={{ marginTop: '48px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 300,
            color: '#000000',
            margin: '0 0 4px 0',
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Critical Supportive Staff
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 20px 0',
            fontFamily: FONT,
          }}
        >
          The dedicated clinical and research team supporting the City of Hope Amyloidosis Program
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '10px',
          }}
        >
          {supportStaff.map((staff) => (
            <SupportStaffCard key={staff.id} staff={staff} />
          ))}
        </div>
      </div>

    </div>
  </section>
);
