// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../themes";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: colors.dark,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
