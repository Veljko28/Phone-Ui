import Phone from "../../components/models/Phone";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";


export const addToCart = ( payload: Phone) => ({
  type: ADD_TO_CART,
  payload
});


export const removeFromCart = (payload: string) => ({
  type: REMOVE_FROM_CART,
  payload
})

export const clearCart = () => ({type: CLEAR_CART});