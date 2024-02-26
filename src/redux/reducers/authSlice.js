import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_authen: true,
};

const authSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    set_authen: (state, action) => {
      state.is_authen = action.payload;
    },
  },
});

export const { set_authen } = authSlice.actions;
export default authSlice.reducer;
