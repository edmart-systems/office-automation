import { Unit2 } from "@/types/quotations.types";
import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  units: Unit2[] | null;
}

const initialState: ThemeState = {
  units: null,
};

const unitsSlice = createSlice({
  name: "units",
  initialState: initialState,
  reducers: {
    setUnits: (state, action) => {
      state.units = action.payload as Unit2[];
    },
  },
});

export const { setUnits } = unitsSlice.actions;
export const unitsReducer = unitsSlice.reducer;
