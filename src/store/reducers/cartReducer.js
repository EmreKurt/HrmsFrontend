import { ADD_TO_FAVORİTE, DELETE_FROM_FAVORİTE } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_FAVORİTE:
      let advertisement = state.cartItems.find(
        (c) => c.advertisement.id === payload.id
      );
      if (advertisement) {
        advertisement.quantity++;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { quantity: 1, advertisement: payload },
          ],
        };
      }
    case DELETE_FROM_FAVORİTE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (c) => c.advertisement.id !== payload.id),
      };

    default:
      return state;
  }
}
