import React, { FC } from "react";
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
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const { theme } = useTheme();
  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});
  const { data: allOrdersData, isLoading: allOrdersLoading } = useGetAllOrdersQuery({});

  const isLoading = userLoading || ordersLoading || allOrdersLoading;

  const userAnalyticsData = userData?.users?.last12Months?.map((item: any) => ({ name: item.month, count: item.count })) || [];
  const ordersAnalyticsData = ordersData?.orders?.last12Months?.map((item: any) => ({ name: item.month, count: item.count })) || [];
  const totalSales = allOrdersData?.orders?.reduce((acc: number, order: any) => acc + (order.price || 0), 0) || 0;

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-[90vh] overflow-y-auto p-4 grid grid-cols-12 gap-4 custom-scrollbar">

      <div className="col-span-12 md:col-span-8 bg-white dark:bg-[#111C43] rounded-xl p-4 shadow-sm min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-black dark:text-white text-[18px] font-medium">Users Analytics</h2>
        </div>
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={userAnalyticsData}>
              <XAxis dataKey="name" stroke={theme === 'dark' ? "#fff" : "#000"} />
              <YAxis stroke={theme === 'dark' ? "#fff" : "#000"} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col justify-between gap-4">
        <div className="bg-white dark:bg-[#111C43] rounded-xl p-5 shadow-sm flex-1 flex justify-between items-center min-h-[120px]">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Sales Obtained</p>
            <h2 className="text-2xl font-bold text-black dark:text-white">${totalSales}</h2>
            <p className="text-green-500 text-sm">+120%</p>
          </div>
          <CircularProgressWithLabel value={100} />
        </div>

        <div className="bg-white dark:bg-[#111C43] rounded-xl p-5 shadow-sm flex-1 flex justify-between items-center min-h-[140px]">
          <div>
            <p className="text-gray-500 dark:text-gray-400">New Users</p>
            <h2 className="text-2xl font-bold text-black dark:text-white">450</h2>
            <p className="text-green-500 text-sm">+150%</p>
          </div>
          <PiUsersFourLight className="text-black dark:text-white text-4xl" />
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 bg-white dark:bg-[#111C43] rounded-xl p-4 shadow-sm min-h-[300px]">
         <h2 className="text-black dark:text-white text-[18px] font-medium mb-4">Orders Analytics</h2>
         <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={ordersAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? "#fff" : "#000"} />
              <YAxis stroke={theme === 'dark' ? "#fff" : "#000"} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 bg-white dark:bg-[#111C43] rounded-xl p-4 shadow-sm flex flex-col">
        <h2 className="text-black dark:text-white text-[18px] font-medium mb-3">Recent Transactions</h2>
        <AllInvoices isDashboard={true}/>
      </div>

    </div>
  );
};

export default DashboardWidgets;