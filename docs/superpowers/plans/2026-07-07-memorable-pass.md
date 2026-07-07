# Memorable + Professional Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the eight approved components from the 2026-07-07 design spec: typography signature, status chips, card numerals, citation rows, copy-email, recruiter spec row, Now aside, local time, GitHub heatmap, and command palette.

**Architecture:** All changes extend the existing token system in `src/index.css` and the existing section components. Two new components (`GitHubActivity`, `CommandPalette`, plus a small `CopyEmail`) follow the established pattern: self-contained JSX files under `src/components`, CSS-driven motion, visibility-gated, no new dependencies.

**Tech Stack:** React 19, Vite 7, Tailwind v4 (`@theme` tokens), system mono stack. No test framework exists in this repo; verification is `npm run build`, `npm run lint`, and DOM assertions against the dev server (the repo's established pattern).

---

### Task 1: Mono token + section marker signature

**Files:**
- Modify: `src/index.css` (tokens block ~line 7; `.section-index` rule)
- Modify: all six section components (marker markup)

- [ ] **Step 1: Add the mono font token** in the `@theme` block after `--font-display`:

```css
  --font-mono: ui-monospace, 'Cascadia Code', 'Segoe UI Mono', Consolas, monospace;
```

- [ ] **Step 2: Restyle `.section-index`** (replace existing rule):

```css
  .section-index {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--color-muted);
    margin-bottom: 0.625rem;
  }
  .section-index::after {
    content: ' //';
    color: var(--color-accent);
  }
```

- [ ] **Step 3: Verify** `npm run build` passes and, in the dev server, `document.querySelector('.section-index')` computed font-family contains "monospace" and `getComputedStyle(el, '::after').content` is `" //"`.

- [ ] **Step 4: Commit** `git add -A && git commit -m "Add mono token and code-comment section markers"`

### Task 2: Project status chips

**Files:**
- Modify: `src/components/Projects.jsx` (data + card header)
- Modify: `src/index.css` (chip variant)

- [ ] **Step 1: Add `.tag-mono` component class** in `@layer components`:

```css
  .tag-mono {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.625rem;
    font-weight: 600;
  }
```

- [ ] **Step 2: Add `status` to each project** in `Projects.jsx` per the spec scheme:
CareBase `"Shipped"`, Path Forward `"Shipped"`, AgentRoom `"Active"`, NotaryGuard `"Open Source"`, Building Footprint `"Research"`, Movie Recommender `"Open Source"`, Hand Gesture `"Open Source"`, Solar PV `"Research"`.

- [ ] **Step 3: Render the chip** in `ProjectCard` next to the category tag:

```jsx
<span className={`tag tag-mono ${['Shipped', 'Active'].includes(project.status) ? 'border-accent-line text-accent' : ''}`}>
    {project.status}
</span>
```

- [ ] **Step 4: Verify** dev server shows 8 chips; `[...document.querySelectorAll('#projects .tag-mono')].map(t => t.textContent)` equals the scheme.

- [ ] **Step 5: Commit** `git add -A && git commit -m "Add honest status chips to project cards"`

### Task 3: Oversized card index numerals

**Files:**
- Modify: `src/components/Projects.jsx` (card wrapper)

- [ ] **Step 1: Make the card a group with a numeral.** In `ProjectCard`, accept `index`, add `relative overflow-hidden group` to the card root, and insert before the header row:

```jsx
<span
    aria-hidden="true"
    className="font-display pointer-events-none absolute top-3 right-4 text-[3.5rem] leading-none font-bold text-heading opacity-[0.07] transition-all duration-200 select-none group-hover:text-accent group-hover:opacity-25"
>
    {String(index + 1).padStart(2, '0')}
</span>
```

Pass `index={i}` from the map. Add `relative z-10` to the header row so chips stay above the numeral.

- [ ] **Step 2: Verify** numerals 01-08 render top-right, no horizontal scroll, chips remain clickable/visible.

- [ ] **Step 3: Commit** `git add -A && git commit -m "Add oversized index numerals to project cards"`

### Task 4: Publications as citation rows

**Files:**
- Modify: `src/components/Publications.jsx`

- [ ] **Step 1: Replace the card grid** with hairline rows (keep data array unchanged):

```jsx
<div className="mt-12 divide-y divide-line border-y border-line">
    {papers.map((paper, idx) => (
        <RevealOnScroll key={paper.link} delay={idx * 0.06}>
            <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-col gap-1 py-5 no-underline md:flex-row md:items-baseline md:justify-between md:gap-6"
            >
                <span className="font-display text-base leading-snug font-semibold text-heading transition-colors duration-200 group-hover:text-accent">
                    {paper.title}
                </span>
                <span className="font-mono shrink-0 text-xs text-muted tabular-nums">
                    IEEE Xplore · {paper.date}
                </span>
            </a>
        </RevealOnScroll>
    ))}
</div>
```

Remove the now-unused `FileText`/`ExternalLink` imports if nothing else uses them.

- [ ] **Step 2: Verify** two rows render, both link to the existing IEEE URLs, lint passes (no unused imports).

- [ ] **Step 3: Commit** `git add -A && git commit -m "Restyle publications as citation rows"`

### Task 5: CopyEmail component

**Files:**
- Create: `src/components/CopyEmail.jsx`
- Modify: `src/components/Hero.jsx` (email line), `src/components/Contact.jsx` (footer line)

- [ ] **Step 1: Create the component:**

```jsx
import React, { useEffect, useRef, useState } from 'react';

const EMAIL = 'nericjoel07@gmail.com';

const CopyEmail = ({ className = '' }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <button
            onClick={copy}
            className={`cursor-pointer transition-colors duration-200 hover:text-accent ${className}`}
            aria-label={copied ? 'Email copied' : `Copy email address ${EMAIL}`}
        >
            {copied ? 'Copied' : EMAIL}
        </button>
    );
};

export default CopyEmail;
```

- [ ] **Step 2: Use it.** Hero: replace `<p className="mt-2 text-sm font-medium text-muted">nericjoel07@gmail.com</p>` with `<CopyEmail className="mt-2 block text-sm font-medium text-muted" />` (import it). Contact: in the footer line `Thanks for visiting · nericjoel07@gmail.com`, replace the address with `<CopyEmail className="tracking-widest uppercase" />` keeping surrounding text.

- [ ] **Step 3: Verify** clicking swaps text to "Copied" and back (assert via DOM click + 200ms/2s reads).

- [ ] **Step 4: Commit** `git add -A && git commit -m "Add click-to-copy email with Copied feedback"`

### Task 6: Recruiter spec row + footer local time (Contact)

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Spec row** above the contact buttons:

```jsx
<p className="font-mono mx-auto mb-10 max-w-xl text-xs leading-relaxed text-text">
    <span className="text-muted uppercase">Status</span> Open to Fall 2026 internships
    <span className="text-muted"> · </span>
    <span className="text-muted uppercase">Base</span> Tempe, AZ
    <span className="text-muted"> · </span>
    <span className="text-muted uppercase">Focus</span> AI/ML &amp; Software
</p>
```

- [ ] **Step 2: Local time.** Add to Contact:

```jsx
const useLocalTime = () => {
    const fmt = () => new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Phoenix',
    }).format(new Date());
    const [time, setTime] = useState(fmt);
    useEffect(() => {
        const id = setInterval(() => setTime(fmt()), 60000);
        return () => clearInterval(id);
    }, []);
    return time;
};
```

Render in the designed-by footer line: `Tempe, AZ · {time} MST · ` before "Designed & built". Convert `Contact` from an arrow-expression component to a function body so the hook can live inside. Import `useState`/`useEffect`.

- [ ] **Step 3: Verify** the row text matches the spec exactly and the time string matches `/^\d{2}:\d{2}$/`.

- [ ] **Step 4: Commit** `git add -A && git commit -m "Add recruiter spec row and local time to contact"`

### Task 7: Now aside (About)

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Insert after the two paragraphs**, inside the same RevealOnScroll:

```jsx
<div className="mt-8 max-w-3xl rounded-md border border-line border-l-2 border-l-accent bg-surface px-5 py-4">
    <p className="font-mono text-[10px] font-semibold tracking-widest text-muted uppercase">Now · Jul 2026</p>
    <p className="mt-2 text-sm leading-relaxed text-text">
        TA'ing agentic AI at W. P. Carey, building AgentRoom, and applying for Fall 2026 internships.
    </p>
</div>
```

- [ ] **Step 2: Verify** the aside renders with the accent left edge; facts trace to resume/repos.

- [ ] **Step 3: Commit** `git add -A && git commit -m "Add dated Now aside to About"`

### Task 8: GitHubActivity heatmap

**Files:**
- Create: `src/components/GitHubActivity.jsx`
- Modify: `src/components/Projects.jsx` (render above the GitHub link)

- [ ] **Step 1: Create the component:**

```jsx
import React, { useEffect, useState } from 'react';

const LEVEL_CLASSES = [
    'bg-line',
    'bg-accent opacity-25',
    'bg-accent opacity-50',
    'bg-accent opacity-75',
    'bg-accent',
];

const GitHubActivity = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const ctrl = new AbortController();
        fetch('https://github-contributions-api.jogruber.de/v4/neric-joel?y=last', { signal: ctrl.signal })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
            .then(json => {
                if (!Array.isArray(json?.contributions) || typeof json?.total?.lastYear !== 'number') {
                    throw new Error('unexpected shape');
                }
                setData(json);
            })
            .catch(() => {});
        return () => ctrl.abort();
    }, []);

    if (!data) return null;

    return (
        <figure className="mx-auto mt-12 w-fit max-w-full">
            <div className="max-w-full overflow-x-auto">
                <div className="grid w-fit grid-flow-col grid-rows-7 gap-[2px]">
                    {data.contributions.map(day => (
                        <span
                            key={day.date}
                            title={`${day.count} contributions on ${day.date}`}
                            className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_CLASSES[Math.min(day.level, 4)]}`}
                        />
                    ))}
                </div>
            </div>
            <figcaption className="font-mono mt-3 text-center text-xs text-muted">
                {data.total.lastYear.toLocaleString()} contributions in the last year
            </figcaption>
        </figure>
    );
};

