import React from 'react';
import { HeroSection }      from '../components/spotlight-v4/HeroSection';
import { OverviewSection }  from '../components/spotlight-v4/OverviewSection';
import { TeamSection }      from '../components/spotlight-v4/TeamSection';
import { TrialsSection }    from '../components/spotlight-v4/TrialsSection';
import { HighlightsSection } from '../components/spotlight-v2/HighlightsSection';
import { SessionsSidebar }  from '../components/spotlight/SessionsSidebar';

// ─── Spotlight Page — v4 (June 2026: Director profile, dual-site teams, full trials) ───
// Changes from v3:
//   Overview: "Meet the Director" section with Dr. Sarswat profile + expandable bio
//   Team:    Split into Main Site (UChicago) + Endeavor Site with placeholder cards
//   Trials:  Full clinical trial list from emails (past, enrolling, upcoming, both sites)
//            + Monday Best Practice Sessions
//   Hero:    Unchanged from v3

export const SpotlightPageV4: React.FC = () => {
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
