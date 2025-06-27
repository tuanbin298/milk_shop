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
import { Sheet, Table } from "@mui/joy";
import { useState } from "react";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";

const FeedbackTable = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);

  // Dữ liệu mẫu tạm thời
  const feedbackList = [
    {
      id: 1,
      comment: "Sản phẩm rất tốt!",
      created_at: "2025-06-27T10:20:00",
      is_approved: true,
      user_id: "user123",
      product_id: "prd001",
    },
    {
      id: 2,
      comment: "Không hài lòng về chất lượng",
      created_at: "2025-06-25T09:00:00",
      is_approved: false,
      user_id: "user456",
      product_id: "prd002",
    },
  ];

  const itemsPerPage = 5;

  const filtered = feedbackList.filter((f) =>
    f.comment.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (e, value) => setPage(value);

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split("T")[0].split("-");
    return `${d}/${m}/${y}`;
  };

  const formatTime = (dateStr) => {
    const t = dateStr.split("T")[1];
    return t?.slice(0, 5);
  };

  return (
    <Box sx={{ px: 3, backgroundColor: "#f4f4f4" }}>
      <BackToDashboardButton />

      <Sheet sx={{ backgroundColor: "#fff", borderRadius: 10, p: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            mb: 2,
          }}
        >
          <Typography sx={{ p: 4 }} variant="h5">
            Quản lý phản hồi khách hàng
          </Typography>

          <TextField
            sx={{ mr: 2 }}
            size="small"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo nội dung phản hồi"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table stickyHeader variant="outlined" size="md">
            <TableHead>
              <TableRow>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày phản hồi</TableCell>
                <TableCell>Phê duyệt</TableCell>
                <TableCell>Người dùng</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length > 0 ? (
                paginated.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.comment}</TableCell>
                    <TableCell>
                      {formatDate(f.created_at)} | {formatTime(f.created_at)}
                    </TableCell>
                    <TableCell>{f.is_approved ? "✔" : "✘"}</TableCell>
                    <TableCell>{f.user_id}</TableCell>
                    <TableCell>{f.product_id}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() =>
                          alert(`Xoá phản hồi ID: ${f.id} (chưa có API)`)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có phản hồi nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={2}
                  >
                    <Pagination
                      size="small"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(filtered.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                    />

                    <Typography color="text.secondary">
                      Tổng số phản hồi: {filtered.length}
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

export default FeedbackTable;
