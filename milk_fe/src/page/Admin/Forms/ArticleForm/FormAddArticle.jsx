import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const AddArticle = ({ open, handleClose }) => {
  const navigate = useNavigate();

  //State
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    image: "",
    content: "",
  });

  //Reset all input when cancel and clods modal
  const handleCancel = () => {
    setInput({
      title: "",
      image: "",
      content: "",
    });

    setErrors({});
    handleClose();
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const imgUrl = await uploadToCloudinary(file);
      toast.success("Ảnh đã được lưu trên Cloudinary");

      setProductData({ ...productData, image: imgUrl });
    } catch (error) {
      toast.error("Tải ảnh lên thất bại");
    }
  };

  // Logic upload img into cloudinary to get the URL return
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "milk_shop_cloudinary"); //Upload into server without API Key
    formData.append("cloud_name", "tuanbin");
    formData.append("folder", "milk_shop");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/tuanbin/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  // const handleSubmit = async (e) = {}

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
              Thêm bài viết
            </Typography>

            {/* Input fields */}
            <Box maxWidth={400} mx="auto">
              {/* Title */}
              <TextField
                fullWidth
                margin="normal"
                required
                label="Tiêu đề"
                name="title"
                value={input.title}
                // onChange={handleInputChange}
                error={errors.title}
                helperText={errors.title}
              />

              {/* Product Image */}
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 1, mt: 1 }}
              >
                Upload Hình Ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>

              {/* Content */}
              <TextField
                fullWidth
                margin="normal"
                required
                label="Nội dung"
                name="content"
                value={input.content}
                // onChange={handleInputChange}
                error={errors.content}
                helperText={errors.content}
              />
            </Box>

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
                    <span>Đang tạo bài viết...</span>
                  </>
                ) : (
                  "Tạo bài viết"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AddArticle;
