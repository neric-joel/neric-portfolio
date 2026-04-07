import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import signatureImg from '../assets/final_signature.png';

const Contact = () => {
    return (
        <section id="contact" className="py-20 pb-32 relative min-h-[60vh] flex flex-col justify-center bg-[var(--bg-primary)] transition-all duration-500">
            <div className="container mx-auto px-6 md:px-20 text-center">
                <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[var(--text-heading)] transition-colors duration-500">
                    Let's Connect
                </h2>

                <p className="text-[var(--text-muted)] mb-12 max-w-md mx-auto text-sm transition-colors duration-500">
                    Open to internships, new-grad roles, and research opportunities. Feel free to reach out.
                </p>

                <div className="flex justify-center gap-6 mb-16">
                    <a
                        href="mailto:naruljoe@asu.edu"
                        className="group flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)]/20 transition-all duration-300 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-color)]"
                        aria-label="Email"
                    >
                        <Mail size={18} />
                        <span>Email</span>
                    </a>

                    <a
                        href="https://linkedin.com/in/neric-joel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)]/20 transition-all duration-300 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-color)]"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                    </a>

                    <a
                        href="https://github.com/neric-joel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)]/20 transition-all duration-300 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-color)]"
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                        <span>GitHub</span>
                    </a>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={signatureImg}
                        alt="Neric Joel signature"
                        className="h-14 md:h-16 opacity-80 transition-all duration-500"
                        style={{
                            filter: 'var(--signature-filter)',
                            mixBlendMode: 'var(--signature-mix-blend)'
                        }}
                    />
                    <p className="text-[10px] text-[var(--text-muted)] mt-4 uppercase tracking-widest transition-colors duration-500">
                        Thanks for visiting · naruljoe@asu.edu
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
