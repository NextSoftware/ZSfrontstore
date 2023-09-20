import React, { useState } from "react";
import Slider from "react-slick";
const bannerImg1 = "/assets/banner.jpg";
const bannerImg2 = "/assets/banner2.jpg";
const bannerImg3 = "/assets/banner3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "flex",
    direction: "row",
    flexDirection: "row",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    direction: "row",
    flexDirection: "row",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
    direction: "row",
    flexDirection: "row",
  },
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    direction: "column",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  [theme.breakpoints.up("xl")]: {
    display: "flex",
    direction: "column",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

function SliderBanner() {
  const [imgArray, setImgArray] = React.useState<any>([]);
  const array = [bannerImg1, bannerImg2, bannerImg3];
  React.useEffect(() => {
    const getAll = async () => {
      await axios
        .get("/promo-image/all")
        .then(async (response) => {
          if (response.data.length > 0) {
            let tempArray = [];
            for (const element of await response.data) {
              if (element.Promotion.Active) {
                for (const iterator of element.Image_ID) {
                  tempArray.push({
                    Promotion: await element.Promotion,
                    local:
                      `${process.env.API_URL}/img/` + (await iterator.location),
                  });
                }
              }
            }
            setImgArray(tempArray);
          }
        })
        .catch((err) => console.log(err));
    };
    getAll();
  }, []);
  return (
    <Grid
      container
      style={{
        backgroundColor: "#E6F3F8",
        padding: "10%",
      }}
    >
      <Grid item sx={{ backgroundColor: "#fff" }} direction={"row"} container>
        <Grid item lg={2} sm={12} xs={12}>
          <Grid style={{ padding: "2vh 0.5vw 2vh 0" }}>
            <h1>Market</h1>
            <Divider />
            <Typography>"Categorias?"</Typography>
          </Grid>
        </Grid>
        <Grid item lg={8} sm={12} xs={12}>
          <Carousel
            className="carousel-div"
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
          >
            {/* Carousel content */}
            {imgArray.length > 0
              ? imgArray.map((item: any) => (
                  <div
                    key="slide1"
                    onClick={() => {
                      console.log(item);
                      if (item.Promotion.Identifier.includes("-")) {
                        axios
                          .get(
                            `/Product/${
                              item.Promotion.Identifier.split("-")[1]
                            }`
                          )
                          .then((response) => {
                            window.location.href =
                              "artigo/" + response.data.Slug;
                          });
                      } else {
                        axios
                          .get(`/Category/${item.Promotion.Identifier}`)
                          .then((response) => {
                            window.location.href =
                              "categorias/" + response.data.pop().Slug;
                          });
                      }
                    }}
                  >
                    <img
                      src={item.local}
                      alt="Promoções"
                      className="imgBanner"
                    ></img>
                  </div>
                ))
              : array.map((item) => (
                  <div
                    key={`slide${item}`}
                    onClick={() => console.log(123)}
                    // style={{ padding: "2vh 0.5vw 2vh 0" }}
                  >
                    <img src={item} alt="Promoções" className="imgBanner"></img>
                  </div>
                ))}
          </Carousel>
        </Grid>

        <StyledGrid lg={2}>
          {/* Grid content */}
          {array.map((item) => (
            <Grid
              key={`slide${item}`}
              onClick={() => console.log(123)}
              item
              xs={4}
              sm={4}
              md={4}
              lg={12}
              sx={{ flexGrow: 1 }}
            >
              <img
                src={item}
                alt="Promoções"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </Grid>
          ))}
        </StyledGrid>
      </Grid>
    </Grid>
  );
}

export default SliderBanner;

{
  /* <div key="slide1">
          <img src={bannerImg1} alt="Promoções" className="imgBanner"></img>
        </div>
        <div key="slide2">
          <img src={bannerImg2} alt="Promoções" className="imgBanner"></img>
        </div>
        <div key="slide3">
          <img src={bannerImg3} alt="Promoções" className="imgBanner"></img>
        </div> */
}
