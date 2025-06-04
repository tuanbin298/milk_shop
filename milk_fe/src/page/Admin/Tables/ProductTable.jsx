import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sheet, Table } from "@mui/joy";
import BackToDashboardButton from "../../../utils/backToDashboardBtn";

const ProductTable = () => {
  // State
  const [searchKeyword, setSearchKeyword] = useState("");

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
          </Box>
        </Box>
      </Sheet>
    </Box>
  );
};

export default ProductTable;
