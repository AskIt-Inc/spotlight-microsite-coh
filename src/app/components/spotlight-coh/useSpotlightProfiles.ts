// ─── Profiles API hook (COH) ──────────────────────────────────────────────────
// Fetches partner profiles for COH (amyloidosis + related indication filters).
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
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4,12362&partner=12759';

// ─── Raw API shape ────────────────────────────────────────────────────────────
export interface ApiProfile {
  uid: number;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  name_suffix?: string;
  title?: string;
  bio?: string;        // HTML — strip before use
  photo_url?: string;
  employer?: string;
  indication?: string;
  specialty_line_1?: string;
  specialty_line_2?: string;
  spotlight_card_tag?: string;
  field_first_name?: string;
  field_last_name?: string;
  field_name_suffix?: string;
  field_bio?: string;
  user_picture?: string;
  field_specialty_line_1?: string;
  field_specialty_line_2?: string;
}

// ─── Normalised shape ─────────────────────────────────────────────────────────
export interface NormalizedProfile {
  uid: number;
  displayName: string;    // first/last + comma-formatted suffix; title only when no suffix exists
  firstName: string;
  lastName: string;
  title: string;
  nameSuffix: string;
  lastNameKey: string;  // lowercase trimmed last_name — retained for debugging
  bio: string;          // plain text, HTML stripped
  photoUrl: string;
  specialtyLine1: string;
  specialtyLine2: string;
  spotlightCardTag: string;
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
  const firstName = getProfileField(p, 'first_name', 'field_first_name');
  const lastName = getProfileField(p, 'last_name', 'field_last_name');
  const combined = [p.display_name ?? '', firstName, lastName]
    .join(' ')
    .toLowerCase();
  return combined.includes('test');
}

function getProfileField(p: ApiProfile, normalizedKey: keyof ApiProfile, drupalKey: keyof ApiProfile): string {
  const value = p[drupalKey] || p[normalizedKey];
  return typeof value === 'string' ? value.replace(/\s{2,}/g, ' ').trim() : '';
}

function formatDisplayName(p: ApiProfile): string {
  const firstName = getProfileField(p, 'first_name', 'field_first_name');
  const lastName = getProfileField(p, 'last_name', 'field_last_name');
  const nameSuffix = normalizeCredentialSuffix(getProfileField(p, 'name_suffix', 'field_name_suffix'));
  const fullName = [firstName, lastName, nameSuffix].filter(Boolean).join(' ');

  if (fullName) return fullName;
  return (p.display_name ?? '').replace(/\s{2,}/g, ' ').trim();
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

function normalise(p: ApiProfile): NormalizedProfile {
  const firstName = getProfileField(p, 'first_name', 'field_first_name');
  const lastName = getProfileField(p, 'last_name', 'field_last_name');
  const bio = getProfileField(p, 'bio', 'field_bio');
  const photoUrl = getProfileField(p, 'photo_url', 'user_picture');
  const specialtyLine1 = getProfileField(p, 'specialty_line_1', 'field_specialty_line_1');
  const specialtyLine2 = getProfileField(p, 'specialty_line_2', 'field_specialty_line_2');

  return {
    uid:          p.uid,
    displayName:  formatDisplayName(p),
    firstName,
    lastName,
    title:        (p.title ?? '').trim(),
    nameSuffix:   normalizeCredentialSuffix(getProfileField(p, 'name_suffix', 'field_name_suffix')),
    lastNameKey:  lastName.toLowerCase(),
    bio:          stripHtml(bio),
    photoUrl,
    specialtyLine1,
    specialtyLine2,
    spotlightCardTag: (p.spotlight_card_tag ?? '').replace(/\s{2,}/g, ' ').trim(),
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
