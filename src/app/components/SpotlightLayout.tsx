import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Search, Menu, X } from 'lucide-react';

const FONT = 'gotham, sans-serif';

// ─── Nav config ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',                url: 'https://oneamyloidosisvoice.com/' },
  { label: 'Patient Care Center', url: 'https://pcc.oneamyloidosisvoice.com/' },
  { label: 'Clinical Trials',     url: 'https://oneamyloidosisvoice.com/clinical-trial-finder' },
  { label: 'Providers',           url: 'https://oneamyloidosisvoice.com/providers' },
  { label: 'Community Center',    url: 'https://oneamyloidosisvoice.com/community-center' },
  { label: 'News',                url: 'https://oneamyloidosisvoice.com/news' },
  { label: 'Trusted Resources',   url: 'https://oneamyloidosisvoice.com/trusted-resources' },
  { label: 'Event Calendar',      url: 'https://oneamyloidosisvoice.com/all-upcoming-sessions' },
];

const FOOTER_LINKS = [
  { label: 'Home',             url: 'https://oneamyloidosisvoice.com/' },
  { label: 'About us',         url: 'https://oneamyloidosisvoice.com/about-oneamyloidosisvoice' },
  { label: 'Video',            url: 'https://oneamyloidosisvoice.com/video' },
  { label: 'Galleries',        url: 'https://oneamyloidosisvoice.com/galleries' },
  { label: 'Contact',          url: 'https://oneamyloidosisvoice.com/contact' },
  { label: 'Login',            url: 'https://oneamyloidosisvoice.com/user/login' },
  { label: 'Privacy Policy',   url: 'https://oneamyloidosisvoice.com/privacy-policy' },
  { label: 'Privacy Reminder', url: 'https://oneamyloidosisvoice.com/privacy-reminder' },
  { label: 'Terms of use',     url: 'https://oneamyloidosisvoice.com/terms-of-use' },
  { label: 'FAQ',              url: 'https://oneamyloidosisvoice.com/faq' },
  { label: 'Code of Conduct',  url: 'https://oneamyloidosisvoice.com/code-of-conduct' },
];

// ─── OAV Logo ─────────────────────────────────────────────────────────────────
const OAV_LOGO_URL = 'https://oneamyloidosisvoice.com/sites/default/files/files/oneamyloidosisvoice-logo-red.svg';

const OAVLogo: React.FC = () => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: '16px', color: '#000000' }}>
      one<span style={{ color: '#8B1F2D' }}>AMYLOIDOSIS</span>voice
    </span>
  ) : (
    <img
      className="oav-logo-img"
      src={OAV_LOGO_URL}
      alt="oneAMYLOIDOSISvoice"
      style={{ display: 'block', height: '72px', width: 'auto' }}
      onError={() => setFailed(true)}
    />
  );
};

// ─── Main nav ──────────────────────────────────────────────────────────────────
const SiteHeader: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #E5E5E5',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="site-header-inner"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '88px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <a href="#" className="oav-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <OAVLogo />
          </a>

          {/* Nav links — hidden on mobile via CSS */}
          <nav
            className="hidden-mobile-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              flex: 1,
              justifyContent: 'flex-end',
              background: '#050505',
              borderRadius: '2px',
              padding: '4px 6px',
              minHeight: '48px',
              boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
            }}
          >
            {NAV_LINKS.map(({ label, url }) => (
              <NavItem key={label} label={label} url={url} />
            ))}
          </nav>

          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: '#050505',
              border: 'none',
              cursor: 'pointer',
              padding: '0 14px',
              height: '48px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderRadius: '2px',
            }}
            aria-label="Search"
          >
            <Search size={22} color="#ffffff" strokeWidth={2.5} />
          </button>

          {/* Hamburger — mobile only, hidden on desktop via CSS */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              color: '#000000',
            }}
          >
            {mobileMenuOpen
              ? <X size={22} color="#000000" />
              : <Menu size={22} color="#000000" />
            }
          </button>
        </div>
      </header>

      {/* Mobile nav panel — full-width dropdown below header */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '88px',  /* header height */
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: 99,
            padding: '8px 0',
          }}
        >
          {NAV_LINKS.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 300,
                color: '#000000',
                textDecoration: 'none',
                fontFamily: FONT,
                borderBottom: '1px solid #F5F5F5',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B1F2D'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

const NavItem: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 12px',
        minHeight: '40px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#ffffff',
        textDecoration: 'none',
        whiteSpace: 'nowrap' as const,
        fontFamily: FONT,
        letterSpacing: 0,
        borderRadius: '2px',
        background: hovered ? '#1a1a1a' : 'transparent',
        boxShadow: hovered ? 'inset 0 -3px 0 #8B1F2D' : 'inset 0 -3px 0 transparent',
        transition: 'background 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {label}
    </a>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────

// Minimal social icon SVGs
const SocialIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const paths: Record<string, string> = {
    facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2-4.52 4.5 0 .35.04.7.11 1.02C7.69 5.35 4.07 3.58 1.64.9a4.48 4.48 0 0 0-.61 2.27c0 1.56.8 2.94 2 3.75a4.49 4.49 0 0 1-2.05-.57v.06c0 2.18 1.55 4 3.6 4.41a4.54 4.54 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.13A9.06 9.06 0 0 1 0 15.54 12.8 12.8 0 0 0 6.92 17.5c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 22 2.12z',
    instagram: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2z',
    youtube: 'M22.54 6.42A2.78 2.78 0 0 0 20.58 4.44C18.88 4 12 4 12 4s-6.88 0-8.58.44A2.78 2.78 0 0 0 1.46 6.42 29.1 29.1 0 0 0 1 12a29.1 29.1 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.42 19.56C5.12 20 12 20 12 20s6.88 0 8.58-.44a2.78 2.78 0 0 0 1.96-1.98A29.1 29.1 0 0 0 23 12a29.1 29.1 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z',
    vimeo: 'M22 7.42c-.09 2.01-1.5 4.77-4.22 8.28C15 19.37 12.67 21 10.83 21c-1.11 0-2.05-1.03-2.82-3.08L6.54 13c-.58-2.05-1.2-3.08-1.87-3.08-.14 0-.64.3-1.49.9L2 9.72a53.6 53.6 0 0 0 3.32-2.96C6.96 5.2 8.2 4.3 9.07 4.22c2.07-.2 3.35 1.22 3.84 4.24.52 3.26.88 5.29 1.09 6.08.6 2.75 1.27 4.12 2 4.12.57 0 1.42-.9 2.56-2.7 1.13-1.8 1.74-3.17 1.82-4.12.16-1.56-.45-2.34-1.82-2.34-.65 0-1.32.15-2.01.45.56-1.84 1.63-2.73 3.2-2.68 1.17.04 1.72.82 1.25 2.15z',
    pinterest: 'M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.65 11.17-.1-.96-.2-2.44.04-3.49.22-.95 1.48-6.3 1.48-6.3s-.38-.76-.38-1.89c0-1.77 1.03-3.09 2.3-3.09 1.09 0 1.61.82 1.61 1.8 0 1.1-.7 2.74-1.06 4.26-.3 1.27.63 2.3 1.87 2.3 2.24 0 3.97-2.36 3.97-5.77 0-3.01-2.17-5.12-5.27-5.12-3.59 0-5.7 2.69-5.7 5.48 0 1.09.42 2.25.94 2.89.1.12.12.23.09.35-.1.39-.31 1.27-.35 1.44-.05.22-.18.27-.4.16-1.5-.7-2.44-2.9-2.44-4.67 0-3.8 2.76-7.29 7.96-7.29 4.18 0 7.43 2.98 7.43 6.96 0 4.15-2.62 7.49-6.25 7.49-1.22 0-2.37-.63-2.76-1.38l-.75 2.8c-.27 1.05-1 2.36-1.49 3.16.56.17 1.15.27 1.77.27 6.63 0 12-5.37 12-12S18.63 0 12 0z',
  };

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] ?? ''} fill={color} stroke="none" />
    </svg>
  );
};

