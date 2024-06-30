import { Box } from "@mui/material";
import Layout from "../layout";

const Landing = () => {
  return (
    <Layout>
      <Box
        sx={{
          background: "linear-gradient(30deg, #EF8F6E 0%, #f6e187 100%)",
          height: "100vh",
        }}
      ></Box>
    </Layout>
  );
};

export default Landing;
