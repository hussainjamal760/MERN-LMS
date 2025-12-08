import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { AiOutlineMail } from 'react-icons/ai';

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();

    const rows = [
        { id: '1234556776', userName: 'Shahriar Sajeeb', userEmail: 'support@lms.com', title: 'MERN Stack LMS Platform', price: '$20', createdAt: '2 days ago' },
        { id: '1234556777', userName: 'Sunny Khan', userEmail: 'sunny@gmail.com', title: 'React Native Course', price: '$15', createdAt: '5 days ago' },
        { id: '1234556778', userName: 'Qazi', userEmail: 'qazi@gmail.com', title: 'Next.js 13 Full Course', price: '$30', createdAt: '1 week ago' },
        { id: '1234556779', userName: 'Hussain', userEmail: 'hussain@gmail.com', title: 'Python for Beginners', price: '$10', createdAt: '2 weeks ago' },
        { id: '1234556780', userName: 'John Doe', userEmail: 'johndoe@gmail.com', title: 'Data Science Bootcamp', price: '$50', createdAt: '1 month ago' },
        { id: '1234556781', userName: 'Alice Smith', userEmail: 'alice@gmail.com', title: 'UI/UX Design Masterclass', price: '$25', createdAt: '1 month ago' },
        { id: '1234556782', userName: 'Bob Johnson', userEmail: 'bob@gmail.com', title: 'DevOps Essentials', price: '$40', createdAt: '2 months ago' },
        { id: '1234556783', userName: 'Charlie Brown', userEmail: 'charlie@gmail.com', title: 'Machine Learning A-Z', price: '$60', createdAt: '2 months ago' },
        { id: '1234556784', userName: 'David Wilson', userEmail: 'david@gmail.com', title: 'Cyber Security Basics', price: '$35', createdAt: '3 months ago' },
        { id: '1234556785', userName: 'Eva Davis', userEmail: 'eva@gmail.com', title: 'Cloud Computing with AWS', price: '$45', createdAt: '3 months ago' },
        { id: '1234556786', userName: 'Frank Miller', userEmail: 'frank@gmail.com', title: 'Blockchain Development', price: '$55', createdAt: '4 months ago' },
        { id: '1234556787', userName: 'Grace Lee', userEmail: 'grace@gmail.com', title: 'Game Development with Unity', price: '$30', createdAt: '4 months ago' },
    ];

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
                        rows={rows}
                        columns={columns}
                        slots={{ toolbar: isDashboard ? undefined : GridToolbar }}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default AllInvoices;