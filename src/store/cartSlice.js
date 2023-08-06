import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cart') ? 
        JSON.parse( localStorage.getItem('cart')) :
        [],
    cartTotalQuantity: 0,
    cartTotalAmount:0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1
            }else{
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeCart(state, action){
            const nextCart = state.cartItems.filter(
                item => item.id !== action.payload.id
            )
            state.cartItems = nextCart
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
            }else if(state.cartItems[itemIndex].cartQuantity ===1){
                const nextCart = state.cartItems.filter(
                    item => item.id !== action.payload.id
                )
                state.cartItems = nextCart
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))

        },
        clearCart(state, action){
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        getTotal(state, action){
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const {price, cartQuantity} = cartItem
                    const itemTotal = price * cartQuantity

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal
                }, 
                {
                    total: 0,
                    quantity: 0
                })

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const {addToCart, removeCart, decreaseCart, clearCart, getTotal} = cartSlice.actions

export default cartSlice.reducer