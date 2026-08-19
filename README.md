# Kaushal Kumar — Portfolio

Editorial dark **instrument panel** for [Kaushal Kumar](https://linkedin.com/in/im-kaushal): NestJS API + Vite React (TypeScript), deployed together on **Vercel**. Contact form delivers to Gmail (or any inbox) via [Resend](https://resend.com).

Public email on the site: `work.kaushal@yahoo.com`. The form recipient is `CONTACT_TO_EMAIL` (set this to your Gmail).

## Repo layout

- `apps/web` — React 18 + Vite + Tailwind + Framer Motion
- `apps/api` — NestJS (`GET /api/health`, `POST /api/contact`)
- `apps/web/api/index.ts` — Vercel serverless entry (all `/api/*` requests rewrite here; catch-all filenames are Next.js-only)
- `apps/web/public/Kaushal_Kumar_Resume.pdf` — downloadable resume

## Local run

```bash
pnpm i
cp .env.example apps/api/.env   # then fill Resend keys if you want live mail
pnpm dev
```

- UI: http://localhost:5173 (proxies `/api` → Nest on `:3001`)
- API: http://localhost:3001/api/health

Other root scripts: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`.

Without Resend env vars, the form returns **503** (mailer not configured). Mailto / WhatsApp / LinkedIn / GitHub / Call still work.

## Environment variables

Copy from [`.env.example`](.env.example). Never commit `.env`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives the form (use Gmail) |
| `CONTACT_FROM_EMAIL` | Verified Resend from-address, or `Portfolio <onboarding@resend.dev>` for testing |
| `CONTACT_BCC_EMAIL` | Optional BCC (e.g. Yahoo) |
| `WEB_ORIGIN` | CORS origin (local Vite: `http://localhost:5173`) |
| `PORT` | Nest port (default `3001`) |

## Remaining steps: Resend → Gmail

1. Create a free account at [resend.com](https://resend.com) and copy an API key.
2. **Testing:** set `CONTACT_FROM_EMAIL` to `Portfolio <onboarding@resend.dev>`. Resend only delivers test mail to the email you signed up with.
3. **Production:** add and verify your domain in Resend, then use a from-address on that domain (e.g. `Portfolio <hello@yourdomain.com>`).
4. Set `CONTACT_TO_EMAIL` to your **Gmail** address. Messages show up like any other inbound mail (`Reply-To` is the visitor’s email).
5. Paste the same three keys into **Vercel → Project → Settings → Environment Variables** for Production and Preview.

## Remaining steps: GitHub → Vercel auto-deploy

Deploy is **Vercel Git integration**, not a custom GitHub deploy token.

1. Create a GitHub repo (e.g. `im-kaushal/portfolio`) and push `main`.
2. In [vercel.com](https://vercel.com), **Add New → Project** and import that repo (GitHub OAuth, one-time).
3. Framework preset can stay Other. Build command `pnpm build`, output `apps/web/dist`, install `pnpm install` (already in `vercel.json`).
4. Add the env vars above. Redeploy once.
5. Every push to `main` rebuilds production. Pull requests get preview URLs.

**GitHub Actions** (`.github/workflows/ci.yml`) run lint, typecheck, test, and build on PRs/pushes. They do not deploy.

## Custom domain: kausal.in

Project on Vercel: **portfolio-site-web** ([Domains settings](https://vercel.com/portfolio-28a5/portfolio-site-web/settings/domains)).

### 1. Add the domain in Vercel

1. Open **Settings → Domains** for the project above.
2. Add **`kausal.in`** and **`www.kausal.in`**.
3. Vercel will show the DNS records you need (copy them from the dashboard — they can differ slightly per account).

### 2. Configure DNS at your registrar

Where you bought **kausal.in** (GoDaddy, Namecheap, Google Domains, etc.), add:

| Type | Name | Value |
|---|---|---|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

If Vercel shows a different CNAME (e.g. `cname.vercel-dns-0.com`), use that instead.

DNS can take up to 48 hours; usually it is live within an hour. Vercel issues HTTPS automatically once DNS verifies.

### 3. Set production env on the custom domain

In Vercel → **Environment Variables**, set for **Production**:

```
WEB_ORIGIN=https://kausal.in,https://www.kausal.in
```

(Keep `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as well.)

### 4. Redeploy

After DNS verifies, trigger **Redeploy** on the latest production deployment so `WEB_ORIGIN` and the build apply to **kausal.in**.

> **Note:** Build output is the repo root `dist/` folder (copied from `apps/web/dist` during `pnpm build`). If deploy fails with “No Output Directory named dist”, clear any override in Vercel **Settings → General → Output Directory** so `vercel.json` applies, or set it explicitly to `dist`.

## Contact actions

- Form → `POST /api/contact` (validation, honeypot, IP rate limit 5 / 15 min) → Resend
- Email me → `mailto:work.kaushal@yahoo.com`
- WhatsApp → https://wa.me/919142043244
- LinkedIn / GitHub / Call (`tel:+919142043244`)

## Assets later

Headshot, cert scans, and project stills are **placeholders** (SVG seals / HUD frames). Drop files into `apps/web/public/` and point the components at them when ready.
