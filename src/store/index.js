import { configureStore } from "@reduxjs/toolkit";
import authSlide from "../slice/auth";
import cartSlide from "../slice/cartSlide";
import categorySlice from "../slice/category";
import orderSlide from "../slice/order";
import productSlice from "../slice/product";


const store = configureStore({
    reducer:{
        product: productSlice.reducer,
        category: categorySlice.reducer,
        cart: cartSlide.reducer,
        user: authSlide.reducer,
        order: orderSlide.reducer
    }
})


export default store;