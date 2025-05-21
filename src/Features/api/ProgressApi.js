import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/courseprogressroute";

export const progressApi = createApi({
  reducerPath: "progressApi", // This defines where the API state is stored in Redux

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/getprogress/${courseId}`,
        method: "GET",
      }),
    }),

    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`, // Ensure this matches your server endpoint
        method: "POST",
      }),
    }),
    completeProgress: builder.mutation({
      query: (couresId) => ({
        url: `/${couresId}/markascompleted`, // Ensure this matches your server endpoint
        method: "POST",
      }),
    }),
    IncompleteProgress: builder.mutation({
      query: (couresId) => ({
        url: `/${couresId}/markasincompleted`, // Ensure this matches your server endpoint
        method: "POST",
      }),
    }),
    GetCertificate: builder.query({
      query: (courseId) => ({
        url: `/download-certificate/${courseId}`,
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) throw new Error("Certificate not found");
          const blob = await response.blob();
          return window.URL.createObjectURL(blob);
        },

        headers: {
          Accept: "application/pdf",
        },
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteProgressMutation,
  useIncompleteProgressMutation,
  useGetCertificateQuery,
} = progressApi;
