import {
  Box,
  InputAdornment,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, Table } from "@mui/joy";

const UserTable = () => {
  const token = localStorage.getItem("sessionToken");
  const [usersData, setUserData] = useState([]);

  // Pagination configuration
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = usersData.slice(startIndex, endIndex) || [];

  const handlePageChange = (e, value) => setPage(value);

  // Call API
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
          const data = await response.json();
          // console.log(userData);
          setUserData(data);
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
    <Box
      sx={{
        px: 3,
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Icon back to dashboard */}
      <BackToDashboardButton />

      <Sheet
        sx={{
          backgroundColor: "#fff",
          border: "1px",
          borderRadius: 10,
          p: 2,
          mb: 2,
        }}
      >
        {/* Title & Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            mb: 2,
            mt: 1,
          }}
        >
          {/* Title */}
          <Typography sx={{ p: 4 }} variant="h5">
            Danh sách người dùng
          </Typography>

          {/* Search */}
          <TextField
            sx={{ mr: 2 }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Tìm kiếm người dùng"
          />
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          {/* Table */}
          <Table
            size="md"
            variant="outlined"
            borderAxis="xBetween"
            stickyHeader
            stickyFooter
            color="neutral"
          >
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền hạn</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedItems.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.roles}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <Box display="flex" justifyContent="center">
                    <Pagination
                      size="small"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(usersData.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Sheet>
    </Box>
  );
};

export default UserTable;
