import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8008/api/auth";

export const authApi = createApi({
  reducerPath: "authApi", // This defines where the API state is stored in Redux
  providesTags: ["Friends"],
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "/registeruser", // Ensure this matches your server endpoint
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/profile", // Ensure this matches your server endpoint
        method: "GET",
      }),
      invalidatesTags: ["Friends"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getAdminProfile: builder.query({
      query: (userId) => ({
        url: `/get-admin-profile/${userId}`, // Pass userId in URL
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUser: builder.mutation({
      query: (formdata) => ({
        url: "/update-profile", // Ensure this matches your server endpoint
        method: "PUT",
        body: formdata,
      }),
    }),

    addInstructorData: builder.mutation({
      query: ({ answers }) => ({
        url: "/add-instructor-data",
        method: "PUT",
        body: { answers },
      }),
    }),

    InstructorDetails: builder.mutation({
      query: (formdata) => ({
        url: "/add-instructor-details",
        method: "PUT",
        body: { formdata },
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout", // Ensure this matches your server endpoint
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    InstructorCreateCheckOutSession: builder.mutation({
      query: ({ amount }) => ({
        url: "/admin-create-checkout-session",
        method: "PUT",
        body: { amount },
      }),
    }),

    searchContects: builder.mutation({
      query: (searchTerm) => ({
        url: "/search-contects",
        method: "POST",
        body: searchTerm,
      }),
    }),

    FriendsInList: builder.mutation({
      query: ({ userId, friendId }) => ({
        url: `/${userId}/${friendId}/add-friends`,
        method: "PATCH",
      }),
      invalidatesTags: ["Friends"], // This ensures the friend list gets refetched
    }),

    GetUserFriends: builder.query({
      query: (userId) => ({
        url: `${userId}/get-friends`,
        method: "GET",
      }),
    }),

    GetUsersDetails: builder.query({
      query: (userId) => ({
        url: `${userId}/get-user-details`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
  useAddInstructorDataMutation,
  useInstructorDetailsMutation,
  useInstructorCreateCheckOutSessionMutation,
  useGetAdminProfileQuery,
  useSearchContectsMutation,
  useFriendsInListMutation,
  useGetUserFriendsQuery,
} = authApi;
