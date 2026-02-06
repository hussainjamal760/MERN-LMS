import React, { FC, useEffect, useState } from "react";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "next-themes";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import Loader from "../../Loader/Loader";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  LineChart, CartesianGrid, Line,
} from "recharts";
import AllInvoices from "../Order/AllInvoices";

type Props = {
  isDashboard?: boolean;
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<any> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const { theme } = useTheme();
  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});
  const { data: allOrdersData, isLoading: allOrdersLoading } = useGetAllOrdersQuery({});

  const [comparePercentage, setComparePercentage] = useState<any>();
  const [usersComparePercentage, setUsersComparePercentage] = useState<any>();

  useEffect(() => {
    if (userLoading || ordersLoading || allOrdersLoading) return;
    
    const lastTwoMonthsOrders = ordersData?.orders?.last12Months?.slice(-2);
    if (lastTwoMonthsOrders && lastTwoMonthsOrders.length === 2) {
       const currentMonth = lastTwoMonthsOrders[1].count;
       const previousMonth = lastTwoMonthsOrders[0].count;
       const percentChange = previousMonth === 0 ? 100 : ((currentMonth - previousMonth) / previousMonth) * 100;
       setComparePercentage({
           percentChange: percentChange.toFixed(0),
           trend: currentMonth >= previousMonth ? 'positive' : 'negative'
       });
    }

    const lastTwoMonthsUsers = userData?.users?.last12Months?.slice(-2);
    if (lastTwoMonthsUsers && lastTwoMonthsUsers.length === 2) {
       const currentMonth = lastTwoMonthsUsers[1].count;
       const previousMonth = lastTwoMonthsUsers[0].count;
       const percentChange = previousMonth === 0 ? 100 : ((currentMonth - previousMonth) / previousMonth) * 100;
       setUsersComparePercentage({
           percentChange: percentChange.toFixed(0),
           trend: currentMonth >= previousMonth ? 'positive' : 'negative'
       });
    }
  }, [ordersData, userData, allOrdersLoading, userLoading, ordersLoading]);

  const isLoading = userLoading || ordersLoading || allOrdersLoading;

  const userAnalyticsData = userData?.users?.last12Months?.map((item: any) => ({ name: item.month, count: item.count })) || [];
  const ordersAnalyticsData = ordersData?.orders?.last12Months?.map((item: any) => ({ name: item.month, count: item.count })) || [];
  
  const totalSales = allOrdersData?.orders?.reduce((acc: number, order: any) => {
      const orderPrice = order.price || 0; 
      return acc + orderPrice;
  }, 0) || 0;

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-[90vh] overflow-y-auto p-4 grid grid-cols-12 gap-6 custom-scrollbar">

      {/* User Analytics Chart */}
      <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#111C43] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[350px]">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-gray-800 dark:text-white text-xl font-semibold">User Analytics</h2>
        </div>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userAnalyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                    border: 'none',
                    color: theme === 'dark' ? '#fff' : '#000'
                }} 
                cursor={{fill: theme === 'dark' ? '#374151' : '#f3f4f6'}}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <Bar dataKey="count" fill="#4d62d9" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets (Sales & Users) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white dark:bg-[#111C43] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">Total Sales</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {totalSales ? `$${totalSales.toLocaleString()}` : "$0"} 
            </h2>
            <div className={`flex items-center mt-2 text-sm font-medium ${comparePercentage?.trend === 'negative' ? "text-red-500 bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-full w-fit" : "text-green-500 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-full w-fit"}`}>
               {comparePercentage?.percentChange > 0 ? "+" : ""}{comparePercentage?.percentChange}% 
               <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
            <CircularProgressWithLabel value={comparePercentage?.percentChange > 100 ? 100 : Math.abs(comparePercentage?.percentChange)} open={open} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111C43] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">New Users</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {userData?.users?.last12Months?.[userData.users.last12Months.length - 1]?.count || 0}
            </h2>
             <div className={`flex items-center mt-2 text-sm font-medium ${usersComparePercentage?.trend === 'negative' ? "text-red-500 bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-full w-fit" : "text-green-500 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-full w-fit"}`}>
                {usersComparePercentage?.percentChange > 0 ? "+" : ""}{usersComparePercentage?.percentChange}%
                <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full">
            <PiUsersFourLight className="text-purple-600 dark:text-purple-400 text-3xl" />
          </div>
        </div>
      </div>

      {/* Order Analytics Chart */}
      <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#111C43] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[350px]">
         <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-6">Orders Analytics</h2>
         <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ordersAnalyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrdersWidget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
               <Tooltip 
                contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                    border: 'none',
                    color: theme === 'dark' ? '#fff' : '#000'
                }} 
              />
              <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOrdersWidget)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

     

    </div>
  );
};

export default DashboardWidgets;