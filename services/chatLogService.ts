import { type ChatMessage } from '../types';

// In-memory store for conversations
const conversations: { [userId: string]: ChatMessage[] } = {
    'user01': [
        { sender: 'user', text: 'مرحباً، أود الاستفسار عن أسعار تصميم المتاجر الإلكترونية.', timestamp: Date.now() - 200000 },
        { sender: 'bot', text: 'أهلاً بك! أسعار تصميم المواقع تتراوح بين 149$ و 449$ حسب المتطلبات. بالنسبة للمتاجر الإلكترونية الكبيرة، نقدم حلولاً مخصصة. هل يمكنك تزويدي ببعض التفاصيل عن مشروعك؟', timestamp: Date.now() - 180000 },
    ],
    'user02': [
        { sender: 'user', text: 'هل تقدمون خدمة إعادة تصميم المواقع القديمة؟ موقعي الحالي بطيء جداً.', timestamp: Date.now() - 500000 },
        { sender: 'admin', text: 'مرحباً بك. نعم بكل تأكيد، إعادة تصميم المواقع وتحسين أدائها من ضمن خدماتنا الأساسية. يمكننا مساعدتك في ذلك.', timestamp: Date.now() - 480000 }
    ]
};

export const getConversation = (userId: string): ChatMessage[] => {
    return conversations[userId] || [];
};

export const addMessage = (userId: string, message: Omit<ChatMessage, 'timestamp'>): void => {
    if (!conversations[userId]) {
        conversations[userId] = [];
    }
    const newMessage: ChatMessage = { ...message, timestamp: Date.now() };
    conversations[userId].push(newMessage);
};

export const getAllConversations = (): { [userId: string]: ChatMessage[] } => {
    return conversations;
};
