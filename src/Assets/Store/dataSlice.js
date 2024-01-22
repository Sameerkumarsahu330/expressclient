import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: JSON.parse(localStorage.getItem('expressCachedData'))
}

export const dataSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.productData = action.payload;
        }
    }
});

export const {updateData} = dataSlice.actions;
export default dataSlice.reducer;