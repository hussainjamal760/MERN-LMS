import React from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"
import Loader from "../../Loader/Loader"
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

type Props = {}

const UserAnalytics = (props: Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});

    const analyticsData: any = []

    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="h-screen">
                    <div className="mt-[50px]">
                        <h1 className="text-3xl font-bold px-5 !text-start dark:text-white text-black">
                            Users Analytics
                        </h1>
                        <p className="text-base font-medium text-gray-500 px-5">
                            Last 12 months analytics data
                        </p>
                    </div>

                    <div className="w-full h-[90%] flex items-center justify-center">
                        <ResponsiveContainer width="90%" height="50%">
                            <AreaChart
                                data={analyticsData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4d62d9" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#4d62d9" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px' }} 
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4d62d9"
                                    fill="url(#colorUsers)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserAnalytics