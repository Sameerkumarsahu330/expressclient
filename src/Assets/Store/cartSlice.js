import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cartData',
	initialState: {
		cartData: []
	},
	reducers: {
		addToCart: (state,action) => {
			const {ProductID,Quantity,ProductPrice} = action.payload;
			
			const existingProduct = state.cartData.find(product => product.ProductID === ProductID);

			if(existingProduct){
				existingProduct.Quantity += Quantity;
			}else{
				state.cartData.push({ProductID,Quantity,ProductPrice});
			}
		},
		updateQuantity: (state,action) => {
			const {updateType, ProductID} = action.payload;

			const existingProduct = state.cartData.find(product => product.ProductID === ProductID);
			
			if(existingProduct){
				if(updateType === 'increment') {
					existingProduct.Quantity++;
				}else if(updateType === 'decrement') {
					if(existingProduct.Quantity === 1){
						state.cartData = state.cartData.filter(p => p.ProductID !== ProductID);
					}else{
						existingProduct.Quantity--;
					}
				}
			}
		}
	}
});

export const {addToCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;