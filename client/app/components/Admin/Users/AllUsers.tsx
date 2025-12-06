import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "../../../../redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";

type Props = { isTeam: boolean };

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateUserRole, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  const [active, setActive] = useState(false); // Add Member Modal
  const [open, setOpen] = useState(false); // Delete Confirmation Modal
  const [userId, setUserId] = useState("");

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isUpdateSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
      setEmail("");
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isUpdateSuccess, deleteSuccess, deleteError, refetch]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "name", headerName: "Name", flex: 0.5 },
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
              <AiOutlineMail
                className="text-black dark:text-white hover:text-green-500 transition-colors"
                size={20}
              />
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
            <Button
              onClick={() => {
                setOpen(true);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="text-black dark:text-white hover:text-red-500 transition-colors"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    if (newData) {
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
    }
  } else {
    if (data) {
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = data?.users?.find((u: any) => u.email === email);
    if (user) {
      await updateUserRole({ id: user._id, role });
    } else {
      toast.error("User not found!");
    }
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[80px] w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          m="20px 0 0 0"
          height="80vh"
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
          <Modal
            open={active}
            onClose={() => setActive(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Add New Member
              </Typography>
              <div className="mt-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${theme === "dark" ? "dark-input" : ""} mb-4`}
                  InputLabelProps={{
                    className: theme === "dark" ? "text-white" : "text-black",
                  }}
                  InputProps={{
                    className:
                      theme === "dark"
                        ? "text-white border-white"
                        : "text-black",
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                      "&:hover fieldset": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel
                    id="role-select-label"
                    sx={{ color: theme === "dark" ? "#fff" : "#000" }}
                  >
                    Role
                  </InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    sx={{
                      color: theme === "dark" ? "#fff" : "#000",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme === "dark" ? "#fff" : "#000",
                      },
                      ".MuiSvgIcon-root": {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
                <div className="w-full flex justify-end mt-4">
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className={`${
                      theme === "dark" ? "bg-[#3e4396]" : "bg-[#A4A9FC]"
                    } text-white`}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>

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
                Are you sure you want to delete this user?
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

          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              onClick={() => setActive(true)}
              className={`mb-4 ${
                theme === "dark"
                  ? "bg-[#494eb4] text-white hover:bg-[#4f54ad]"
                  : "bg-[#A4A9FC] text-white hover:bg-[#8e93d3]"
              } font-bold`}
            >
              Add New Member
            </Button>
          </div>

          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
