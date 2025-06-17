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

const AddBrand = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setName("");
    setImage("");
    setDescription("");
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("sessionToken");

    try {
      const res = await fetch("http://localhost:8080/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          image,
          description,
        }),
      });

      if (res.ok) {
        console.log("Thêm thương hiệu thành công");
        handleCancel();
      } else {
        const errData = await res.json();
        console.error("Lỗi từ API:", errData);
        alert("Thêm thất bại: " + (errData.message || "Có lỗi xảy ra"));
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Không thể kết nối đến máy chủ.");
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
            Thêm thương hiệu
          </Typography>

          <Box mt={3}>
            <TextField
              fullWidth
              label="Tên thương hiệu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL hình ảnh (logo)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
                "Thêm thương hiệu"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default AddBrand;
