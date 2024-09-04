"use client";
import {
  styled,
  Tabs as MuiTabs,
  Tab,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import Layout from "../layout";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CakeCard from "./components/cakeCard";
import Image from "next/image";
import arrow from "../../assets/arrow.png";
import { getApiUrl } from "../../../WebConfig";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";
import SelectCake from "./cake";
import Link from "next/link";

const HomePage = () => {
  const [category, setCategory] = useState(["Tất cả"]);
  const [cake, setCake] = useState([]);
  const [allCake, setAllCake] = useState([]);
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = getApiUrl();
  const router = useRouter();
  const [selectCake, setSelectCake] = useState("");
  const [tokenUse, setTokenUser] = useState('');

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    GetInforCake();
  }, []);

  useEffect(() => {
    if (value === 0) {
      setCake(allCake);
    } else {
      const selectedCategory = category[value];
      if (selectedCategory) {
        const getCakesByCategory = async () => {
          try {
            const response = await fetch(
              `${apiUrl}/cake/purpose/${selectedCategory.purposeID}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              const errorData = await response.json();
              setError(errorData.message || "Get cake by purpose is failed");
              return;
            }
            const data = await response.json();
            setCake(Array.isArray(data) ? data : []);
          } catch (err) {
            console.error("An error occurred:", err);
            setError("An error occurred while get cake");
          }
        };
        getCakesByCategory();
      }
    }
  }, [value, category]);

  useEffect(() => {
    if (searchTerm === "") {
      setCake(allCake);
    } else {
      const filteredCakes = allCake.filter((cakeItem) =>
        cakeItem.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCake(filteredCakes);
    }
  }, [searchTerm, allCake]);

  const GetCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/cake/purpose/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Load dữ liệu thất bại");
        return;
      }
      const data = await response.json();
      const allCategory = { purposeID: 0, title: "Tất cả" };
      const updatedData = [allCategory, ...data];
      setCategory(Array.isArray(updatedData) ? updatedData : []);
    } catch (err) {
      console.error(err);
      setError("Có lỗi khi lấy danh mục sản phẩm");
    }
  };

  const GetInforCake = async () => {
    try {
      if (typeof window !== "undefined") {
        // Code này chỉ chạy trên client-side
        setTokenUser(localStorage.getItem('token'));
      }
      
      const response = await fetch(`${apiUrl}/cake/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Get cake failed");
        return;
      }
      const data = await response.json();
      setAllCake(Array.isArray(data) ? data : []);
      setCake(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while get cake");
    }
  };

  const handleChangePurpose = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCake = (id) => {
    // console.log("Cake: " + newValue);
    // setSelectCake(newValue);
    router.push(`home/${id}`);
    // event.onClick()
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleCardClick = async (id) => {
  //   // if(onClick){
  //   console.log('Card clicked :' + id);
  //   await router.push(`/home/${id}`);
  //   // }
  // }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const Circle = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: `linear-gradient(90deg, #e82451 0%, #f1858f 100%)`,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    marginBottom: 10,
  }));

  const [isFocused, setIsFocused] = useState(false);

  const steps = [
    {
      number: "1",
      title: "Khách hàng đặt bánh kem",
      description:
        "Khách hàng lựa chọn nhân bánh kem ưa thích và kích thước bánh kem phù hợp với nhu cầu",
    },
    {
      number: "2",
      title: "Ocake xử lý đơn hàng",
      description:
        "Ocake sắp xếp thứ tự làm bánh và ngày làm bánh để có thể đưa đến cho khách hàng những chiếc bánh kem tươi ngon nhất",
    },
    {
      number: "3",
      title: "Đầu bếp làm bánh kem theo yêu cầu",
      description:
        "Đầu bếp dựa trên kinh nghiệm và công thức để tạo ra những chiếc bánh kem thơm ngon",
    },
    {
      number: "4",
      title: "Vận chuyển bánh kem đến khách hàng",
      description:
        "Đưa đến cho khách hàng những chiếc bánh kem tươi ngon và đẹp mắt nhất",
    },
  ];

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12} lg={6}>
            <Box sx={{ padding: "7% 20%" }}>
              <StyledName>OCake Shop</StyledName>
              <StyledTypoQuote
                variant="h1"
                textAlign="start"
                fontWeight="bold"
                gutterBottom
              >
                <span
                  style={{
                    background:
                      "linear-gradient(-45deg, #FF1493, #FFA500, #FF1493, #FFA500)",
                    backgroundSize: "100% 100%,0",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "4rem",
                  }}
                >
                  Những Chiếc Bánh Hoàn Hảo Dành Riêng Cho Bạn
                </span>{" "}
              </StyledTypoQuote>
              <StyledParagraph sx={{ display: "block" }} mb="1rem">
                Tại đây bạn có thể chọn được chiếc bánh phù hợp với bất kỳ người
                nào, bất kỳ hương vị và màu sắc nào và cho bất kỳ ai. Đặt bánh
                ngay!
              </StyledParagraph>
                <div style={{ display: 'flex', gap: '50px' }}>
              {!tokenUse && (
                <StyledTypography>
                  <StyledLink href={"/signin"}>Sign In</StyledLink>
                </StyledTypography>
              )}
              {!tokenUse && (
                <StyledTypography>
                  <StyledLink href={"/signup"}>Sign Up</StyledLink>
                </StyledTypography>
              )}
            </div>
            </Box>
          </Grid>
          <ImgContainer
            item
            md={12}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "500px",
                height: "600px",
                borderRadius: "30px",
                background: "linear-gradient(135deg, #FFDAA4, #FFC2E2)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "400px",
                  height: "500px",
                  backgroundColor: "#FFD3E3",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src="https://png.pngtree.com/png-vector/20240320/ourmid/pngtree-3d-birthday-cake-vanilla-illustration-png-image_12179399.png"
                  alt="Cake"
                  width={500}
                  style={{ borderRadius: "10px" }}
                />
              </Box>
            </Box>
            <Ellipse>
              <Pink>Blur</Pink>
              <Orange>Blur</Orange>
            </Ellipse>
          </ImgContainer>
        </Grid>
      </Container>
      <Box
        sx={{
          background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
          height: "100vh",
          padding: "7% 20%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Monsterat', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              color: "#E82451",
            }}
          >
            Sản phẩm của chúng tôi
          </Typography>
        </Box>
        <MyTabs value={value} onChange={handleChangePurpose}>
          {category.map((category) => (
            <Tab key={category.purposeID} label={category.title} />
          ))}
        </MyTabs>

        <TextField
          sx={{
            margin: "1rem 0",
            backgroundColor: "#FFFFFF", // Màu nền trắng
            width: "calc(100% - 40px)", // Giảm độ rộng của trường nhập liệu đi 50px
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FFC0CB", // Màu hồng của viền ngoài
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF1493", // Màu hồng đậm hơn khi trường được chọn
              },
            },
          }}
          label={!isFocused ? "Tìm kiếm bánh" : ""}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#FF1493" }} />{" "}
                {/* Màu hồng đậm của biểu tượng */}
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <Carousel
            swipeable={false}
            draggable={false}
            keyBoardControl={true}
            customTransition="all .5 ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "pc"]}
            responsive={responsive}
            itemClass="carousel-item-padding-40-px"
          >
            {Array.isArray(cake) &&
              cake.map((cakeItem) => (
                <CakeCard
                  key={cakeItem.cakeID}
                  title={cakeItem.description}
                  img={
                    cakeItem.cakeImages.length > 0
                      ? cakeItem.cakeImages[0].imageDetail.imagePath
                      : ""
                  }
                  // selectCake={cakeItem.cakeID} onClick={handleChangeCake}
                  onClick={() => handleChangeCake(cakeItem.cakeID)}
                />
              ))}
          </Carousel>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          height: "80vh",
          padding: "7% 10%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Monsterat', sans-serif",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#E82451",
            ml: "10%",
          }}
        >
          Quy trình xử lý đơn hàng
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: 4,
            ml: "10%",
          }}
        >
          {steps.map((step, index) => (
            <Box key={index} sx={{ mr: 3 }}>
              <Circle>{step.number}</Circle>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography>{step.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
const MyTabs = styled(MuiTabs)(() => ({
  "& .MuiTabs-flexContainer": {
    gap: "1rem",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    padding: "0.6rem 2rem ",
    borderRadius: 999,
    textTransform: "initial",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    border: "1px solid var(--palette-02)",
    backgroundColor: "rgba(240,123,137,0.4)",
    color: "white !important",
  },
  "& .Mui-selected": {
    border: "none",
    background: "linear-gradient(90deg, #e82451 0%, #f1858f 100%)",
    color: "white !important",
  },
}));

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});
const StyledTypography = styled(Typography)({
  transition: "400ms all ease-in-out",
  backgroundColor: "inherit",
  color: "inherit",
  width: "fit-content",
  padding: "1rem 2rem",
  fontWeight: "bold",
  border: "4px solid",
  borderImage:
    "linear-gradient(101deg, var(--pink--color), var(--orange--color)) 1",
  cursor: "pointer",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "inherit",
    color: "var(--main--color)",
    padding: "1rem 3rem",
  },
});
const Container = styled(Box)(({ theme }) => ({
  marginTop: "8rem",
  padding: "0 6rem",
  [theme.breakpoints.down("sm")]: {
    marginTop: "3rem",
    padding: 0,
  },
}));
const StyledTypoQuote = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "block",
    fontSize: "2rem",
  },
}));
const Ellipse = styled("div")({
  zIndex: "-1",
  position: "absolute",
  top: "15%",
  right: "35%",
  filter: "blur(100px)",
});
const Orange = styled("div")({
  height: "15rem",
  width: "15rem",
  backgroundColor: "var(--orange--color)",
});
const Pink = styled("div")({
  height: "15rem",
  width: "15rem",
  backgroundColor: "var(--pink--color)",
});
const ImgContainer = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  zIndex: "10",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const StyledName = styled(Typography)({
  background: "linear-gradient(to right bottom, #F53844, #42378F)",
  backgroundSize: "100% 100%,0",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2rem",
  fontWeight: "bold",
});
const StyledParagraph = styled(Typography)({
  fontStyle: "italic",
  fontSize: "1.5rem",
});
