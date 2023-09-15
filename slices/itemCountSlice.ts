import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store/store";

export interface itemCountState {
  itemCountState: [
    {
      numberOfItems: number;
      priceOfItems: number;
      priceOfItemsWithIva: number,
    }
  ];
}

// Initial state
const initialState: itemCountState = {
  itemCountState: [
    {
      numberOfItems: 0,
      priceOfItems: 0,
      priceOfItemsWithIva: 0,
    },
  ],
};

// Actual Slice
export const itemCountSlice = createSlice({
  name: "itemCount",
  initialState,
  reducers: {
    // Action to set the authentication status
    setItemCountState(state, action) {
      let cont = 0;
      let priceTotal = 0;
      for (const iterator of action.payload) {
        cont += Number(iterator.qty);
        priceTotal += Number(iterator.qty * iterator.price);
      }

      state.itemCountState[0].numberOfItems = cont;
      state.itemCountState[0].priceOfItems = priceTotal;
      state.itemCountState[0].priceOfItemsWithIva = +(priceTotal + (priceTotal * 0.23)).toFixed(2);
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.itemCount,
  //     };
  //   },
  // },
});

export const { setItemCountState } = itemCountSlice.actions;

export const selectItemCountState = (state: AppState) =>
  state.itemCount.itemCountState;

export default itemCountSlice.reducer;
