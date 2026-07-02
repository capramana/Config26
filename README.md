# Config26

Conference memento: guestbook viewer and submission flow. Uses the **same Supabase project** as chrispyOS — existing entries, drawings, and avatars are shared; nothing is migrated or duplicated.

## Setup

1. Copy env vars from chrispyOS (or Supabase dashboard):

   ```bash
   cp .env.example .env.local
   # Fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (same values as chrispyOS)
   ```

2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (redirects to the guestbook).

## Routes

| Path | Purpose |
|------|---------|
| `/memento` | Leave your mark (drawing submission) |
| `/memento/book` | Guestbook |
| `/memento/confirm` | Post-submit confirmation |

## Deploy

Deploy to Vercel (or similar) and set the same `SUPABASE_*` env vars. Attach your subdomain (e.g. `memento.yourdomain.com`).

**Do not** run `npm run setup:memento` against production — the table and `memento-drawings` bucket already exist.

## Optional scripts

- `npm run prefetch:memento-avatars` — warm social avatar cache in Supabase storage
- `npm run setup:memento` — bootstrap SQL + bucket (new Supabase projects only)
