import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AiOutlineMail } from 'react-icons/ai';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { format } from "timeago.js";
import Loader from '../../Loader/Loader';
import { Label } from '@mui/icons-material';

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
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

    // Pagination Logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orderData.length / rowsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={!isDashboard ? 'mt-[80px]' : 'mt-0'}>
            <div className={`w-full overflow-hidden rounded-[20px] shadow-lg border border-gray-200 dark:border-gray-800 ${isDashboard ? 'bg-transparent shadow-none' : 'bg-white dark:bg-[#111C43]'}`}>
                
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">ID</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">Email</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">Title</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">Price</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wide">Created At</th>
                                {!isDashboard && <th scope="col" className="px-6 py-4 text-center font-semibold tracking-wide">Email</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {currentItems && currentItems.map((item: any) => (
                                <tr key={item.id} className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                                        {item.id.slice(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white capitalize">
                                        {item.userName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {item.userEmail}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                            {item.price}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                        {item.createdAt}
                                    </td>
                                    {!isDashboard && (
                                        <td className="px-6 py-4 text-center">
                                            <a href={`mailto:${item.userEmail}`} className="inline-flex items-center justify-center p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400">
                                                <AiOutlineMail className="text-xl" />
                                            </a>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {orderData.length === 0 && (
                         <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No invoices found.
                         </div>
                    )}
                </div>

                {/* Pagination Controls */}
                 <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastItem, orderData.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{orderData.length}</span> entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0 gap-2">
                        <button 
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-lg transition-colors
                                ${currentPage === 1 
                                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' 
                                    : 'text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                                }`}
                        >
                            Prev
                        </button>
                        <button 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-lg transition-colors
                                ${currentPage === totalPages 
                                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' 
                                    : 'text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllInvoices;