import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const AddProduct = ({ open, handleClose }) => {
  // State
  const [loading, setLoading] = useState(false);

  //Reset all input when cancel and clods modal
  const handleCancel = () => {
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <form>
          <Box sx={style}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              gutterBottom
              align="center"
            >
              Thêm sản phẩm
            </Typography>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button onClick={handleCancel} variant="outlined" sx={{ mr: 2 }}>
                Hủy
              </Button>

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                sx={{
                  border: "2px solid #1976d2",
                  color: "#1976d2",
                  backgroundColor: "#ffffff",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "#ffffff",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={16}
                      sx={{ color: "white", mr: 1 }}
                    />
                    <span>Đang tạo người dùng...</span>
                  </>
                ) : (
                  "Tạo người dùng"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
