import React from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import Loader from "../../Loader/Loader"
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

type Props = {}

const OrdersAnalytics = (props: Props) => {
    const { data, isLoading } = useGetOrdersAnalyticsQuery({});

    const analyticsData: any = []

    data && data.orders.last12Months.forEach((item: any) => {
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
                            Orders Analytics
                        </h1>
                        <p className="text-base font-medium text-gray-500 px-5">
                            Last 12 months analytics data
                        </p>
                    </div>

                    <div className="w-full h-[90%] flex items-center justify-center">
                        <ResponsiveContainer width="90%" height="50%">
                            <LineChart
                                width={500}
                                height={300}
                                data={analyticsData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px' }} 
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="#82ca9d" 
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrdersAnalytics