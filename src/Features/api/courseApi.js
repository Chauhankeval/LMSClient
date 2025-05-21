import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/course";

export const courseApi = createApi({
  reducerPath: "courseApi", // This defines where the API state is stored in Redux
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ category, courseTitle }) => ({
        url: "/createcourse",
        method: "POST",
        body: { category, courseTitle },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Start with the base URL
        let queryString = `/searchcourese?query=${encodeURIComponent(
          searchQuery
        )}`;

        // Append categories if provided
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice if provided
        if (sortByPrice) {
          queryString += `&sortByPrice=${sortByPrice}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),

    getPublishedCourses: builder.query({
      query: () => ({
        url: "/get-all-publish-course",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    getAllAdminCourse: builder.query({
      query: () => ({
        url: "/getalladmincourse",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/editcourse/${courseId}`, // Ensure the courseId is correctly appended to the URL
        method: "PUT",
        body: formData, // Ensure formData is the body of the request
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseBuId: builder.query({
      query: (courseId) => ({
        url: `get-course-by-id/${courseId}`, // Ensure the courseId is correctly appended to the URL
        method: "GET",
        // Ensure formData is the body of the request
      }),
    }),
    isCorsePublish: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}/ispublish?publish=${query}`,
        method: "PUT",
      }),
    }),
    updateCourseCertificate: builder.mutation({
      query: ({ content, courseId }) => ({
        url: `/editcourse-certificate/${courseId}`, // Ensure the courseId is correctly appended to the URL
        method: "PUT",
        body: { content }, // Ensure formData is the body of the request
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    DeleteStudentById: builder.mutation({
      query: ({ studentId, courseId }) => ({
        url: "/delete-student-dashbord",
        method: "DELETE",
        body: { studentId, courseId },
      }),
     
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetPublishedCoursesQuery,
  useGetAllAdminCourseQuery,
  useUpdateCourseMutation,
  useGetCourseBuIdQuery,
  useIsCorsePublishMutation,
  useGetSearchCourseQuery,
  useUpdateCourseCertificateMutation,
  useDeleteStudentByIdMutation
} = courseApi;
