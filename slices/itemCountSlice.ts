import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store/store";

export interface itemCountState {
  itemCountState: [
    {
      numberOfItems: number;
      priceOfItems: number;
      priceOfItemsWithIva: number;
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
      for (const iterator of action.payload.cartState) {
        cont += Number(iterator.qty);
        priceTotal += Number(iterator.qty * iterator.price);
      }

      state.itemCountState[0].numberOfItems = cont;
      state.itemCountState[0].priceOfItems = priceTotal;
      state.itemCountState[0].priceOfItemsWithIva = +(
        priceTotal *
        (1 + getRegion(action.payload.postalcode, "NORMAL"))
      ).toFixed(2);
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

function getRegion(cp: string, ivatype: string) {
  let IVA = 0;
  const cpsplit = cp.split("-");
  const tonumber = Number(cpsplit[0]);
  console.log(ivatype);
  if (tonumber >= 9000 && tonumber <= 9400) {
    IVA = ivatype === "NORMAL" ? 22 : ivatype === "INTERMEDIA" ? 12 : 5; //Madeira
  } else if (tonumber <= 9900 && tonumber > 9400) {
    IVA = ivatype === "NORMAL" ? 16 : ivatype === "INTERMEDIA" ? 9 : 4; // Açores
  } else if (1000 <= tonumber && tonumber < 9000) {
    IVA = ivatype === "NORMAL" ? 23 : ivatype === "INTERMEDIA" ? 13 : 6; // Continente
  } else {
    IVA = 23;
  }
  return IVA / 100;
}
