import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, edit, getAll, remove, filterProduct, get, sortProduct } from "../api/product";
import { getProductCate } from "../api/category";



export const fetchProducts = createAsyncThunk(
    "product/fetchProduct",
    async () => {
        const { data } = await getAll();
        return data
    }
)


export const removeFetchProduct = createAsyncThunk(
    "product/removeProduct",
    async (_id) => {
        const { data } = await remove(_id);
        return data
    }
)

export const addFetchProduct = createAsyncThunk(
    "product/addFetchProduct",
    async (item) => {
        const { data } = await add(item);
        return data
    }
)

export const editProduct = createAsyncThunk(
    "product/editProduct",
    async (item) => {
        const { data } = await edit(item);
        console.log(data);
        return data
    }
)

export const getCateProduct = createAsyncThunk(
    'product/getCategory',
    async (id) => {
        try {
            const { data } = await getProductCate(id);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const fillterProduct = createAsyncThunk(
    'product/filterProduct',
    async (value) => {
        try {
            const { data } = await filterProduct(value);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getProduct = createAsyncThunk(
    '/product',
    async (id) => {
        try {
            const { data } = await get(id);
            // console.log(data);
            return data[0]
        } catch (error) {
            console.log(error)
        }
    }
)

export const sortProducts = createAsyncThunk(
    '/product/sortProduct',
    async (sortData) => {
        try {
            const { data } = await sortProduct(sortData);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)






const productSlice = createSlice({
    name: "product", // product/removeProduct
    initialState: {
        error: "",
        loading: false,
        products: []
    },
    extraReducers: (builder) => {
        // trường hợp 1: gọi đến action fetchProduct và thành công
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(removeFetchProduct.fulfilled, (state, action) => {
            const newProducts = state.products.filter((item) => item._id !== action.payload._id)
            state.products = newProducts;
        });
        builder.addCase(addFetchProduct.fulfilled, (state, action) => {
            state.products = [...state.products, action.payload]
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            const newProducts = state.products.map((product) =>
                product._id === action.payload._id ? action.payload : product
            )
            state.products = newProducts;
        });

        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            //   console.log(action.payload[0]);
            //   state.loading = false;
        });

        builder.addCase(fillterProduct.fulfilled, (state, action) => {
            state.products = action.payload
        });
        builder.addCase(getCateProduct.fulfilled, (state, action) => {
            state.products = action.payload
        });
        builder.addCase(sortProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })

    }
});


export default productSlice;