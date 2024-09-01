import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    fullName: "",
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.uid = payload.uid;
      state.didTryAutoLogin = true;
      state.fullName = payload.fullName;
    },
    logout: (state, action) => {
      state.uid = null;
    },
  },
});
export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;
