import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store/store";

// interface state
export interface cartState {
  cartState: Array<any>;
}

// Initial state
const initialState: cartState = {
  cartState: [],
};

// slice para configurar como será guardado e utilizado o Array CartState
export const cartSlice = createSlice({
  //nome do slice para ser utilizado no Root reducers
  name: "cart",
  initialState,
  // Funções e suas logicas. O que o reducer é capaz de realizar, como se fosse uma Class
  reducers: {
    cartAddItem(state, action) {
      state.cartState.push(action.payload);
    },
    cartQtyItem(state, action) {
      const index = state.cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(action.payload.id);
      if (index > -1) {
        if (state.cartState[index].hasOwnProperty("qty")) {
          state.cartState[index].qty = Number(action.payload.qty);
        }
      }
    },
    cartIncrementItem(state, action) {
      const index = state.cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(action.payload.id);
      if (index > -1) {
        if (state.cartState[index].hasOwnProperty("qty")) {
          state.cartState[index].qty += Number(action.payload.qty);
        }
      }
    },

    cartDecrementItem(state, action) {
      const index = state.cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(action.payload.id);
      if (index > -1) {
        if (state.cartState[index].hasOwnProperty("qty")) {
          state.cartState[index].qty -= Number(action.payload.qty);
          if (state.cartState[index].qty <= 0) {
            state.cartState = state.cartState.filter(
              (el) => el.id !== action.payload.id
            );
          }
        }
      }
    },

    cartRemoveItem(state, action) {
      const index = state.cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(action.payload.id);

      if (index > -1) {
        state.cartState = state.cartState.filter(
          (el) => el.id !== action.payload.id
        );
      }
    },
    cartFixPrice(state, action) {
      const index = state.cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(action.payload.id);

      if (index > -1) {
        state.cartState[index].price = action.payload.Price;
      }
    },

    cartClear(state) {
      state.cartState = [];
    },
  },
  // ajuda a prevenir erros com hydrate!
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.cart,
  //     };
  //   },
  // },
});

// exportar as funções para poder utilizar com dispatch na aplicação
export const {
  cartAddItem,
  cartIncrementItem,
  cartDecrementItem,
  cartQtyItem,
  cartRemoveItem,
  cartFixPrice,
  cartClear,
} = cartSlice.actions;

export const selectCartState = (state: AppState) => state.cart.cartState;

export default cartSlice.reducer;
