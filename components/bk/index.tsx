//const Header = lazy(() => import("../../components/header"));
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Divider, Typography } from "@mui/material";
import Footer from "../../components/footer";
import React, { Suspense, useRef } from "react";
// import { ArrowOutward, Category, Height, Rowing } from "@mui/icons-material";
// import SliderCategorias from "../../components/slider-categorias";
// import SubcategoryCard from "../../components/subcategory-card";
// import { useRouter } from "next/router";
// import Loading from "../../components/loading";
// import ProductItem from "../../components/product-item";
// import CategoryFilters from "../../components/category-filters";
// import styles from "../../styles/Category.module.scss";
import ProductItemMain from "../../components/product-item-main";
import axios from "axios";
import SliderBanner from "../../components/slider-banner";
import Header from "../../components/header";
import { useRouter } from "next/router";
//const promotionProductImg = "/assets/promotion-product.png";

const Home = ({ data }: any) => {
  const [scrollPosition, setScrollPosition] = React.useState<any>(0);
  const containerRef = useRef<any>(null);
  const [prodArray, setProdArray] = React.useState([]);
  const [filterArray, setFilterArray] = React.useState([]);
  const router = useRouter();

  const [categoryArray, setCategoryArray] = React.useState(
    data.Response.Content.family
  );

  console.log(categoryArray);
  // React.useEffect(() => {
  //   axios
  //     .get("/image-product/all")
  //     .then((response) => setProdArray(response.data));
  // }, []);
  const getProds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/products/all`)
      .then(async (response) => {
        setProdArray(await response.data.Response.Content.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProds();
  }, []);
  // const scrollLeft = () => {
  //   if (containerRef.current) {
  //     setScrollPosition((prevScroll: any) => prevScroll - 200);
  //     const vwValue = 100; // Adjust this to your desired "vw" value to scroll
  //     const pixelsToScroll = (vwValue / 100) * window.innerWidth;
  //     containerRef.current.behavior = "smooth";
  //     containerRef.current.scrollLeft -= pixelsToScroll;
  //   }
  // };

  // const scrollRight = () => {
  //   if (containerRef.current) {
  //     setScrollPosition((prevScroll: any) => prevScroll + 200);
  //     const vwValue = 10; // Adjust this to your desired "vw" value to scroll
  //     const pixelsToScroll = (vwValue / 100) * window.innerWidth;
  //     containerRef.current.behavior = "smooth";
  //     containerRef.current.scrollLeft += pixelsToScroll;
  //   }
  // };
  return (
    <div style={{ background: "#f6f6f6" }}>
      <Header />

      {/* Banner */}
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <SliderBanner />
      </Suspense>

      <Grid sx={{ background: "#f6f6f6" }}>
        <Grid container>
          <Grid lg={6} xs={12}>
            <h1 style={{ marginLeft: "10vw" }}>Latest</h1>
          </Grid>

          <Grid lg={6} xs={12} overflow={"auto"}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                width: "fit-content",
                height: "100%",
              }}
            >
              {categoryArray.map((item: any) => (
                <Grid key={"btn" + item.codigo}>
                  <Button
                    onClick={async (event) => {
                      console.log(event.detail);
                      console.log(item.codigo);
                      if (event.detail > 1) {
                        //router.push(`categorias/${item.category.Slug}`)
                      }
                      await axios
                        .get(
                          `${process.env.REACT_APP_API_URL}/zonesoft/products/family/${item.codigo}`
                        )
                        .then((response) => {
                          console.log(response.data);
                          setFilterArray(response.data);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                      // await axios
                      //   .get(`/category/related/${item.category.Slug}`)
                      //   .then(async (response) =>
                      //     setFilterArray(response.data.prodArray)
                      //   )
                      //   .catch((error) => console.log(error));
                    }}
                  >
                    {item.descricao}
                  </Button>
                </Grid>
              ))}
            </div>
          </Grid>
          <Divider />
          <Grid container>
            <div
              className="hiddenScrollContainer"
              style={{
                display: "flex",
                overflowX: "auto",
                width: "100%", // Ensures the container takes full width
                margin: "5vh 10vw 5vh",
                scrollBehavior: "smooth", // Enable smooth scrolling
              }}
              ref={containerRef}
            >
              {filterArray.length === 0
                ? prodArray.map((item: any) => (
                    <Grid
                      lg={3}
                      md={4}
                      sm={4}
                      xs={4}
                      key={"selectedCatedory" + item.codigo}
                      style={{
                        flex: "0 0 auto",
                        //minWidth: "fit-content",
                      }}
                    >
                      <ProductItemMain data={item} />
                    </Grid>
                  ))
                : filterArray.map((item: any) => (
                    <Grid
                      lg={3}
                      md={4}
                      sm={4}
                      xs={4}
                      key={"selectedCatedory" + item.codigo}
                      style={{
                        flex: "0 0 auto",
                        //minWidth: "fit-content",
                      }}
                    >
                      <ProductItemMain data={item} />
                    </Grid>
                  ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{
          height: "50vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "0 10px 0 10px",
        }}
      >
        <Typography
          color={"#fff"}
          fontSize={"30px"}
          sx={{ marginBottom: "2vh" }}
        >
          Work Like a Professional, With Best in it's Class
        </Typography>
        <Button sx={{ backgroundColor: "#0A0A0A", color: "#fff" }}>
          CHECKOUT NOW
        </Button>
      </div>
      {/* item with images */}
      <Grid paddingX={"10vw"} marginY={"5vh"}>
        <Grid container direction={"row"}>
          <Grid
            xs={12}
            sm={6}
            md={6}
            lg={3}
            style={{
              justifyContent: "left",
              alignItems: "center",
              borderStyle: "solid",
              borderWidth: "1px",
              paddingLeft: "1vw",
              backgroundColor: "#F4F7F9",
            }}
            direction={"row"}
            container
            padding={"2vh"}
          >
            <img src="/assets/check.png" alt="" width={"48px"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1vw",
              }}
            >
              <h3 style={{ padding: 0, margin: 0 }}>Free Shiping</h3>
              <p style={{ padding: 0, margin: 0 }}>
                Free delivery for all products.
              </p>
            </div>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={6}
            lg={3}
            style={{
              justifyContent: "left",
              alignItems: "center",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "#F4F7F9",
              paddingLeft: "1vw",
            }}
            direction={"row"}
            container
            padding={"2vh"}
          >
            <img src="/assets/man.png" alt="" width={"48px"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1vw",
              }}
            >
              <h3 style={{ padding: 0, margin: 0 }}>No Contact Delivery</h3>
              <p style={{ padding: 0, margin: 0 }}>
                We always value your safety.
              </p>
            </div>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={6}
            lg={3}
            style={{
              justifyContent: "left",
              alignItems: "center",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "#F4F7F9",
              paddingLeft: "1vw",
            }}
            padding={"2vh"}
            direction={"row"}
            container
          >
            <img src="/assets/plane.png" alt="" width={"48px"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1vw",
                width: "70%",
              }}
            >
              <h3 style={{ padding: 0, margin: 0 }}>Fast Delivery</h3>
              <p style={{ padding: 0, margin: 0 }}>
                We deliver faster then anything else.
              </p>
            </div>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={6}
            lg={3}
            style={{
              justifyContent: "left",
              alignItems: "center",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "#F4F7F9",
              paddingLeft: "1vw",
            }}
            direction={"row"}
            container
            padding={"2vh"}
          >
            <img src="/assets/dollar-symbol.png" alt="" width={"48px"} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1vw",
                width: "70%",
              }}
            >
              <h3 style={{ padding: 0, margin: 0 }}>30 Days Refund</h3>
              <p style={{ padding: 0, margin: 0 }}>
                Easy return policy for all products.
              </p>
            </div>
          </Grid>
        </Grid>
      </Grid>

      {/* SUBCATEGORIAS */}
      {/* info container */}
      <Grid container columnSpacing={3} marginX="10vw" marginBottom={"5vh"}>
        <Grid lg={3}>
          <Grid>
            <h3>sadasdsa</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Grid>
        </Grid>
        <Grid lg={3}>
          <Grid>
            <h3>sadasdsa</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Grid>
        </Grid>
        <Grid lg={3}>
          <Grid>
            <h3>sadasdsa</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Grid>
        </Grid>
        <Grid lg={3}>
          <Grid>
            <h3>sadasdsa</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

// // This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.REACT_APP_API_URL}/family/all`);
  let data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default Home;

{
  /* <Button
                  //disabled={scrollPosition <= 0}
                  style={{ fontSize: "2em" }}
                  onClick={scrollLeft}
                >
                  {"<"}
                </Button>
                <Button
                  onClick={scrollRight}
                  // disabled={
                  //   containerRef.current &&
                  //   containerRef.current?.scrollLeft >=
                  //     containerRef.current?.scrollWidth -
                  //       containerRef.current?.clientWidth
                  // }
                  style={{ fontSize: "2em" }}
                >
                  {">"}
                </Button> */
}
