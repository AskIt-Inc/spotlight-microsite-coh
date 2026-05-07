import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const STTT_LOGO_URL = 'https://somebodytotalkto.com/sites/default/files/STTT%20Logo%20Basic.png';
const OAV_LOGO_URL  = 'https://oneamyloidosisvoice.com/sites/default/files/files/oneamyloidosisvoice-logo-red.svg';
const UOC_LOGO_URL  = 'https://edge.sitecorecloud.io/unichicagomc-81nbqnb3/media/images/ucmc/landing-pages/ucm-logo-horizontal.png';

// ─── Logo with img fallback ───────────────────────────────────────────────────
const LogoImg: React.FC<{ src: string; alt: string; height: number; fallback: string }> = ({
  src, alt, height, fallback,
}) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: '14px', color: '#8B1F2D' }}>
      {fallback}
    </span>
  ) : (
    <img
      src={src}
      alt={alt}
      style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
};

// ─── UoC logo — white pill on maroon (unchanged from v2) ─────────────────────
const UoCLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '240px',
      }}
    >
      {!imgFailed ? (
        <img
          src={UOC_LOGO_URL}
          alt="University of Chicago Medicine"
          style={{ height: '52px', width: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#8B1F2D', fontFamily: FONT, textAlign: 'center' as const, lineHeight: 1.3 }}>
          University of Chicago Medicine
        </span>
      )}
    </div>
  );
};

// ─── ROW 1: Logo bar — STTT + OAV centred ────────────────────────────────────
const LogoBar: React.FC = () => (
  <div style={{ background: '#ffffff', borderBottom: '1px solid #E8E8E8', padding: '14px 24px' }}>
    <div
      className="v3-logo-bar"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      <LogoImg src={STTT_LOGO_URL} alt="SomeBodyToTalkTo" height={52} fallback="SomeBodyToTalkTo" />
      <div style={{ width: '1px', height: '44px', background: '#DDD0D2', flexShrink: 0 }} />
      <LogoImg src={OAV_LOGO_URL}  alt="oneAMYLOIDOSISvoice" height={52} fallback="oneAMYLOIDOSISvoice" />
    </div>
  </div>
);

// ─── Spotlight SVG icon ───────────────────────────────────────────────────────
const SpotlightIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFE8A3" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="10" r="3"/>
    <line x1="12" y1="1" x2="12" y2="4"/>
    <line x1="4.22" y1="3.22" x2="6.34" y2="5.34"/>
    <line x1="1" y1="10" x2="4" y2="10"/>
    <line x1="19.78" y1="3.22" x2="17.66" y2="5.34"/>
    <line x1="23" y1="10" x2="20" y2="10"/>
    <path d="M7 17l1.5-4h7L17 17"/>
    <line x1="5" y1="21" x2="19" y2="21"/>
    <line x1="8" y1="21" x2="8" y2="17"/>
    <line x1="16" y1="21" x2="16" y2="17"/>
  </svg>
);

// ─── Maroon band: ROW 2 (COMING SOON + title) + ROW 3 (FEATURING — unchanged) ─
export const HeroSection: React.FC = () => (
  <>
    {/* ROW 1 */}
    <LogoBar />

    {/* ROW 2: white strip — single line */}
    <div style={{ background: '#ffffff', borderBottom: '1px solid #E8E8E8', padding: '10px 24px' }}>
      <div
        className="v3-title-block"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap' as const,
        }}
      >
        <span style={{
          display: 'inline-block',
          background: '#8B1F2D',
          color: '#ffffff',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          padding: '3px 12px',
          borderRadius: '9999px',
          fontFamily: FONT,
          flexShrink: 0,
        }}>
          COMING SOON
        </span>
        <span style={{
          fontSize: '17px',
          fontWeight: 700,
          color: '#8B1F2D',
          fontFamily: FONT,
          letterSpacing: '-0.2px',
        }}>
          Amyloidosis Program Spotlight Series
        </span>
        <span style={{ color: '#C0A0A4', fontWeight: 300, flexShrink: 0 }}>·</span>
        <span style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#6B7280',
          fontFamily: FONT,
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>
          June 2026
        </span>
      </div>
    </div>

    {/* ROW 3: maroon band — FEATURING only */}
    <section
      style={{
        background: 'linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)',
        borderBottom: '3px solid #6E1A24',
        padding: '24px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* ROW 3: FEATURING — no changes from v2 */}
        <div
          className="hero-content-row"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div
            className="hero-left-col"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '10px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SpotlightIcon />
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                color: '#FFE8A3',
                fontFamily: FONT,
              }}>
                FEATURING
              </span>
            </div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
                fontFamily: FONT,
              }}
            >
              University of Chicago Amyloidosis Program
            </h2>
          </div>

          <div className="hero-logo-col" style={{ flexShrink: 0 }}>
            <UoCLogo />
          </div>
        </div>
      </div>
    </section>
  </>
);
