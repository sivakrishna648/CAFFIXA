// High-quality coffee images from Unsplash API
// First 3: Keep original
// Remaining 6: High-end coffee product photography, dark background, professional studio lighting, luxury branding
export const coffeeImages = {
    espresso: 'https://images.unsplash.com/photo-1610885112937-c686d40ce139?w=500&h=500&fit=crop&q=80',
    cappuccino: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop&q=80',
    mocha: 'https://images.unsplash.com/photo-1578365746664-e6b0aed4b96e?w=500&h=500&fit=crop&q=80',
    // High-end luxury coffee product photography with dark backgrounds and professional lighting
    americano: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=500&fit=crop&q=80',
    latte: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop&q=80',
    macchiato: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop&q=80',
    flatwhite: 'https://images.unsplash.com/photo-1559522215-cd4628902249?w=500&h=500&fit=crop&q=80',
    coldbrew: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop&q=80',
    cortado: 'https://images.unsplash.com/photo-15210174322fdfba7e46708663003b3a1d2bda47?w=500&h=500&fit=crop&q=80'
};

export const getImageUrl = (imageKey) => {
    return coffeeImages[imageKey] || 'https://via.placeholder.com/500x500?text=Coffee';
};
