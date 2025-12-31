import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  if (isLoading) return <Loader />

  return (
    <div className="mt-[120px] px-5">
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-xl font-bold font-Poppins text-center dark:text-white mb-4">
              Are you sure you want to delete this course?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className="w-[120px] h-[30px] bg-[#37a39a] rounded-[3px] text-center cursor-pointer flex items-center justify-center text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </div>
              <div
                className="w-[120px] h-[30px] bg-[#d63f3f] rounded-[3px] text-center cursor-pointer flex items-center justify-center text-white"
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-[#ffffff1d] shadow-xl bg-white/10 backdrop-blur-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Course Title</th>
              <th scope="col" className="px-6 py-3">Ratings</th>
              <th scope="col" className="px-6 py-3">Purchased</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data && data.courses.map((item: any) => (
              <tr key={item._id} className="border-b border-gray-200/20 hover:bg-gray-100/20 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{item._id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.ratings}</td>
                <td className="px-6 py-4">{item.purchased}</td>
                <td className="px-6 py-4">{format(item.createdAt)}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/edit-course/${item._id}`}>
                    <FiEdit2 className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer" />
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Button onClick={() => { setOpen(true); setCourseId(item._id); }}>
                    <AiOutlineDelete className="text-xl text-red-500 hover:text-red-400 cursor-pointer" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourses;