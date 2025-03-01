import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import frontendurl from "../../url";
export const getAllEvents=createAsyncThunk('getAllEvents',async (_,{rejectWithValue})=>{
    try {
        const res=await axios.get(`${frontendurl()}event/getallevents`,{
            withCredentialsz:true,
            headers:{
        'authorization':JSON.parse(localStorage.getItem("token")),
        'Content-Type': 'application/json',
    }
        })
        const realres=res.data;
        return realres;
        
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const bookevent=createAsyncThunk('bookevent',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${frontendurl()}event/book-event`,data,{
    withCredentials: true,
    headers:{
        'authorization':JSON.parse(localStorage.getItem("token")),
        'Content-Type': 'application/json',
    }
})
    const realres=res.data;
        return realres;
    } catch (error) {
              return rejectWithValue(error)  
    }
})
export const bookeventzero=createAsyncThunk('bookeventzero',async (data,{rejectWithValue})=>{
    try {
            // const token = Cookies.get('token'); // Adjust the cookie name based on where your token is stored

        // Axios configuration
        const config = {
            withCredentials: true,
            headers:{
        'authorization':JSON.parse(localStorage.getItem("token")),
        'Content-Type': 'application/json',
    }
        };

        const res=await axios.post(`${frontendurl()}event/book-event-zero`,data,config)
    const realres=res.data;
                console.log(realres);

        return realres;
    } catch (error) {
              return rejectWithValue(error)  
    }
})

export const userbookedevents=createAsyncThunk('userbookedevents',async (_,{rejectWithValue})=>{
    try {
        const res=await axios.get(`${frontendurl()}event/user-updated-events`,{
            withCredentials:true,
            headers:{
        'authorization':JSON.parse(localStorage.getItem("token")),
        'Content-Type': 'application/json',
    }
        })
        return res.data;
    } catch (error) {
       return rejectWithValue(error)  
    }
})

export const eventBookeduserallevents=createAsyncThunk('eventBookeduserallevents',async (_,{rejectWithValue})=>{
    try {
          const res=await axios.get(`${frontendurl()}event/event-booked-user`,{
            withCredentials:true,
            headers:{
        'authorization':JSON.parse(localStorage.getItem("admintoken")),
        'Content-Type': 'application/json',
    }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error)  
    }
})
const initialState={
    isLoding:false,
    allevents:[],
    userbookedevents:[],
    eachproductbooked:[],
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
            state.isLoding=true;
        })
        .addCase(bookevent.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.userbookedevents=action.payload.alluserbookedevent;
            state.allevents=action.payload.allevents
        })
        .addCase(bookevent.rejected,(state,action)=>{
            state.isLoding=false;
            state.error=action.payload;
        });
        builder
        .addCase(userbookedevents.pending,(state)=>{
            state.isLoding=true;
        })
        .addCase(userbookedevents.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.userbookedevents=action.payload.updatedevents;
        })
        .addCase(userbookedevents.rejected,(state,actions)=>{
            state.isLoding=false;
            state.error=actions.payload;
        });

        builder
        .addCase(eventBookeduserallevents.pending,(state)=>{
            state.isLoding=true;
        })
        .addCase(eventBookeduserallevents.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.eachproductbooked=action.payload.allUserBooked;
        })
        .addCase(eventBookeduserallevents.rejected,(state,actions)=>{
            state.isLoding=false;
            state.error=actions.payload;
        })
         builder
        .addCase(bookeventzero.pending,(state)=>{
            state.isLoding=true;
        })
        .addCase(bookeventzero.fulfilled,(state,action)=>{
            state.isLoding=false;
            state.userbookedevents=action.payload.alluserbookedevent;
            state.allevents=action.payload.allevents
        })
        .addCase(bookeventzero.rejected,(state,actions)=>{
            state.isLoding=false;
            state.error=actions.payload;
        })
    }
})

export const eventReucer=eventSlice.reducer;