// ─── Profiles API hook (COH) ──────────────────────────────────────────────────
// Fetches partner profiles for COH (indication=4, partner=12759).
// Follows the V5 pattern from spotlight-series-microsite/useSpotlightProfiles.ts.
//
// COH deviation: returns Map<uid, NormalizedProfile> (uid-keyed, not lastName-keyed)
// because two presenters share the last name "Lee" (Lisa Lee uid=277, Sarah Lee uid=279).
// Consumers look up via clinician.profileUid.
//
// Strips HTML bios; data.ts bios remain authoritative (Stacey-approved) — API
// bios are retained in the map for future use but NOT rendered in TeamSection.

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
  lastNameKey: string;  // lowercase trimmed last_name — retained for debugging
  bio: string;          // plain text, HTML stripped (not rendered — data.ts bios used instead)
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

function normalise(p: ApiProfile): NormalizedProfile {
  return {
    uid:         p.uid,
    lastNameKey: p.last_name.trim().toLowerCase(),
    bio:         stripHtml(p.bio),
    photoUrl:    p.photo_url,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// COH deviation: returns Map<uid, NormalizedProfile> (not Map<lastNameKey, ...>)
// Use: profileMap.get(clinician.profileUid)?.photoUrl
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
