import React from 'react';
import { HeroSection }      from '../components/spotlight-coh/HeroSection';
import { OverviewSection }  from '../components/spotlight-coh/OverviewSection';
import { TeamSection }      from '../components/spotlight-coh/TeamSection';
import { HighlightsSection } from '../components/spotlight-coh/HighlightsSection';
import { TrialsSection }    from '../components/spotlight-coh/TrialsSection';
import { SessionsSidebar }  from '../components/spotlight-coh/SessionsSidebar';

// ─── Spotlight Page — v3 (Stacey feedback: COMING SOON hero, subscribe CTA) ───
// Changes from v2:
//   Hero:     Both STTT + OAV logos centred | COMING SOON + program name/date
//             | FEATURING block unchanged
//   Overview: Blockquote replaced with session tagline + subscribe CTA + QR code
//   Team / Highlights / Trials / Sessions: unchanged from v2

export const SpotlightPageCOH: React.FC = () => {
  return (
    <div>
      <HeroSection />

      <div
        className="spotlight-content-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 64px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left — main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <OverviewSection />
          <TeamSection />
          <HighlightsSection />
          <TrialsSection />
        </div>

        {/* Right — sticky sessions sidebar */}
        <div
          className="spotlight-sidebar-wrapper"
          style={{
            width: '300px',
            flexShrink: 0,
            position: 'sticky' as const,
            top: '104px',
            alignSelf: 'flex-start',
          }}
        >
          <SessionsSidebar />
        </div>
      </div>
    </div>
  );
};
