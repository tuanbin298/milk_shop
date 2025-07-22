import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import RateReviewIcon from "@mui/icons-material/RateReview";

const UserSideBar = () => {
  const fullName = localStorage.getItem("fullName");

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          TRANG TÀI KHOẢN
        </Typography>

        <Typography>
          Xin chào,{" "}
          <Typography component="span" color="secondary" fontWeight="bold">
            {fullName}
          </Typography>
          !
        </Typography>

        <List sx={{ mt: 2 }}>
          <ListItemButton onClick={() => navigate("useraccount")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("userorder")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng đặt trước" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("userfeedback")}>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Đánh giá của bạn" />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};

export default UserSideBar;
