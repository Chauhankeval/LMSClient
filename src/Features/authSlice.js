import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAuthenticated: false,
    posts: [],
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user; // This is safe with Immer
      state.isAuthenticated = true;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("User's friends Not exist");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPost;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setFriends, setPost, setPosts } = AuthSlice.actions;

export default AuthSlice.reducer;
