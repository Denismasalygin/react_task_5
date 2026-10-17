export function getCities(locations) {
    return [...new Set(
        locations
            .map((location) => location.city)
            .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, 'ru'));
}
