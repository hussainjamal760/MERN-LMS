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

      <div className="w-full overflow-x-auto rounded-xl border border-[#ffffff1d] shadow-xl bg-white/10 backdrop-blur-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Courses</th>
              <th className="px-6 py-3">Joined At</th>
              <th className="px-6 py-3">Delete</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any) => (
              <tr key={row._id} className="border-b border-gray-200/20 hover:bg-gray-100/20 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{row._id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.name}</td>
                <td className="px-6 py-4"><a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a></td>
                <td className="px-6 py-4 capitalize">{row.role}</td>
                <td className="px-6 py-4">{row.courses}</td>
                <td className="px-6 py-4">{row.joinedAt}</td>
                <td className="px-6 py-4">
                  <Button onClick={() => { setOpen(true); setUserId(row._id); }}>
                    <AiOutlineDelete className="text-xl text-red-500 hover:text-red-400 cursor-pointer" />
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <a href={`mailto:${row.email}`} className="text-xl text-green-500 hover:text-green-400">
                    <AiOutlineMail />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;