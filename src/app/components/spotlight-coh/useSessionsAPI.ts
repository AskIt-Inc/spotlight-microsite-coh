import { useState, useEffect } from 'react';
import { sessions as fallbackSessions, type Session } from './data';

const API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/sessions?indication=4&partner=12759';

interface APIPresenter {
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
}

interface APISession {
  uuid: string;
  title: string;
  description: string;
  date: string; // "Jul 1, 2026"
  time: string;
  times_by_zone: { ET: string; CT: string; MT: string; PT: string };
  timestamp: number;
  presenters: APIPresenter[];
  reg_link: { url: string; title: string };
  short_url: string;
}

interface APIResponse {
  data: APISession[];
  meta: { count: number };
}

function mapAPISession(s: APISession, idx: number): Session {
  // Derive month/day from date string e.g. "Jul 1, 2026"
  const parts = s.date.split(' ');
  const month = parts[0].toUpperCase().slice(0, 3); // "JUL"
  const day = parts[1].replace(',', '');             // "1"

  // Day of week from unix timestamp
  const dayOfWeek = new Date(s.timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'America/Los_Angeles',
  });

  // Time — use PT zone, append "PT"
  const time = s.times_by_zone?.PT ? `${s.times_by_zone.PT} PT` : s.time;

  // Status — past sessions are completed
  const status: Session['status'] =
    Date.now() > s.timestamp * 1000 ? 'completed' : 'upcoming';

  // Presenter display name — prefix "Dr." since all COH presenters are physicians
  const p = s.presenters?.[0];
  const presenter = p
    ? `Dr. ${p.first_name.trim()} ${p.last_name.trim()}`
    : '';

  return {
    id: idx + 1,
    uuid: s.uuid,
    month,
    day,
    dayOfWeek,
    time,
    title: s.title,
    presenter,
    description: s.description,
    status,
    regLink: s.reg_link?.url ?? undefined,
    shortUrl: s.short_url ?? undefined,
  };
}

interface UseSessionsAPIResult {
  sessions: Session[];
  loading: boolean;
  error: boolean;
}

export function useSessionsAPI(): UseSessionsAPIResult {
  const [sessions, setSessions] = useState<Session[]>(fallbackSessions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<APIResponse>;
      })
      .then((json) => {
        if (cancelled) return;
        if (json.data?.length) {
          setSessions(json.data.map(mapAPISession));
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Silently fall back to static data
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { sessions, loading, error };
}
