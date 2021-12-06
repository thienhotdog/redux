import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../api/authApi";
import { authenticate } from "../auth";






export const signins = createAsyncThunk(
    'auth/signin',
    async (user) => {
        try {
            const { data } = await signin(user);
            authenticate(data);
            return data
        } catch (error) {
            return error
        }
    }
)



const authSlide = createSlice({
    name: 'user',
    initialState: {loading: false,user:[]},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signins.pending, (state, action) => {

        });
        builder.addCase(signins.rejected, (state, action) => {

        });
        builder.addCase(signins.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })


    }
})


export default authSlide;
