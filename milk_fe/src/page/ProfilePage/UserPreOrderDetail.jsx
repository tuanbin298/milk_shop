import {
  Box,
  Button,
  Chip,
  Paper,
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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PaymentIcon from "@mui/icons-material/Payment";
import { Table } from "@mui/joy";
import { Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../utils/formatDateTime";
import { formatMoney } from "../../utils/formatMoney";

const UserPreorderDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("sessionToken");
  const navigate = useNavigate();
  const [preorderData, setPreorderData] = useState(null);

  const getPreorder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/preorders/getById/${id}`,
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
        setPreorderData(data);
      } else {
        toast.error("Lỗi tải đơn đặt trước");
      }
    } catch (error) {
      toast.error("Lỗi tải đơn đặt trước");
    }
  };

  useEffect(() => {
    getPreorder();
  }, []);

  const renderStatusChip = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Đang chờ"
            color="warning"
            size="small"
          />
        );
      case "CONFIRMED":
        return (
          <Chip
            icon={<DoneAllIcon />}
            label="Đã xác nhận"
            color="info"
            size="small"
          />
        );
      case "PAID":
        return (
          <Chip
            icon={<PaymentIcon />}
            label="Đã thanh toán"
            color="primary"
            size="small"
          />
        );
      case "CANCELED":
      default:
        return (
          <Chip
            icon={<CancelIcon />}
            label="Đã hủy"
            color="error"
            size="small"
          />
        );
    }
  };

  return (
    <>
      <Button
        onClick={() => navigate("/profile-user/userpreorder")}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Quay lại
      </Button>

      <Paper
        elevation={3}
        sx={{ p: 2, maxWidth: 1000, mx: "auto", mt: 1, borderRadius: 2 }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
          Thông tin đơn đặt trước #{preorderData?.id}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>
            <PersonIcon color="primary" /> Khách hàng:{" "}
            {preorderData?.fullName || "Khách hàng"}
          </Typography>

          <Typography>
            <MonetizationOnIcon color="primary" /> Số lượng:{" "}
            {preorderData?.quantity}
          </Typography>

          <Typography>
            <CalendarMonthIcon color="action" /> Ngày đặt:{" "}
            {preorderData?.createdAt
              ? `${formatDate(
                  preorderData.createdAt.split("T")[0]
                )} | ${formatTime(preorderData.createdAt)}`
              : "Đang tải..."}
          </Typography>

          <Typography>
            <LocationOnIcon color="error" /> Địa chỉ:{" "}
            {preorderData?.address || "Chưa có"}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            Trạng thái: {renderStatusChip(preorderData?.status)}
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" fontWeight={700} mb={2} mt={2}>
        Sản phẩm đặt trước
      </Typography>

      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
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
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preorderData && (
                <TableRow>
                  <TableCell>
                    <Image
                      width={100}
                      height={100}
                      preview={true}
                      src={
                        preorderData.image || "https://via.placeholder.com/100"
                      }
                      alt="product"
                    />
                  </TableCell>
                  <TableCell>{preorderData.productName}</TableCell>
                  <TableCell>
                    {formatMoney(preorderData.unitPrice || 0)}
                  </TableCell>
                  <TableCell>{preorderData.quantity}</TableCell>
                  <TableCell>
                    {formatMoney(
                      (preorderData.unitPrice || 0) * preorderData.quantity
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserPreorderDetail;
