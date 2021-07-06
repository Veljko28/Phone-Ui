import { Phone } from "../../components/models/Phone";
import templateAction from "../../constants/templateAction";

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = ( payload: {item:  any
  , amount: number}) => ({
  type: ADD_TO_CART,
  payload
});
