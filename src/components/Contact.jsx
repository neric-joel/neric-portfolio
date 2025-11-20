import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">
                    <span className="border-b-2 border-electric-blue pb-2">Get In Touch</span>
                </h2>

                <div className="max-w-2xl mx-auto bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl p-10">
                    <p className="text-xl text-gray-300 mb-8">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
                        <a
                            href="mailto:nericjoel07@gmail.com"
                            className="flex items-center gap-2 text-electric-blue hover:text-white transition-colors"
                        >
                            <span className="font-bold">Email:</span> nericjoel07@gmail.com
                        </a>
                        <span className="hidden md:block text-gray-600">|</span>
                        <a
                            href="https://linkedin.com/in/neric-joel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            LinkedIn Profile
                        </a>
                    </div>

                    <p className="mt-8 text-gray-500 text-sm">
                        Tempe, AZ
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
