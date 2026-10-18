import { configureStore } from '@reduxjs/toolkit';
import { locationsApi } from '../api/locationsApi.js';
import cartReducer from './cartSlice.js';

export const store = configureStore({
    reducer: {
        [locationsApi.reducerPath]: locationsApi.reducer,
        cart: cartReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(locationsApi.middleware),
});

store.subscribe(() => {
    try {
        localStorage.setItem(
            'cart',
            JSON.stringify(store.getState().cart.items)
        );
    } catch (error) {
        console.error('Не удалось сохранить корзину:', error);
    }
});
