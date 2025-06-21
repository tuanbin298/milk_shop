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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, Table } from "@mui/joy";
import UpdateUser from "../Forms/UserForm/FormUpdateUser";

const UserTable = () => {
  const token = localStorage.getItem("sessionToken");
  const userRole = localStorage.getItem("roles");

  // State
  const [usersData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Search and filter user
  const filterUser = usersData.filter((user) => {
    const matchesKeyword = user.fullName
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const matchesRole = roleFilter
      ? user.roles.toLowerCase() === roleFilter.toLowerCase()
      : true;

    return matchesKeyword && matchesRole;
  });

  // Pagination configuration
  const [page, setPage] = useState(1); //Current page
  const itemsPerPage = 12; //Items per page

  // Start and End index to cut userData into paginatedItems
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = filterUser.slice(startIndex, endIndex) || [];

  // Handle page change
  const handlePageChange = (e, value) => setPage(value);

  // Logic call API
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

  // Call API when load and page
  useEffect(() => {
    getUserList();
  }, []);

  // Handle row click
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // Handle delete user
  const handleDeleteUser = async (e) => {
    const userId = selectedUserDelete.id;

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Xoá thành công");
        setOpenDeleteModal(false);
        setSelectedUserDelete(null);
        getUserList();
      } else {
        toast.error("Xoá người dùng thất bại");
      }
    } catch (error) {
      toast.error("Xoá thất bại");
    }
  };

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

          {/* Search & Filter */}
          <Box>
            <TextField
              sx={{ mr: 2 }}
              size="small"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tên"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              size="small"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1); // reset to first page
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Tất cả quyền</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </TextField>
          </Box>
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
                <TableCell sx={{ minWidth: 200 }}>Tên</TableCell>
                <TableCell
                  sx={{
                    minWidth: 250,
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Email
                </TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((user) => (
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
                    <TableCell
                      sx={{
                        minWidth: 250,
                        maxWidth: 300,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.username}
                    </TableCell>
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
                        label={
                          user.status ? "Đang hoạt động" : "Ngưng hoạt động"
                        }
                        color={user.status ? "success" : "error"}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    {userRole === "ADMIN" ? (
                      <TableCell>
                        <DeleteIcon
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent open modal
                            setSelectedUserDelete(user);
                            setOpenDeleteModal(true);
                          }}
                          sx={{ color: "red", cursor: "pointer", mr: 2 }}
                        />
                        <VisibilityIcon
                          onClick={() => handleRowClick(user)}
                          sx={{ color: "green", cursor: "pointer" }}
                        />
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                ))
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không tìm thấy người dùng
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>

            {/* Footer */}
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
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
                      Tổng số người: {filterUser.length}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* Modal for user detail */}
        <UpdateUser
          open={openModal}
          user={selectedUser}
          handleClose={() => setOpenModal(false)}
          refreshUsers={getUserList}
        />

        {/* Modal confirm delete */}
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="error.main">
              Xác nhận xoá
            </Typography>

            <Typography color="text.secondary">
              Bạn có chắc chắn muốn xoá người dùng này?
            </Typography>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenDeleteModal(false)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  fontWeight: 600,
                }}
              >
                HỦY
              </Button>
              <Button
                onClick={handleDeleteUser}
                variant="text"
                sx={{
                  color: "#f44336",
                  border: "2px solid #f44336",
                  borderColor: "#f44336",
                  backgroundColor: "#ffffff",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                    borderColor: "#f44336",
                  },
                }}
              >
                XÁC NHẬN
              </Button>
            </Box>
          </Box>
        </Modal>
      </Sheet>
    </Box>
  );
};

export default UserTable;
