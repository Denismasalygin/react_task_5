const API_URL =
    'https://dummyjson.com/users?limit=10&select=firstName,lastName,address,company';

export async function fetchLocations() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Не удалось загрузить список локаций.');
    }

    const data = await response.json();

    return data.users
        .filter((user) => {
            const coordinates = user.address?.coordinates;

            return (
                Number.isFinite(coordinates?.lat) &&
                Number.isFinite(coordinates?.lng)
            );
        })
        .map((user) => ({
            id: user.id,
            name: user.company?.name || `${user.firstName} ${user.lastName}`,
            address: user.address.address,
            city: user.address.city,
            country: user.address.country,
            lat: user.address.coordinates.lat,
            lng: user.address.coordinates.lng,
        }));
}
