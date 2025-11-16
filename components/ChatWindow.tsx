import React, { useState, useEffect, useRef } from 'react';
import { type User, type ChatMessage } from '../types';
import { startZawiyaChat, continueZawiyaChat } from '../services/geminiService';
import { calculateAge } from '../utils/helpers';
import { type Chat } from "@google/genai";
import { getConversation, addMessage } from '../services/chatLogService';

interface ChatWindowProps {
  user: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const userAge = calculateAge(user.dob);

    useEffect(() => {
        const history = getConversation(user.id);
        if (history.length > 0) {
            setMessages(history);
        } else {
             const welcomeMessageText = `أهلاً بك ${user.fullName.split(' ')[0]} في دردشة الدعم الفني لـ "زاوية". كيف يمكنني مساعدتك اليوم؟`;
             const welcomeMessage: ChatMessage = { sender: 'bot', text: welcomeMessageText, timestamp: Date.now() };
             addMessage(user.id, { sender: 'bot', text: welcomeMessageText });
             setMessages([welcomeMessage]);
        }

        chatRef.current = startZawiyaChat();
    }, [user.id, user.fullName]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Omit<ChatMessage, 'timestamp'> = { sender: 'user', text: input };
        addMessage(user.id, userMessage);
        setMessages(prev => [...prev, { ...userMessage, timestamp: Date.now() }]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const botResponseText = await continueZawiyaChat(chatRef.current, currentInput);
        const botMessage: Omit<ChatMessage, 'timestamp'> = { sender: 'bot', text: botResponseText };
        addMessage(user.id, botMessage);
        setMessages(prev => [...prev, { ...botMessage, timestamp: Date.now() }]);
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-xl flex flex-col h-[70vh] max-h-[700px]">
            <div className="p-4 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white">محادثة مع الدعم الفني</h3>
                <p className="text-sm text-cyan-400">{user.fullName} (العمر: {userAge} سنة)</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {(msg.sender === 'bot' || msg.sender === 'admin') && <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">ز</div>}
                        <div className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl p-3 ${
                             msg.sender === 'user' ? 'bg-cyan-500 text-white rounded-br-none' :
                             msg.sender === 'admin' ? 'bg-slate-600 text-white rounded-bl-none' :
                             'bg-slate-700 text-white rounded-bl-none'
                        }`}>
                            <p className="text-sm text-right" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">{user.fullName.charAt(0)}</div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">ز</div>
                        <div className="max-w-xs rounded-2xl p-3 bg-slate-700 text-white rounded-bl-none">
                           <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-700">
                <form onSubmit={handleSendMessage} className="flex gap-2 flex-row-reverse">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        disabled={isLoading}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-2 px-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition text-right"
                    />
                    <button type="submit" disabled={isLoading} className="bg-cyan-600 text-white rounded-full p-3 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;