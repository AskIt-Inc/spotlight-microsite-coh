// ─── Profiles API hook (COH) ──────────────────────────────────────────────────
// Fetches partner profiles for COH (indication=4, partner=12759).
// Follows the V5 pattern from spotlight-series-microsite/useSpotlightProfiles.ts.
//
// COH deviation: returns Map<uid, NormalizedProfile> (uid-keyed, not lastName-keyed)
// because two presenters share the last name "Lee" (Lisa Lee uid=277, Sarah Lee uid=279).
// Consumers look up via clinician.profileUid.
//
// Strips HTML bios so TeamSection can render profile API bios with data.ts as
// fallback when the API is unavailable or incomplete.

import { useState, useEffect } from 'react';

const PROFILES_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4&partner=12759';

// ─── Raw API shape ────────────────────────────────────────────────────────────
export interface ApiProfile {
  uid: number;
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
  title: string;
  bio: string;        // HTML — strip before use
  photo_url: string;
  employer: string;
  indication: string;
}

// ─── Normalised shape ─────────────────────────────────────────────────────────
export interface NormalizedProfile {
  uid: number;
  displayName: string;    // title + first/last + suffix from API
  firstName: string;
  lastName: string;
  title: string;
  nameSuffix: string;
  lastNameKey: string;  // lowercase trimmed last_name — retained for debugging
  bio: string;          // plain text, HTML stripped
  photoUrl: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags and decode common entities. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Filter out internal test accounts — any name segment contains "test". */
function isTestUser(p: ApiProfile): boolean {
  const combined = [p.display_name, p.first_name, p.last_name]
    .join(' ')
    .toLowerCase();
  return combined.includes('test');
}

function formatDisplayName(p: ApiProfile): string {
  const title = p.title.trim();
  const firstName = p.first_name.replace(/\s{2,}/g, ' ').trim();
  const lastName = p.last_name.replace(/\s{2,}/g, ' ').trim();
  const nameSuffix = p.name_suffix.replace(/\s{2,}/g, ' ').trim();
  const fullName = [title, firstName, lastName].filter(Boolean).join(' ');

  if (fullName && nameSuffix) return `${fullName}, ${nameSuffix}`;
  if (fullName) return fullName;
  return p.display_name.replace(/\s{2,}/g, ' ').trim();
}

function normalise(p: ApiProfile): NormalizedProfile {
  return {
    uid:          p.uid,
    displayName:  formatDisplayName(p),
    firstName:    p.first_name.replace(/\s{2,}/g, ' ').trim(),
    lastName:     p.last_name.replace(/\s{2,}/g, ' ').trim(),
    title:        p.title.trim(),
    nameSuffix:   p.name_suffix.replace(/\s{2,}/g, ' ').trim(),
    lastNameKey:  p.last_name.trim().toLowerCase(),
    bio:          stripHtml(p.bio),
    photoUrl:     p.photo_url,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// COH deviation: returns Map<uid, NormalizedProfile> (not Map<lastNameKey, ...>)
// Use: profileMap.get(clinician.profileUid)?.displayName / .photoUrl / .bio
export function useSpotlightProfiles() {
  const [profileMap, setProfileMap] = useState<Map<number, NormalizedProfile>>(new Map());

  useEffect(() => {
    fetch(PROFILES_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ data: ApiProfile[] }>;
      })
      .then(json => {
        const map = new Map<number, NormalizedProfile>();
        for (const p of json.data) {
          if (isTestUser(p)) continue;      // skip internal accounts
          const profile = normalise(p);
          map.set(profile.uid, profile);
        }
        setProfileMap(map);
      })
      .catch(err => {
        // Silent fallback — data.ts photos and bios remain in use
        console.warn('[useSpotlightProfiles/COH] fetch failed, using static data:', err);
      });
  }, []);

  return { profileMap };
}
