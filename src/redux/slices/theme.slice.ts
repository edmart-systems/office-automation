import { ColorScheme } from "@/styles/theme/types";
import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  mode: ColorScheme | null;
}

const initialState: ThemeState = {
  mode: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      const newMode = action.payload as ColorScheme;
      state.mode = newMode;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
