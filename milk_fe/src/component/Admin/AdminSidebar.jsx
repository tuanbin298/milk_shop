import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { useState } from "react";

const AdminSideBar = () => {
  // State
  const [selectedSection, setSelectedSection] = useState("overview");

  const [openDropdowns, setOpenDropdowns] = useState({
    users: false,
    products: false,
    categories: false,
    articles: false,
    feedbacks: false,
  });

  // Change state of section
  const toggleDropdown = (section) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          backgroundColor: "#0284c7",
          color: "white",
          width: 260,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <div className="flex items-center text-xl font-bold mb-4 text-center tracking-wide border-b border-white-700 p-4">
            <img
              style={{
                width: "30px",
                height: "40px",
                marginRight: "10px",
              }}
              src="./src/assets/logo/admin logo.png"
            />
            Admin Dashboard
          </div>

          {/* Overview */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>
              <ListItemText primary="Tổng quan" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          {/* User and dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleDropdown("users")}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>

              <ListItemText primary="Người dùng" sx={{ color: "white" }} />
              {/* Icon arrow */}
              {openDropdowns.users ? (
                <ArrowDropDownOutlinedIcon />
              ) : (
                <ArrowRightOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDropdowns.users} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedSection("users")}>
                  <PeopleAltOutlinedIcon className="mr-5" />
                  <ListItemText primary="Danh sách người dùng" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedSection("addUser")}>
                  <PersonAddOutlinedIcon className="mr-5" />
                  <ListItemText primary="Thêm người dùng" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* Product and dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleDropdown("products")}>
              <ListItemIcon>
                <ShoppingBagOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>
              <ListItemText primary="Sản phẩm" sx={{ color: "white" }} />
              {/* Icon arrow */}
              {openDropdowns.products ? (
                <ArrowDropDownOutlinedIcon />
              ) : (
                <ArrowRightOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDropdowns.products} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedSection("users")}>
                  <StoreOutlinedIcon className="mr-5" />
                  <ListItemText primary="Danh sách sản phẩm" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setSelectedSection("addProduct")}
                >
                  <AddBusinessOutlinedIcon className="mr-5" />
                  <ListItemText primary="Thêm sản phẩm" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* Category and dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleDropdown("categories")}>
              <ListItemIcon>
                <CategoryOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>
              <ListItemText primary="Phân loại" sx={{ color: "white" }} />
              {/* Icon arrow */}
              {openDropdowns.categories ? (
                <ArrowDropDownOutlinedIcon />
              ) : (
                <ArrowRightOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDropdowns.categories} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setSelectedSection("categories")}
                >
                  <FormatListBulletedOutlinedIcon className="mr-5" />
                  <ListItemText primary="Danh sách phân loại" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setSelectedSection("addCategory")}
                >
                  <LibraryAddOutlinedIcon className="mr-5" />
                  <ListItemText primary="Thêm loại" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* Article and dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleDropdown("articles")}>
              <ListItemIcon>
                <AssignmentOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>

              <ListItemText primary="Bài viết" sx={{ color: "white" }} />
              {/* Icon arrow */}
              {openDropdowns.users ? (
                <ArrowDropDownOutlinedIcon />
              ) : (
                <ArrowRightOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDropdowns.articles} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedSection("articles")}>
                  <ArticleOutlinedIcon className="mr-5" />
                  <ListItemText primary="Danh sách bài viết" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setSelectedSection("addArticle")}
                >
                  <AddCommentOutlinedIcon className="mr-5" />
                  <ListItemText primary="Thêm bài viết" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* Feedback and dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleDropdown("feedbacks")}>
              <ListItemIcon>
                <TextsmsOutlinedIcon
                  style={{ marginRight: "20px", color: "white" }}
                />
              </ListItemIcon>

              <ListItemText primary="Đánh giá" sx={{ color: "white" }} />
              {/* Icon arrow */}
              {openDropdowns.feedbacks ? (
                <ArrowDropDownOutlinedIcon />
              ) : (
                <ArrowRightOutlinedIcon />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDropdowns.feedbacks} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedSection("feedbacks")}>
                  <QuestionAnswerOutlinedIcon className="mr-5" />
                  <ListItemText primary="Danh sách đánh giá" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSideBar;
