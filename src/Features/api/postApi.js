import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/postroute";

export const PostApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"], // Use a meaningful tag
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (formData) => ({
        url: "/create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"], // 🟢 Auto-refresh feed after posting
    }),

    getFeedPost: builder.query({
      query: () => ({
        url: "/get-feed-post",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    likeCountUpdate: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/like`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["Post"], // 🟢 Auto-refresh after like update
    }),
  }),
});

export const {
  useGetFeedPostQuery,
  useAddPostMutation,
  useLikeCountUpdateMutation,
} = PostApi;