export default GitHubActivity;
```

- [ ] **Step 2: Render it** in `Projects.jsx` between the grid and the "View all on GitHub" wrapper: `<GitHubActivity />` (import it).

- [ ] **Step 3: Verify** grid renders with a numeric caption on the dev server (network available), and the section renders fine with the component absent (blocked fetch renders null; confirm no console error).

- [ ] **Step 4: Commit** `git add -A && git commit -m "Add GitHub contributions heatmap"`

### Task 9: CommandPalette

**Files:**
- Create: `src/components/CommandPalette.jsx`
- Modify: `src/App.jsx` (mount + open state), `src/components/Sidebar.jsx` (hint buttons)

- [ ] **Step 1: Create the component:**

```jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Home, User, Briefcase, Code, Award, BookOpen, Mail, FileText, Download, Github, Linkedin } from 'lucide-react';
import { scrollToId } from '../utils/scrollTo';

const CommandPalette = ({ open, onClose, toggleResume, showResume }) => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(0);
    const inputRef = useRef(null);

    const items = useMemo(() => [
        { label: 'Home',            Icon: Home,      run: () => scrollToId('hero') },
        { label: 'About',           Icon: User,      run: () => scrollToId('about') },
        { label: 'Experience',      Icon: Briefcase, run: () => scrollToId('experience') },
        { label: 'Skills',          Icon: Code,      run: () => scrollToId('skills') },
        { label: 'Projects',        Icon: Award,     run: () => scrollToId('projects') },
        { label: 'Publications',    Icon: BookOpen,  run: () => scrollToId('publications') },
        { label: 'Contact',         Icon: Mail,      run: () => scrollToId('contact') },
        { label: showResume ? 'Close resume' : 'View resume', Icon: FileText, run: () => toggleResume() },
        { label: 'Download resume PDF', Icon: Download, run: () => { window.open('/neric-resume.pdf', '_blank', 'noopener'); } },
        { label: 'GitHub',          Icon: Github,   run: () => { window.open('https://github.com/neric-joel', '_blank', 'noopener'); } },
        { label: 'LinkedIn',        Icon: Linkedin, run: () => { window.open('https://linkedin.com/in/neric-joel', '_blank', 'noopener'); } },
        { label: 'Email',           Icon: Mail,     run: () => { window.location.href = 'mailto:nericjoel07@gmail.com'; } },
    ], [showResume, toggleResume]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? items.filter(i => i.label.toLowerCase().includes(q)) : items;
    }, [items, query]);

    useEffect(() => { setSelected(0); }, [query, open]);
    useEffect(() => {
        if (open) {
            setQuery('');
            inputRef.current?.focus();
        }
    }, [open]);

    if (!open) return null;

    const activate = (item) => { onClose(); item.run(); };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
        else if (e.key === 'Enter' && filtered[selected]) { e.preventDefault(); activate(filtered[selected]); }
        else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };

    return (
        <div className="fixed inset-0 z-300" role="dialog" aria-modal="true" aria-label="Command palette">
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} />
            <div className="card absolute top-24 left-1/2 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden p-0 shadow-card">
                <div className="flex items-center gap-2 border-b border-line px-4">
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Where to?"
                        className="min-h-12 w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="palette-list"
                    />
                    <kbd className="font-mono shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">esc</kbd>
                </div>
                <ul id="palette-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
                    {filtered.length === 0 && (
                        <li className="px-3 py-2 text-sm text-muted">No matches</li>
                    )}
                    {filtered.map((item, i) => (
                        <li key={item.label} role="option" aria-selected={i === selected}>
                            <button
                                onClick={() => activate(item)}
                                onMouseEnter={() => setSelected(i)}
                                className={`flex w-full min-h-10 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors duration-100 ${
                                    i === selected ? 'bg-accent-soft text-accent' : 'text-text'
                                }`}
                            >
                                <item.Icon size={14} aria-hidden="true" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommandPalette;
```

- [ ] **Step 2: Wire into App.** Add `paletteOpen` state; global keydown listener for Ctrl/Cmd+K (preventDefault, toggle); render `<CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} toggleResume={() => setShowResume(v => !v)} showResume={showResume} />` outside the resume conditional; pass `openPalette={() => setPaletteOpen(true)}` to `Sidebar`.

```jsx
useEffect(() => {
    const onKey = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            setPaletteOpen(v => !v);
        }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
}, []);
```

- [ ] **Step 3: Sidebar hint.** Below the Resume button in the desktop nav (and mobile menu), add:

```jsx
<button
    onClick={openPalette}
    className="mt-1 flex w-full min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium text-muted transition-colors duration-150 hover:bg-white/[0.04] hover:text-text"
    aria-label="Open command palette"
>
    <kbd className="font-mono rounded border border-line px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
    <span>Navigate</span>
</button>
```

(Mobile menu variant also calls `setMobileOpen(false)` first.)

- [ ] **Step 4: Verify** Ctrl+K opens, typing filters, ArrowDown+Enter navigates and closes, Escape closes, backdrop click closes, sidebar hint opens it.

- [ ] **Step 5: Commit** `git add -A && git commit -m "Add command palette with Ctrl+K and sidebar hint"`

### Task 10: Full verification and ship

- [ ] **Step 1:** `npm run build` then `npm run lint`; expect zero errors.
- [ ] **Step 2:** Preview sweep: all Task verifications above, plus no horizontal scroll at 375/768/1024/1440, zero console errors, no `opacity: 0` elements in `main` (hidden-document safety), skip link and reveals still work.
- [ ] **Step 3:** External link check returns 200 for all project links and the contributions API.
- [ ] **Step 4:** Push branch, open PR with spec + plan referenced, merge, poll the production bundle for `"Where to?"` (palette placeholder string) to confirm deploy.
