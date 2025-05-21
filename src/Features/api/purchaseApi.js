import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_API = "http://localhost:8008/api/purchaseroute";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi", // This defines where the API state is stored in Redux

  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckOutSession: builder.mutation({
      query: ({ courseId, earnCoins }) => ({
        url: "/purchase-course",
        method: "POST",
        body: { courseId, earnCoins },
      }),
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/details-with-status`,
        method: "GET",
      }),
    }),
    getAllCoursePurchased: builder.query({
      query: () => ({
        url: "/getallpurchasecourse",
        method: "GET",
      }),
    }),
    createCheckOutSessionCoin: builder.mutation({
      query: ({ courseId, requiredCoins, earnCoins }) => ({
        url: "/purchase-course-coin",
        method: "POST",
        body: { courseId, requiredCoins, earnCoins },
      }),
    }),
  }),
});

export const {
  useCreateCheckOutSessionMutation,
  useGetCourseDetailsQuery,
  useGetAllCoursePurchasedQuery,
  useCreateCheckOutSessionCoinMutation,
} = purchaseApi;
