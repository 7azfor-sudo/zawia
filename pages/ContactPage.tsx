
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`شكراً لك، ${name}! تم إرسال رسالتك بنجاح وسنتواصل معك قريباً.`);
        setName('');
        setEmail('');
        setMessage('');
    };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-5xl font-bold text-center mb-4 text-white">تواصل معنا</h1>
      <p className="text-center text-gray-400 mb-12">
        هل لديك استفسار أو مشروع تود مناقشته؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك.
      </p>

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">رسالتك</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-12 rounded-md transition-transform duration-300 hover:scale-105"
            >
              إرسال الرسالة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
