import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { DotsThreeVertical as DotsThreeVerticalIcon } from "@phosphor-icons/react/dist/ssr/DotsThreeVertical";
import dayjs from "dayjs";

export function LatestProducts({ products = [], sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title="Sản phẩm được thêm gần đây" />
      <Divider />
      <List>
        {products.slice(0, 5).map((product, index) => (
          <ListItem divider={index < products.length - 1} key={product.cakeID}>
            <ListItemAvatar>
              {product.cakeImages[0].imageDetail.imagePath ? (
                <Box
                  component="img"
                  src={product.cakeImages[0].imageDetail.imagePath}
                  sx={{ borderRadius: 1, height: "48px", width: "48px" }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "var(--mui-palette-neutral-200)",
                    height: "48px",
                    width: "48px",
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={product.description}
              primaryTypographyProps={{ variant: "subtitle1" }}
              secondary={product.purpose.title}
              secondaryTypographyProps={{ variant: "body2" }}
            />
            <IconButton edge="end">
              <DotsThreeVerticalIcon weight="bold" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
