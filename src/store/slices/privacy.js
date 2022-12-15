import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webStorageAllowed: false,
};

const privacySlice = createSlice({
  name: "privacy",
  initialState,
  reducers: {
    setWebStorageAllowed: (state, action) => {
      return { ...state, webStorageAllowed: action.payload };
    },
  },
});

export default privacySlice;
