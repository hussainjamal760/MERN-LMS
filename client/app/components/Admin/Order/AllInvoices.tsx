import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { AiOutlineMail } from 'react-icons/ai';

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => ({
                id: item._id,
                userName: item.userName,
                userEmail: item.userEmail,
                title: item.title,
                price: item.price,
                createdAt: item.createdAt,
            }));
            setOrderData(temp);
        }
    }, [data]);

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
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 0.5,
            renderCell: (params) => {
               return format(params.row.createdAt);
            }
        },
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
                                  <AiOutlineMail
                                      className="dark:text-white text-black"
                                      size={20}
                                  />
                              </a>
                          );
                      },
                  },
              ]),
    ];

    const rows: any = [];

    orderData &&
        orderData.forEach((item: any) => {
            rows.push({
                id: item.id,
                userName: item.userName,
                userEmail: item.userEmail,
                title: item.title,
                price: "$" + item.price,
                createdAt: item.createdAt,
            });
        });

    return (
        <div className={!isDashboard ? 'mt-[120px]' : 'mt-[0px]'}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m={isDashboard ? '0' : '40px'}>
                    <Box
                        m={isDashboard ? '0' : '40px 0 0 0'}
                        height={isDashboard ? '35vh' : '90vh'}
                        overflow={'hidden'}
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
                                borderBottom: "none",
                                color: "#fff !important", 
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderTop: "none",
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: "#fff !important",
                            },
                             // Text color for rows
                             "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={isDashboard ? false : true}
                            rows={rows}
                            columns={columns}
                            slots={{ toolbar: isDashboard ? undefined : GridToolbar }}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AllInvoices;