import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    isLoding:false,
    userData: JSON.parse(localStorage.getItem('user'))||null,
    error:null,
    message:""
}
export const signInrequest= createAsyncThunk('signInrequest',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post('http://localhost:3000/user/login',data, {
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
       })
    }

})

export default userSlice.reducer;