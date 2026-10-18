import { createSlice } from '@reduxjs/toolkit';

function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');

        if (!savedCart) return [];

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
        return [];
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCart(),
    },
    reducers: {
        addToCart(state, action) {
            const plot = action.payload;

            const alreadyInCart = state.items.some(
                (item) => item.id === plot.id
            );

            if (!alreadyInCart) {
                state.items.push(plot);
            }
        },

        removeFromCart(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
