import React, { useState, useEffect, useRef } from 'react';
import { type User, type ChatMessage } from '../../types';
import { getCustomerUsers } from '../../services/userService';
import { getAllConversations, addMessage, getConversation } from '../../services/chatLogService';
import { calculateAge } from '../../utils/helpers';

const ChatManager: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [conversations, setConversations] = useState<{ [userId: string]: ChatMessage[] }>({});
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
    const [adminInput, setAdminInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUsers(getCustomerUsers());
        setConversations(getAllConversations());
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setCurrentMessages(getConversation(selectedUser.id));
        } else {
            setCurrentMessages([]);
        }
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages]);


    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    const handleAdminSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminInput.trim() || !selectedUser) return;
        
        const newMessage: Omit<ChatMessage, 'timestamp'> = { sender: 'admin', text: adminInput };
        addMessage(selectedUser.id, newMessage);

        setCurrentMessages(prev => [...prev, { ...newMessage, timestamp: Date.now() }]);
        setAdminInput('');
    };
    
    const getLastMessage = (userId: string): ChatMessage | undefined => {
        const userConvo = conversations[userId] || getConversation(userId);
        if (!userConvo || userConvo.length === 0) return undefined;
        return userConvo[userConvo.length - 1];
    }

    return (
        <div className="flex flex-row-reverse h-[75vh] bg-slate-800 rounded-lg shadow-xl overflow-hidden">
            <div className="w-1/3 border-r border-slate-700 overflow-y-auto">
                <h2 className="text-xl font-bold p-4 border-b border-slate-700 text-white text-right">محادثات العملاء</h2>
                <ul>
                    {users.map(user => {
                        const lastMessage = getLastMessage(user.id);
                        return (
                            <li key={user.id} 
                                onClick={() => handleSelectUser(user)}
                                className={`p-4 cursor-pointer hover:bg-slate-700 border-b border-slate-700 text-right ${selectedUser?.id === user.id ? 'bg-cyan-900' : ''}`}
                            >
                                <p className="font-bold text-white">{user.fullName}</p>
                                <p className="text-sm text-gray-400 truncate">
                                    {lastMessage?.text || 'لا توجد رسائل بعد'}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-slate-700 text-right">
                            <h3 className="text-lg font-bold text-white">{selectedUser.fullName}</h3>
                            <p className="text-sm text-cyan-400">
                                العمر: {calculateAge(selectedUser.dob)} | الهاتف: {selectedUser.phone} | البريد: {selectedUser.email}
                            </p>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                             {currentMessages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {(msg.sender === 'admin' || msg.sender === 'bot') && 
                                        <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">ز</div>
                                    }
                                    <div className={`max-w-xs md:max-w-md lg:max-w-xl rounded-2xl p-3 ${
                                        msg.sender === 'user' ? 'bg-slate-700 text-white rounded-br-none' :
                                        msg.sender === 'admin' ? 'bg-orange-500 text-white rounded-bl-none' :
                                        'bg-cyan-500 text-white rounded-bl-none' // bot
                                    }`}>
                                        <p className="text-sm text-right" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                    {msg.sender === 'user' && 
                                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">{selectedUser.fullName.charAt(0)}</div>
                                    }
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-slate-700">
                            <form onSubmit={handleAdminSendMessage} className="flex gap-2 flex-row-reverse">
                                <input
                                    type="text"
                                    value={adminInput}
                                    onChange={(e) => setAdminInput(e.target.value)}
                                    placeholder={`أرسل رداً إلى ${selectedUser.fullName}...`}
                                    className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-2 px-4 text-white focus:ring-2 focus:ring-orange-500 outline-none transition text-right"
                                />
                                <button type="submit" className="bg-orange-600 text-white rounded-full p-3 hover:bg-orange-700 transition-colors">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-lg">اختر محادثة من القائمة لعرضها</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatManager;
