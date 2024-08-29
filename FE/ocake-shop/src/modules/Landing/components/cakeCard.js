"use client";
import { Box, CardMedia, Chip, Grid, styled, Typography } from "@mui/material";

const CakeCard = ({ img, title }) => {
  
  return (
    <ArticleBox>
      <GridCard sx={{ border: "none" }} direction="column" container>
        <Grid item xs={10} sx={{ width: "100%" }}>
          <StyledCardMedia image={img} title=""></StyledCardMedia>
        </Grid>
        <Grid item xs={2} sx={{ color: "#000" }}>
          <TitleTypo component="h1" size="18px" weight="bold">
            {title}
          </TitleTypo>
        </Grid>
      </GridCard>
    </ArticleBox>
  );
};

export default CakeCard;

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "6px",
}));

const ArticleBox = styled("div")(({ theme }) => ({}));

const GridCard = styled(Grid)(({ theme }) => ({
  height: "21rem",
  width: "18rem",
  backgroundColor: "white",
  boxSizing: "border-box",
  userSelect: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
  padding: "0.7rem",
  "&:hover": {
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.9)",
    cursor: "pointer",
    "& .MuiBox-root": {
      visibility: "visible",
    },
  },
}));

const TitleTypo = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  maxWidth: "100%",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  background: "rgba(0, 0, 0, 0.3)",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  visibility: "hidden",
  zIndex: 1,
  width: "100%",
  height: "100%",
  borderRadius: "6px",
}));
