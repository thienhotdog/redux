import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { edit, getAllCategory, remove } from "../api/category";
import { add } from "../api/category";

export const getAll = createAsyncThunk(
    'category/getAll',
    async () =>{
        try{
            const {data} = await getAllCategory();
            return data
        }catch(error){
            console.log(error)
        }
    }
)

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (item) =>{
    try{
      const {data} = await add(item);
      return data
    }catch(error){
      console.log(error)
   
    }
  }
)

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async (item) =>{
    try{
      const{data} = await edit(item);
      return data
    }catch(error){
      console.log(error)
    }
  }
)


export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (slug) =>{
    try{
      const {data} = await remove(slug)
      return data
    }catch(error){
      console.log(error)
    }
  }
)




const categorySlice = createSlice({
    name: "category", // product/removeProduct
    initialState: {
      error: "",
      loading: false,
      category: []
    },
    extraReducers: (builder) => {
      // trường hợp 1: gọi đến action fetchProduct và thành công
      builder.addCase(getAll.fulfilled, (state,action) =>{
          state.category = action.payload
      });
      builder.addCase(addCategory.fulfilled, (state,action) =>{
        state.category = [...state.category, action.payload]
      });
      builder.addCase(editCategory.fulfilled,(state,action) =>{
        const newCategory = state.category.map((category) =>
            category._id === action.payload._id ? action.payload : category
            ) 
            state.category = newCategory;
      });
      builder.addCase(removeCategory.fulfilled,(state,action) =>{
        const newProducts = state.category.filter((item) => item.slug !== action.payload.slug)
        state.category = newProducts;
      })
    }
  });


export default categorySlice;