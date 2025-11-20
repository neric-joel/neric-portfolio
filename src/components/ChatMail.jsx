import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatMail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:nericjoel07@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
        setIsOpen(false);
        setMessage('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 rounded-full bg-white text-black shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl w-80 animate-fade-up">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold">Say Hi!</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-white/30 h-32 mb-4 resize-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-2 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Send size={16} />
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatMail;
