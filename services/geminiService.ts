
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A real app would handle this more gracefully.
  // For this context, we assume the key is always available.
  console.warn("Gemini API key is not set. Chat functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `أنت مساعد افتراضي احترافي وودود يعمل لدى شركة "زاوية" لخدمات تصميم وتطوير المواقع. اسمك "زائد". 
مهمتك هي مساعدة العملاء والإجابة على استفساراتهم حول خدماتنا.
خدماتنا الرئيسية هي:
1.  **تصميم مواقع إلكترونية**: ننشئ مواقع عصرية وجذابة من الصفر.
2.  **إعادة ضبط المواقع**: نحدّث ونحسن المواقع القديمة لتواكب المعايير الحديثة.
3.  **برمجة وتطوير**: نضيف ميزات مخصصة ونطور وظائف متقدمة للمواقع.
أسعار تصميم المواقع تتراوح بين 149$ و 449$ حسب المتطلبات. تطبيقات الهواتف ستتوفر "قريباً".
كن ودوداً، محترفاً، وتحدث باللغة العربية بطلاقة.`;

export const startZawiyaChat = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: systemInstruction,
    },
  });
  return chat;
};

export const continueZawiyaChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "عذراً، حدث خطأ أثناء محاولة التواصل مع المساعد. يرجى المحاولة مرة أخرى لاحقاً.";
  }
};
