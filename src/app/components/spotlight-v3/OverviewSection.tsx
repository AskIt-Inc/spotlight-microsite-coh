import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── PLACEHOLDER — subscribe URL needed before launch ─────────────────────────
const SUBSCRIBE_URL = '#'; // TODO: replace with actual sign-up link

// ─── QR code placeholder SVG ──────────────────────────────────────────────────
const QRPlaceholder: React.FC = () => (
  <div
    style={{
      width: '96px',
      height: '96px',
      border: '2px dashed #C0A0A4',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      background: '#FBF0F1',
      flexShrink: 0,
    }}
  >
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="18" rx="2" stroke="#8B1F2D" strokeWidth="2" fill="none" strokeOpacity="0.5"/>
      <rect x="7" y="7" width="8" height="8" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="28" y="2" width="18" height="18" rx="2" stroke="#8B1F2D" strokeWidth="2" fill="none" strokeOpacity="0.5"/>
      <rect x="33" y="7" width="8" height="8" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="2" y="28" width="18" height="18" rx="2" stroke="#8B1F2D" strokeWidth="2" fill="none" strokeOpacity="0.5"/>
      <rect x="7" y="33" width="8" height="8" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="28" y="28" width="4" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="34" y="28" width="4" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="40" y="28" width="6" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="28" y="34" width="6" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="36" y="34" width="4" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="28" y="40" width="4" height="6" fill="#8B1F2D" fillOpacity="0.5"/>
      <rect x="34" y="42" width="12" height="4" fill="#8B1F2D" fillOpacity="0.5"/>
    </svg>
    <span style={{
      fontSize: '8px',
      color: '#8B1F2D',
      fontFamily: FONT,
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      opacity: 0.7,
    }}>
      QR code
    </span>
  </div>
);

// ─── Programme pillars (unchanged from v2) ────────────────────────────────────
const pillars = [
  {
    icon: '🫀',
    label: 'Multidisciplinary Care',
    text: 'Nine specialists across cardiology, hematology, neurology, nephrology, GI, orthopaedics & genetics — one coordinated care plan.',
  },
  {
    icon: '🧬',
    label: 'Genetics & Prevention',
    text: 'Hereditary ATTR counselling, family screening, and access to prevention trials before symptoms develop.',
  },
  {
    icon: '🔬',
    label: 'Active Research',
    text: 'Landmark Phase 3 and global observational trials — giving patients access to emerging therapies.',
  },
];

// ─── Overview v3 ──────────────────────────────────────────────────────────────
// ROW 4 change: blockquote replaced with session tagline + subscribe CTA + QR code
// AI-generated tagline approved for Stacey/David to refine
export const OverviewSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
    }}
  >
    <div>

      {/* ── ROW 4: Session tagline + subscribe CTA ── */}
      <div
        className="v3-subscribe-block"
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          marginBottom: '36px',
          flexWrap: 'wrap' as const,
        }}
      >
        {/* Left: tagline + button + fine print */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Tagline — AI generated, Stacey/David to refine */}
          <p
            style={{
              fontSize: '18px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.6,
              margin: '0 0 8px 0',
              fontFamily: FONT,
            }}
          >
            Weekly Online Interactive Amyloidosis Educational Support Group Sessions —
            presented by your local experts at 5PM Central time.
          </p>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#4B5563',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
              fontFamily: FONT,
            }}
          >
            Expert-led, free, and built around you. Join University of Chicago amyloidosis
            specialists live every week for insights on the latest treatments, research
            breakthroughs, and real answers to your most important questions.
          </p>

          {/* Subscribe CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const, marginBottom: '12px' }}>
            <a
              href={SUBSCRIBE_URL}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '11px 24px',
                background: '#8B1F2D',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: FONT,
                letterSpacing: '0.02em',
              }}
            >
              Subscribe here — it's free
            </a>
            <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: FONT }}>
              or scan the QR code
            </span>
          </div>

          {/* What they receive */}
          <p style={{ fontSize: '13px', fontWeight: 300, color: '#4B5563', margin: '0 0 6px 0', fontFamily: FONT }}>
            Receive session registration links and program updates directly to your inbox.
          </p>

          {/* Fine print */}
          <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0, fontFamily: FONT, fontStyle: 'italic' }}>
            * Subscribing is free and your information is never shared.
          </p>
        </div>

        {/* Right: QR code */}
        <div
          className="v3-qr-block"
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '8px',
            paddingTop: '4px',
          }}
        >
          <QRPlaceholder />
          <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: FONT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
            scan to subscribe
          </span>
        </div>
      </div>

      {/* ── Three pillars (unchanged from v2) ── */}
      <div
        className="overview-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {pillars.map((p) => (
          <div
            key={p.label}
            style={{
              background: 'var(--oav-page-bg)',
              border: '1px solid var(--oav-border)',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.icon}</div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                color: '#8B1F2D',
                fontFamily: FONT,
                marginBottom: '6px',
              }}
            >
              {p.label}
            </div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: FONT,
              }}
            >
              {p.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
);
