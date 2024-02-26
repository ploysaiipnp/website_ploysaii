import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  toggle: false,
  itemList: [],
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.toggle = action.payload;
    },

    set_cart_item: (state, action) => {
      state.items = action.payload;
    },
    clear_item: (state, action) => {
      state.items = [];
    },
    itemList: (state, action) => {
      state.itemList = action.payload;
    },
    add_item: (state, action) => {
      let existingItem = _.find(
        state.items,
        (n) => n.productId === action.payload.productId
      );
      if (existingItem) {
        if (existingItem?.type === "down") {
          existingItem.amountOrder = action.payload.amountOrder;
        } else {
          existingItem.amountOrder = action.payload.amountOrder;
        }
      } else {
        state.items.push(action.payload);
      }
    },
    remove_item: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { toggle, set_cart_item, clear_item, add_item, itemList } =
  cartSlice.actions;
export default cartSlice.reducer;
