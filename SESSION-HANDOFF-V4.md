# SESSION HANDOFF V4
**Date:** 2026-05-21
**Repo:** spotlight-series-microsite-coh
**Live sites:**
- UChicago v5: https://askit-inc.github.io/spotlight-series-microsite/#/spotlight-v5
- COH v1: https://askit-inc.github.io/spotlight-series-microsite/#/spotlight/coh/v1

---

## What Was Done This Session

### COH v1 — `/#/spotlight/coh/v1`

All changes in `src/app/components/spotlight-coh/`.

#### data.ts — Provider Cards
**Rule established (do not break this again):**
- `specialty` field = short clinical domain tags separated by `·` — renders on card face with `whiteSpace: nowrap` + `textOverflow: ellipsis`. Max ~4 tags. Never sentences.
- `bio` field = who the person is (training, role, institution, expertise). NOT what session they present. Renders in "View more" modal.
- `title` field = official role at institution. Short, factual.

**Final specialty lines:**
```
Rosenzweig:   Hematology & Oncology · Multiple Myeloma · Amyloidosis Program Director
Lisa Lee:     Hematology & Oncology · Multiple Myeloma · Precision Medicine
Sarah Lee:    Hematology & Oncology · Plasma Cell Disorders · Multiple Myeloma
Jamal:        Cardiology · Cardiac Amyloidosis · Heart Failure · Cardiac Imaging
Kovacsovics:  Hematology & Oncology · Acute Leukemia · Stem Cell Transplantation
```

**Final titles:**
```
Rosenzweig:   Chief, Division of Multiple Myeloma · Director, COH Amyloidosis Program
Lisa Lee:     Associate Clinical Professor, Hematology & Hematopoietic Cell Transplantation
Sarah Lee:    Assistant Clinical Professor, Division of Multiple Myeloma · Hematology & HCT
Jamal:        Chief, Division of Cardiology · Director, Echocardiography Laboratory
Kovacsovics:  Chief of Hematology · Medical Director of Leukemia, COH Phoenix
```

**Bios sourced from:** `cityofhope.org/patients/find-a-doctor/[name]` (not the /research/ paths, those 404).
Note: WebFetch blocked for cityofhope.org — use Claude in Chrome (`navigate` + `get_page_text`) to fetch these pages.

#### OverviewSection.tsx
- About the Program accordion: `useState(true)` — **open by default**
- About text replaced with real COH LA program content: dedicated outpatient clinic, Congo Red staining, Mayo Clinic subtyping partnership, NCCN founding member, US News Top 10 cancer hospital 2025–26

#### HighlightsSection.tsx
- Section label: "Program Highlights" → **"July Session Topics"**

#### All 5 COH components (contrast fix)
- `#9CA3AF` → `#4B5563` across all body/subtext (15 occurrences via sed)
- Files: HighlightsSection.tsx, TeamSection.tsx, SessionsSidebar.tsx, TrialsSection.tsx, OverviewSection.tsx

---

### UChicago v5 — `/#/spotlight-v5`

#### spotlight/data.ts
- **Deleted** the "When to Consider Kidney Transplantation" session (Dr. Beatrice Concepcion, TBD swing date) — client confirmed this session is not proceeding

---

## Current Git State

Last 5 commits on main:
```
59ccd07 coh v1: revert specialty to short tags matching UChicago pattern
065606c coh v1: specialty lines → human sentences; remove kidney session UChicago
6ee5d7e coh v1: rewrite all 5 provider titles, specialties, bios from real COH profile pages
44a4e46 coh v1: rewrite all 5 provider bios — who they are, not what they present
c1b8bd9 coh v1: replace generic About text with real LA program differentiators
```

Both live sites verified after push: all changes reflected.

**Git lockfile issue:** The sandbox cannot push due to macOS mount permissions on `.git/HEAD.lock` / `.git/index.lock`. If this recurs, Sukh must run from his terminal:
```bash
rm -f .git/HEAD.lock .git/index.lock && git push
```

---

## File Map

