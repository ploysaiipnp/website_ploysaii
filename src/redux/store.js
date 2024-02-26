// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import productModalReducer from "./reducers/productModalSlice";
import orderReducer from "./reducers/orderSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    productModal: productModalReducer,
    myOrder: orderReducer,
    auth: authReducer,
    // Add more reducers if needed
  },
});

export default store;
