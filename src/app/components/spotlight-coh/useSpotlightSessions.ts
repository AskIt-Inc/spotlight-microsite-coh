// ─── Sessions API hook (COH) ──────────────────────────────────────────────────
// Fetches live sessions for COH (amyloidosis + patient best practices).
// Follows the V5 pattern from spotlight-series-microsite/useSpotlightSessions.ts.
//
// COH deviation: buildRegUrlMap keys by session UUID (not presenterLastName)
// because two presenters share the last name "Lee" (Lisa Lee uid=277, Sarah Lee uid=279).
// Use: regUrlMap.get(clinician.sessionUuid)
//
// Sessions are rendered only from the live API. Local data.ts keeps UUID mappings
// for team cards, but it is not used as a session fallback.

import { useState, useEffect } from 'react';

const API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/sessions?indication=4,12362&partner=12759';

// ─── Raw API shape ────────────────────────────────────────────────────────────
export interface ApiSession {
  uuid: string;
  title: string;
  description: string;
  date: string;                  // e.g. "Jul 1, 2026"
  time: string;                  // e.g. "3:00 PM"
  times_by_zone: {
    ET: string;
    CT: string;
    MT: string;
    PT: string;
  };
  timestamp: number;             // Unix seconds UTC
  indications: string[];
  partner: string;
  presenters: Array<{
    display_name: string;
    first_name: string;
    last_name: string;
    name_suffix: string;
    title: string;
    photo_url: string;
  }>;
  reg_link: {
    url: string;
    title: string;
  };
  short_url: string;
  series_label: string;
}

// ─── Normalised shape used by SessionsSidebar and TeamSection ─────────────────
export interface NormalizedSession {
  id: string;              // uuid — primary key
  month: string;           // 3-letter uppercase: "JUL"
  day: string;             // day of month: "1"
  dayOfWeek: string;       // 3-letter: "Wed"
  time: string;            // "3:00 PM PT"
  title: string;
  description: string;     // session description from Drupal — shown in BioModal
  presenter: string;
  presenterLastName: string; // trimmed lowercase — retained for compatibility; NOT used as map key in COH
  status: 'upcoming' | 'completed';
  regUrl: string;
}

// ─── Reg-URL lookup map ───────────────────────────────────────────────────────
// COH deviation: keyed by session UUID to handle the Lisa Lee / Sarah Lee
// last-name collision. Consumers look up via clinician.sessionUuid.
export function buildRegUrlMap(sessions: NormalizedSession[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const s of sessions) {
    if (s.id && s.regUrl) {
      map.set(s.id, s.regUrl);
    }
  }
  return map;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_MAP: Record<string, string> = {
  Jan: 'JAN', Feb: 'FEB', Mar: 'MAR', Apr: 'APR', May: 'MAY', Jun: 'JUN',
  Jul: 'JUL', Aug: 'AUG', Sep: 'SEP', Oct: 'OCT', Nov: 'NOV', Dec: 'DEC',
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function normalizePresenterName(presenter?: ApiSession['presenters'][number]): string {
  if (!presenter) return '';

  const firstName = (presenter.first_name ?? '').replace(/\s{2,}/g, ' ').trim();
  const lastName = (presenter.last_name ?? '').replace(/\s{2,}/g, ' ').trim();
  const apiTitle = (presenter.title ?? '').replace(/\s{2,}/g, ' ').trim();
  const suffix = normalizeCredentialSuffix(presenter.name_suffix ?? '');
  const name = suffix
    ? `${[firstName, lastName].filter(Boolean).join(' ')}, ${suffix}`
    : [apiTitle, firstName, lastName].filter(Boolean).join(' ');

  return name || (presenter.display_name ?? '').replace(/\s{2,}/g, ' ').trim();
}

function normalizeCredentialSuffix(suffix: string): string {
  return suffix
    .replace(/\./g, '')
    .split(',')
    .map(part => part.replace(/\s{2,}/g, ' ').trim())
    .filter(Boolean)
    .join(', ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalise(s: ApiSession): NormalizedSession {
  // Parse date string: "Jul 1, 2026" → month="JUL", day="1"
  const parts = s.date.split(' ');                        // ["Jul", "1,", "2026"]
  const month = MONTH_MAP[parts[0]] ?? parts[0].toUpperCase().slice(0, 3);
  const day   = parts[1]?.replace(',', '') ?? '';

  // API timestamps are UTC; derive weekday from the intended event date instead
  // so local preview timezones do not shift July Wednesdays into Thursdays.
  const monthIndex = MONTH_INDEX[parts[0]];
  const dayNumber = Number.parseInt(day, 10);
  const yearNumber = Number.parseInt(parts[2] ?? '', 10);
  const dayOfWeek =
    monthIndex !== undefined && Number.isFinite(dayNumber) && Number.isFinite(yearNumber)
      ? DAY_NAMES[new Date(Date.UTC(yearNumber, monthIndex, dayNumber)).getUTCDay()]
      : DAY_NAMES[new Date(s.timestamp * 1000).getUTCDay()];

  // Prefer PT time, fall back to raw time string
  const ptTime = s.times_by_zone?.PT;
  const time   = ptTime ? `${ptTime} PT` : s.time;

  // Presenter: build a clean name from title + first_name + last_name.
  const firstPresenter    = s.presenters?.[0];
  const presenter         = normalizePresenterName(firstPresenter);
  const presenterLastName = (firstPresenter?.last_name ?? '').trim().toLowerCase();

  // Status: completed if timestamp is in the past
  const status: 'upcoming' | 'completed' =
    s.timestamp < Date.now() / 1000 ? 'completed' : 'upcoming';

  return {
    id:        s.uuid,
    month,
    day,
    dayOfWeek,
    time,
    title:       s.title,
    description: s.description ?? '',
    presenter,
    presenterLastName,
    status,
    regUrl:    s.reg_link?.url ?? '',
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSpotlightSessions() {
  const [sessions, setSessions] = useState<NormalizedSession[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ data: ApiSession[] }>;
      })
      .then(json => {
        if (cancelled) return;
        const normalised = json.data.map(normalise);
        // Sort: completed first (ascending by position), upcoming last (ascending)
        normalised.sort((a, b) => {
          if (a.status === b.status) return 0;
          return a.status === 'completed' ? -1 : 1;
        });
        setSessions(normalised);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[useSpotlightSessions/COH] fetch failed:', err);
        setSessions([]);
        setError('Live schedule unavailable.');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { sessions, loading, error };
}
