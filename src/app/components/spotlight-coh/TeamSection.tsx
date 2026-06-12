import React, { useState, useMemo } from 'react';
import { PlayCircle, Calendar, Users, X } from 'lucide-react';
import { clinicians, supportStaff, type Clinician, type SupportStaff } from './data';
import { useSpotlightSessions, buildRegUrlMap } from './useSpotlightSessions';
import { useSpotlightProfiles, type NormalizedProfile } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';

function formatApiSessionDate(month?: string, day?: string): string | undefined {
  if (!month || !day) return undefined;
  const lower = month.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)} ${day}`;
}

function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const suffixes = new Set(['iv', 'iii', 'ii', 'jr', 'sr', 'md', 'phd', 'ms', 'cgc']);
  const filtered = words.filter((w) => !suffixes.has(w.toLowerCase().replace(/[.,]/g, '')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return filtered[0][0].toUpperCase();
}

// ─── Bio Modal ────────────────────────────────────────────────────────────────
interface BioModalProps {
  clinician: Clinician;
  name: string;                   // resolved name — profile API preferred, sessions/static as fallback
  photoUrl: string;              // resolved photo — API live URL preferred, data.ts as fallback
  bio: string;                   // resolved bio — API profile bio preferred, data.ts as fallback
  sessionDate: string;           // resolved session date — API sessions preferred, data.ts as fallback
  sessionTitle: string;          // resolved session title — API sessions preferred, data.ts as fallback
  apiSessionDescription?: string; // session description from Drupal API — overrides data.ts copy
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({
  clinician,
  name,
  photoUrl,
  bio,
  sessionDate,
  sessionTitle,
  apiSessionDescription,
  onClose,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 24px',
            borderBottom: '1px solid #E8E8E8',
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '3px solid #006E8E',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#006E8E',
            }}
          >
            {photoUrl && !imgError ? (
              <img
                src={photoUrl}
                alt={name}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
                {getInitials(name)}
              </span>
            )}
          </div>

          {/* Identity */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
              {name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.credentials} · {clinician.title}
            </div>
            <div style={{ fontSize: '13px', color: '#006E8E', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.specialty}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              fontFamily: FONT,
            }}
          >
            {bio}
          </p>

          {/* Session info box */}
          {clinician.hasSession && (
            <div
              style={{
                background: '#E7F5F8',
                border: '1px solid #B9DEE6',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: '#006E8E',
                  fontFamily: FONT,
                  marginBottom: '4px',
                }}
              >
                Session: {sessionDate}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: FONT,
                  marginBottom: '6px',
                }}
              >
                {sessionTitle}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: FONT,
                }}
              >
                {apiSessionDescription ?? clinician.sessionDescription}
              </p>
            </div>
          )}

          {/* Appointment CTA */}
          <a
            href={clinician.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid #E8E8E8',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 300,
              cursor: 'pointer',
              fontFamily: FONT,
              width: '100%',
              justifyContent: 'center',
              textDecoration: 'none',
              color: '#000000',
              boxSizing: 'border-box' as const,
            }}
          >
            Schedule an appointment
            <ExternalLink size={13} color="#4B5563" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Video Modal ──────────────────────────────────────────────────────────────
interface VideoModalProps {
  title: string;
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ title, videoUrl, onClose }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.72)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px',
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        maxWidth: '860px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.32)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '14px 18px',
          borderBottom: '1px solid #E8E8E8',
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
          {title}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4B5563',
          }}
          aria-label="Close video"
        >
          <X size={20} />
        </button>
      </div>
      <video
        src={videoUrl}
        controls
        autoPlay
        style={{
          display: 'block',
          width: '100%',
          maxHeight: '72vh',
          background: '#000000',
        }}
      />
    </div>
  </div>
);

// ─── Compact horizontal card ──────────────────────────────────────────────────
interface CompactCardProps {
  clinician: Clinician;
  regLink?: string;
  apiProfile?: NormalizedProfile; // live profile API — preferred over sessions/data.ts
  apiPresenterName?: string;      // live presenter name from sessions API
  apiSessionDate?: string;        // live date from sessions API
  apiSessionTitle?: string;       // live title from sessions API
  apiSessionDescription?: string; // session description from Drupal API
}

const CompactCard: React.FC<CompactCardProps> = ({
  clinician,
  regLink,
  apiProfile,
  apiPresenterName,
  apiSessionDate,
  apiSessionTitle,
  apiSessionDescription,
}) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  // Profile API is the source of truth when it has a matching uid.
  const resolvedName = apiProfile?.displayName || apiPresenterName?.trim() || clinician.name;
  const resolvedPhoto = apiProfile?.photoUrl || clinician.photo;
  const resolvedBio = apiProfile?.bio || clinician.bio;
  const resolvedSessionDate = apiSessionDate || clinician.sessionDate;
  const resolvedSessionTitle = apiSessionTitle || clinician.sessionTitle;

  return (
    <>
      <div
        className="compact-card"
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          boxShadow: 'var(--oav-card-shadow)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #006E8E',
            background: '#006E8E',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {resolvedPhoto && !imgError ? (
            <img
              src={resolvedPhoto}
              alt={resolvedName}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(resolvedName)}
            </span>
          )}
        </div>

        {/* Identity */}
        <div className="compact-card-identity" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {resolvedName}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
              marginTop: '3px',
              lineHeight: 1.4,
            }}
          >
            {clinician.credentials ? `${clinician.credentials} · ${clinician.title}` : clinician.title}
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#006E8E',
              fontFamily: FONT,
              marginTop: '4px',
              lineHeight: 1.4,
            }}
          >
            {clinician.specialty}
          </div>
          {clinician.hasSession && (
            <div style={{ fontSize: '12px', color: '#006E8E', fontFamily: FONT, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={11} color="#006E8E" />
              <span>{resolvedSessionDate}</span>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div
          className="compact-card-ctas"
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '6px',
            flexShrink: 0,
            alignItems: 'flex-end',
          }}
        >
          {/* View bio modal */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#005EB8',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: FONT,
              textDecoration: 'underline',
              whiteSpace: 'nowrap' as const,
            }}
          >
            View more
          </button>

          {/* Register CTA — only if has session and regLink available */}
          {clinician.hasSession && regLink && (
            <a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#004F66' : '#006E8E',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
                transition: 'background 0.15s ease',
                textDecoration: 'none',
              }}
            >
              <Calendar size={11} color="#ffffff" />
              Register
            </a>
          )}

          {/* Watch video — if available */}
          {clinician.hasVideo && clinician.videoUrl && (
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 300,
                color: '#005EB8',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
                textDecoration: 'none',
              }}
            >
              <PlayCircle size={13} color="#005EB8" />
              Watch video
            </button>
          )}
        </div>
      </div>

      {/* Bio modal */}
      {modalOpen && (
        <BioModal
          clinician={clinician}
          name={resolvedName}
          photoUrl={resolvedPhoto}
          bio={resolvedBio}
          sessionDate={resolvedSessionDate}
          sessionTitle={resolvedSessionTitle}
          apiSessionDescription={apiSessionDescription}
          onClose={() => setModalOpen(false)}
        />
      )}

      {videoModalOpen && clinician.videoUrl && (
        <VideoModal
          title={`${resolvedName} video`}
          videoUrl={clinician.videoUrl}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </>
  );
};

// ─── Support Staff Card ───────────────────────────────────────────────────────
interface SupportStaffCardProps {
  staff: SupportStaff;
  apiProfile?: NormalizedProfile;
}

interface SupportStaffModalProps {
  name: string;
  role: string;
  note: string;
  photoUrl?: string;
  onClose: () => void;
}

const SupportStaffModal: React.FC<SupportStaffModalProps> = ({
  name,
  role,
  note,
  photoUrl,
  onClose,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 24px',
            borderBottom: '1px solid #E8E8E8',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#006E8E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {photoUrl && !imgError ? (
              <img
                src={photoUrl}
                alt={name}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span style={{ fontSize: '21px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
                {getInitials(name)}
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
              {name}
            </div>
            <div style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, marginTop: '3px' }}>
              {role}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>
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
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

const SupportStaffCard: React.FC<SupportStaffCardProps> = ({ staff, apiProfile }) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const resolvedName = staff.credentials ? `${staff.name}, ${staff.credentials}` : staff.name;
  const resolvedNote = staff.note || apiProfile?.bio;
  const resolvedPhoto = apiProfile?.photoUrl || staff.photo;

  return (
    <>
      <div
        className="support-staff-card"
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--oav-card-shadow)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#006E8E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {resolvedPhoto && !imgError ? (
            <img
              src={resolvedPhoto}
              alt={resolvedName}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(resolvedName)}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="support-staff-identity" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000000', fontFamily: FONT, lineHeight: 1.25 }}>
            {resolvedName}
          </div>
          <div style={{ fontSize: '17px', color: '#374151', fontFamily: FONT, marginTop: '8px', lineHeight: 1.35 }}>
            {staff.role}
          </div>
        </div>
        {resolvedNote && (
          <div className="support-staff-actions" style={{ flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: '#005EB8',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: FONT,
                textDecoration: 'underline',
                whiteSpace: 'nowrap' as const,
              }}
            >
              View more
            </button>
          </div>
        )}
      </div>
      {modalOpen && resolvedNote && (
        <SupportStaffModal
          name={resolvedName}
          role={staff.role}
          note={resolvedNote}
          photoUrl={resolvedPhoto}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

// ─── TeamSection ──────────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => {
  const { sessions } = useSpotlightSessions();
  const { profileMap } = useSpotlightProfiles();

  // uuid → regUrl — memoised to avoid rebuilding on every render
  const regUrlMap  = useMemo(() => buildRegUrlMap(sessions), [sessions]);
  // uuid → full session data from Drupal API for team card/modal copy.
  const sessionMap = useMemo(
    () => new Map(sessions.map(s => [s.id, s])),
    [sessions],
  );
  // uuid → session description (Drupal API copy overrides data.ts)
  const descMap    = useMemo(
    () => new Map(sessions.map(s => [s.id, s.description])),
    [sessions],
  );

  return (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '48px 0',
    }}
  >
    <div className="team-section-inner">
      {/* Section heading */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 300,
            color: '#000000',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#4B5563',
            marginTop: '6px',
            marginBottom: 0,
            fontFamily: FONT,
          }}
        >
          City of Hope presenters featured in the July amyloidosis spotlight series
        </p>
      </div>

      {/* Compact card list */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {clinicians.map((clinician) => (
          <CompactCard
            key={clinician.id}
            clinician={clinician}
            regLink={clinician.sessionUuid ? regUrlMap.get(clinician.sessionUuid) : undefined}
            apiProfile={clinician.profileUid ? profileMap.get(clinician.profileUid) : undefined}
            apiPresenterName={clinician.sessionUuid ? sessionMap.get(clinician.sessionUuid)?.presenter : undefined}
            apiSessionDate={
              clinician.sessionUuid
                ? formatApiSessionDate(
                    sessionMap.get(clinician.sessionUuid)?.month,
                    sessionMap.get(clinician.sessionUuid)?.day,
                  )
                : undefined
            }
            apiSessionTitle={clinician.sessionUuid ? sessionMap.get(clinician.sessionUuid)?.title : undefined}
            apiSessionDescription={clinician.sessionUuid ? descMap.get(clinician.sessionUuid) : undefined}
          />
        ))}
      </div>

      {/* ── Support Staff ── */}
      <div style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 24px 0',
          }}
        >
          <Users size={22} color="#006E8E" strokeWidth={2} />
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#006E8E',
              margin: 0,
              lineHeight: 1.2,
              fontFamily: FONT,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}
          >
            Support Staff
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '18px',
          }}
        >
          {supportStaff.map((staff) => (
            <SupportStaffCard
              key={staff.id}
              staff={staff}
              apiProfile={staff.profileUid ? profileMap.get(staff.profileUid) : undefined}
            />
          ))}
        </div>
      </div>

    </div>
  </section>
  );
};
