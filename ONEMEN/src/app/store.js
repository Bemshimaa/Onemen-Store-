import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartslice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});