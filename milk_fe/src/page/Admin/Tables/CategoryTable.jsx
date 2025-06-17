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
import UpdateCategory from "../Forms/CategoryForm/FormUpdateCategory";

const CategoryTable = () => {
  const token = localStorage.getItem("sessionToken");
  const userRole = localStorage.getItem("roles");

  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategoryDelete, setSelectedCategoryDelete] = useState(null);

  // Fetch categories
  const getCategoryList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Lỗi tải danh mục");
      }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // Filter categories by search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredCategories.slice(startIndex, endIndex);

  const handlePageChange = (e, value) => setPage(value);

  // Handle row click (open update modal)
  const handleRowClick = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  // Handle delete category
  const handleDeleteCategory = async () => {
    const categoryId = selectedCategoryDelete.id;

    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${categoryId}`,
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
        setSelectedCategoryDelete(null);
        getCategoryList();
      } else {
        alert("Xoá danh mục thất bại");
      }
    } catch (error) {
      alert("Xoá thất bại");
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
            Danh sách danh mục
          </Typography>

          <Box>
            <TextField
              sx={{ mr: 2 }}
              size="small"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tên danh mục"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
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
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200 }}>Tên danh mục</TableCell>
                <TableCell sx={{ minWidth: 300 }}>Mô tả</TableCell>
                <TableCell>Trạng thái</TableCell>
                {userRole === "ADMIN" && <TableCell>Hành động</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedItems.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => handleRowClick(category)}
                >
                  <TableCell>{category.name}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {category.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        category.delete ? "Đang hoạt động" : "Ngưng hoạt động"
                      }
                      color={category.delete ? "success" : "error"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  {userRole === "ADMIN" && (
                    <TableCell>
                      <DeleteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategoryDelete(category);
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
                      count={Math.ceil(
                        filteredCategories.length / itemsPerPage
                      )}
                      page={page}
                      onChange={handlePageChange}
                    />

                    <Typography color="text.secondary">
                      Tổng số danh mục: {filteredCategories.length}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* Modal for update category */}
        <UpdateCategory
          open={openModal}
          category={selectedCategory}
          handleClose={() => setOpenModal(false)}
          refreshCategories={getCategoryList}
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
              Bạn có chắc chắn muốn xoá danh mục này?
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
                onClick={handleDeleteCategory}
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
                XÓA
              </Button>
            </Box>
          </Box>
        </Modal>
      </Sheet>
    </Box>
  );
};

export default CategoryTable;
