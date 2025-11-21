import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import signatureImg from '../assets/final_signature.png';

const Contact = () => {
    return (
        <section id="contact" className="py-10 pb-32 relative min-h-[60vh] flex flex-col justify-center bg-[var(--bg-primary)] transition-all duration-500">
            <div className="container mx-auto px-6 md:px-20 text-center">
                <h2 className="text-2xl md:text-3xl font-medium mb-8 text-[var(--text-heading)] transition-colors duration-500">
                    Let's Connect
                </h2>

                <p className="text-[var(--text-muted)] mb-12 max-w-xl mx-auto text-sm transition-colors duration-500">
                    Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
                </p>

                <div className="flex justify-center gap-8 mb-16">
                    <a
                        href="mailto:nericjoel07@gmail.com"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)] hover:scale-110 transition-all duration-500"
                        aria-label="Email"
                    >
                        <Mail size={24} className="text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-all duration-500" />
                    </a>

                    <a
                        href="https://linkedin.com/in/neric-joel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)] hover:scale-110 transition-all duration-500"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} className="text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-all duration-500" />
                    </a>

                    <a
                        href="https://instagram.com/_.aju._07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/20 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)] hover:scale-110 transition-all duration-500"
                        aria-label="Instagram"
                    >
                        <Instagram size={24} className="text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-all duration-500" />
                    </a>
                </div>

                <div className="flex flex-col items-center animate-fade-up">
                    <img
                        src={signatureImg}
                        alt="Signature"
                        className="h-16 md:h-20 opacity-90 transition-all duration-500"
                        style={{
                            filter: 'var(--signature-filter)',
                            mixBlendMode: 'var(--signature-mix-blend)'
                        }}
                    />
                    <p className="text-[10px] text-[var(--text-muted)] mt-4 uppercase tracking-widest transition-colors duration-500">
                        Thanks for Visiting. Explore Around. Until Next Time.
                    </p>
                </div>
            </div>

            {/* Footer Text - Absolute Corner */}
            <div className="absolute bottom-4 left-4 md:left-8 flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <p className="text-base md:text-lg text-[var(--text-muted)] font-medium transition-colors duration-500">
                    You've reached the end. Wait! Really?
                </p>
            </div>
        </section>
    );
};

export default Contact;
