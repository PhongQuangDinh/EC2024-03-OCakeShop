"use client";
import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Root>
      <LinkContainer container columnSpacing={{ xs: 2, lg: 0 }}>
        {footerItems.map((item, id) => (
          <Grid className="footer-item" item xs={4} key={id}>
            <Typography sx={{ color: "#000" }}>{item.title}</Typography>
            <Box sx={StyleDivider} />
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
    </Root>
  );
};

export default Footer;

const Root = styled("div")(({ theme }) => ({
  marginTop: "15%",
  [theme.breakpoints.down("md")]: {
    marginTop: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "6rem",
  },
}));

const LinkContainer = styled(Grid)(({ theme }) => ({
  padding: "12% 0px 0px 0px",
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

const StyleDivider = {
  height: 2,
  width: 50,
  backgroundColor: "white",
  margin: "0.8rem 0px",
  borderRadius: 999,
};

const footerItems = [
  {
    title: "subtitle",
    links: [
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
    ],
  },
  {
    title: "subtitle",
    links: [
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
    ],
  },
  {
    title: "subtitle",
    links: [
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
      {
        link: "https://facebook.com",
        aliases: "Parturient Lorem",
      },
    ],
  },
];
