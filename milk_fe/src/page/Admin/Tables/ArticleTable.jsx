import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";
import { Sheet } from "@mui/joy";

const ArticleTable = () => {
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
            Danh sách bài viết
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          {/* Table */}
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
                <TableCell sx={{ minWidth: 200 }}>Tiêu đề</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Đường dẫn</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Sheet>
    </Box>
  );
};

export default ArticleTable;
