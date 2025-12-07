import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js"
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const {isLoading , data , refetch } = useGetAllCoursesQuery({} , {refetchOnMountOrArgChange:true})
  const [deleteCourse , {isSuccess , error}] = useDeleteCourseMutation();
  const [open, setOpen] = useState(false)
  const [courseId, setCourseId] = useState("")

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
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="text-black dark:text-white hover:text-red-500 transition-colors" size={20} />
            </Link>
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
            <Button
            onClick={()=>{
              setOpen(!open)
              setCourseId(params.row.id)
            }}>
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

  useEffect(() => {
    if(isSuccess){
      setOpen(false)
      refetch()
      toast.success("Course Created Successfully");
    }
    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }
  }, [isSuccess , error])
  

  const handleDelete =  async ()=>{
    const id = courseId;
    await deleteCourse(id)
  }

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

<Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <Typography
                    variant="h6"
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-center mb-4`}
                  >
                    Are you sure you want to delete this course?
                  </Typography>
                  <div className="flex w-full justify-between items-center">
                    <Button
                      className="text-white !bg-[#57c7a3]"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="text-white !bg-[#d63f3f]"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </Modal>


      </Box>
    
    
    )}
    </div>
  );
};

export default AllCourses;