import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

const Resume = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-200 flex flex-col bg-bg">
            {/* Toolbar */}
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-bg px-6 py-3">
                <span className="font-display text-sm font-semibold tracking-wide text-heading">
                    Neric Joel — Résumé
                </span>
                <div className="flex items-center gap-2">
                    <a
                        href="/neric-resume.pdf"
                        download="Neric_Joel_Resume.pdf"
                        className="btn btn-primary px-4 py-2"
                    >
                        <Download size={14} aria-hidden="true" />
                        Download
                    </a>
                    <a
                        href="/neric-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary px-3 py-2"
                    >
                        <ExternalLink size={13} aria-hidden="true" />
                        Open
                    </a>
                    <button
                        onClick={onClose}
                        aria-label="Close resume"
                        className="btn btn-secondary h-11 w-11 justify-center p-0"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 overflow-hidden">
                <iframe
                    src="/neric-resume.pdf"
                    title="Neric Joel Resume"
                    className="h-full w-full border-none"
                />
            </div>
        </div>
    );
};

export default Resume;