```
src/app/components/
├── spotlight-coh/          ← COH v1 (/#/spotlight/coh/v1)
│   ├── data.ts             ← providers, support staff, sessions, trials
│   ├── HeroSection.tsx
│   ├── HighlightsSection.tsx
│   ├── OverviewSection.tsx ← About accordion (open by default)
│   ├── SessionsSidebar.tsx
│   ├── TeamSection.tsx     ← compact cards + bio modal + support staff grid
│   └── TrialsSection.tsx
├── spotlight/              ← UChicago v1 (legacy, not primary)
│   └── data.ts             ← kidney session removed
├── spotlight-v5/           ← UChicago v5 (/#/spotlight-v5) — ACTIVE
│   └── data.ts
└── routes.tsx              ← hash router config
```

---

## Design System Notes

**COH brand colours:**
- Primary teal: `#006E8E`
- Accent orange: `#F58220`
- Link blue: `#005EB8`
- Body text: `#000000`
- Subtext: `#4B5563` ← enforced this session (was #9CA3AF)
- Card bg: `var(--oav-card-bg)`
- Page bg: `var(--oav-page-bg)`
- Border: `var(--oav-border)`

**Font:** `gotham, sans-serif` (FONT constant in every component)

**Card face layout (TeamSection CompactCard):**
- 60px circle photo left
- Name (bold) + specialty (nowrap ellipsis) centre
- "View more" (underline link) + "Register" (teal pill) + "Watch video" (link) stacked right
- Specialty must stay short — CSS will truncate anything longer than one line

---

## Open / Pending Work (Prioritised)

### 🔴 URGENT — June 1 deadline

1. **June Wednesday promotional calendar — UChicago**
   - Printable, clinic-distribution format (PDF or print-ready HTML)
   - 5 Wednesday sessions: Jun 3, 10, 17, 24 + next Wednesday
   - Build UChicago format first, then replicate for COH July
   - Client said: "promotion starting June 1 for them"

2. **Individual session promo cards — UChicago June**
   - One card per session for social/email/print
   - Design spec exists: `PROMO-CARD-DESIGN-SPEC.md` and `SPOTLIGHT_SERIES_PROMO_SPECS.md`

### 🟡 Active / In Progress

3. **June presenter emails — UChicago**
   - Registration confirmation emails, presenter guides, session links
   - Must reflect Wednesday cadence (not Tuesday — sessions moved)
   - Status: not started

4. **May 27 session — Donnie Dietz**
   - Promo card for Bridge outstanding — overdue
   - Need: photo, bio, promo card
   - Session: "90-Minute Extended Session: TTR Inheritance, Genetic Testing & ACT-EARLY Trial"
   - Presenter: Rachel Campagna, MS, CGC & Donnie Dietz

### 🟢 Backlog

5. **COH support staff contact information**
   - 7 staff members in `spotlight-coh/data.ts` SupportStaff array
   - Need: email, phone, or booking link per person

6. **Register button wiring**
   - COH SessionsSidebar "Register" buttons and card CTAs currently point nowhere
   - Need registration URLs from COH (Zoom/Webex links per session)

7. **"Watch video" CTA**
   - COH: `hasVideo: false` for all 5 clinicians (no video content yet)
   - UChicago v5: some have `hasVideo: true` but `videoUrl` not populated in all cases
   - Need actual video URLs before these buttons go live

8. **Backup plan — June best-practice sessions**
   - Referenced in prior sessions but not scoped

9. **COH July promotional calendar**
   - Same format as UChicago June calendar (item 1 above) — do after UChicago version is approved

---

## Emails Sent This Session

- **To: Stacey** — Summary of COH v1 changes, apology for iteration confusion, both live URLs included
  - File: `stacey-update.eml` in repo root
  - Signed as Sukh

---

## Key Decisions Made

| Decision | Rationale |
|---|---|
| Specialty = short domain tags only | CSS `nowrap` + ellipsis on card face — sentences get cut off |
| Bio = who the doctor is, not what they present | Stacey feedback: viewers need to know who this person is |
| About accordion open by default | Visibility — program description was being missed |
| Kidney session removed (UChicago) | Client confirmed session not proceeding |
| COH bios sourced from /patients/find-a-doctor/ | /research/staff/ paths 404 on cityofhope.org |
| WebFetch blocked for cityofhope.org | Use Claude in Chrome for any future COH page fetches |

---

## Next Session — Suggested Start

1. Confirm: build the UChicago June promotional calendar (print/PDF format)?
2. Check: does `PROMO-CARD-DESIGN-SPEC.md` have everything needed, or are there missing assets?
3. Build calendar → get Sukh approval → replicate for COH July
