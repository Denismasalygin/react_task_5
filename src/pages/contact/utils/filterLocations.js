export function filterLocations(locations, search, city, sortBy) {
    const normalizedSearch = search.trim().toLowerCase();

    const result = locations.filter((location) => {
        const matchesSearch = [
            location.name,
            location.address,
            location.city,
            location.country,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesCity =
            city === 'all' || location.city === city;

        return matchesSearch && matchesCity;
    });

    if (sortBy === null) {
        return result;
    }

    return result.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, 'ru');

        return sortBy === 'asc' ? comparison : -comparison;
    });
}
