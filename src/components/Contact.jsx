import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import signatureImg from '../assets/final_signature.png';

const Contact = () => {
    return (
        <section id="contact" className="py-10 pb-32 relative min-h-[60vh] flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold mb-8 text-white">
                    Let's Connect
                </h2>

                <p className="text-gray-400 mb-12 max-w-xl mx-auto text-sm">
                    Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
                </p>

                <div className="flex justify-center gap-8 mb-16">
                    <a
                        href="mailto:nericjoel07@gmail.com"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:scale-110 transition-all duration-300"
                        aria-label="Email"
                    >
                        <Mail size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="https://linkedin.com/in/neric-joel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:scale-110 transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="https://instagram.com/_.aju._07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:scale-110 transition-all duration-300"
                        aria-label="Instagram"
                    >
                        <Instagram size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                    </a>
                </div>

                <div className="flex flex-col items-center animate-fade-up">
                    <img
                        src={signatureImg}
                        alt="Signature"
                        className="h-16 md:h-20 opacity-90 filter grayscale brightness-200 contrast-200 mix-blend-screen"
                    />
                    <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                        Thanks for Visiting. Explore Around. Until Next Time.
                    </p>
                </div>
            </div>

            {/* Footer Text - Absolute Corner */}
            <div className="absolute bottom-4 left-4 md:left-8 flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <p className="text-base md:text-lg text-gray-400 font-medium">
                    You've reached the end. Wait! Really?
                </p>
            </div>
        </section>
    );
};

export default Contact;
