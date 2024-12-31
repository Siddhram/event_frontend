import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
export const getAllEvents=createAsyncThunk('getAllEvents',async (_,{rejectWithValue})=>{
    try {
        const res=await axios.get('http://localhost:3000/event/getallevents',{
            withCredentialsz:true,
        })
        const realres=res.data;
        return realres;
        
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const bookevent=createAsyncThunk('bookevent',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post('http://localhost:3000/event/book-event',data,{
    withCredentials: true, // Ensures cookies are sent with the request
})
    const realres=res.data;
        return realres;
    } catch (error) {
              return rejectWithValue(error)  
    }
})
export const bookeventzero=createAsyncThunk('bookeventzero',async (data,{rejectWithValue})=>{
    try {
            const token = Cookies.get('token'); // Adjust the cookie name based on where your token is stored

        // Axios configuration
        const config = {
            withCredentials: true, // Ensures cookies are sent with the request
           
        };
        const res=await axios.post('http://localhost:3000/event/book-event-zero',data,config)
    const realres=res.data;
    console.log(realres);
    
        return realres;
    } catch (error) {
              return rejectWithValue(error)  
    }
})
const initialState={
    isLoding:false,
    allevents:[],
    userbookedevents:[],
    error:null
}
const eventSlice=createSlice({
    name:"eventSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllEvents.pending,(state)=>{
            state.isLoding=true
        })
        .addCase(getAllEvents.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.allevents=action.payload.allevents;
        })
        .addCase(getAllEvents.rejected,(state,action)=>{
            state.isLoding=false;
            state.error=action.payload
        });
        builder
        .addCase(bookevent.pending,(state)=>{
            state.isLoding=true
        })
        .addCase(bookevent.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.userbookedevents=action.payload.alluserbookedevent;
        })
        .addCase(bookevent.rejected,(state,action)=>{
            state.isLoding=false;
            state.error=action.payload
        })
    }
})

export const eventReucer=eventSlice.reducer;