import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
  Chip,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import UpdateIcon from "@mui/icons-material/Update";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateCategory = ({ open, category, handleClose, refreshCategories }) => {
  const token = localStorage.getItem("sessionToken");
  console.log("TOKEN:", token);

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [originalCategory, setOriginalCategory] = useState(null);

  useEffect(() => {
    if (category) {
      setSelectedCategory({
        ...category,
        description: category.description || "",
        status: category.status ?? true,
        isDeleted: category.delete ?? false, // ✅ đổi tên tại đây
      });
    }
  }, [category]);

  const handleCloseModal = () => {
    handleClose();
    setIsEditing(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedCategory((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));

    const newErrors = { ...errors };
    if (name === "name") {
      newErrors.name =
        value.trim() === "" ? "Tên danh mục không được để trống" : "";
    }
    if (name === "description") {
      newErrors.description =
        value.trim() === "" ? "Mô tả không được để trống" : "";
    }

    setErrors(newErrors);
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setOriginalCategory({ ...selectedCategory });
    } else {
      handleSaveUpdate();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveUpdate = async () => {
    const updates = {};
    if (selectedCategory.name !== originalCategory.name) {
      updates.name = selectedCategory.name;
    }
    if (selectedCategory.description !== originalCategory.description) {
      updates.description = selectedCategory.description;
    }
    if (selectedCategory.delete !== originalCategory.delete) {
      updates.delete = selectedCategory.delete;
    }

    if (Object.values(errors).some((error) => error)) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    if (Object.keys(updates).length > 0) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/categories/${selectedCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          }
        );

        if (response.ok) {
          toast.success("Cập nhật danh mục thành công!");
          handleCloseModal();
          refreshCategories?.();
        } else {
          toast.error("Lỗi khi cập nhật danh mục!");
        }
      } catch (err) {
        toast.error("Lỗi hệ thống: " + err.message);
      }
    } else {
      toast.info("Không có thay đổi nào");
      handleCloseModal();
    }
  };

  const InfoRow = ({ icon, label, value }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ py: 1, px: 3 }}
    >
      <Box sx={{ width: 30 }}>{icon}</Box>
      <Typography sx={{ width: 120, fontWeight: 500 }}>{label}</Typography>
      <Box>{value}</Box>
    </Stack>
  );

  const InputRow = ({ icon, label, name, value, error, helperText }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ py: 1, px: 3 }}
    >
      <Box sx={{ width: 30 }}>{icon}</Box>
      <Typography sx={{ width: 120, fontWeight: 500 }}>{label}</Typography>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        size="small"
        fullWidth
        error={!!error}
        helperText={helperText}
      />
    </Stack>
  );

  const InputSelectRow = ({ icon, label, name, value, options }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ py: 1, px: 3 }}
    >
      <Box sx={{ width: 30 }}>{icon}</Box>
      <Typography sx={{ width: 120, fontWeight: 500 }}>{label}</Typography>
      <TextField
        select
        name={name}
        value={String(value)}
        onChange={handleChange}
        size="small"
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );

  // Ngăn lỗi nếu selectedCategory chưa sẵn sàng
  if (!selectedCategory) return null;

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          width: 550,
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#e3f2fd",
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            <CategoryIcon sx={{ mr: 1 }} />
            Thông tin danh mục
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
          >
            Đóng
          </Button>
        </Box>

        {/* Body */}
        <Box component="dl" sx={{ p: 2 }}>
          {isEditing ? (
            <>
              <InputRow
                icon={<CategoryIcon />}
                label="Tên danh mục"
                name="name"
                value={selectedCategory.name}
                error={errors.name}
                helperText={errors.name}
              />
              <InputRow
                icon={<DescriptionIcon />}
                label="Mô tả"
                name="description"
                value={selectedCategory.description}
                error={errors.description}
                helperText={errors.description}
              />
              <InputSelectRow
                icon={<VerifiedUserIcon />}
                label="Trạng thái"
                name="delete"
                value={selectedCategory.delete}
                options={[
                  { label: "Đang hoạt động", value: "false" },
                  { label: "Ngưng hoạt động", value: "true" },
                ]}
              />
            </>
          ) : (
            <>
              <InfoRow
                icon={<CategoryIcon />}
                label="Tên danh mục"
                value={selectedCategory.name}
              />
              <InfoRow
                icon={<DescriptionIcon />}
                label="Mô tả"
                value={selectedCategory.description}
              />
              <InfoRow
                icon={<VerifiedUserIcon />}
                label="Trạng thái"
                value={
                  <Chip
                    label={
                      selectedCategory.delete
                        ? "Đang hoạt động"
                        : "Ngưng hoạt động"
                    }
                    sx={{
                      backgroundColor: selectedCategory.delete
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(244, 67, 54, 0.1)",
                      color: selectedCategory.delete ? "#4caf50" : "#f44336",
                      border: `1px solid ${
                        selectedCategory.delete ? "#4caf50" : "#f44336"
                      }`,
                      fontWeight: 500,
                      minWidth: "90px",
                      textAlign: "center",
                    }}
                    size="small"
                    variant="outlined"
                  />
                }
              />
            </>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<UpdateIcon />}
            onClick={handleEditToggle}
          >
            {isEditing ? "Lưu" : "Cập Nhật"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateCategory;
