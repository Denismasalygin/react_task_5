import { configureStore } from '@reduxjs/toolkit';
import { locationsApi } from '../api/locationsApi.js';

export const store = configureStore({
    reducer: {
        [locationsApi.reducerPath]: locationsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(locationsApi.middleware),
});
