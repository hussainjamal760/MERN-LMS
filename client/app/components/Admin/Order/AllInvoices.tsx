import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { AiOutlineMail } from 'react-icons/ai';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'; // Updated Import
import { format } from "timeago.js";
import Loader from '../../Loader/Loader';

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({}); // Updated Hook
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                // User aur Course ko unki IDs se dhundna
                const user = usersData?.users?.find((user:any) => user._id === item.userId);
                const course = coursesData?.courses?.find((course:any) => course._id === item.courseId);
                
                return {
                    id: item._id,
                    userName: user?.name || item?.userName || 'User',
                    userEmail: user?.email || item?.userEmail || 'email@example.com',
                    title: course?.name || item?.title || 'Course Title',
                    price: "$" + (item.payment_info ? item.payment_info.amount / 100 : 0),
                    createdAt: format(item.createdAt),
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, coursesData]);

    if (isLoading) return <Loader />

    return (
        <div className={!isDashboard ? 'mt-[120px] px-5' : 'mt-0'}>
            <div className={`w-full overflow-x-auto rounded-xl border border-[#ffffff1d] shadow-xl ${isDashboard ? 'bg-transparent shadow-none' : 'bg-white/10 backdrop-blur-md'}`}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-200">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Created At</th>
                            {!isDashboard && <th className="px-6 py-3">Email User</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {orderData && orderData.map((row: any) => (
                            <tr key={row.id} className="border-b border-gray-200/20 hover:bg-gray-100/20 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.userName}</td>
                                <td className="px-6 py-4">{row.userEmail}</td>
                                <td className="px-6 py-4">{row.title}</td>
                                <td className="px-6 py-4 text-green-500 font-semibold">{row.price}</td>
                                <td className="px-6 py-4">{row.createdAt}</td>
                                {!isDashboard && (
                                    <td className="px-6 py-4 text-center">
                                        <a href={`mailto:${row.userEmail}`} className="text-xl text-green-500 hover:text-green-400">
                                            <AiOutlineMail />
                                        </a>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllInvoices;