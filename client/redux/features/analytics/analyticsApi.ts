import {apiSlice} from "../api/apiSlice"

export const analyticsApi = apiSlice.injectEndpoints({
    overrideExisting:true,
    
    endpoints:(builder)=>({
        getCourseAnalytics: builder.query({
            query : () =>({
                url:"get-courses-analytics",
                method:"GET",
                credentials:'include' as const
            }),
        }),
          getUsersAnalytics: builder.query({
            query : () =>({
                url:"get-users-analytics",
                method:"GET",
                credentials:'include' as const
            }),
        }),
    }),
})

export const {useGetCourseAnalyticsQuery , useGetUsersAnalyticsQuery} = analyticsApi