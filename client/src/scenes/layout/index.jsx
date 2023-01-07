import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
const Layout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
