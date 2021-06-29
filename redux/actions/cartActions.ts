export const ADD_TO_CART = "ADD_TO_CART";


export const addToCart = (phone : any) => {
  return {
    type: ADD_TO_CART,
    payload: phone
  }
}
