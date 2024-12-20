import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  notificationsBar: boolean;
}

const initialState: AppState = {
  notificationsBar: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setNotificationsDrawer: (state, action) => {
      state.notificationsBar = action.payload as boolean;
    },
  },
});

export const { setNotificationsDrawer } = appSlice.actions;
export const appReducer = appSlice.reducer;
