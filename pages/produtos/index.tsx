import { Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ProductItem from "../../components/product-item";

const bannerImg = "/assets/banner.jpg";
const productImg = "/assets/product.png";
const promotionProductImg = "/assets/promotion-product.png";

// @ts-ignore
function Produtos({ data }) {
  return (
    <div className="fullheight">
      <Header />

      <div className="imgBannerWrapper">
        <img src={bannerImg} alt="Promoções" className="imgBanner"></img>
      </div>

      <div className="category-wrapper">
        <Typography className="heading">Categorias de Produtos</Typography>

        <div className="category-list-wrapper">
          <IconButton color="primary" aria-label="add to shopping cart">
            <ArrowCircleLeftIcon />
          </IconButton>

          <div className="category-list">
            {/* Each category item */}
            {/*   {data.map((item: any) => (
            <Grid xs={6} sm={4} md={3} lg={2.4} key={item.id}>
              <ProductItem data={item} />
            </Grid>
          ))} */}
            <div className="category-list">
              {/* Each category item */}
              <div className="category-list-item">
                <img
                  src={productImg}
                  alt="product-1"
                  className="category"
                ></img>
                <Typography className="product-name">Filamento 3D</Typography>
              </div>
            </div>
          </div>

          <IconButton color="primary" aria-label="add to shopping cart">
            <ArrowCircleRightIcon />
          </IconButton>
        </div>
      </div>

      <div className="subcategories-wrapper">
        <Typography className="heading-2">Subcategorias</Typography>

        <Grid container className="subcategory-list-grid">
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">
                Tinteiros E coisas de impressão
              </Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
          <Grid>
            {/* Each subcategory item */}
            <div className="subcategory-list-item">
              <Typography className="subcategory-name">Tinteiros</Typography>

              <IconButton aria-label="Ver produtos">
                <ArrowCircleRightIcon className="whiteIcon" />
              </IconButton>
            </div>
          </Grid>
        </Grid>

        <div className="promotion-fullwidth">
          <Grid
            container
            spacing={1}
            justifyContent="center"
            className="grid-promotion"
          >
            <Grid item xs={6} sm={6} md={3} lg={4} className="grid-center">
              <Typography className="promotion-title">
                Promoção da Semana
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={2} className="grid-center">
              <img
                src={promotionProductImg}
                alt="product-1"
                className="promotion-img"
              ></img>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={4} className="grid-center">
              <div className="flex-product-name">
                <Typography className="promotion-product-name">
                  Computador Portátil Lenovo AD1294
                </Typography>
                <Typography className="promotion-product-description">
                  i5, 4GB RAM, 1TB armazenamento
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={2} className="grid-center">
              <Typography className="promotion-price">549,85€</Typography>
            </Grid>
          </Grid>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://192.168.62.202:3100/Category/all`);
  let data = await res.json();
  data = data.filter((item: any) => item.Category.Description.length > 0);

  // Pass data to the page via props
  return { props: { data } };
}

export default Produtos;
