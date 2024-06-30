"use client";
import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Root>
      <LinkContainer container columnSpacing={{ xs: 2, lg: 0 }}>
        {footerItems.map((item, id) => (
          <Grid className="footer-item" item xs={3} key={id}>
            <Typography sx={{ color: "#000", fontWeight: "600" }}>
              {item.title}
            </Typography>
            <Box />
            {item.links.map((li, i) => (
              <Link
                className="footer-link"
                href={li.link}
                key={i}
                color="#000"
                underline="none"
              >
                {li.aliases}
              </Link>
            ))}
          </Grid>
        ))}
      </LinkContainer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: "3%",
        }}
      >
        <Box
          sx={{
            height: "1px",
            width: "50%",
            backgroundColor: "#000",
            margin: "1rem 3rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#000", fontWeight: "600" }}>
            Thông tin OCakeShop
          </Typography>
          {ShopInfo.map((item, i) => (
            <Typography key={i} sx={{ color: "#000" }}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Root>
  );
};

export default Footer;

const ShopInfo = [
  "Địa chỉ: 227 Nguyễn Văn Cừ, phường 4, quận 5 thành phố Hồ Chí Minh, Việt Nam",
  "Liên hệ: 0565 858 281",
  "Email: ocakeshop.bakery@gmail.com",
  "Chịu trách nhiệm: Phạm Uyễn Nhi",
];

const Root = styled("div")(({ theme }) => ({
  marginTop: "0",
  [theme.breakpoints.down("md")]: {
    marginTop: "0",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0",
  },
}));

const LinkContainer = styled(Grid)(({ theme }) => ({
  padding: "3% 10%",
  textAlign: "center",
  color: "#000",
  "& .footer-item": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .footer-link": {
    display: "block",
    margin: "0.6rem 0rem",
    transition: "all 0.3s ease-in-out",
    fontWeight: 300,
    "&:hover": {
      color: "#000",
    },
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "1rem",
    padding: 0,
  },
}));

const footerItems = [
  {
    title: "OCakeShop",
    links: [
      {
        link: "/landing",
        aliases: "Trang chủ",
      },
      {
        link: "/cake",
        aliases: "Bánh kem",
      },
      {
        link: "/contact",
        aliases: "Liên hệ",
      },
    ],
  },
  {
    title: "Chăm sóc khách hàng",
    links: [
      {
        link: "/landing",
        aliases: "Trung tâm trợ giúp",
      },
      {
        link: "/landing",
        aliases: "Hướng dẫn mua hàng",
      },
      {
        link: "/landing",
        aliases: "Vận chuyển",
      },
    ],
  },
  {
    title: "Thanh toán",
    links: [
      {
        link: "/landing",
        aliases: "Momo",
      },
      {
        link: "/landing",
        aliases: "VNPay",
      },
      {
        link: "/landing",
        aliases: "Paypal",
      },
    ],
  },
  {
    title: "Theo dõi shop",
    links: [
      {
        link: "/landing",
        aliases: "Facebook",
      },
      {
        link: "/landing",
        aliases: "Instagram",
      },
      {
        link: "/landing",
        aliases: "LinkedIn",
      },
    ],
  },
];
