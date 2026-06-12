import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Program accomplishments ───────────────────────────────────
// Source: cityofhope.org/locations/los-angeles/los-angeles-clinical-programs/amyloidosis
//         + City of Hope CAR T / cellular therapy and transplant materials
//         + Dr. Rosenzweig profile awards & publications

const highlights = [
  {
    label: 'NCCN Founding Member',
    text: 'City of Hope is a founding member of the National Comprehensive Cancer Network (NCCN), helping define national treatment standards for amyloidosis and cancer care that benefit patients nationwide.',
  },
  {
    label: 'U.S. News Top 10 Cancer Hospital (2025–26)',
    text: 'Ranked among America\'s top 10 "Best Hospitals" for cancer by U.S. News & World Report, reflecting institutional excellence in oncology and rare disease care.',
  },
  {
    label: 'Pioneering Amyloidosis Research',
    text: 'The COH team has led transformational research in amyloidosis diagnosis and treatment — including participation in the pivotal ANDROMEDA trial and receipt of the 2021 IDEA (Improving Detection of AL Amyloidosis) Grant.',
  },
  {
    label: 'Cellular Therapy and Transplant Leadership',
    text: 'City of Hope\'s cellular therapy work builds on a transplant program that began in 1976 and a CAR T research history dating back to the late 1990s, giving the program deep institutional expertise in cellular therapies and stem cell transplantation.',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderTop: '1px solid var(--oav-border)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
    }}
  >
    <div>
      {/* Section label */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '1px',
          color: '#006E8E',
          marginBottom: '20px',
          fontFamily: FONT,
        }}
      >
        Program Highlights
      </div>

      {/* Highlight rows — compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {highlights.map((h) => (
          <div
            key={h.label}
            style={{
              borderLeft: '3px solid #006E8E',
              paddingLeft: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
              }}
            >
              {h.label}
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
              {h.text}
            </p>
          </div>
        ))}
      </div>

      {/* Source note */}
      <p
        style={{
          fontSize: '12px',
          color: '#4B5563',
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        Source: City of Hope Los Angeles-Area Amyloidosis Care — cityofhope.org
      </p>
    </div>
  </section>
);
