# INDUSTRYAI – Supabase backend setup

This folder prepares the database and access-control foundation for real company-profile submissions. The public website is currently hosted on GitHub Pages; GitHub Pages alone cannot run a private server or protect an admin route.

## What this backend separates

- `company_submissions`: private incoming submissions, including contact details and internal review notes.
- `industryai_admins`: explicit allowlist of administrator account IDs.
- `company_public_profiles`: public directory data only. It has no contact-person or contact-email columns.

The SQL enables Row Level Security (RLS). Anonymous visitors can insert a new submission with the initial status only. They cannot read submissions. Only authenticated user IDs explicitly listed in `industryai_admins` can read/review submissions or manage published profiles. Public visitors can read only rows in `company_public_profiles` where `is_published = true`.

## Setup – account owner action required

1. Create a Supabase project at https://supabase.com/.
2. In the Supabase SQL Editor, run `schema.sql`.
3. In Authentication → Users, create or invite the administrator account.
4. Copy that user's UUID. Replace the placeholder in the final bootstrap statement in the SQL file with the real UUID and run that INSERT once. Do not add other users as administrators unless intended.
5. In Project Settings → API, note the Project URL and the publishable/anon key. These are intended for browser use when protected by the RLS policies. **Never put the service-role key in website JavaScript, GitHub, or any public file.**
6. Keep the Project URL and publishable key private until we configure the frontend. They are not passwords, but should be configured deliberately.

## Applied in the current INDUSTRYAI project (2026-11-21)\n\nThe Supabase project `industryai-backend` now has the three tables, RLS policies, the initial administrator record, public profile content columns, and the hardened private admin helper. Migration 002 and migration 003 were applied through the Supabase connector. Keep this GitHub folder as the source-controlled record of the schema and migrations.\n\n## Not connected yet

The website code includes the Supabase submission flow, authenticated admin review, and public approved-profile directory. However, public intake is deliberately disabled in both the browser configuration and database grants/policies until the privacy notice, retention rules, and server-side anti-spam protection are complete. Do not collect real personal data yet.

Before switching the live workflow, the next implementation steps are:
- configure the public submission form to insert only into `company_submissions`;
- build an authenticated admin page using Supabase Auth;
- implement an explicit approve/publish action that copies approved public fields into `company_public_profiles`, without exposing contact details;
- update the public directory to read only published rows;
- test RLS using anonymous, normal authenticated, and admin accounts.

## Important operational note

The current schema is a starting point, not a complete production anti-spam system. Before accepting public traffic, add rate limiting / abuse protection (for example, an edge function plus CAPTCHA), email verification or a suitable contact verification step, backup/retention rules, and privacy-policy wording that matches the actual processing. Do not store real applicant/company contact data in the local browser review tool as a substitute for the central backend.
