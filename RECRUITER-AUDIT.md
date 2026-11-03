# Recruiter Audit — mohit-portfolio-five-tau.vercel.app

Reviewed as a tech recruiter screening a full-stack candidate (Nov 2026).
Benchmark: recruiters skim in seconds to ~1 minute; they want to know **who you are, what you can do, proof it works, and how to reach you** — fast.

Legend: 🔴 costs you interviews · 🟠 weakens the impression · 🟢 polish
Owner: **You** = needs your info · **Code** = I can fix it

---

## 1. Flow flaws (what happens when a recruiter actually uses the site)

| # | Flaw | Why it hurts | Fix | Owner |
|---|---|---|---|---|
| 🔴 1 | **No resume anywhere** (`/resume.pdf` → 404, button hidden) | First thing most recruiters look for; many forward a PDF, not a link | Add PDF; button already wired in | You |
| 🔴 2 | **Gap 2023 → 2026 on the timeline** | Graduated ~2023, then nothing until 2026 side projects. Recruiters read silence as unemployment | Add jobs / internships / freelance / training for 2023–26 | You |
| 🔴 3 | **Best project (Milk Garage) opens to a login wall** | Recruiter clicks, sees a sign-in form, leaves. Zero proof | Demo account, screenshots, or a 30-sec video on the site | You + Code |
| 🔴 4 | **IPO Ledger live demo is down** (`ipo-ledger.vercel.app` → 404) | We link to GitHub instead, but the repo's homepage field still points at the dead URL | Redeploy or remove the homepage link on GitHub | You |
| 🟠 5 | **Project links dump recruiters onto bare GitHub repos** | `Chat-app` README is Flutter boilerplate; `malicious-url-` and `ems-spring-assignment-3` have no README; names read as homework | Write short READMEs (what, why, stack, screenshot); rename repos | You |
| 🟠 6 | **Email is a bare `mailto:`** | On a work laptop without a mail app, clicking does nothing; there's no "copy" option | Add copy-to-clipboard with a "Copied" state | Code |
| 🟠 7 | **First visit waits ~1.6 s on the intro** before any content | Charming once, but a recruiter opening 40 tabs sees a counter, not you | Let a click/key skip it; keep the shorter repeat-visit version | Code |
| 🟢 8 | **No section for Skills / Journey in the nav** | Hard to jump to the timeline, which is where recruiters look | Add "Journey" link (or a compact menu on phones) | Code |

## 2. Content flaws (what the recruiter reads)

| # | Flaw | Fix | Owner |
|---|---|---|---|
| 🔴 9 | **Intent is unclear.** "Available for new projects" sounds freelance-only. Are you open to full-time? Remote? Which roles? | e.g. "Open to full-time full-stack roles · Remote / Delhi NCR" | You (Code to place it) |
| 🟠 10 | **Generic opener.** "Quiet, deliberate and alive" says nothing a recruiter can match to a job description | One concrete line: what you build + for whom + proof, e.g. "I ship full-stack products end-to-end — two live Supabase apps in production this year." | You + Code |
| 🟠 11 | **Projects have no role, decisions or results** | Each one needs: problem → what *you* did → stack → outcome (users, time saved, scale). Best two deserve full case-study pages | You + Code |
| 🟠 12 | **Gradient placeholders instead of screenshots** | Visual proof is the fastest signal on a portfolio | Send screenshots / screen recordings | You |
| 🟢 13 | **Skills list without evidence** | Tag each skill to the projects that use it, or show "used in" on hover | Code |
| 🟢 14 | **Instagram next to GitHub/LinkedIn** | Fine if it's professional; if it's personal, swap for X / Dev.to / LeetCode | You |
| 🟢 15 | **Footer "2026 © Edition"** reads as filler | Replace with "Last updated Nov 2026" or remove | Code |

## 3. Technical flaws (sharing, search, accessibility)

| # | Flaw | Why it hurts | Fix | Owner |
|---|---|---|---|---|
| 🔴 16 | **No share preview** (no `og:image` / Open Graph / Twitter tags) | When your link is pasted in LinkedIn, WhatsApp or Slack it shows a blank card | Generate a branded OG image + tags | Code |
| 🟠 17 | **Default Next.js favicon** | Looks unfinished in a row of tabs | Custom "M" monogram icon | Code |
| 🟠 18 | **Random Vercel URL** `mohit-portfolio-five-tau.vercel.app` | Hard to type, looks temporary; also a gmail with digits | Buy a domain (e.g. mohitkumarsingh.dev) + matching email | You |
| 🟠 19 | **Animated headings are labelled with `aria-label` on plain `<span>`s** while the visible letters are `aria-hidden` | ARIA doesn't allow labels on generic spans; some screen readers will read the name and hero as empty | Use visually-hidden real text instead | Code |
| 🟢 20 | **No `robots.txt` / `sitemap.xml`** | Slower to appear when someone Googles your name | Add both | Code |
| 🟢 21 | **No structured data** | Google can't show you as a "Person" with links | Add JSON-LD `Person` schema | Code |

---

## 4. What else top portfolios include (research)

- **2–3 deep case studies** over many shallow cards — problem, constraints, decisions/trade-offs, result, learnings.
- **Proof of real use** — live demos, user counts, before/after metrics, short Loom/video walkthroughs.
- **Visible activity** — GitHub contribution graph or "currently building" note; a recruiter survey cited 57% won't proceed with no online presence.
- **Writing** — 1–3 short posts (e.g. "How I built WhatsApp alerts with Supabase Edge Functions") show communication and depth.
- **Testimonials** — one line from a teammate, client or mentor.
- **"Now" section** — what you're learning/building this month; makes the site feel alive.
- **Clear call to action** — role you want + resume + one-click email.

---

## Suggested order

1. **You (30 min):** resume PDF, 2023–26 experience, what roles you want, screenshots of Milk Garage & IPO Ledger.
2. **Code (I can do now):** #6 copy email, #7 skippable intro, #8 nav, #15 footer, #16 OG image, #17 favicon, #19 accessibility, #20 robots/sitemap, #21 JSON-LD.
3. **Together:** rewrite opener (#10), case-study pages for the top 2 projects (#11).

### Sources
- [Hakia — Developer portfolio guide 2026](https://hakia.com/skills/building-portfolio/)
- [DevBio — What recruiters actually check](https://devbio.me/blogs/developer-portfolio-guide-2026)
- [Codeboards — Portfolio that gets you hired](https://codeboards.io/blog/developer-portfolio-guide-2026)
- [Reskilll — Developer hiring playbook 2026](https://blogs.reskilll.com/developer-hiring-playbook-what-companies-look-for-2026/)
- [Refactor Talent — Projects that impress](https://refactortalent.com/developer-portfolio-projects-that-impress/)
- [DEV — Portfolios rejected in 7 seconds](https://dev.to/zansuken/most-developer-portfolios-get-rejected-in-7-seconds-heres-what-i-learned-fixing-mine-280p)
- [UX Collective — 30 seconds to reject](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674)
- [DEV — Engineer portfolio roadmap](https://dev.to/therizwansaleem/building-a-modern-software-engineer-portfolio-a-practical-actionable-roadmap-4o7l)
- [Turning projects into case studies](https://sahad.is-a.dev/blog/turning-projects-into-case-studies)
- [Preloader guidance (hackmd)](https://hackmd.io/@0v3dd0K6RlCigDu3TpEC2Q/B1pAmHY3ee)
