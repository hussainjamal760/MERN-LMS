import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    overrideExisting:true,
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => ({
                url: "get-notifications",
                method: "GET",
            }),
        }),
        updateNotificationStatus: builder.mutation({
            query: (id) => ({
                url: `update-notifications/${id}`,
                method: "PUT",
            }),
        }),
    }),
});

export const { useGetNotificationsQuery, useUpdateNotificationStatusMutation } = notificationsApi;