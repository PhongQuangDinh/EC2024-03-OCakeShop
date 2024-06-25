import React from "react";
import { Box } from "@mui/material";
import Footer from "./Footer/footer";
import Header from "./Header/header";

const Layout = ({ children, ...props }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
