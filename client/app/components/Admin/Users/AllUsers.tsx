import React,{FC} from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from '../../../../redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js"

type Props = {isTeam:boolean}

const AllUsers:FC<Props> = ({isTeam}) => {
  const { theme } = useTheme();
  const {isLoading , data , error} = useGetAllUsersQuery({})

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Name", flex: .5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },  
    { field: "createdAt", headerName: "Joined At", flex: 0.5 },
     {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="text-black dark:text-white hover:text-green-500 transition-colors" size={20} />
            </a>
          </>
        );
      },
    },
    {
      field: " ",
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

  if (isTeam){
    const newData =  data && data.users.filter((item:any)=> item.role === "admin")

    {newData && newData.forEach((item:any)=>{
    rows.push({
        id:item._id,
        name:item.name,
        email:item.email,
        role:item.role,
        courses:item.courses.length,
        createdAt:format(item.createdAt)
        
    })
  })}
  }else{

      
      {data && data.users.forEach((item:any)=>{
    rows.push({
        id:item._id,
        name:item.name,
        email:item.email,
        role:item.role,
        courses:item.courses.length,
        createdAt:format(item.createdAt)
        
    })
})}

}
  return (
    <div className="mt-[80px] w-full"> 
      {isLoading ?
       (<Loader/>)
       : (
       <Box 
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
        <Button 
          variant="contained" 
          className={`
            mb-4 
            ${theme === 'dark' 
              ? 'bg-[#494eb4] text-white hover:bg-[#4f54ad]' 
              : 'bg-[#A4A9FC] text-white hover:bg-[#8e93d3]'
            } 
            font-bold
          `}
        >
          Add New Member
        </Button>
        <DataGrid 
            checkboxSelection 
            rows={rows} 
            columns={columns} 
        />
      </Box>)}
    </div>
  );
};

export default AllUsers;