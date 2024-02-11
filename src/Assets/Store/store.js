import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import cartReducer from './cartSlice';
import sessionReducer from './sessionSlice';

export const store = configureStore({
    reducer: {
        data : dataReducer,
        cart : cartReducer,
        session : sessionReducer
    }

});