import { ADD_TO_FAVORITE, DELETE_FROM_FAVORITE } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_FAVORITE:
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
    case DELETE_FROM_FAVORITE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (c) => c.advertisement.id !== payload.id
        ),
      };

    default:
      return state;
  }
}
