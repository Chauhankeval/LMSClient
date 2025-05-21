import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/lecture";

export const lectureApi = createApi({
  reducerPath: "lectureApi", // This defines where the API state is stored in Redux
  tagTypes: ["Refetch_Creator_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    lectureCreate: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/${courseId}/create-lecture`,
        method: "POST",
        body: { courseId, lectureTitle },
      }),
    }),

    getLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/get-lectures`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Lecture"],
    }),

    editLectureById: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `/${courseId}/edit-lectures/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    DeleteLectureById: builder.mutation({
      query: (lectureId) => ({
        url: `/delete-lectures/${lectureId}`,
        method: "DELETE",
        body: { lectureId },
      }),
      invalidatesTags: ["Refetch_Creator_Lecture"],
    }),

    getLecturesById: builder.query({
      query: (lectureId) => ({
        url: `/get-lectures-by-id/${lectureId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLectureCreateMutation,
  useGetLecturesQuery,
  useEditLectureByIdMutation,
  useDeleteLectureByIdMutation,
  useGetLecturesByIdQuery
} = lectureApi;
