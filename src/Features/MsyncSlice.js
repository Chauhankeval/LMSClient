import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], // Stores the selected contact
};

const postslice = createSlice({
  name: "chat",
  initialState,
  reducers: {
   setFriends : (state, action) => {
    
   } 
  },
});
