# Weekly Maintenance Report
**Date:** 2026-05-19
**Performed by:** Claude Code (automated)

---

## Automated Checks

| Check | Result |
|-------|--------|
| `npm run lint` (ESLint) | PASS — 0 warnings |
| `npx tsc --noEmit` (TypeScript) | PASS — 0 errors |
| `npm run build` (Next.js production) | PASS — clean build |

---

## Bugs Found & Fixed

### 1. `app/api/contact/route.ts` — Whitespace-only fields bypass validation
**Severity:** Medium  
**Problem:** `!name` passes for empty string but not for `"   "` (spaces-only). A user could submit a form with fields full of spaces and the API would call Resend with blank data.  
**Fix:** Added `.trim()` on all fields after parsing; type-guarded fields so non-string JSON values produce an empty string rather than an error.

### 2. `app/api/contact/route.ts` — No server-side email format validation
**Severity:** Medium  
**Problem:** The API only checked that `email` was truthy. A value like `"notanemail"` or `"@"` would pass and be forwarded to Resend, which would reject it server-side with an opaque error.  
**Fix:** Added `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` regex check; returns a clear 400 `"Invalid email address."` before calling Resend.

### 3. `components/ContactSection.tsx` — API error messages never shown to user
**Severity:** Medium  
**Problem:** On a non-OK response, the catch block always showed `"Something went wrong."` regardless of what the API said. Specific errors like `"Invalid email address."` or `"All fields are required."` were silently discarded.  
**Fix:** Parsed the response body's `error` field and surfaced it as the displayed error message.

### 4. `components/ContactSection.tsx` — Form inputs editable during submission
**Severity:** Low  
**Problem:** Only the Submit button was disabled during the loading state. Users could continue editing fields while the request was in-flight, potentially confusing the UX.  
**Fix:** Added `disabled={loading}` and `disabled:opacity-50` to all four inputs and the textarea.

### 5. `components/ContactSection.tsx` — No maxLength constraints on form inputs
**Severity:** Low  
**Problem:** No character limits meant a malicious user could submit arbitrarily large payloads, wasting Resend API quota and potentially tripping rate limits.  
**Fix:** Added `maxLength` to each field: Name (100), Email (254, per RFC 5321), Subject (150), Message (5000).

### 6. `components/Navbar.tsx` — Mobile hamburger button missing `aria-expanded`
**Severity:** Low (Accessibility)  
**Problem:** The toggle button had `aria-label="Toggle menu"` but no `aria-expanded`, so screen readers could not convey whether the mobile menu was open or closed.  
**Fix:** Added `aria-expanded={menuOpen}` to the button.

### 7. `components/ProjectsSection.tsx` — Meaningless `key` prop inside `ProjectCard`
**Severity:** Low (Code quality)  
**Problem:** `motion.div` inside `ProjectCard`'s return had `key={project.title}`. Keys only have meaning on elements returned directly from a `.map()` — React ignores them otherwise. This was confusing dead code.  
**Fix:** Removed the `key` prop from the inner `motion.div`.

### 8. `components/SkillsSection.tsx` — Double import from `framer-motion`
**Severity:** Low (Code quality)  
**Problem:** `motion` and `useInView` were imported on two separate lines from the same `"framer-motion"` package.  
**Fix:** Merged into a single import statement.

### 9. `package.json` — `clsx` and `tailwind-merge` installed but never used
**Severity:** Low (Dependency hygiene)  
**Problem:** Both packages were in `dependencies` but no file in the project ever imported either one. Dead weight in the bundle.  
**Fix:** Removed from `package.json` and uninstalled via `npm uninstall`.

