import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers:{
        addToCart(state,action){
            const newItem = action.payload
            // to check if item is already available
            const existingItem = state.itemsList.find((item)=>item.id === newItem.id)
            if(existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice+= newItem.price
            } else {
                state.itemsList.push({
                    id:newItem.id,
                    name:newItem.name,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price
                })
                state.totalQuantity++;
            }
        },
        removeFromCart(state,action){
            const removeItem = action.payload
            const existingItem = state.itemsList.find((item)=> item.id === removeItem.id)
            if(existingItem.quantity === 1 ) {
                state.itemsList = state.itemsList.filter((item)=> item.id !== removeItem.id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice-=existingItem.price
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;