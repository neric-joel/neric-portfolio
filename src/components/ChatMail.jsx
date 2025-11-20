import React, { useState } from 'react';
import { Mail, X, Send } from 'lucide-react';

const ChatMail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Inquiry from Portfolio - ${formData.name}`;
        const body = encodeURIComponent(formData.message);
        window.location.href = `mailto:nericjoel07@gmail.com?subject=${subject}&body=${body}`;
        setIsOpen(false);
        setFormData({ name: '', message: '' });
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end print:hidden">
            {isOpen && (
                <div className="mb-4 w-80 bg-deep-space/90 backdrop-blur-xl border border-electric-blue/30 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)] overflow-hidden animate-fade-up">
                    <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-electric-blue font-bold">Send a Message</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Your Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-electric-blue focus:outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white h-24 resize-none focus:border-electric-blue focus:outline-none transition-colors"
                                placeholder="Hi Neric, I'd like to discuss..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-deep-space font-bold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Send size={16} /> Send Email
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-blue to-neon-green flex items-center justify-center text-deep-space shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-110 transition-transform"
            >
                {isOpen ? <X size={24} /> : <Mail size={24} />}
            </button>
        </div>
    );
};

export default ChatMail;
