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
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Sheet, Table } from "@mui/joy";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import UpdateBrand from "../Forms/BrandForm/FormUpdateBrand"; // Tạo component này tương tự FormUpdateCategory

const BrandTable = () => {
  const token = localStorage.getItem("sessionToken");
  const userRole = localStorage.getItem("roles");

  const [brands, setBrands] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBrandDelete, setSelectedBrandDelete] = useState(null);

  // Fetch brands
  const getBrandList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/brands`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        console.error("Lỗi tải thương hiệu");
      }
    } catch (err) {
      console.error("Lỗi tải thương hiệu:", err);
    }
  };

  useEffect(() => {
    getBrandList();
  }, []);

  // Filter brands by search
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredBrands.slice(startIndex, endIndex);

  const handlePageChange = (e, value) => setPage(value);

  // Handle row click (open update modal)
  const handleRowClick = (brand) => {
    setSelectedBrand(brand);
    setOpenModal(true);
  };

  // Handle delete brand
  const handleDeleteBrand = async () => {
    const brandId = selectedBrandDelete.id;

    try {
      const response = await fetch(
        `http://localhost:8080/api/brands/${brandId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Xoá thành công");
        setOpenDeleteModal(false);
        setSelectedBrandDelete(null);
        getBrandList();
      } else {
        alert("Xoá thương hiệu thất bại");
      }
    } catch (error) {
      alert("Xoá thất bại");
    }
  };

  return (
    <Box
      sx={{ px: 3, width: "100%", height: "100%", backgroundColor: "#f4f4f4" }}
    >
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
          <Typography sx={{ p: 4 }} variant="h5">
            Danh sách thương hiệu
          </Typography>

          <TextField
            sx={{ mr: 2 }}
            size="small"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo tên thương hiệu"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200 }}>Tên thương hiệu</TableCell>
                <TableCell sx={{ minWidth: 300 }}>Mô tả</TableCell>
                <TableCell>Trạng thái</TableCell>
                {userRole === "ADMIN" && <TableCell>Hành động</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedItems.map((brand) => (
                <TableRow
                  key={brand.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => handleRowClick(brand)}
                >
                  <TableCell>{brand.name}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {brand.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        brand.active ? "Đang hoạt động" : "Ngưng hoạt động"
                      }
                      color={brand.active ? "success" : "error"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  {userRole === "ADMIN" && (
                    <TableCell>
                      <DeleteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBrandDelete(brand);
                          setOpenDeleteModal(true);
                        }}
                        sx={{ color: "red", cursor: "pointer" }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={userRole === "ADMIN" ? 4 : 3}>
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
                      count={Math.ceil(filteredBrands.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                    />

                    <Typography color="text.secondary">
                      Tổng số thương hiệu: {filteredBrands.length}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* Modal for update brand */}
        <UpdateBrand
          open={openModal}
          brand={selectedBrand}
          handleClose={() => setOpenModal(false)}
          refreshBrands={getBrandList}
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
              Bạn có chắc chắn muốn xoá thương hiệu này?
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
                onClick={handleDeleteBrand}
                variant="text"
                sx={{
                  color: "#f44336",
                  border: "2px solid #f44336",
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
                XÓA
              </Button>
            </Box>
          </Box>
        </Modal>
      </Sheet>
    </Box>
  );
};

export default BrandTable;
