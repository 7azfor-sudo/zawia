import { type PortfolioItem } from '../types';

// Mock database for portfolio items
const MOCK_PORTFOLIO_ITEMS: PortfolioItem[] = [
    { id: 'proj1', title: 'تصميم موقع شركة تقنية', imageUrl: 'https://picsum.photos/seed/10/600/400' },
    { id: 'proj2', title: 'متجر إلكتروني للملابس', imageUrl: 'https://picsum.photos/seed/11/600/400' },
    { id: 'proj3', title: 'مدونة شخصية للطهي', imageUrl: 'https://picsum.photos/seed/12/600/400' },
    { id: 'proj4', title: 'موقع تعريفي لمصور فوتوغرافي', imageUrl: 'https://picsum.photos/seed/13/600/400' },
    { id: 'proj5', title: 'منصة تعليمية عبر الإنترنت', imageUrl: 'https://picsum.photos/seed/14/600/400' },
    { id: 'proj6', title: 'موقع حجوزات فندقية', imageUrl: 'https://picsum.photos/seed/15/600/400' },
];

export const getPortfolioItems = (): PortfolioItem[] => {
    return [...MOCK_PORTFOLIO_ITEMS];
};

export const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>): PortfolioItem => {
    const newItem: PortfolioItem = { ...item, id: `proj${Date.now()}` };
    MOCK_PORTFOLIO_ITEMS.push(newItem);
    return newItem;
};

export const updatePortfolioItem = (updatedItem: PortfolioItem): PortfolioItem | undefined => {
    const index = MOCK_PORTFOLIO_ITEMS.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        MOCK_PORTFOLIO_ITEMS[index] = updatedItem;
        return updatedItem;
    }
    return undefined;
};

export const deletePortfolioItem = (id: string): boolean => {
    const index = MOCK_PORTFOLIO_ITEMS.findIndex(item => item.id === id);
    if (index !== -1) {
        MOCK_PORTFOLIO_ITEMS.splice(index, 1);
        return true;
    }
    return false;
};