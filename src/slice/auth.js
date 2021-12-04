import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup,signin } from "../api/authApi";
import { authenticate } from "../auth";






export const signins = createAsyncThunk(
    'user/signin',
    async (user) =>{
        try{
            const {data} = await signin(user);
            authenticate(data);
            return data

        }catch(error){
           alert(error.response.data.msg)
        }
    }
)




