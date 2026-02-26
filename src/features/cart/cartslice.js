import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/cart';

// ── Async Thunks ──────────────────────────────────────────

// Fetch all cart items from the backend
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Add an item to the cart (backend + store)
// Payload: { id, name, image, price, size }
export const addToCart = createAsyncThunk('cart/addToCart', async (item, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, {
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            size: item.size,
            quantity: 1,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Remove a specific size from a cart item
// Payload: { cartItemId, size }
export const removeSizeFromCart = createAsyncThunk('cart/removeSizeFromCart', async ({ cartItemId, size }, thunkAPI) => {
    try {
        const response = await axios.delete(`${API_URL}/${cartItemId}/size/${size}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Remove an entire product from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Increase quantity of a specific size within a cart item
// Payload: { cartItemId, size }
export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async ({ cartItemId, size }, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const item = state.cart.items.find((i) => i._id === cartItemId);
        const sizeEntry = item?.sizes?.find((s) => s.size === size);
        const newQty = (sizeEntry?.quantity || 0) + 1;

        const response = await axios.put(`${API_URL}/${cartItemId}/size`, {
            size,
            quantity: newQty,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Decrease quantity of a specific size within a cart item
// Payload: { cartItemId, size }
export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async ({ cartItemId, size }, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const item = state.cart.items.find((i) => i._id === cartItemId);
        const sizeEntry = item?.sizes?.find((s) => s.size === size);
        const currentQty = sizeEntry?.quantity || 0;

        if (currentQty <= 1) {
            // Remove this size entry (or entire item if last size)
            const response = await axios.delete(`${API_URL}/${cartItemId}/size/${size}`);
            return response.data;
        }

        const response = await axios.put(`${API_URL}/${cartItemId}/size`, {
            size,
            quantity: currentQty - 1,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// ── Helper: update or remove an item in the state ─────────
function applyCartResponse(state, payload) {
    if (payload.removed) {
        // Item was fully removed
        state.items = state.items.filter((item) => item._id !== payload._id);
    } else {
        // Item was updated — replace or add
        const index = state.items.findIndex((item) => item._id === payload._id);
        // Filter out any sizes with quantity <= 0
        const cleaned = { ...payload };
        if (cleaned.sizes) {
            cleaned.sizes = cleaned.sizes.filter((s) => s.quantity > 0);
        }
        if (cleaned.sizes && cleaned.sizes.length === 0) {
            // No sizes with quantity > 0 — remove from store
            if (index >= 0) state.items.splice(index, 1);
        } else if (index >= 0) {
            state.items[index] = cleaned;
        } else {
            state.items.push(cleaned);
        }
    }
}

// ── Slice ─────────────────────────────────────────────────

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ── Fetch Cart ──
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // ── Add to Cart ──
            .addCase(addToCart.fulfilled, (state, action) => {
                applyCartResponse(state, action.payload);
            })

            // ── Remove Size from Cart ──
            .addCase(removeSizeFromCart.fulfilled, (state, action) => {
                applyCartResponse(state, action.payload);
            })

            // ── Remove from Cart ──
            .addCase(removeFromCart.fulfilled, (state, action) => {
                applyCartResponse(state, action.payload);
            })

            // ── Increase Quantity ──
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                applyCartResponse(state, action.payload);
            })

            // ── Decrease Quantity ──
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                applyCartResponse(state, action.payload);
            });
    },
});

export default cartSlice.reducer;