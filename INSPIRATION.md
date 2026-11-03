# Portfolio — Inspiration Brief

Goal: a portfolio that feels like a **work of art** — minimal in layout, rich in motion. Framer-style animation: springy, physical, typographic, never noisy.

---

## 1. Reference sites to study

### Minimal + crafted (the "less, but perfect" school)
| Site | What to steal |
|---|---|
| **rauno.me** — Rauno Freiberg (Vercel design engineer) | Text-first layout, obsessive interaction details. Read his essay *"Invisible Details of Interaction Design"*. |
| **paco.me** — Paco Coursey | Near-empty page, tiny type, perfect spacing. Proves restraint *is* the design. |
| **emilkowal.ski** — Emil Kowalski | Design-engineer site; his writing on animation easing/duration is a cheat sheet. |
| **brittanychiang.com** | Dark, sticky-left / scrolling-right layout, spotlight cursor glow. Classic dev portfolio done right. |
| **Jack Jeznach** | Monochrome palette + one accent color, smooth transitions. |

### Motion-forward (the "Awwwards" school)
| Site | What to steal |
|---|---|
| **dennissnellenberg.com** | Magnetic buttons, curved page-transition wipe, smooth scroll, velocity-driven marquee. |
| **Patrick David** | Intro animation on landing, then scroll-driven sections. |
| **Hugo Baron** | Minimal but experimental — motion as identity. |
| **Pacôme Pertant** (Awwwards SOTD, Jun 2026) | Recent award-winning dev portfolio. |
| **Lydia Leiwang** (Awwwards SOTD, Jun 2026) | Recent award-winning personal portfolio. |
| **bruno-simon.com** | The extreme end (3D game). Not our direction, but shows "portfolio as art". |

### Framer templates (to see Framer-native motion)
- **Zolt** — dark-first, premium animations
- **Porteo**, **Jony**, **Mini Fini** — minimal, smooth transitions
- **Majd** — free, minimal & smooth

### Where to keep digging
- Awwwards → Websites → filter **Portfolio** + **Minimal**
- Codrops (tympanus.net/codrops) — tutorials for every effect below
- Godly.website, Siteinspire, Minimal.gallery, Land-book

---

## 2. Patterns that keep showing up

1. **Typography is the hero.** Oversized name/headline, often spanning the viewport. One great typeface carries the whole site.
2. **Monochrome + one accent.** Off-white (#F4F4EF-ish) or near-black, plus a single color used sparingly.
3. **Huge whitespace, strict grid.** Swiss-style alignment; nothing decorative.
4. **Motion with meaning.** Every animation explains something (entering, hierarchy, cause→effect), never just decoration.
5. **A signature moment.** One unforgettable interaction (intro sequence, cursor effect, hover reveal) — the rest stays quiet.
6. **Subtle texture.** Film grain / noise overlay to make flat colors feel physical.

---

## 3. Motion vocabulary (Framer-like)

| Effect | How it feels | How |
|---|---|---|
| **Masked line reveal** | Headline lines slide up from behind an invisible edge | Split text into lines, `overflow:hidden` wrapper, translateY 100% → 0, stagger ~0.06s |
| **Blur-in words** | Words fade from blur on scroll | `filter: blur(8px)`, opacity 0 → 1, per-word stagger |
| **Scroll-linked text brighten** | Paragraph lights up word-by-word as you read | `useScroll` + map progress to each word's opacity |
| **Intro / preloader** | Counter 0→100 or name assembles, then curtain lifts | Timeline animation, then page enters |
| **Page transitions** | Curved wipe or shared-element morph between pages | `AnimatePresence` + `layoutId` (FLIP) |
| **Magnetic buttons** | Buttons lean toward the cursor | Distance from center → proportional transform, spring back |
| **Custom cursor** | Small dot that grows/inverts over links & projects | `mix-blend-mode: difference`, spring-follow |
| **Hover image reveal** | Project list; hovering a row shows its image floating at cursor | Follows mouse with spring, clip-path in |
| **Smooth scroll** | Inertial, buttery scroll | Lenis |
| **Velocity marquee** | Infinite text band that speeds up/reverses with scroll | Scroll velocity → x offset |
| **Parallax images** | Images drift slower than the page | `useScroll` + `useTransform` |

### Feel rules (from design engineers)
- Use **springs** for interaction (stiffness ~300–400, damping ~30), **ease-out** curves for entrances: `cubic-bezier(0.22, 1, 0.36, 1)`.
- UI micro-interactions: **150–300 ms**. Hero / page transitions: **600–1000 ms**.
- Animate only `transform` and `opacity` (and `filter` sparingly) — keeps it 60fps.
- Respect `prefers-reduced-motion`.
- Animate once on reveal (`viewport: { once: true }`) — repeated animations get tiring.

---

## 4. Recommended stack

- **Next.js** (App Router) + **TypeScript**
- **Motion** (formerly Framer Motion) — the actual library behind Framer's animations
- **Lenis** — smooth scroll
- **Tailwind CSS** — fast, consistent spacing
- Optional: **GSAP SplitText** for advanced text splitting
- Deploy: **Vercel**

---

## 5. Proposed direction (draft)

**"Quiet gallery."** Off-white canvas, one serif or grotesk display face at huge size, film grain overlay, a single accent color.

- **Landing:** short intro — name assembles letter by letter, then slides into place. Big statement line with masked reveal.
- **Work:** a typographic list of projects; hover reveals the project image floating at the cursor. Click → shared-element transition into the case study.
- **About:** paragraph that brightens word-by-word as you scroll.
- **Contact:** giant email address with magnetic hover, velocity marquee above the footer.
- **Everywhere:** custom blend-mode cursor, Lenis scroll, springy micro-interactions.

---

### Sources
- [Colorlib — Developer portfolios 2026](https://colorlib.com/wp/developer-portfolios/)
- [Muzli — 100 best designer portfolios](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Elementor — Web developer portfolio examples](https://elementor.com/blog/best-web-developer-portfolio-examples/)
- [AdminLTE — React portfolio templates](https://adminlte.io/blog/react-portfolio-templates/)
- [Awwwards — website listings](https://www.awwwards.com/websites/%23F4F4EF/?page=2)
- [Framer — Zolt template](https://www.framer.com/marketplace/templates/zolt/)
- [Best Framer portfolio templates 2026](https://wannathis.one/blog/best-framer-portfolio-templates-2026)
- [Framer — Motion text reveal component](https://www.framer.com/marketplace/components/motion-text-reveal/)
- [Codrops — magnetic effects](https://tympanus.net/codrops/hub/tag/magnetic/)
- [Rauno Freiberg profile](https://yespress.io/rauno-freiberg.md)
- [Line25 — Web design trends 2026](https://line25.com/articles/web-design-trends-2026/)
- [StudioMeyer — Webdesign trends 2026](https://studiomeyer.io/en/blog/webdesign-trends-2026)
