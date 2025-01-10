import { Currency2 } from "@/types/currency.types";
import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  currencies: Currency2[] | null;
}

const initialState: ThemeState = {
  currencies: null,
};

const currenciesSlice = createSlice({
  name: "units",
  initialState: initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload as Currency2[];
    },
  },
});

export const { setCurrencies } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;
