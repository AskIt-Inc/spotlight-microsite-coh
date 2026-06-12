import React, { useState } from 'react';
import { Building2, ChevronDown, FlaskConical, Microscope, type LucideIcon } from 'lucide-react';

const FONT = 'gotham, sans-serif';

// ─── Overview — COH ───────────────────────────────────────────────────────────
// Layout:
//   1. Impactful opening statement
//   2. Three visual program pillars (scannable)
//   3. Collapsible "About the Program" — earmarked for COH to provide copy

const pillars: Array<{ icon: LucideIcon; label: string; text: string }> = [
  {
    icon: Building2,
    label: 'Dedicated Outpatient Program',
    text: 'A comprehensive multidisciplinary amyloidosis clinic offering the full spectrum of care — from definitive diagnosis through stem cell transplantation and cellular therapy — for AL, ATTR, and all other forms of the disease.',
  },
  {
    icon: Microscope,
    label: 'Advanced Diagnostics',
    text: 'State-of-the-art imaging including echocardiography, cardiac MRI, and nuclear medicine scans, along with Congo Red staining, the gold standard for amyloid detection in tissue.',
  },
  {
    icon: FlaskConical,
    label: 'Research & Clinical Trials',
    text: 'Access to breakthrough clinical trials and novel therapeutics, including CAR-T, bispecific antibodies, and targeted inhibitors, led by a team that has driven pivotal advances in AL and TTR amyloidosis research.',
  },
];

// Program description — sourced from cityofhope.org/locations/los-angeles/los-angeles-clinical-programs/amyloidosis
const PROGRAM_ABOUT_PARAGRAPHS = [
  `The City of Hope Amyloidosis Treatment and Research Program is a regional program with amyloid expertise in Duarte, California, Irvine, California, and Phoenix, Arizona.`,
  `What sets the program apart is a dedicated outpatient amyloidosis clinic offering comprehensive multidisciplinary care and a wide range of treatment options, including stem cell transplantation and cellular therapy; state-of-the-art diagnostic imaging including echocardiography, cardiac MRI, and nuclear medicine scans; and Congo Red staining, the gold standard for amyloid detection in tissue.`,
  `The multidisciplinary care model brings together hematology, cardiology, nephrology, neurology, and other amyloid specialists. As a founding member of the National Comprehensive Cancer Network and a U.S. News & World Report Top 10 "Best Hospital" for cancer (2025-26), City of Hope is well positioned to combine clinical excellence with leading-edge research.`,
];

const AboutProgramAccordion: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        marginTop: '28px',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'var(--oav-card-bg)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: FONT,
          textAlign: 'left' as const,
          borderBottom: open ? '1px solid var(--oav-border)' : 'none',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#006E8E',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            fontFamily: FONT,
          }}
        >
          About the City of Hope Amyloidosis Program
        </span>
        <ChevronDown
          size={16}
          color="#006E8E"
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Accordion body */}
      {open && (
        <div
          style={{
            padding: '20px',
            background: 'var(--oav-page-bg)',
          }}
        >
          {PROGRAM_ABOUT_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.7,
                margin: i < PROGRAM_ABOUT_PARAGRAPHS.length - 1 ? '0 0 14px 0' : 0,
                fontFamily: FONT,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

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
      {/* Opening statement */}
      <blockquote
        style={{
          margin: '0 0 32px 0',
          borderLeft: '4px solid #006E8E',
          paddingLeft: '20px',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.5,
            margin: 0,
            fontFamily: FONT,
          }}
        >
          The City of Hope Amyloidosis Treatment and Research Program is a regional program with amyloid expertise in Duarte, California, Irvine, California, and Phoenix, Arizona.
        </p>
      </blockquote>

      {/* Three pillars */}
      <div
        className="overview-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {pillars.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.label}
              style={{
                background: 'var(--oav-page-bg)',
                border: '1px solid var(--oav-border)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: '#FFF3E8',
                  border: '1px solid #F9C89D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                <Icon size={18} color="#F58220" strokeWidth={1.8} />
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                  color: '#006E8E',
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
                  textAlign: 'left' as const,
                }}
              >
                {p.text}
              </p>
              {p.label === 'Research & Clinical Trials' && (
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('clinical-trials')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  style={{
                    display: 'inline-flex',
                    marginTop: '12px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#006E8E',
                    fontFamily: FONT,
                    textDecoration: 'none',
                  }}
                >
                  View clinical trials
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Collapsible program description — earmarked for COH copy */}
      <AboutProgramAccordion />
    </div>
  </section>
);
