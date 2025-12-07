import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
      overrideExisting: true,
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: "get-layout",
        method: "GET",
        params: { type },
      }),
    }),
    createLayout: builder.mutation({
      query: (body) => ({
        url: "create-layout",
        method: "POST",
        body,
      }),
    }),
    editLayout: builder.mutation({
      query: (body) => ({
        url: "edit-layout",
        method: "PUT",
        body,
        credentials: "include", 
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useCreateLayoutMutation, useEditLayoutMutation } = layoutApi;