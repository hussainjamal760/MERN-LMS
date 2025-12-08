import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

type Props = {
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
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
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
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  // Fetching Data
  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery(
    {}
  );
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});
  const { data: allOrdersData, isLoading: allOrdersLoading } =
    useGetAllOrdersQuery({});

  useEffect(() => {
    if (isLoading) return;
    if (userData && ordersData) {
      // Logic for User Comparison
      const usersLastTwoMonths = userData.users.last12Months.slice(-2);
      if (usersLastTwoMonths.length === 2) {
        const usersCurrent = usersLastTwoMonths[1].count;
        const usersPrev = usersLastTwoMonths[0].count;
        if (usersPrev !== 0) {
          const usersPercentChange =
            ((usersCurrent - usersPrev) / usersPrev) * 100;
          setUserComparePercentage({
            current: usersCurrent,
            percentChange: usersPercentChange.toFixed(0),
          });
        } else {
          setUserComparePercentage({
            current: usersCurrent,
            percentChange: 100,
          });
        }
      }

      // Logic for Orders Comparison
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);
      if (ordersLastTwoMonths.length === 2) {
        const ordersCurrent = ordersLastTwoMonths[1].count;
        const ordersPrev = ordersLastTwoMonths[0].count;
        if (ordersPrev !== 0) {
          const ordersPercentChange =
            ((ordersCurrent - ordersPrev) / ordersPrev) * 100;
          setOrdersComparePercentage({
            current: ordersCurrent,
            percentChange: ordersPercentChange.toFixed(0),
          });
        } else {
          setOrdersComparePercentage({
            current: ordersCurrent,
            percentChange: 100,
          });
        }
      }
    }
  }, [userData, ordersData, allOrdersData]);

  const isLoading = userLoading || ordersLoading || allOrdersLoading;

  // Prepare Chart Data
  const userAnalyticsData: any[] = [];
  if (userData) {
    userData.users.last12Months.forEach((item: any) => {
      userAnalyticsData.push({ name: item.month, count: item.count });
    });
  }

  const ordersAnalyticsData: any[] = [];
  if (ordersData) {
    ordersData.orders.last12Months.forEach((item: any) => {
      ordersAnalyticsData.push({ name: item.month, count: item.count });
    });
  }

  // Recent Transactions (Last 5 orders)
  const recentTransactions =
    allOrdersData?.orders?.slice().reverse().slice(0, 5) || [];

  // Calculate Total Sales (simulated based on orders if price exists, or just count)
  const totalSales =
    allOrdersData?.orders?.reduce(
      (acc: number, order: any) => acc + (order.price || 0),
      0
    ) || 0;

  if (isLoading) return <Loader />;

  return (
   
  <div className="w-full h-screen overflow-hidden p-4 grid grid-cols-12 gap-4">

    {/* Users Analytics (big chart on top-left) */}
    <div className="col-span-8 bg-white dark:bg-[#0D1733] rounded-xl p-4">
      <h2 className="text-white text-[18px] mb-2">Users Analytics</h2>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={userAnalyticsData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Stats Right Side (Sales + New users) */}
    <div className="col-span-4 flex flex-col gap-4">

      <div className="bg-white dark:bg-[#0D1733] rounded-xl p-5 flex justify-between items-center">
        <div>
          <p className="text-gray-300">Sales Obtained</p>
          <h2 className="text-3xl dark:text-white">${totalSales}</h2>
          <p className="text-green-400 text-sm">+120%</p>
        </div>
        <CircularProgressWithLabel value={100} />
      </div>

      <div className="bg-white dark:bg-[#0D1733] rounded-xl p-5 flex justify-between items-center">
        <div>
          <p className="text-gray-300">New Users</p>
          <h2 className="text-3xl dark:text-white">{userComparePercentage?.current}</h2>
          <p className="text-green-400 text-sm">+150%</p>
        </div>
        <PiUsersFourLight className="text-white text-4xl" />
      </div>

    </div>

    {/* Orders Analytics Chart (left bottom) */}
    <div className="col-span-8 bg-white dark:bg-[#0D1733] rounded-xl p-4">
      <h2 className="text-white text-[18px] mb-2">Orders Analytics</h2>
      <div className="w-full h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ordersAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Recent Transactions (right bottom) */}
    <div className="col-span-4 bg-white dark:bg-[#0D1733] rounded-xl p-4 overflow-auto">
      <h2 className="text-white text-[18px] mb-3">Recent Transactions</h2>

      {recentTransactions.map((item:any) => (
        <div
          key={item._id}
          className="flex justify-between text-white border-b border-white/10 py-3 text-sm"
        >
          <span>{item.userName}</span>
          <span>
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
          <span>${item.price}</span>
        </div>
      ))}
    </div>

  </div>
);

};

export default DashboardWidgets;