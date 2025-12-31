import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import Loader from "../../Loader/Loader"
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

type Props = {}

const CourseAnalytics = (props: Props) => {
    const { data, isLoading } = useGetCourseAnalyticsQuery({});

    const analyticsData: any = []
    data && data.courses.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, uv: item.count })
    })

    const minValue = 0;

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="h-screen">
                    <div className="mt-[50px]">
                        <h1 className="text-3xl font-bold px-5 !text-start dark:text-white text-black">
                            Courses Analytics
                        </h1>
                        <p className="text-base font-medium text-gray-500 px-5">
                            Last 12 months analytics data
                        </p>
                    </div>

                    <div className="w-full h-[90%] flex items-center justify-center">
                        <ResponsiveContainer width="90%" height="50%">
                            <BarChart width={150} height={300} data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3faf82" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3faf82" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" />
                                <YAxis domain={[minValue, "auto"]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px' }} 
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{fill: 'transparent'}}
                                />
                                <Bar 
                                    dataKey="uv" 
                                    fill="url(#colorUv)" 
                                    barSize={30} 
                                    radius={[10, 10, 0, 0]} 
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}

export default CourseAnalytics