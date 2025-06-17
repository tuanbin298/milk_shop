import { Box, Avatar, Typography, Button, Paper } from "@mui/material";
import BackToDashboardButton from "../../utils/backToDashboardBtn";

const AdminProfile = () => {
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("username");
  const phone = localStorage.getItem("phone");
  const role = localStorage.getItem("roles");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#eaf6ff",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 2,
          left: 10,
        }}
      >
        <BackToDashboardButton />
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            width: 400,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Admin Avatar"
              src="/assets/admin-avatar.jpg"
              sx={{ width: 100, height: 100, mb: 2 }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              {fullName}
            </Typography>

            <Box sx={{ alignSelf: "flex-start", mt: 1 }}>
              <Typography gutterBottom>Email: {email}</Typography>
              <Typography gutterBottom>Điện thoại: {phone}</Typography>
              <Typography gutterBottom>Vai trò: {role}</Typography>
            </Box>

            <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
              Chỉnh sửa thông tin
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminProfile;
