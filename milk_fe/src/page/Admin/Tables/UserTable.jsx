import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Modal,
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
import CloseIcon from "@mui/icons-material/Close";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, Table } from "@mui/joy";

const UserTable = () => {
  const token = localStorage.getItem("sessionToken");

  // State
  const [usersData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination configuration
  const [page, setPage] = useState(1); //Current page
  const itemsPerPage = 12; //Items per page

  // Start and End index to cut userData into paginatedItems
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = usersData.slice(startIndex, endIndex) || [];

  // Handle page change
  const handlePageChange = (e, value) => setPage(value);

  // Call API
  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/user`, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.ok) {
          const data = await response.json();
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

  // Handle row click
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  console.log(usersData);

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
            {/* Head */}
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
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
                  onClick={() => handleRowClick(user)}
                >
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.roles}
                      sx={{
                        backgroundColor:
                          user.roles === "ADMIN"
                            ? "rgba(76, 175, 80, 0.1)"
                            : user.roles === "STAFF"
                            ? "rgba(255, 152, 0, 0.1)"
                            : "rgba(244, 67, 54, 0.1)",
                        color:
                          user.roles === "ADMIN"
                            ? "#4caf50"
                            : user.roles === "STAFF"
                            ? "#ff9800"
                            : "#f44336",
                        border: `1px solid ${
                          user.roles === "ADMIN"
                            ? "#4caf50"
                            : user.roles === "STAFF"
                            ? "#ff9800"
                            : "#f44336"
                        }`,
                        fontWeight: 500,
                        display: "inline-block",
                        minWidth: "90px",
                        textAlign: "center",
                      }}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status ? "Đang hoạt động" : "Ngưng hoạt động"}
                      color={user.status ? "success" : "default"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* Footer */}
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginX={2}
                  >
                    <Pagination
                      size="small"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(usersData.length / itemsPerPage)} //Calculate total of how many page need to display
                      page={page}
                      onChange={handlePageChange}
                    />

                    <Typography color="text.secondary">
                      Tổng số người dùng: {usersData.length}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* Modal for user detail */}
        <Modal open={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Btn close */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography variant="h6" sx={{ ml: 1 }}>
                Chi tiết người dùng
              </Typography>

              <Button
                variant="text"
                sx={{
                  color: "red",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={handleCloseModal}
              >
                <CloseIcon />
                Đóng
              </Button>
            </Box>

            {/* User detail */}
            <Box>
              {selectedUser && (
                <>
                  <TextField
                    fullWidth
                    label="Tên"
                    value={selectedUser.fullName}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedUser.username}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={selectedUser.phone}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </>
              )}
            </Box>
          </Box>
        </Modal>
      </Sheet>
    </Box>
  );
};

export default UserTable;
