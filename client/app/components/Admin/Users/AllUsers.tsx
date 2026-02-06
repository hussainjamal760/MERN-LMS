import React, { FC, useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";

type Props = { isTeam: boolean };

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });

  const [updateUserRole, { error: updateError, isSuccess: isUpdateSuccess }] = useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation();

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (updateError && "data" in updateError) {
      const errorMessage = updateError as any;
      toast.error(errorMessage.data.message);
    }
    if (isUpdateSuccess) {
      refetch();
      toast.success("User Role Updated Successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User Deleted Successfully");
      setOpen(false);
    }
    if (deleteError && "data" in deleteError) {
      const errorMessage = deleteError as any;
      toast.error(errorMessage.data.message);
    }
  }, [updateError, isUpdateSuccess, deleteSuccess, deleteError, refetch]);

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  if (isLoading) return <Loader />;

  let rows: any[] = [];
  if (isTeam) {
    const newData = data && data.users.filter((item: any) => item.role === "admin");
    rows = newData?.map((item: any) => ({
      ...item,
      courses: item.courses.length,
      joinedAt: format(item.createdAt),
    })) || [];
  } else {
    rows = data?.users.map((item: any) => ({
      ...item,
      courses: item.courses.length,
      joinedAt: format(item.createdAt),
    })) || [];
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

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
              Are you sure you want to delete this user?
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

      <div className="w-full overflow-hidden rounded-[20px] shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111C43]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-200">
              <tr>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">ID</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Name</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Email</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Role</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Courses</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Joined At</th>
                <th  scope="col" className="px-6 py-4 font-semibold tracking-wide">Delete</th>
                <th  scope="col" className="px-6 py-4 text-center font-semibold tracking-wide">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {currentItems.map((row: any) => (
                <tr key={row._id} className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">{row._id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white capitalize">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      <a href={`mailto:${row.email}`} className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{row.email}</a>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-300">{row.role}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                         {row.courses} Enrolled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">{row.joinedAt}</td>
                  <td className="px-6 py-4">
                    <button 
                        onClick={() => { setOpen(true); setUserId(row._id); }}
                        className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a href={`mailto:${row.email}`} className="inline-flex items-center justify-center p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400">
                      <AiOutlineMail className="text-xl" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No users found.
                </div>
            )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastItem, rows.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{rows.length}</span> entries
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

export default AllUsers;