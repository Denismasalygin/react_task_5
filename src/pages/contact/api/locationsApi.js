import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const locationsApi = createApi({
    reducerPath: 'locationsApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/',
    }),

    endpoints: (builder) => ({
        getLocations: builder.query({
            query: () =>
                'users?limit=10&select=firstName,lastName,address,company',

            transformResponse: (data) =>
                data.users
                    .filter((user) => {
                        const coordinates = user.address?.coordinates;

                        return (
                            Number.isFinite(coordinates?.lat) &&
                            Number.isFinite(coordinates?.lng)
                        );
                    })
                    .map((user) => ({
                        id: user.id,
                        name:
                            user.company?.name ||
                            `${user.firstName} ${user.lastName}`,
                        address: user.address.address,
                        city: user.address.city,
                        country: user.address.country,
                        lat: user.address.coordinates.lat,
                        lng: user.address.coordinates.lng,
                    })),
        }),
    }),
});

export const {useGetLocationsQuery} = locationsApi;
