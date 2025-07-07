import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Grid } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { BarChart } from "@mui/x-charts/BarChart";
import { formatMoney } from "../../utils/formatMoney";

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export default function DashboardOverview() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("sessionToken");

        const [ordersRes, productsRes] = await Promise.all([
          fetch("http://localhost:8080/api/orders", {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:8080/api/products/getAll", {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        // console.log(ordersRes);
        if (!ordersRes.ok || !productsRes.ok) {
          throw new Error("Tải dữ liệu thất bại");
        }

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        // console.log(ordersRes);
        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = React.useMemo(() => {
    let totalRevenue = 0;
    let totalProductSold = 0;
    let totalOrders = orders.length;
    let monthlyRevenue = Array(12).fill(0);

    orders.forEach((order) => {
      totalRevenue += order.price || 0;
      totalProductSold += order.items?.length || 0;

      const month = new Date(order.createAt).getMonth();
      monthlyRevenue[month] += order.price || 0;
    });

    return {
      totalRevenue,
      totalProductSold,
      totalOrders,
      totalProducts: products.length,
      monthlyRevenue,
    };
  }, [orders, products]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Lỗi: {error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "5%",
        bgcolor: "white",
        minHeight: "100vh",
      }}
    >
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 5, marginRight: "10%" }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Tổng quan
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TimelineIcon fontSize="large" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Tổng doanh thu</Typography>
                </Box>
                <Typography variant="h4">
                  {formatMoney(stats.totalRevenue)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PointOfSaleIcon fontSize="large" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Tổng sản phẩm bán</Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalProductSold} Sản phẩm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <CreditScoreIcon fontSize="large" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Tổng đơn hàng</Typography>
                </Box>
                <Typography variant="h4">{stats.totalOrders} Đơn</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <CreditScoreIcon fontSize="large" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Đơn đặt trước</Typography>
                </Box>
                <Typography variant="h4">
                  {stats.preorderOrders}0 Đơn
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Inventory2Icon fontSize="large" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">
                    Tổng sản phẩm trong kho
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalProducts} Sản phẩm
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={5}>
          <Card variant="outlined" sx={{ borderRadius: "5%", p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Doanh thu theo tháng
              </Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: months }]}
                series={[{ data: stats.monthlyRevenue }]}
                width={900}
                height={400}
                margin={{ left: 80 }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
