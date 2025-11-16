import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type Service, type Testimonial, type PortfolioItem } from '../types';
import StarRating from '../components/ui/StarRating';
import { getPortfolioItems } from '../services/portfolioService';

const services: Service[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'تصميم مواقع إلكترونية',
    description: 'نصمم لك واجهة عصرية وجذابة تعكس هوية مشروعك وتوفر أفضل تجربة للمستخدم.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-8v-2m-6 4H4m16 0h-2m-8 8a8 8 0 110-16 8 8 0 010 16z" />
      </svg>
    ),
    title: 'إعادة ضبط المواقع',
    description: 'نقوم بتحديث موقعك الحالي، تحسين أدائه، وجعله متوافقاً مع الأجهزة الحديثة.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    title: 'برمجة وتطوير',
    description: 'نطور حلولاً برمجية مخصصة ونضيف ميزات متقدمة لموقعك تلبي احتياجاتك الفريدة.',
  },
];

const testimonials: Testimonial[] = [
    { name: 'أحمد المصري', comment: 'فريق محترف وسريع في الإنجاز. الموقع الذي صمموه لي فاق توقعاتي!', rating: 5 },
    { name: 'فاطمة الزهراء', comment: 'تجربة رائعة وتعامل راقٍ. أنصح بشدة بخدمات زاوية.', rating: 5 },
    { name: 'خالد عبد الله', comment: 'قاموا بإعادة تصميم موقعي بالكامل وأصبح الآن أسرع وأجمل بكثير.', rating: 4 },
];

const HomePage: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setPortfolioItems(getPortfolioItems());
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-orange-500 pb-4">
          أهلاً بك في زاوية
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          شريكك المثالي لبناء حضورك الرقمي. نقدم حلولاً إبداعية في تصميم وبرمجة المواقع الإلكترونية.
        </p>
        <Link 
          to="/services" 
          className="mt-8 inline-block bg-orange-600 text-white font-bold text-lg px-8 py-3 rounded-md hover:bg-orange-700 transition-transform duration-300 hover:scale-105"
        >
          اكتشف خدماتنا
        </Link>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">خدماتنا</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-800 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">أعمالنا السابقة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
                 <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg group">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                     <div className="p-4">
                        <h3 className="text-white font-bold">{item.title}</h3>
                    </div>
                 </div>
            ))}
        </div>
        {portfolioItems.length === 0 && <p className="text-center mt-4 text-gray-400">سيتم رفع صور تصاميم المواقع قريباً...</p>}
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">آراء عملائنا</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg border-r-4 border-orange-500">
                    <StarRating rating={testimonial.rating} />
                    <p className="text-gray-300 my-4">"{testimonial.comment}"</p>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;