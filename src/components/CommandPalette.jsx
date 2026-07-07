import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Home, User, Briefcase, Code, Award, BookOpen, Mail, FileText, Download, Github, Linkedin } from 'lucide-react';
import { scrollToId } from '../utils/scrollTo';

/* Keyboard-first navigation. Appears instantly (no entrance animation) so it
   can never be stuck invisible in hidden-flagged webviews. */
const CommandPalette = ({ open, onClose, toggleResume, showResume }) => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(0);
    const inputRef = useRef(null);

    const items = useMemo(() => [
        { label: 'Home',                Icon: Home,      run: () => scrollToId('hero') },
        { label: 'About',               Icon: User,      run: () => scrollToId('about') },
        { label: 'Experience',          Icon: Briefcase, run: () => scrollToId('experience') },
        { label: 'Skills',              Icon: Code,      run: () => scrollToId('skills') },
        { label: 'Projects',            Icon: Award,     run: () => scrollToId('projects') },
        { label: 'Publications',        Icon: BookOpen,  run: () => scrollToId('publications') },
        { label: 'Contact',             Icon: Mail,      run: () => scrollToId('contact') },
        { label: showResume ? 'Close resume' : 'View resume', Icon: FileText, run: () => toggleResume() },
        { label: 'Download resume PDF', Icon: Download,  run: () => { window.open('/neric-resume.pdf', '_blank', 'noopener'); } },
        { label: 'GitHub',              Icon: Github,    run: () => { window.open('https://github.com/neric-joel', '_blank', 'noopener'); } },
        { label: 'LinkedIn',            Icon: Linkedin,  run: () => { window.open('https://linkedin.com/in/neric-joel', '_blank', 'noopener'); } },
        { label: 'Email',               Icon: Mail,      run: () => { window.location.href = 'mailto:nericjoel07@gmail.com'; } },
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

    const activate = (item) => {
        onClose();
        item.run();
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelected(s => Math.min(s + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelected(s => Math.max(s - 1, 0));
        } else if (e.key === 'Enter' && filtered[selected]) {
            e.preventDefault();
            activate(filtered[selected]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
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
