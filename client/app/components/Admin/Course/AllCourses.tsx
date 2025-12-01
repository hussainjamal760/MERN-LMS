import React from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js"

type Props = {}

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const {isLoading , data , error} = useGetAllCoursesQuery({})

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
     {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <FiEdit2 className="text-black dark:text-white hover:text-red-500 transition-colors" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete className="text-black dark:text-white hover:text-red-500 transition-colors" size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  

  const rows:any = [];

  {data && data.courses.forEach((item:any)=>{
    rows.push({
        id:item._id,
        title:item.name,
        ratings:item.ratings,
        purchased:item.purchased,
        createdAt:format(item.createdAt)
        
    })
  })}

  return (
    <div className="mt-[80px] w-full"> 
      {isLoading ?
       (<Loader/>)
       : (<Box 
        m="20px 0 0 0" 
        height="80vh" 
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .MuiDataGrid-row": {
            color: theme === 'dark' ? "#fff" : "#000",
            borderBottom: theme === 'dark' ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "transparent !important", 
            "&:hover": {
                 backgroundColor: "transparent !important", 
            }
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "transparent !important", 
          },
          "& .MuiTablePagination-root": {
            color: theme === 'dark' ? "#fff" : "#000",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: theme === 'dark' ? "#fff" : "#000",
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme === 'dark' ? "#3e4396 !important" : "#A4A9FC !important",
            borderBottom: "none",
            color: "#fff !important", 
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme === 'dark' ? "#3e4396 !important" : "#A4A9FC !important",
            color: "#fff !important", 
          },
          "& .MuiDataGrid-columnHeaderTitle": {
             fontWeight: "bold",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === 'dark' ? "#1F2A40" : "#F2F0F0",
          },
          "& .MuiDataGrid-footerContainer": {
            color: theme === 'dark' ? "#fff" : "#000",
            borderTop: "none",
            backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC",
          },
          "& .MuiCheckbox-root": {
            color: theme === 'dark' ? "#b7ebde !important" : "#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#fff !important",
          },
        }}
      >
        <DataGrid 
            checkboxSelection 
            rows={rows} 
            columns={columns} 
        />
      </Box>)}
    </div>
  );
};

export default AllCourses;