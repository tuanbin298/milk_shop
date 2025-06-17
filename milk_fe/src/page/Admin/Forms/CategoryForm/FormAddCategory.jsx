import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const AddCategory = ({ open, handleClose }) => {
  // State
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("sessionToken");
  // Reset inputs and close modal
  const handleCancel = () => {
    setName("");
    setDescription("");
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Category added:", data);

      // Reset sau khi gửi
      setName("");
      setDescription("");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Có lỗi xảy ra khi thêm danh mục!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h6"
            gutterBottom
            align="center"
          >
            Thêm danh mục
          </Typography>

          <Box mt={3}>
            <TextField
              fullWidth
              label="Tên danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={4}>
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
                  <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
                  <span>Đang thêm...</span>
                </>
              ) : (
                "Thêm danh mục"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AddCategory;
