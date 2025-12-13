import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { AiOutlineMail } from 'react-icons/ai';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { format } from "timeago.js";
type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetUsersAllCoursesQuery({}); // To fetch User data if needed explicitly
    const { data: coursesData } = useGetAllCoursesQuery({}); // To fetch Course Titles

    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                const user = usersData?.users?.find((user:any) => user._id === item.userId);
                const course = coursesData?.courses?.find((course:any) => course._id === item.courseId);
                
                return {
                    id: item._id,
                    userName: user?.name || item.userName || 'User', // Fallback to ID or static
                    userEmail: user?.email || item.userEmail || 'email@example.com',
                    title: course?.name || item.title || 'Course Title',
                    price: "$" + (item.payment_info?.amount) / 100 || "$0", // Adjust based on your payment object
                    createdAt: format(item.createdAt),
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, coursesData]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'userName', headerName: 'Name', flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
            ? []
            : [
                  { field: 'userEmail', headerName: 'Email', flex: 1 },
                  { field: 'title', headerName: 'Course Title', flex: 1 },
              ]),
        { field: 'price', headerName: 'Price', flex: 0.5 },
        { field: 'createdAt', headerName: 'Created At', flex: 0.5 },
        ...(isDashboard
            ? []
            : [
                  {
                      field: ' ',
                      headerName: 'Email',
                      flex: 0.2,
                      renderCell: (params: any) => {
                          return (
                              <a href={`mailto:${params.row.userEmail}`}>
                                  <AiOutlineMail className="dark:text-white text-black" size={20} />
                              </a>
                          );
                      },
                  },
              ]),
    ];

    return (
        <div className={!isDashboard ? 'mt-[120px]' : 'mt-[0px]'}>
            <Box m={isDashboard ? '0' : '40px'}>
                <Box
                    m={isDashboard ? '0' : '40px 0 0 0'}
                    height={isDashboard ? '40vh' : '90vh'}
                     sx={{
            "& .MuiDataGrid-root": { border: "none", outline: "none" },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30!important"
                  : "1px solid #ccc!important",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "transparent !important",
              "&:hover": { backgroundColor: "transparent !important" },
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent !important",
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-cell": { borderBottom: "none!important" },
            "& .name-column--cell": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
              borderBottom: "none",
              color: "#fff !important",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
              color: "#fff !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer": {
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? "#b7ebde !important" : "#000 !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#fff !important",
            },
          }}
                >
                   <DataGrid
                            checkboxSelection={isDashboard ? false : true}
                            rows={orderData}
                            columns={columns}
                            slots={{ toolbar: isDashboard ? undefined : GridToolbar }}
                        />
                </Box>
            </Box>
        </div>
    );
};

export default AllInvoices;