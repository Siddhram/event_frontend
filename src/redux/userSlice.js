import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import frontendurl from "../url";
const initialState={
    isLoding:false,
    userData: JSON.parse(localStorage.getItem('user'))||null,
    error:null,
    message:""
}
export const signInrequest= createAsyncThunk('signInrequest',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${frontendurl()}user/login`,data, {
    withCredentials: true, // Ensures cookies are sent with the request
});
        const realres=res.data;
        
        localStorage.setItem('user',JSON.stringify(realres.user));
        // console.log(localStorage.getItem('user'));
        
        return realres;  
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateuser=createAsyncThunk('updateuser',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${frontendurl()}user/update`,data,{
            withCredentials:true
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
       builder
       .addCase(signInrequest.pending,(state)=>{
        state.isLoding=true;
       })
       .addCase(signInrequest.fulfilled,(state,action)=>{
        state.isLoding=false;
        state.userData=action.payload.user
        state.message=action.payload.message
       })
       .addCase(signInrequest.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload;
       });

       builder
       .addCase(updateuser.pending,(state)=>{
        state.isLoding=true;
       })
       .addCase(updateuser.fulfilled,(state,action)=>{
        state.isLoding=false;
        state.userData=action.payload.user
        localStorage.setItem('user',JSON.stringify(action.payload.user));
        state.message=action.payload.message
       })
       .addCase(updateuser.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload;
       })
    }

})

export default userSlice.reducer;