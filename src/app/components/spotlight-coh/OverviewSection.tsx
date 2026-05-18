import React from 'react';

const FONT = 'gotham, sans-serif';
const TEAL = '#006E8E';

// ─── Overview — COH v1 pattern ────────────────────────────────────────────────
// Mirrors UChicago v1: "About the Program" label + substantive prose + 3 pillars.
// Copy is AI-generated as a placeholder. Requires City of Hope review and approval
// before publication.

const pillars = [
  {
    icon: '🩸',
    label: 'Multidisciplinary AL & TTR Care',
    text: 'A dedicated amyloidosis program spanning hematology, cardiology, nephrology, and neurology — coordinated under one roof at City of Hope Medical Center.',
  },
  {
    icon: '🔬',
    label: 'Active Clinical Research',
    text: 'Multiple open trials including venetoclax-based regimens, bispecific antibodies, and the SAVE trial for earlier AL amyloidosis diagnosis — giving patients access to emerging therapies.',
  },
  {
    icon: '🤖',
    label: 'AI-Driven Cardiac Diagnostics',
    text: 'Pioneering application of artificial intelligence algorithms to quantitative echocardiography, enabling earlier and more precise detection of cardiac amyloidosis.',
  },
];

export const OverviewSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
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
          marginBottom: '8px',
          fontFamily: FONT,
        }}
      >
        About the Program
      </div>

      {/* Body text — paragraph 1 */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 300,
          color: '#000000',
          lineHeight: 1.7,
          margin: 0,
          fontFamily: FONT,
        }}
      >
        The City of Hope Amyloidosis Program is a multidisciplinary centre of excellence dedicated to the
        diagnosis and treatment of all forms of systemic amyloidosis — including light chain (AL), transthyretin
        (TTR), secondary amyloidosis (AA), and LECT2. Led by Dr. Michael Rosenzweig, who also serves as Chief
        of the Division of Multiple Myeloma, the programme brings together haematology/oncology, cardiology,
        nephrology, and neurology specialists to ensure every patient receives a coordinated, whole-person care
        plan tailored to their specific disease type and stage. City of Hope is a National Cancer Institute-Designated
        Comprehensive Cancer Center with a long-standing commitment to advancing care for rare and complex
        haematologic malignancies.
      </p>

      {/* Body text — paragraph 2 */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 300,
          color: '#000000',
          lineHeight: 1.7,
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: FONT,
        }}
      >
        What distinguishes the City of Hope programme is its integration of cutting-edge research with
        compassionate, patient-centred care. The team is actively investigating second-line treatment strategies
        for relapsed/refractory AL amyloidosis — including venetoclax-based regimens and bispecific antibody
        therapies — while also advancing earlier diagnostic approaches through the SAVE trial. The cardiology
        arm, led by Dr. Faizi Jamal, is pioneering the use of artificial intelligence tools for cardiac
        amyloidosis detection. Patients benefit from access to multiple open clinical trials and from the
        programme's growing support team of specialist nurses, nurse practitioners, a nurse navigator, and a
        dedicated clinical research nurse for amyloid trials.*
      </p>

      {/* Disclaimer */}
      <p
        style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginTop: '16px',
          marginBottom: '32px',
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        * AI-generated content for review purposes. Requires City of Hope review and approval before publication.
      </p>

      {/* Three pillars */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>{p.icon}</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                  color: TEAL,
                  fontFamily: FONT,
                }}
              >
                {p.label}
              </span>
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
