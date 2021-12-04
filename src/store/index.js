import { configureStore } from "@reduxjs/toolkit";
import auth from "../slice/auth";
import categorySlice from "../slice/category";
import productSlice from "../slice/product";


const store = configureStore({
    reducer:{
        product: productSlice.reducer,
        category: categorySlice.reducer
    }
})


export default store;