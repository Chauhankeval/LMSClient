import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice"; // Ensure correct relative path
import { authApi } from "../Features/api/authApi"; // Ensure correct relative path
import { courseApi } from "@/Features/api/courseApi";
import { lectureApi } from "@/Features/api/lectureApi";
import { purchaseApi } from "@/Features/api/purchaseApi";
import { progressApi } from "@/Features/api/ProgressApi";
import chatReducer from "../Features/chatSlice"; 
import { PostApi } from "@/Features/api/postApi";
const rootReducer = combineReducers({
  auth: authReducer, // Integrate the auth slice
  chat: chatReducer,
  [authApi.reducerPath]: authApi.reducer, 
  [courseApi.reducerPath]: courseApi.reducer, 
  [lectureApi.reducerPath]: lectureApi.reducer, 
  [purchaseApi.reducerPath]: purchaseApi.reducer, 
  [progressApi.reducerPath]: progressApi.reducer, 
  [PostApi.reducerPath]: PostApi.reducer, 



});

export default rootReducer;
 