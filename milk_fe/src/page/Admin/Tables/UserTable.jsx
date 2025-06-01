import { Box, Button, Container, Typography } from "@mui/material";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserTable = () => {
  const token = localStorage.getItem("sessionToken");

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user`, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.ok) {
          const userData = await response.json();
          console.log(userData);
        } else {
          toast.error("Lỗi tải danh sách người dùng: ");
        }
      } catch (err) {
        toast.error("Lỗi tải danh sách người dùng: ", err);
      }
    };

    getUserList();
  }, []);

  return (
    <Box sx={{ px: 3, mt: 2, width: "100%" }}>
      {/* Icon back to dashboard */}
      <BackToDashboardButton />

      {/* Title & Filter */}
      <Box
        sx={{
          displa: "flex",
          backgroundColor: "#ffffff",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          mb: 2,
        }}
      >
        <Typography variant="h5">Danh sách người dùng</Typography>
      </Box>
    </Box>
  );
};

export default UserTable;
