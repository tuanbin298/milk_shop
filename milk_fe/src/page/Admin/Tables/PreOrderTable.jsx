import {
  Box,
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
  Button,
  Modal,
} from "@mui/material";
import { Sheet, Table } from "@mui/joy";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { formatDate, formatTime } from "../../../utils/formatDateTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton } from "@mui/material";

const PreOrderTable = () => {
  const token = localStorage.getItem("sessionToken");
  const [preOrders, setPreOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedAction, setSelectedAction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = preOrders.slice(startIndex, endIndex);

  const handlePageChange = (e, value) => setPage(value);

  const getPreOrdersList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/preorders`, {
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

  const handleActionClick = (id, status) => {
    setSelectedAction({ id, status });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedAction(null);
  };

  const handleConfirmAction = async () => {
    const { id, status } = selectedAction;
    setDialogOpen(false);
    try {
      const res = await fetch(
        `http://localhost:8080/api/preorders/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success(
          status === "CONFIRMED"
            ? "Đơn đã được duyệt thành công"
            : "Đơn đã bị hủy"
        );
        getPreOrdersList();
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (err) {
      toast.error("Lỗi server khi cập nhật trạng thái");
    }
  };

  return (
    <Box
      sx={{ px: 3, width: "100%", height: "100%", backgroundColor: "#f4f4f4" }}
    >
      <BackToDashboardButton />

      <Sheet sx={{ backgroundColor: "#fff", borderRadius: 10, p: 2, mb: 5 }}>
        <Typography variant="h5" fontWeight={700} color="primary" px={4} mb={4}>
          Danh sách đơn đặt trước
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 540,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "auto",
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
                <TableCell>Mã đơn</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Thời gian xác nhận</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedItems.map((item) => (
                <Tooltip key={item.id} title="Chi tiết đơn đặt trước">
                  <TableRow
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
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
                        label={
                          item.status === "CONFIRMED"
                            ? "Đã xác nhận"
                            : item.status === "PENDING"
                            ? "Đang chờ"
                            : "Hủy"
                        }
                        color={
                          item.status === "CONFIRMED"
                            ? "success"
                            : item.status === "PENDING"
                            ? "warning"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {item.status === "PENDING" && (
                        <Box display="flex" gap={1}>
                          <Tooltip title="Duyệt đơn">
                            <IconButton
                              color="success"
                              onClick={() =>
                                handleActionClick(item.id, "CONFIRMED")
                              }
                            >
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Hủy đơn">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleActionClick(item.id, "CANCELED")
                              }
                            >
                              <CancelOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
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
      </Sheet>

      {/* Modal xác nhận duyệt / hủy */}
      <Modal open={dialogOpen} onClose={handleDialogClose}>
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
          <Typography variant="h6" fontWeight="bold" color="error">
            ⚠️ Xác nhận{" "}
            {selectedAction?.status === "CONFIRMED" ? "duyệt" : "hủy"}
          </Typography>

          <Typography color="text.secondary">
            {selectedAction
              ? selectedAction.status === "CONFIRMED"
                ? "Bạn có chắc chắn muốn DUYỆT đơn này?"
                : "Bạn có chắc chắn muốn HỦY đơn này?"
              : "Không có đơn nào được chọn."}
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDialogClose}
              sx={{
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
              }}
            >
              HỦY
            </Button>
            <Button
              onClick={handleConfirmAction}
              variant="text"
              disabled={!selectedAction}
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
    </Box>
  );
};

export default PreOrderTable;
