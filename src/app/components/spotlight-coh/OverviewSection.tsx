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
    text: 'A comprehensive outpatient amyloidosis clinic offering the full spectrum of care — from definitive diagnosis through stem cell transplantation and cellular therapy — for AL, ATTR, and all other forms of the disease.',
  },
  {
    icon: Microscope,
    label: 'Advanced Diagnostics',
    text: 'State-of-the-art imaging (echocardiography, cardiac MRI, nuclear medicine), Congo Red staining (the gold standard for amyloid detection), and a unique partnership with Mayo Clinic for definitive protein subtyping via liquid chromatography.',
  },
  {
    icon: FlaskConical,
    label: 'Research & Clinical Trials',
    text: 'Access to breakthrough clinical trials and novel therapeutics — including CAR-T therapy, bispecific antibodies, and targeted inhibitors — led by a team that has driven pivotal advances in AL and TTR amyloidosis research.',
  },
];

// Program description — sourced from cityofhope.org/locations/los-angeles/los-angeles-clinical-programs/amyloidosis
const PROGRAM_ABOUT_PARAGRAPHS = [
  `City of Hope® Cancer Center Duarte is a nationally recognized center of excellence in amyloidosis care, dedicated to providing patients across Southern California with access to leading-edge diagnostic and treatment options for AL, ATTR, and other forms of the disease.`,
  `What sets the program apart: a dedicated outpatient amyloidosis clinic offering comprehensive care and a wide range of treatment options including stem cell transplantation and cellular therapy; state-of-the-art diagnostic imaging including echocardiography, cardiac MRI, and nuclear medicine scans; Congo Red staining (the gold standard for amyloid detection in tissue); and a partnership with Mayo Clinic for biopsy tissue subtyping using liquid chromatography.`,
  `The multidisciplinary care team brings together hematologists, cardiologists, nephrologists, and neurologists — specialists who work together seamlessly for every patient. As a founding member of the National Comprehensive Cancer Network and a U.S. News & World Report Top 10 "Best Hospital" for cancer (2025–26), City of Hope is ideally placed to combine clinical excellence with leading-edge research.`,
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
          City of Hope is a nationally recognized center of excellence in amyloidosis — bringing together hematologists, cardiologists, nephrologists, and neurologists under one dedicated multidisciplinary program to provide every patient with the right diagnosis and the best available treatment.
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
            </div>
          );
        })}
      </div>

      {/* Collapsible program description — earmarked for COH copy */}
      <AboutProgramAccordion />
    </div>
  </section>
);
