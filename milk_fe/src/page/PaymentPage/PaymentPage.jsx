import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../utils/formatDateTime";
import { formatMoney } from "../../utils/formatMoney";

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("sessionToken");

  // State
  const [orderData, setOrderData] = useState(null);
  const [orderItemsData, setOrderItemsData] = useState([]);

  // Get order
  const getOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.ok) {
        const data = await response.json();

        if (data.status === "CANCELED") {
          navigate("/checkout");
          toast.info("Đơn hàng bị huỷ do Ba/Mẹ chưa thanh toán!!!");
          return;
        }

        setOrderData(data);
        setOrderItemsData(data.orderItems);
      }
    } catch (error) {
      console.error("Lỗi tải đơn hàng người dùng: ", error);
    }
  };
  console.log(orderData);

  useEffect(() => {
    getOrder();

    // Auto call getOrder each 1 min to check, if order not exist move to cart page
    // BE logic: if user dont pay in  min, auto cancel order
    const interval = setInterval(() => {
      getOrder();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Logic navigate to url payment of vnpay
  const handlePayment = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/payments/generate?orderId=${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.ok) {
        const paymentUrl = await response.text();
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Lỗi khi chuyển sang trang thanh toán vnpay: ", error);
    }
  };

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      mt={4}
      mb={4}
      p={4}
      boxShadow={2}
      bgcolor="#fff"
      borderRadius={2}
    >
      <Typography variant="h4" fontWeight="bold" mb={2}>
        <InventoryIcon className="mr-2" />
        THÔNG TIN ĐƠN HÀNG
      </Typography>
      <Typography variant="h7" mb={2}>
        Ba/Mẹ vui lòng thanh toán trong 5 phút để xác nhận mua hàng
      </Typography>

      <Divider sx={{ my: 2 }} />

      {orderData ? (
        <Box mb={2}>
          <Typography>
            <strong>Ngày đặt:</strong>{" "}
            {formatDate(orderData.orderDate.split("T")[0])} {" | "}
            {formatTime(orderData.orderDate)}
          </Typography>
          <Typography>
            <strong>Mã đơn hàng:</strong> # {orderData.id}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            <strong>Thông tin giao hàng</strong>
          </Typography>
          <Typography>
            <strong>Khách hàng:</strong> {localStorage.getItem("fullName")}
          </Typography>
          <Typography>
            <strong>Email:</strong> {localStorage.getItem("username")}
          </Typography>
          <Typography>
            <strong>Số điện thoại:</strong> {localStorage.getItem("phone")}
          </Typography>
          <Typography>
            <strong>Địa chỉ:</strong> {orderData.address}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Order Items */}
          <Typography variant="h6" gutterBottom>
            <strong>Chi tiết đơn hàng</strong>
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>#</strong>
                </TableCell>
                <TableCell>
                  <strong>Mã SP</strong>
                </TableCell>
                <TableCell>
                  <strong>Tên sản phẩm</strong>
                </TableCell>
                <TableCell>
                  <strong>Số lượng</strong>
                </TableCell>
                <TableCell>
                  <strong>Đơn giá</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItemsData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item?.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatMoney(item.totalPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Typography variant="h6">
              <strong>Tổng tiền:</strong> {formatMoney(orderData.totalAmount)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePayment(orderData.id)}
            >
              Thanh toán
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>Đang tải đơn hàng...</Typography>
      )}
    </Box>
  );
}
