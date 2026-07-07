# Memorable + Professional Pass: Design

Date: 2026-07-07
Status: Approved by Neric (direction confirmed in brainstorm; "research paper" framing rejected because the IEEE papers are EE-domain, not AI/ML)

## Goal

Make the portfolio memorable to recruiters without sacrificing the premium-minimal system. Identity anchor: engineer-who-ships, proven by AI/ML repos and verifiable signals. Publications remain present but are not the headline.

Grounding rule: every visible claim must trace to the resume, a repo README, or CLAUDE.md. No invented facts. No em dashes in copy.

Research basis: 98-portfolio sweep of emmabostian/developer-portfolios plus 8 craft-tier sites. Converging signals adopted: project status chips (4 independent hits), document-style section numbering (4 hits), recruiter-logistics-as-UI (4 hits), command palette (2 hits), plus single-hit craft details from rauno.me, samuelkraft.com, linusrogge.com, paco.me.

## Constraints

- Stack unchanged: React 19 + Vite 7 + Tailwind v4 tokens. No new dependencies.
- All motion CSS-driven, disabled under prefers-reduced-motion, and safe in hidden documents (content never starts invisible; see RevealOnScroll pattern).
- Two loaded font families stay (Inter, Space Grotesk). Mono comes from a system stack token, not a webfont.
- WCAG AA contrast; 44px tap targets; keyboard accessible.

## Components

### 1. Typography signature
- `--font-mono` token: `ui-monospace, 'Cascadia Code', Consolas, monospace`.
- Section markers become code-comment style: `01 //` (index in mono muted, `//` in accent green). Rendered by the existing `.section-index` element; no new component.
- Project cards get an oversized index numeral (display font, ~3.5rem, heading color at 8% opacity, top-right, aria-hidden, no layout shift, `group-hover` warms it to accent at 25% opacity via CSS transition).

### 2. Project status chips
One mono uppercase chip per project card, next to the category tag. Honest scheme:
- SHIPPED: live deployment exists (CareBase, Path Forward)
- ACTIVE: commits within the last two months (AgentRoom, updated Jul 2026)
- OPEN SOURCE: public repo, not deployed (NotaryGuard, Movie Recommender, Hand Gesture)
- RESEARCH: resume-anchored work without a public repo (Building Footprint, Solar PV Emulator)
Chip style: `.tag` base + mono font; SHIPPED/ACTIVE get accent border + accent text, others stay neutral.

### 3. Publications as citation rows
Replace the two publication cards with hairline-divided list rows: title (heading color, hover accent), then `IEEE Xplore · <year>` in muted, year right-aligned in mono tabular figures on desktop. Whole row remains a link to the existing IEEE URLs. No card chrome.

### 4. Recruiter spec row (Contact section)
A single mono line above the contact buttons:
`STATUS Open to Fall 2026 internships · BASE Tempe, AZ · FOCUS AI/ML & Software`
Labels in muted uppercase, values in text color. Facts: resume (Tempe, AZ) and current hero badge. No work-authorization claim (visa specifics not for me to guess).

### 5. GitHub contributions heatmap
`GitHubActivity` component under the Projects grid, above the "View all on GitHub" link.
- Client-side fetch of `https://github-contributions-api.jogruber.de/v4/neric-joel?y=last` on mount.
- Renders a 53x7 CSS-grid of 10px squares; buckets 0-4 map to line color then accent at 25/50/75/100% opacity.
- Caption: `<total> contributions in the last year` from the API response.
- Any fetch/parse failure renders nothing (component returns null). The page never depends on it.

### 6. Copy-email interaction
`CopyEmail` component: renders the email as a button; click copies via `navigator.clipboard.writeText` and swaps label to `Copied` for 1.5s (CSS fade, skipped under reduced motion). Clipboard failure falls back to `mailto:`. Used in the hero (under the name) and the Contact spec area.

### 7. Footer local time + Now block
- Contact footer credit line gains `Tempe, AZ · HH:MM MST`, from `Intl.DateTimeFormat` with `America/Phoenix`, updated by a 60s `setInterval` (interval timers run without rAF, so this is hidden-document safe).
- About section gains a bordered "Now" aside after the paragraphs, dated `Jul 2026`, three facts: TA'ing agentic AI at W. P. Carey (through Jul 2026), building AgentRoom, seeking Fall 2026 internships. Update cadence: manual, quarterly.

### 8. Command palette
`CommandPalette` component, no libs:
- Opens on Ctrl+K / Cmd+K, or via a visible `⌘K` hint button at the bottom of the sidebar (both desktop nav and mobile menu).
- Items: 7 nav sections, Resume view, Download resume PDF, GitHub, LinkedIn, Email.
- Text input filters items (case-insensitive substring). Arrow keys move selection, Enter activates, Escape closes, backdrop click closes. Focus moves into the input on open and returns to the trigger on close.
- Rendered as a fixed top-centered panel on the card surface. No entrance animation: it appears instantly, matching the mobile menu and chat panel (entrance animations freeze content invisible in hidden-flagged webviews).
- role="dialog" aria-modal, listbox semantics for options.

## Data flow and errors

All content stays hard-coded in components (matches existing architecture). The only network call is the heatmap fetch: wrapped in try/catch, aborts on unmount, null render on any failure. Clipboard call guarded with fallback. No other runtime dependencies.

## Testing

- Build + lint clean.
- Preview checks: chips render per scheme, citation rows link correctly, spec row text exact, palette opens/filters/navigates/closes (DOM-driven test), copy button swaps state, heatmap renders or disappears gracefully (test by pointing fetch at an invalid host in a manual check), no horizontal scroll 375/768/1024/1440, zero console errors, no invisible content in hidden documents.
- Link check: all external URLs return 200.

## Out of scope

Work-authorization line, peer quotes and closing personal line (need facts only Neric can supply), SVG pipeline diagrams and Recruiter Mode (Approach C, possible follow-up), custom domain.
