import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  item: {},
};

const productModalSlice = createSlice({
  name: "productModal",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.toggle = action.payload;
    },
    item_clear: (state, action) => {
      state.item = {};
    },
    item_selected: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { toggle, item_clear, item_selected } = productModalSlice.actions;
export default productModalSlice.reducer;
