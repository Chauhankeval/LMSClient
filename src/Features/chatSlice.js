import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContact: null, // Stores the selected contact
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
  },
});


export const { setSelectedContact } = chatSlice.actions;
console.log("<setSelectedContact",setSelectedContact.selectedContact)
export default chatSlice.reducer;
