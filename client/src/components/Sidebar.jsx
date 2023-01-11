import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> },
];
import profile from "../assets/profile.jpeg";

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component={"nav"}>
      {/* sidebar element */}

      {isSidebarOpen && (
        // sidebar drawer

        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: "250px",
            },
          }}
        >
          <Box width="100%">
            {/* sidebar container */}
            <Box m="1rem 2rem 1rem 3rem">
              {/* top section - logo & toggle icon */}
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Ajuran
                  </Typography>
                </Box>
                {!isNonMobile ? (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                ) : null}
              </FlexBetween>
            </Box>
            {/* main section */}
            <List>
              {navItems.map(({ text, icon }) => {
                // render section titles
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "1rem 0 0.8rem 3rem", fontSize: "0.9rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }

                // use as a param to navigate to page
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                        paddingBlock: "6px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem" width="100%">
            <Divider />
            <FlexBetween
              textTransform="non"
              gap="1rem"
              m="1.5rem 2rem 0 1.5rem"
            >
              <IconButton>
                <Box
                  component="img"
                  alt="profile"
                  src={profile}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              </IconButton>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>

                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <IconButton>
                <SettingsOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
