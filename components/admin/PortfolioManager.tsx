import React, { useState, useEffect } from 'react';
import { type PortfolioItem } from '../../types';
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../services/portfolioService';

const PortfolioManager: React.FC = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Will store URL or base64 data for preview and submission

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        setItems(getPortfolioItems());
    };

    const openModal = (item: PortfolioItem | null = null) => {
        setCurrentItem(item);
        setTitle(item?.title || '');
        setImageUrl(item?.imageUrl || '');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setTitle('');
        setImageUrl('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا العنصر؟')) {
            deletePortfolioItem(id);
            loadItems();
        }
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImageUrl(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) {
            alert('يرجى رفع صورة للمشروع.');
            return;
        }

        if (currentItem) {
            updatePortfolioItem({ ...currentItem, title, imageUrl });
        } else {
            addPortfolioItem({ title, imageUrl });
        }
        loadItems();
        closeModal();
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">إدارة الأعمال السابقة</h2>
                <button onClick={() => openModal()} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">
                    إضافة عمل جديد
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-slate-700 rounded-lg overflow-hidden shadow-lg group relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-white font-bold truncate">{item.title}</h3>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-2">
                             <button onClick={() => openModal(item)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 text-xs">تعديل</button>
                             <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 text-xs">حذف</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">{currentItem ? 'تعديل العمل' : 'إضافة عمل جديد'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">عنوان العمل</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">صورة العمل</label>
                                <input 
                                    type="file" 
                                    onChange={handleImageChange} 
                                    accept="image/png, image/jpeg, image/gif" 
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer" 
                                />
                                {imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-400 mb-2">معاينة الصورة:</p>
                                        <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-md border border-slate-600" />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">إلغاء</button>
                                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">حفظ</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioManager;