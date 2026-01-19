import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsabilityState {
  darkMode: boolean;
}

const initialState: UsabilityState = {
  darkMode: false,
};

const usabilitySlice = createSlice({
  name: "usability",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export default usabilitySlice;
