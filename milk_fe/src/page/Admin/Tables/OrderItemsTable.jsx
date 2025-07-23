import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../../utils/formatDateTime";
import { formatMoney } from "../../../utils/formatMoney";
import PersonIcon from "@mui/icons-material/Person";
import { Table } from "@mui/joy";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { setProductSelected } from "../../../state/filter/filterSlice";

const renderStatusChip = (status) => {
  switch (status) {
    case "PAID":
      return <Chip icon={<PaidIcon />} label="Đã thanh toán" color="success" />;
    case "PENDING":
      return (
        <Chip
          icon={<AccessTimeIcon />}
          label="Chờ thanh toán"
          color="warning"
        />
      );
    case "PACKAGING":
      return (
        <Chip icon={<InventoryIcon />} label="Đang đóng gói" color="info" />
      );
    case "PROCESSING":
      return (
        <Chip
          icon={<LocalShippingIcon />}
          label="Đang vận chuyển"
          color="primary"
        />
      );
    case "COMPLETED":
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Hoàn thành đơn hàng"
          color="success"
        />
      );
    case "CANCELED":
      return <Chip icon={<CancelIcon />} label="Huỷ đơn hàng" color="error" />;
    default:
      return <Chip label="Không xác định" color="default" />;
  }
};

const OrderItemTable = () => {
  const { id } = useParams();
  const token = localStorage.getItem("sessionToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [orderData, setOrderData] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Call api
  const getOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        toast.error("Lỗi tải đơn hàng: ");
      }
    } catch (error) {
      toast.error("Lỗi tải đơn hàng: ", error);
    }
  };

  // Call API when load and page
  useEffect(() => {
    getOrder();
  }, []);

  const handleBackDashboard = () => {
    navigate("/dashboard/orderlist");
  };

  // console.log(orderData);

  // Logic handle order status to render status into dropdown
  // const getNextStatus = (currentStatus) => {
  //   switch (currentStatus) {
  //     case "PAID":
  //       return [{ value: "PACKAGING", label: "Đang đóng gói" }];
  //     case "PACKAGING":
  //       return [{ value: "PROCESSING", label: "Đang vận chuyển" }];
  //     case "PROCESSING":
  //       return [{ value: "COMPLETED", label: "Đã hoàn thành" }];
  //     default:
  //       return [];
  //   }
  // };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "PAID":
        return [{ value: "PROCESSING", label: "Đang vận chuyển" }];
      case "PROCESSING":
        return [{ value: "COMPLETED", label: "Đã hoàn thành" }];
      default:
        return [];
    }
  };

  const orderStatusOptions = getNextStatus(orderData?.status);

  // Handle submit change status
  const onUpdateOrder = async (newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${id}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        getOrder();
        window.dispatchEvent(new Event("order-status-updated"));
        toast.success("Cập nhật trạng thái thành công!");
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
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
      <Button
        onClick={handleBackDashboard}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2, mt: 2 }}
      >
        Quay lại
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Thông tin đơn hàng #{orderData?.id}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          {/* User */}
          <Typography>
            <PersonIcon color="primary" />
            Khách hàng: {orderData?.fullName || "Khách hàng"}
          </Typography>

          {/* Totol Amount */}
          <Typography>
            <MonetizationOnIcon color="primary" />
            Tổng tiền: {formatMoney(orderData?.totalAmount)}
          </Typography>

          {/* Order Date */}
          <Typography>
            <CalendarMonthIcon color="action" />
            Ngày đặt:{" "}
            {orderData?.orderDate
              ? `${formatDate(
                  orderData.orderDate.split("T")[0]
                )} | ${formatTime(orderData.orderDate)}`
              : "Đang tải..."}
          </Typography>

          {/* Address */}
          <Typography>
            <LocationOnIcon color="error" />
            Địa chỉ: {orderData?.address}
          </Typography>

          {/* Paid At */}
          <Typography>
            <PaymentsIcon color="info" />
            Thời gian thanh toán:{" "}
            {orderData?.paidAt
              ? `${formatDate(orderData.paidAt)} | ${formatTime(
                  orderData.paidAt
                )}`
              : "Chưa thanh toán"}
          </Typography>

          {/* Status */}
          <Box display="flex" alignItems="center" gap={1}>
            <InventoryIcon />
            Trạng thái: {renderStatusChip(orderData?.status)}
          </Box>

          {/* Dropdown manage status */}
          {orderStatusOptions?.length > 0 && (
            <Box mt={1} display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" fontWeight={500}>
                Cập nhật trạng thái:
              </Typography>
              <Select
                size="small"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                sx={{ minWidth: 180 }}
              >
                {orderStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={!newStatus}
                onClick={() => onUpdateOrder(newStatus)}
              >
                Xác nhận
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      <Typography variant="h6" fontWeight={700} mb={2}>
        Danh sách sản phẩm
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
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.orderItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    preview={true}
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setProductSelected(item.productName));
                    navigate("/dashboard/productlist");
                  }}
                  sx={{
                    fontWeight: 500,
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "primary.dark",
                    },
                  }}
                >
                  {item.productName}
                </TableCell>
                <TableCell>{formatMoney(item.unitPrice)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatMoney(item.totalPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderItemTable;
