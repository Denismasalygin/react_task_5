export function filterLocations(locations, search, city, sortBy) {
    const normalizedSearch = search.trim().toLowerCase();

    return locations
        .filter((location) => {
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
        })
        .sort((a, b) => {
            const result = a.name.localeCompare(b.name, 'ru');

            return sortBy === 'asc' ? result : -result;
        });
}
