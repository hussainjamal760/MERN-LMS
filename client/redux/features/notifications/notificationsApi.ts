import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    overrideExisting:true,
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query: () => ({
                url: "get-notifications",
                method: "GET",
            }),
        }),
        updateNotificationStatus: builder.mutation({
            query: (id) => ({
                url: `update-notification/${id}`,
                method: "PUT",
            }),
        }),
    }),
});

export const { useGetHeroDataQuery, useUpdateNotificationStatusMutation } = notificationsApi;