const SOCIAL_LINKS = [
  { name: 'facebook', color: '#1877F2', bg: '#E7F0FD' },
  { name: 'twitter', color: '#1DA1F2', bg: '#E8F5FD' },
  { name: 'instagram', color: '#E4405F', bg: '#FDE8EC' },
  { name: 'youtube', color: '#FF0000', bg: '#FFE8E8' },
  { name: 'vimeo', color: '#1AB7EA', bg: '#E5F6FD' },
  { name: 'pinterest', color: '#E60023', bg: '#FFE8EA' },
];

// ─── Sponsor logo with img fallback ───────────────────────────────────────────
const SponsorLogo: React.FC<{ name: string; img: string; height?: number }> = ({ name, img, height = 32 }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span style={{ fontSize: '13px', fontWeight: 700, color: '#444444', fontFamily: FONT }}>{name}</span>
  ) : (
    <img
      src={img}
      alt={name}
      style={{ height: `${height}px`, width: 'auto', maxWidth: '160px', display: 'block', objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
};

// Pharma sponsor logos
const SPONSORS = [
  { name: 'Alnylam',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/alnylam.jpg' },
  { name: 'BRIDGEBIO',           img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/bb-orange-logo.png' },
  { name: 'attralus',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/attralus_1.png' },
  { name: 'prothena',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/prothena.png' },
];

const AMYLOIDOSIS_FOUNDATION_LOGO = 'https://oneamyloidosisvoice.com/sites/default/files/logos/amyloidosis-foundation.png';

const SiteFooter: React.FC = () => (
  <footer
    style={{
      background: '#ffffff',
      borderTop: '1px solid #E5E5E5',
      fontFamily: FONT,
    }}
  >
    {/* ── Nav links row ── */}
    <div
      style={{
        borderBottom: '1px solid #E5E5E5',
        padding: '14px 24px',
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '4px 0',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {FOOTER_LINKS.map(({ label, url }, i) => (
        <React.Fragment key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              color: '#000000',
              textDecoration: 'underline',
              textDecorationColor: '#AAAAAA',
              padding: '0 10px',
              fontFamily: FONT,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#8B1F2D';
              (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = '#8B1F2D';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
              (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = '#AAAAAA';
            }}
          >
            {label}
          </a>
          {i < FOOTER_LINKS.length - 1 && (
            <span style={{ color: '#E5E5E5', fontSize: '13px' }}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* ── Copyright + Social ── */}
    <div
      style={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '8px',
        borderBottom: '1px solid #E5E5E5',
      }}
    >
      <span style={{ fontSize: '13px', color: '#000000', fontFamily: FONT }}>
        © 2025 Somebody To Talk To, Inc.
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: '#000000', fontFamily: FONT }}>Join us on</span>
        {SOCIAL_LINKS.map(({ name, color, bg }) => (
          <a
            key={name}
            href="#"
            aria-label={name}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: bg,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <SocialIcon name={name} color={color} />
          </a>
        ))}
      </div>
    </div>

  </footer>
);

// ─── Layout shell ──────────────────────────────────────────────────────────────
export const SpotlightLayout: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--oav-page-bg)',
        fontFamily: FONT,
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <SiteHeader />

      <main style={{ flex: 1, width: '100%', minWidth: 0 }}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};
