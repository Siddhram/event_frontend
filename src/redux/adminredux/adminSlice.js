import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import frontendurl from "../../url";
export const sininadmin=createAsyncThunk('sininadmin',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${frontendurl()}admin/login`,data,{
            withCredentials:true
        })
        
        return res.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const delete_event=createAsyncThunk('delete_event',async (data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${frontendurl()}event/finduseranddeletebookedticket/${data._id}`,{},{
            withCredentials:true,
            headers:{
        'authorization':JSON.parse(localStorage.getItem("admintoken")),
        'Content-Type': 'application/json',
    }
        })
        console.log(res.data);
        
        return res.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getallbookedeventsmem=createAsyncThunk('getallbookedeventsmem',async (_,{rejectWithValue})=>{
    try {
        const res=await axios.get(`${frontendurl()}event/alleventbookeduser`);
        return res.data;
    } catch (error) {
     return rejectWithValue(error)
    }
})
const initialState={
 isLoding:false,
    adminData:null|| JSON.parse(localStorage.getItem('admin')),
    alleventbookedmember:[],
    error:null,
    message:""
}
const adminSlice=createSlice({
    name:'adminSlice',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
      builder
      .addCase(sininadmin.pending,(state)=>{
        state.isLoding=true;
      })
      .addCase(sininadmin.fulfilled,(state,action)=>{
        state.isLoding=false;
        state.adminData=action.payload.adminuser
        state.message=action.payload.message
        localStorage.setItem('admin',JSON.stringify(action.payload.adminuser));
                localStorage.setItem('admintoken',JSON.stringify(action.payload.admintoken));

      })
      .addCase(sininadmin.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload;
      });

      builder
      .addCase(getallbookedeventsmem.pending,(state)=>{
        state.isLoding=true;
      })
      .addCase(getallbookedeventsmem.fulfilled,(state,action)=>{
       state.isLoding=false;
       state.alleventbookedmember=action.payload.alleventbookedmember;
      })
      .addCase(getallbookedeventsmem.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload;
      });

      builder
      .addCase(delete_event.pending,(state)=>{
        state.isLoding=true;
      })
      .addCase(delete_event.fulfilled,(state,action)=>{
        state.isLoding=false;
        state.alleventbookedmember=action.payload.alleventbookedmember;
      })
      .addCase(delete_event.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload;
      })
    }
});
export const adminReducer=adminSlice.reducer;