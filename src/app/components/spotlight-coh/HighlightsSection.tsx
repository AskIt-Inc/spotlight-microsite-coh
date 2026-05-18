import React from 'react';

const FONT = 'gotham, sans-serif';
const TEAL = '#006E8E';

// ─── Highlights — v1 depth (6 entries, 2–3 sentences each) ──────────────────
// AI-generated content based on COH website research and session topics.
// Requires City of Hope review and approval before publication.

const highlights = [
  {
    label: 'Dedicated Amyloidosis Program at an NCI-Designated Comprehensive Cancer Center',
    text: 'City of Hope\'s Amyloidosis Program is embedded within one of the nation\'s leading National Cancer Institute-Designated Comprehensive Cancer Centres, with a long track record in haematologic malignancies. The programme covers the full spectrum of systemic amyloidosis — AL, TTR (both hereditary and wild-type), AA, and LECT2 — under one coordinated multidisciplinary team.',
  },
  {
    label: 'Second-Line AL Amyloidosis: Venetoclax and Bispecific Antibodies',
    text: 'Two July sessions address relapsed/refractory AL amyloidosis, reflecting the programme\'s active clinical experience with novel second-line agents. Dr. Rosenzweig will share the City of Hope experience with venetoclax, while Dr. Sarah Lee covers bispecific antibody approaches — both emerging areas where COH is actively contributing to the evidence base.',
  },
  {
    label: 'SAVE Trial: A Path Toward Earlier Diagnosis',
    text: 'Dr. Lisa Lee will present the SAVE trial, a study exploring whether new diagnostic approaches can identify AL amyloidosis at an earlier, more treatable stage. Earlier diagnosis is one of the programme\'s key research priorities, and this session translates cutting-edge trial findings directly for the patient and clinician community.',
  },
  {
    label: 'AI-Powered Cardiac Amyloidosis Detection',
    text: 'Under Dr. Faizi Jamal — Chief of Cardiology, Director of the Echocardiography Laboratory, and board-certified in cardio-oncology — City of Hope is pioneering the application of artificial intelligence algorithms to cardiac imaging. Dr. Jamal\'s research applies AI to quantitative echocardiography to detect cardiotoxicity earlier and characterise cardiac amyloidosis more precisely than standard techniques allow.',
  },
  {
    label: 'Autologous Stem Cell Transplantation in the Modern Treatment Era',
    text: 'Dr. Tibor Kovacsovics co-founded the Utah Amyloidosis Program and brings 20 years of clinical research experience in haematologic malignancies and stem cell transplantation to City of Hope. His July session will address how upfront autologous SCT fits into the current AL amyloidosis treatment landscape — including when it remains the right choice and how first-line therapy has evolved around it.',
  },
  {
    label: 'Comprehensive Multidisciplinary Support Team',
    text: 'Beyond the presenting physicians, the COH Amyloidosis Programme is supported by a dedicated team of specialist nurses, nurse practitioners, a nurse navigator, a senior site liaison for patient scheduling, a clinical research nurse for amyloid trials, and a staff scientist for translational research. This breadth of support ensures patients are guided from first contact through clinical trial participation and ongoing care.',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderTop: '1px solid var(--oav-border)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '48px 24px',
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
          color: TEAL,
          marginBottom: '24px',
          fontFamily: FONT,
        }}
      >
        Program Highlights
      </div>

      {/* Highlight entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {highlights.map((h) => (
          <div
            key={h.label}
            style={{
              borderLeft: `3px solid ${TEAL}`,
              paddingLeft: '16px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                marginBottom: '4px',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
              }}
            >
              {h.label}
            </div>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.7,
                margin: 0,
                fontFamily: FONT,
              }}
            >
              {h.text}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginTop: '24px',
          marginBottom: 0,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        * AI-generated content for review purposes. Requires City of Hope review and approval before publication.
      </p>
    </div>
  </section>
);
