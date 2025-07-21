import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Button,
  Chip,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Table } from "@mui/joy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../utils/formatDateTime";

const UserPreOrder = () => {
  const token = localStorage.getItem("sessionToken");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [preOrders, setPreOrders] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = preOrders.slice(startIndex, endIndex);

  const handlePageChange = (e, value) => setPage(value);

  const getPreOrdersList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/preorders/me", {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPreOrders(data);
      } else {
        toast.error("Lỗi tải danh sách đặt trước");
      }
    } catch (error) {
      toast.error("Lỗi server khi tải danh sách đặt trước");
    }
  };

  useEffect(() => {
    getPreOrdersList();
  }, []);

  return (
    <>
      <Button
        onClick={() => navigate("/")}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Quay lại trang chủ
      </Button>

      <Paper
        elevation={3}
        sx={{ p: 1, maxWidth: 1000, mx: "auto", mt: 1, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight={700} color="primary" px={4} mb={4}>
          Danh sách đặt trước
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
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
                <TableCell sx={{ width: "110px" }}>Mã đặt trước</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell sx={{ width: "90px" }}>Số lượng</TableCell>
                <TableCell sx={{ width: "120px" }}>Ngày đặt</TableCell>
                <TableCell>Thời gian xác nhận</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <Tooltip title="Chi tiết đơn đặt trước" key={item.id}>
                    <TableRow
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() =>
                        navigate(`/profile-user/preorder/detail/${item.id}`)
                      }
                    >
                      <TableCell>#{item.id}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatDate(item.createdAt.split("T")[0])} {" | "}
                        {formatTime(item.createdAt)}
                      </TableCell>
                      <TableCell>
                        {item.confirmedAt ? (
                          <>
                            {formatDate(item.confirmedAt.split("T")[0])} {" | "}
                            {formatTime(item.confirmedAt)}
                          </>
                        ) : (
                          "Chưa xác nhận"
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={
                            item.status === "CONFIRMED" ||
                            item.status === "PAID" ? (
                              <CheckCircleIcon />
                            ) : item.status === "PENDING" ? (
                              <AccessTimeIcon />
                            ) : (
                              <CancelIcon />
                            )
                          }
                          label={
                            item.status === "CONFIRMED"
                              ? "Đã xác nhận"
                              : item.status === "PAID"
                              ? "Đã thanh toán"
                              : item.status === "PENDING"
                              ? "Đang chờ"
                              : "Đã hủy"
                          }
                          color={
                            item.status === "CONFIRMED"
                              ? "success"
                              : item.status === "PAID"
                              ? "info"
                              : item.status === "PENDING"
                              ? "warning"
                              : "error"
                          }
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>
                        {item.status === "CONFIRMED" && (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              try {
                                navigate(`/checkout/${item.id}`);
                              } catch (error) {
                                toast.error(
                                  "Chuyển hướng đến trang thanh toán thất bại"
                                );
                              }
                            }}
                            sx={{
                              borderRadius: "999px",
                              textTransform: "none",
                              fontWeight: 500,
                              px: 2.5,
                              py: 0.5,
                              fontSize: "0.85rem",
                              minHeight: "32px",
                            }}
                          >
                            Thanh toán
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </Tooltip>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có đơn đặt trước nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={2}
                    py={1}
                  >
                    <Pagination
                      size="small"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(preOrders.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                    />
                    <Typography color="text.secondary" fontWeight={500}>
                      Tổng đơn đặt trước: {preOrders.length}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default UserPreOrder;
