import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import { eventReucer } from "./features/eventSlice";
export const store=configureStore({
    reducer:{
    userSlice:userReducer,
    eventSlice:eventReucer
    }
})