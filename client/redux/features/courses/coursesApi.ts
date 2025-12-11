// client/redux/features/courses/coursesApi.ts

import {apiSlice} from "../api/apiSlice"

export const coursesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query : (id) =>({
        url:`delete-course/${id}`,
        method: "DELETE",
        credentials:"include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses : builder.query({
      query:()=>({
        url:"get-course",
        method:"GET",
        credentials:"include" as const,
      }),
    }),
    getCourseDetails : builder.query({
      query:(id)=>({
        url:`get-course/${id}`,
        method:"GET",
        credentials:"include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
      }),
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
        url: "add-question",
        method: "PUT",
        body: data,
      }),
    }),
    addAnswer: builder.mutation({
      query: (data) => ({
        url: "add-answer",
        method: "PUT",
        body: data,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, review, rating }) => ({
        url: `add-review/${id}`,
        method: "PUT",
        body: { review, rating },
      }),
    }),
    addReplyInReview: builder.mutation({
       query: ({ comment, courseId, reviewId }) => ({
        url: 'add-reply',
        method: "PUT",
        body: { comment, courseId, reviewId },
      }),
    }),
  }),
});

export const { 
  useCreateCourseMutation, 
  useGetAllCoursesQuery, 
  useDeleteCourseMutation, 
  useEditCourseMutation, 
  useGetUsersAllCoursesQuery, 
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReplyInReviewMutation
} = coursesApi;