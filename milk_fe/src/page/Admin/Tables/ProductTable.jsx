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
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, Table } from "@mui/joy";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { Image } from "antd";

const ProductTable = () => {
  const token = localStorage.getItem("sessionToken");
  const userRole = localStorage.getItem("roles");

  // State
  const [searchKeyword, setSearchKeyword] = useState("");
  const [productData, setProductData] = useState([]);

  // Pagination configuration
  const [page, setPage] = useState(1); //Current page
  const itemsPerPage = 8; //Items per page

  // Start and End index to cut userData into paginatedItems
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = productData.slice(startIndex, endIndex) || [];

  // Logic call API
  const getProductList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.ok) {
        const data = await response.json();
        setProductData(data);
      } else {
        toast.error("Lỗi tải danh sách sản phẩm: ");
      }
    } catch (err) {
      toast.error("Lỗi tải danh sách sản phẩm: ", err);
    }
  };

  // Call API when load and page
  useEffect(() => {
    getProductList();
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
            Danh sách sản phẩm
          </Typography>

          {/* Search & Filter */}
          <Box>
            <TextField
              sx={{ mr: 2 }}
              size="small"
              value={searchKeyword}
              //   onChange={(e) => {
              //     setSearchKeyword(e.target.value);
              //     setPage(1);
              //   }}
              placeholder="Tìm theo tên"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* <TextField
              select
              size="small"
              // value={roleFilter}
              onChange={(e) => {
                // setRoleFilter(e.target.value);
                setPage(1); // reset to first page
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Tất cả nhãn hàng</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </TextField> */}
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
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
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Nhãn hiệu</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {paginatedItems.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell>
                    <Image width={100} preview={true} src={product.image} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <DeleteIcon color="error" />
                  </TableCell>
                </TableRow>
              ))}
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
                      count={Math.ceil(paginatedItems.length / itemsPerPage)} //Calculate total of how many page need to display
                      page={page}
                      // onChange={handlePageChange}
                    />

                    <Typography color="text.secondary">
                      Tổng số sản phẩm: {paginatedItems.length}
                    </Typography>
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

export default ProductTable;