### 10. `public/` — 5 unused Next.js scaffolding SVG files
**Severity:** Low (Repository hygiene)  
**Problem:** `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are default Next.js project scaffolding files. None are referenced anywhere in the codebase.  
**Fix:** Deleted all five files.

---

## Security Vulnerabilities Patched

| CVE / Advisory | Severity | Package | Fixed by |
|---|---|---|---|
| GHSA-q4gf-8mx6-v5v3 (DoS via Server Components) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-8h8q-6873-q5fj (DoS via Server Components) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-26hh-7cqf-hhc6 (Middleware/proxy bypass) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-3g8h-86w9-wvmq (Cache poisoning via redirects) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-ffhc-5mcf-pf4q (XSS via CSP nonces) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-vfv6-92ff-j949 (Cache poisoning via RSC) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-gx5p-jg67-6x7h (XSS via beforeInteractive scripts) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-mg66-mrh9-m8jx (DoS via Cache Components) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-h64f-5h5j-jqjh (DoS in Image Optimization API) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-c4j6-fc7j-m34r (SSRF via WebSocket upgrades) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-492v-c6pp-mqqv (Middleware bypass via route injection) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-wfc6-r584-vfw7 (Cache poisoning in RSC responses) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-267c-6grr-h53f (Middleware/proxy bypass via prefetch) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-36qx-fr4f-26g5 (Middleware bypass via i18n) | High | `next` | Upgraded `next` → 16.2.6 |
| GHSA-jxxr-4gwj-5jf2 (brace-expansion DoS) | Moderate | `brace-expansion` | Fixed via `npm audit fix` |
| `postcss` XSS in CSS stringify (GHSA-qx2v-qp2m-jg93) | Moderate | `postcss` (Next.js-internal) | **CANNOT FIX** — bundled inside Next.js internals; fixing requires Next.js to bump its own postcss version. No user code is exposed. |

---

## Known Remaining Issues (Not Fixed)

### Rate limiting on `/api/contact`
The contact form endpoint has no rate limiting. A bad actor could spam it in a loop and exhaust Resend quota. **Recommended fix:** Add middleware-level rate limiting (e.g., via Upstash Redis + `@upstash/ratelimit`) once deployed to Vercel. This is outside the scope of a static-code maintenance pass.

### No OG image / social preview
`app/layout.tsx` has `metadataBase` and `openGraph` metadata but no actual `og:image`. Links shared on Twitter/LinkedIn will appear with no thumbnail. **Recommended fix:** Add an `opengraph-image.tsx` file or a static `opengraph-image.png` in the `/app` folder.

---

## Package Update Summary

| Package | Before | After | Notes |
|---------|--------|-------|-------|
| `next` | 16.2.2 | **16.2.6** | Security patch — multiple high CVEs |
| `eslint-config-next` | 16.2.2 | **16.2.6** | Matched next version |
| `brace-expansion` (transitive) | 5.0.2 | **5.0.6** | Moderate DoS fix |
| `clsx` | 2.1.1 | **removed** | Unused dependency |
| `tailwind-merge` | 3.5.0 | **removed** | Unused dependency |

Minor updates left for next cycle (non-security): framer-motion, lucide-react, resend, tailwindcss, @tailwindcss/postcss, @types packages.

---

## Files Changed This Session

| File | Change |
|------|--------|
| `app/api/contact/route.ts` | Trim inputs, type-guard fields, add email regex validation |
| `components/ContactSection.tsx` | Surface API errors, add maxLength, disable inputs while loading |
| `components/Navbar.tsx` | Add `aria-expanded` to mobile toggle button |
| `components/ProjectsSection.tsx` | Remove meaningless `key` prop inside ProjectCard |
| `components/SkillsSection.tsx` | Consolidate double framer-motion import |
| `package.json` | Remove clsx + tailwind-merge; upgrade next + eslint-config-next |
| `package-lock.json` | Updated by npm |
| `public/file.svg` | Deleted (unused scaffolding) |
| `public/globe.svg` | Deleted (unused scaffolding) |
| `public/next.svg` | Deleted (unused scaffolding) |
| `public/vercel.svg` | Deleted (unused scaffolding) |
| `public/window.svg` | Deleted (unused scaffolding) |
