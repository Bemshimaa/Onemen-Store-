import {createSlice} from '@reduxjs/toolkit'

const userInfo = localStorage.getItem("userInfo")
const savedCart = userInfo ? localStorage.getItem("cart") : null
const savedShippingAddress = userInfo ? localStorage.getItem("shippingAddress") : null
const savedCoupon = userInfo ? localStorage.getItem("coupon") : null

const initialState = {
    items: savedCart ? JSON.parse(savedCart) : [],
    shippingAddress: savedShippingAddress ? JSON.parse(savedShippingAddress) : {},
    coupon: savedCoupon ? JSON.parse(savedCoupon) : null,
};
const cartSlice =  createSlice({
    name: 'cart',
    initialState,
    reducers: {addToCart(state, action) {
        const existingItem = state.items.find((item) => item.id === action.payload.id)
        if (existingItem){
            existingItem.quantity += 1;
        }else {
            state.items.push({...action.payload, quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(state.items)); 
    },
    removeFromCart(state, action) {
        state.items = state.items.filter((item)  => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
    }, 
    increaseQuantity(state, action){
        const ITEMS = state.items.find((item) => item.id === action.payload)
        if (ITEMS){
            ITEMS.quantity += 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity(state, action) {
        const ITEMS = state.items.find((item) => item.id === action.payload)
        if (ITEMS && ITEMS.quantity > 1 ){
            ITEMS.quantity -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
    },
    saveShippingAddress(state, action) {
        state.shippingAddress = action.payload;
        localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
    },
    clearCart(state) {
        state.items = [];
        state.coupon = null;
        localStorage.removeItem("cart");
        localStorage.removeItem("coupon");
    },
    applyCoupon(state, action) {
        state.coupon = action.payload;
        localStorage.setItem("coupon", JSON.stringify(state.coupon));
    },
    removeCoupon(state) {
        state.coupon = null;
        localStorage.removeItem("coupon");
    }
} 
})
export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, saveShippingAddress, clearCart, applyCoupon, removeCoupon} = cartSlice.actions;
export default cartSlice.reducer;