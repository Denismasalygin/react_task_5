import { getShopPrice } from './shopHelpers.js';


export function filterAndSortShopItems(items, city, sortBy) {
    const result = items.filter(
        (item) => city === 'all' || item.city === city
    );

    if (sortBy === null) {
        return result;
    }

    return result.sort((a, b) => {
        const priceA = getShopPrice(a.id);
        const priceB = getShopPrice(b.id);

        return sortBy === 'asc'
            ? priceA - priceB
            : priceB - priceA;
    });
}

export function getShopMapLocations(items) {
    return items
        .filter(
            (item) =>
                Number.isFinite(item.lat) &&
                Number.isFinite(item.lng)
        )
        .map((item) => ({
            ...item,
            name: `Участок — ${item.city}`,
        }));
}
