import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import { eventReucer } from "./features/eventSlice";
import { adminReducer } from "./adminredux/adminSlice";
export const store=configureStore({
    reducer:{
    userSlice:userReducer,
    eventSlice:eventReucer,
    adminSlice:adminReducer
    }
})