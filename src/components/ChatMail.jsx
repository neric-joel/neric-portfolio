import React, { useState, useRef } from 'react';
import { X, Send, Terminal } from 'lucide-react';

const CHIPS = [
  { label: 'Working on something cool?', subject: 'Collaboration Idea', body: "Hey Neric, I'm working on something cool and thought you'd be a great fit. Let me tell you about it:" },
  { label: 'Open to collaborate?', subject: 'Collaboration Request', body: "Hey Neric, I came across your portfolio and would love to explore a collaboration. Here's what I have in mind:" },
  { label: 'Just saying hi', subject: 'Hey from your portfolio', body: "Hey Neric, just dropped by your portfolio and wanted to say hi!" },
];

const ChatMail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Portfolio Contact');
  const [activeChip, setActiveChip] = useState(null);
  const textareaRef = useRef(null);

  const handleChip = (chip, idx) => {
    setMessage(chip.body);
    setSubject(chip.subject);
    setActiveChip(idx);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    window.location.href = `mailto:naruljoe@asu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setIsOpen(false);
    setMessage('');
    setSubject('Portfolio Contact');
    setActiveChip(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage('');
    setSubject('Portfolio Contact');
    setActiveChip(null);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {isOpen ? (
          <div className="card w-75 p-5 shadow-card">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wider text-heading uppercase">
                  Drop a message
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close contact panel"
                className="flex cursor-pointer items-center p-1 text-muted transition-colors duration-150 hover:text-heading"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick reply chips */}
            <div className="mb-4 flex flex-col gap-1.5">
              {CHIPS.map((chip, idx) => (
                <button
                  key={chip.label}
                  onClick={() => handleChip(chip, idx)}
                  className={`cursor-pointer rounded-md border px-3 py-2 text-left text-xs transition-colors duration-150 ${
                    activeChip === idx
                      ? 'border-accent-line bg-accent-soft text-accent'
                      : 'border-line bg-transparent text-muted hover:border-accent-line hover:text-text'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Message form */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="chatmail-message" className="eyebrow mb-1.5 block">
                Your message
              </label>
              <textarea
                id="chatmail-message"
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                required
                rows={4}
                className="mb-3 block w-full resize-none rounded-md border border-line bg-bg px-3 py-2.5 text-sm leading-relaxed text-text transition-colors duration-150 placeholder:text-muted focus:border-accent-line"
              />
              <button type="submit" className="btn btn-primary w-full justify-center text-xs">
                <Send size={13} aria-hidden="true" />
                Send via email
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open contact widget"
            className="card card-hover flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full py-2.5 pr-4 pl-3"
          >
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-accent-line bg-accent-soft text-accent">
              <Terminal size={13} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap text-heading">
              say hello <span className="text-accent">→</span>
            </span>
          </button>
        )}
    </div>
  );
};

export default ChatMail;
