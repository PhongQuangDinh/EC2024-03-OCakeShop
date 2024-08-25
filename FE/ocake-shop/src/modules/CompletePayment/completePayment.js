"use client";
import {
  styled,
  Tabs as MuiTabs,
  Tab,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import Layout from "../layout";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CakeCard from "./components/cakeCard";
import Image from "next/image";
import arrow from "../../assets/arrow.png";
import { getApiUrl } from '../../../WebConfig';

const HomePage = () => {

  const [category, setCategory] = useState(["Tất cả"]);
  const [cake, setCake] = useState('');
  const [allCake, setAllCake] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(0);
  const apiUrl = getApiUrl();

  useEffect(() => {
    GetCategory();
  },[]);

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
            const selectedCategory = category[value];
            const response = await fetch(`${apiUrl}/cake/purpose/${selectedCategory.purposeID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
          });
          if(!response.ok)
          {
            const errorData = await response.json();
            setError(errorData.message || 'Get cake by purpose is failed');
            return;
          }
          const data = await response.json();
          // setCakeData(Array.isArray(data) ? data : []);
          setCake(Array.isArray(data) ? data : []);
        } catch(err){
          console.error('An error occurred:', err);
          setError('An error occurred while get cake');
        }};;
        getCakesByCategory();
    };
  }}, [value, category]);
  // const

  const GetCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/cake/purpose`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        const errorData = await response.json();
        setError(errorData.message || 'Load dữ liệu thất bại');
        return;
      }
      const data = await response.json();
      const allCategory = { purposeID: 0, title: "Tất cả" };
      const updatedData = [allCategory, ...data];
      setCategory(Array.isArray(updatedData) ? updatedData : []);
      // setCategory(Array.isArray(data) ? data : []);
    } catch(err){
      console.error(err);
      setError('Có lỗi khi lấy danh mục sản phẩm');
  }};

  const GetInforCake = async () => {
    try {
      const response = await fetch(`${apiUrl}/cake/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if(!response.ok)
    {
      const errorData = await response.json();
      setError(errorData.message || 'Get cake failed');
      return;
    }
    const data = await response.json();
    setAllCake(Array.isArray(data) ? data : []);
    setCake(Array.isArray(data) ? data : []);
    // alter(cake)
  } catch(err){
    console.error('An error occurred:', err);
    setError('An error occurred while get cake');
  }};

  // const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

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
        <Box sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
          <Typography sx={{
              fontFamily: "'Monsterat', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              color: "#E82451",
            }}>Thanh toán thành công</Typography>
        </Box>
        <Box sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              backgroundColor: "#000",
              margin: "1rem 3rem",
            }}
          />
        </Box>
        
        <Box sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
          <Typography
            sx={{
              fontFamily: "'Monsterat', sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              color: "#E82451",
            }}
          >
            Sản phẩm đề xuất của chúng tôi
          </Typography>
        </Box>
        <MyTabs value={value} onChange={handleChange}>
          {category.map((category) => (
            <Tab key={category.purposeID} label={category.title} />
          ))}
        </MyTabs>
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
          {/* <CakeCard title="name" img="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0A475B34-4E78-40D8-9F30-46223B7D77E7/Derivates/E55C7EA4-0E60-403F-B5DC-75EA358197BD.jpg" />
          <CakeCard title = "ten" img="https://flouringkitchen.com/wp-content/uploads/2023/07/BW1A4089-2.jpg" />
          <CakeCard title="banh" img="https://hips.hearstapps.com/hmg-prod/images/vanilla-cake-index-64b741d111282.jpg?crop=0.6668240106993942xw:1xh;center,top&resize=1200:*" />
          <CakeCard title="kem" img="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/rainbow_cake_20402_16x9.jpg" /> */}

          {Array.isArray(cake) && cake.map((cakeItem) => (
            <CakeCard 
              key={cakeItem.cakeID}
              title={cakeItem.description}
              img={cakeItem.cakeImages.length > 0 ? cakeItem.cakeImages[0].imageDetail.imagePath : ""}
            />
            // alert(cakeItem.cakeImages_imageDetail_imagePath)
          ))}
        </Carousel>
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
            <Grid
              container
              xs={4}
              key={index}
              sx={{
                display: "flex",
                alignItems: "start",
              }}
            >
              <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Circle>{step.number}</Circle>

                  <Typography
                    variant="h6"
                    color="#e82451"
                    align="center"
                    sx={{ fontSize: "1.15rem", mb: 2 }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    {step.description}
                  </Typography>
                </Box>
                {
                  <Box
                    sx={{
                      display: "flex",
                      visibility: index == 3 ? "hidden" : "visible",
                      alignItems: "start",
                      height: "100%",
                    }}
                  >
                    <Image src={arrow} width={100} />
                  </Box>
                }
              </Grid>
            </Grid>
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

