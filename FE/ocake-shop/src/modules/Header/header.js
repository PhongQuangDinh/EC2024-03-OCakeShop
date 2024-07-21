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
  Fade,
  Switch,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  SearchOutlined,
  KeyboardArrowUp,
  LogoutOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";

import logo from "./../../app/image/logo.png";

const homeData = [
  { title: "Trang chủ", link: "/home" },
  { title: "Thông tin shop", link: "/premium" },
  { title: "Đơn mua", link: "/allpodcasts" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [prior, setPrior] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    if (open) setPrior(true);
    else
      setTimeout(function () {
        setPrior(false);
      }, 500);
  }, [open]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const openUser = Boolean(anchorElUser);

  const handleLogout = () => {
    setAnchorElUser(null);
    router.push("/login");
  };

  return (
    <>
      <AppBarDesktop trigger={trigger} prior={prior}>
        <Link href="/">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image priority src={logo} alt="logo" width={100} />
          </Box>
        </Link>
        <StyledNavContainer>
          {homeData.map((item, i) => (
            <NavItem trigger={trigger} key={i} content={item}></NavItem>
          ))}
          <StyledNavItem
            trigger={trigger}
            sx={{ "&:before": { bottom: "-10px" } }}
          >
            <SearchOutlined
              sx={{ "&:hover": { color: "var(--palette-03)" } }}
            />
          </StyledNavItem>
        </StyledNavContainer>

        <Tooltip title="Profile">
          <Avatar
            src={null}
            alt="Avatar"
            onClick={handleOpenUserMenu}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>

        <StyledUserMenu
          keepMounted
          anchorEl={anchorElUser}
          open={openUser}
          onClick={handleCloseUserMenu}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <UploadFileOutlined />
            Upload
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutOutlined />
            Logout
          </MenuItem>
        </StyledUserMenu>
      </AppBarDesktop>

      <Fade in={trigger && !open}>
        <ScrollTop size="small" onClick={() => window.scrollTo(0, 0)}>
          <KeyboardArrowUp />
        </ScrollTop>
      </Fade>
    </>
  );
};
export default NavBar;

const NavItem = ({
  content = { title: "", link: "" },
  sx = {},
  trigger,
  asPath,
  uid,
  ...props
}) => {
  return (
    <StyledNavItem trigger={trigger} {...props}>
      <Link href={content.title == "Premium" && !uid ? "/login" : content.link}>
        <Typography
          component="h1"
          sx={{
            // color: "#fff",
            color: "#000",
            "&:hover": { color: "var(--palette-03)" },
          }}
        >
          {content.title}
        </Typography>
      </Link>
    </StyledNavItem>
  );
};

const AppBarDesktop = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "prior" && prop !== "trigger",
})(({ theme, trigger, prior }) => ({
  position: "fixed",
  width: "100%",
  transition: "all .4s ease-in-out",
  background: trigger
    ? "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)"
    : "transparent",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4rem",
  boxShadow: trigger ? "4px 4px 25px rgba(0, 0, 0, 0.6)" : "none",
  // backgroundColor: "transparent",
  backgroundColor: "#FBF0D4",
  zIndex: prior ? "10001" : "10002",
  padding: "0 3rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    paddingLeft: "2rem",
  },
}));

const StyledNavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  width: "100%",
  padding: "0 4rem",
  [theme.breakpoints.down("md")]: {
    padding: "2rem 0",
  },
}));

const ScrollTop = styled(IconButton)(() => ({
  color: "#fff",
  backgroundColor: "#e82451",
  position: "fixed",
  bottom: 25,
  right: 25,
  zIndex: 100000,
  boxShadow: "0px 0px 15px rgba(0,0,0,0.6)",
  transition: "all .4s ease-in-out !important",
  border: "2px solid transparent",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f1858f",
  },
}));

const StyledNavItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "trigger",
})(({ theme, trigger }) => ({
  position: "relative",
  cursor: "pointer",
  flexGrow: "1",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "10rem",
  padding: "1rem 0",
  "& .MuiTypography-root": {
    fontSize: "18px",
    whiteSpace: "pre-line",
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  "&:hover": {
    "& .MuiBox-root": {
      display: "block",
    },
    "& #shadow": {
      animation: "shadow 0.3s ease-in-out forwards",
      animationDelay: `0.5s`,
      "@keyframes shadow": {
        "0%": { boxShadow: "none" },
        "100%": { boxShadow: "0px 15px 25px rgba(255, 255, 255, 0.35)" },
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledUserMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    disableScrollLock={true}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "15px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)",
    "& .MuiMenu-list": {
      padding: "0.5rem 0",
      width: "180px",
    },
  },
  marginTop: "1.25rem",
  zIndex: 999999,
  [theme.breakpoints.down("md")]: {
    marginTop: "0.5rem",
  },
}));
