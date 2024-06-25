"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  styled,
  Box,
  AppBar,
  useScrollTrigger,
  IconButton,
  Backdrop,
  Divider,
  Fade,
  Drawer,
  Typography,
} from "@mui/material";
import {
  SearchOutlined,
  MenuOutlined,
  ChevronRightOutlined,
  KeyboardArrowUp,
} from "@mui/icons-material";

import logo from "../../app/icon.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [prior, setPrior] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleToggleOpen = () => {
    setOpen(open !== true);
    document.body.style.overflow = !open ? "hidden" : "auto";
  };

  useEffect(() => {
    if (open) setPrior(true);
    else
      setTimeout(function () {
        setPrior(false);
      }, 500);
  }, [open]);

  return (
    <>
      <AppBarDesktop trigger={trigger} prior={prior}>
        <Link style={{ textDecoration: "none" }} href="/">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image priority src={logo} alt="logo" width={100} />
            <Typography sx={{ color: "#000" }}>Ocake Shop</Typography>
          </Box>
        </Link>

        <StyledIconButton onClick={handleToggleOpen}>
          <MenuOutlined />
        </StyledIconButton>
      </AppBarDesktop>

      <StyledBackdrop open={open} onClick={handleToggleOpen} />

      <AppBarMobile
        variant="persistent"
        anchor="right"
        open={open}
        prior={prior}
      >
        <AppBarMobileHeader>
          <IconButton onClick={handleToggleOpen}>
            <ChevronRightOutlined />
          </IconButton>
          <IconButton>
            <SearchOutlined />
          </IconButton>
        </AppBarMobileHeader>
        <Divider />
      </AppBarMobile>

      <Fade in={trigger && !open}>
        <ScrollTop size="small" onClick={() => window.scrollTo(0, 0)}>
          <KeyboardArrowUp />
        </ScrollTop>
      </Fade>
    </>
  );
};
export default Header;

const drawerWidth = 280;

const AppBarDesktop = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "prior" && prop !== "trigger",
})(({ theme, trigger, prior }) => ({
  position: "fixed",
  width: "100%",
  transition: "all .4s ease-in-out",
  background: "linear-gradient(180deg, #f8f8f8 0%, rgba(23, 96, 118, 0) 100%)",
  backdropFilter: "blur(2px)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end !important",
  boxShadow: trigger ? "4px 4px 25px rgba(0, 0, 0, 0.6)" : "none",
  backgroundColor: trigger ? "var(--palette-02)" : "transparent",
  zIndex: prior ? "10001" : "10002",
  padding: "0rem 3rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    paddingLeft: "2rem",
  },
}));

const AppBarMobile = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "prior" && prop !== "trigger",
})(({ prior }) => ({
  position: "fixed",
  zIndex: prior ? 10002 : 0,
  height: "100vh",
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const AppBarMobileHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem",
}));

const ScrollTop = styled(IconButton)(() => ({
  color: "var(--palette-06)",
  backgroundColor: "var(--palette-02)",
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 100000,
  boxShadow: "0px 0px 15px rgba(255,255,255,0.6)",
  transition: "all .4s ease-in-out !important",
  border: "2px solid transparent",
  "&:hover": {
    color: "var(--palette-02)",
    backgroundColor: "var(--palette-06)",
    border: "2px solid var(--palette-02)",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "var(--palette-06)",
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "inline-flex",
  },
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: "var(--palette-06)",
  zIndex: 10002,
  position: "fixed",
  height: "100vh",
}));
