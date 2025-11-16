import React from 'react';
import { Link } from 'react-router-dom';

const ServiceDetail: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-cyan-400 mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
);

const ServicesPage: React.FC = () => {
  return (
    <div className="py-12">
      <h1 className="text-5xl font-bold text-center mb-16 text-white">خدماتنا وأسعارنا</h1>

      <div className="space-y-8 mb-16">
          <ServiceDetail 
              title="تصميم وتطوير المواقع الإلكترونية"
              description="نحن في زاوية نؤمن بأن الموقع الإلكتروني هو الواجهة الرقمية لعملك. لذلك، نحرص على تصميم مواقع فريدة، سريعة، ومتجاوبة مع جميع الأجهزة. سواء كنت تحتاج إلى موقع تعريفي، متجر إلكتروني، أو مدونة، فإننا نقدم لك الحل الأمثل."
          />
          <ServiceDetail 
              title="إعادة ضبط وتحسين المواقع الحالية"
              description="إذا كان لديك موقع قديم لا يلبي طموحاتك، يمكننا إعادة الحياة إليه. نقوم بتحليل موقعك الحالي، تحديد نقاط الضعف، وإعادة تصميمه وبرمجته ليتوافق مع أحدث التقنيات والمعايير، مما يحسن من تجربة المستخدم وسرعة الموقع."
          />
          <ServiceDetail 
              title="برمجة مخصصة وتطوير الميزات"
              description="لديك فكرة لميزة معينة أو نظام خاص بموقعك؟ فريق المبرمجين لدينا جاهز لتحويل فكرتك إلى واقع. نطور أنظمة إدارة محتوى مخصصة، بوابات دفع، أنظمة حجز، وأي وظائف برمجية أخرى تحتاجها لتميز عملك."
          />
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">باقات الأسعار</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="p-4 text-lg font-semibold text-cyan-400">الباقة</th>
                <th className="p-4 text-lg font-semibold text-cyan-400">الوصف</th>
                <th className="p-4 text-lg font-semibold text-cyan-400">السعر</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-4 font-medium">موقع إلكتروني</td>
                <td className="p-4 text-gray-400">موقع تعريفي أو مدونة شخصية بتصميم عصري</td>
                <td className="p-4 font-bold text-orange-500 text-lg">$149 - $449</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-4 font-medium">تطبيق إلكتروني</td>
                <td className="p-4 text-gray-400">تطبيقات هواتف أصلية لمنصات iOS و Android</td>
                <td className="p-4 font-bold text-cyan-500">قريباً</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">حسب الطلب</td>
                <td className="p-4 text-gray-400">حلول مخصصة للمتاجر الإلكترونية والمشاريع الكبيرة</td>
                <td className="p-4 font-bold">تواصل معنا</td>
              </tr>
            </tbody>
          </table>
        </div>
         <div className="text-center mt-8">
            <Link to="/contact" className="bg-orange-600 text-white font-bold text-lg px-10 py-3 rounded-md hover:bg-orange-700 transition-transform duration-300 hover:scale-105">
                اطلب خدمتك الآن
            </Link>
         </div>
      </div>
    </div>
  );
};

export default ServicesPage;