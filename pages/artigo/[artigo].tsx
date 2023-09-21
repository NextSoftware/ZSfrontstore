import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/header";
import {
  SelectChangeEvent,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import Footer from "../../components/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAddItem,
  cartIncrementItem,
  selectCartState,
} from "../../slices/cartSlice";
import ProductItem from "../../components/product-item";
import axios from "axios";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import CustomizedSnackbar from "../../components/SnackBar";
import ProductItemMain from "../../components/product-item-main";
const bannerImg1 = "/assets/banner.jpg";
const bannerImg2 = "/assets/banner2.jpg";
const bannerImg3 = "/assets/banner3.jpg";
const plusIcon = "/assets/plus.svg";

// @refresh reset
const artigoDetail = ({ data1 }: any) => {
  const data = data1.Response.Content.product;
  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [similarProducts, setSimilarProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [CartMessage, setCartMessage] = React.useState(true);
  const [category, setCategory] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    //setIsLoading(true);
    const setSimilar = async () => {
      await axios
        .get(`http://localhost:3100/zonesoft/product/family/${data.familia}`)
        .then(async (response) => {
          const arr = await response.data.Response.Content.product;
          setSimilarProducts(response.data.Response.Content.product);
        })
        .catch((error) => console.log(error));

      await axios
        .get(`http://localhost:3100/zonesoft/family/${data.familia}`)
        .then(async (response) => {
          setCategory(await response.data.Response.Content.family);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    setSimilar();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addToCartHandler = async (article: any) => {
    let arr = [];
    //STOCK
    if (data.prodstock == 0) {
      return alert("sem stock");
    }

    if (Number(quantity) <= 0 || quantity.length <= 0) {
      alert("Por favor, introduza uma quantidade!");
    } else {
      const index = cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(article.codigo);
      if (index <= -1) {
        dispatch(
          cartAddItem({
            id: article.codigo,
            item_ID: article.descricao,
            name: article.descricao,
            qty: Number(quantity),
            price: article.precovenda,
            description: article.descricao,
            image: article?.foto,
          })
        );
      } else {
        dispatch(
          cartIncrementItem({ id: article.codigo, qty: Number(quantity) })
        );
      }
      // setCartMessage(true);
      // await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for state to update
      // setCartMessage(false);
    }
  };

  const [quantity, setQuantity] = React.useState("");
  const [ImagesArr, setImagesArr] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value);
  };
  React.useEffect(() => {
    // if (data1.Image_ID[0] === undefined) {
    // } else {
    //   setImagesArr(data1.Image_ID);
    // }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="background-wrapper">
        <Header />

        <div className="wrapper-breadcrums-header">
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/categorias"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            </Link>

            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/categorias"
            >
              Produtos
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/categorias"
            >
              Categorias
            </Link>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="text.primary"
            >
              {category?.descricao}
            </Typography>
          </Breadcrumbs>
        </div>

        {/* IMAGEM PRODUTO SLIDER */}
        <Grid container spacing={12} className="product-container">
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="wrapper-slider-product"
          >
            <div className="img-container">
              <img
                src={
                  data.foto != null
                    ? `data:image/jpeg;base64,${data.foto}`
                    : "/assets/no-product-image.jpg"
                }
                alt=""
              />
            </div>
            {/* srcpath = "/assets/no-product-image.jpg"; */}

            {/* {ImagesArr.length === 0 ? (
              <div className="img-container">
                <img
                  src={"/assets/no-product-image.jpg"}
                  alt="Promoções"
                  className="imgProduct"
                ></img>
              </div>
            ) : (
              <Slider {...settings} className="slider">
                {ImagesArr.map((item: any) => (
                  <div className="img-container" key={"ImageArtigo" + item.id}>
                    <img
                      src={`http://localhost:3100/img/${item.location}`}
                      alt="Promoções"
                      className="imgProduct"
                    ></img>
                  </div>
                ))}
              </Slider>
            )} */}
          </Grid>
          {/* INFO PRODUTO */}
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="product-info-grid"
          >
            <div className="product-info">
              <Typography className="product-name">{data.descricao}</Typography>
              <Typography className="product-description">
                {data.descricaocurta}
              </Typography>
              <Typography className="product-price">
                {data.precovenda}€
              </Typography>
              <div className="details-wrapper">
                <Typography className="details-title">
                  Detalhes do produto:
                </Typography>
                <div className="flex-detail">
                  <Typography className="details-key">Marca:</Typography>
                  <Typography className="details-value">Mudar</Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">
                    Código de Barras:
                  </Typography>
                  <Typography className="details-value">
                    {data.codbarras}
                  </Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">Descrição:</Typography>
                  <Typography className="details-value">
                    {data.descricao}
                  </Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">Stock:</Typography>
                  <Typography className="details-value">
                    {data.prodstock}
                  </Typography>
                </div>
              </div>
              <Typography className="details-key">
                Selecione a quantidade pretendida:
              </Typography>
              <input
                className="input-quantity"
                type="number"
                placeholder="Quantidade"
                min="1"
                max="100"
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(event);
                }}
              />

              <Button
                className="btn-primary"
                onClick={() => {
                  addToCartHandler(data);
                }}
              >
                Adicionar ao carrinho
              </Button>
              {/* {!CartMessage ? (
                <CustomizedSnackbar
                  severity={"success"}
                  message={"Produto adicionado ao Carrinho!"}
                />
              ) : null} */}

              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            </div>
          </Grid>
        </Grid>
        <div className="product-container related">
          <h2 className="heading">Produtos Relacionados </h2>

          {similarProducts.length > 0 && (
            <Stack
              direction={{ sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              className="grid-related-products"
            >
              {similarProducts.map((item: any) => (
                <>
                  {item.codigo != data.codigo ? (
                    <ProductItemMain
                      data={item}
                      key={"similarProduct" + item.codigo}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Stack>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = await context.params.artigo;
  // Fetch data from external API
  const getID = await id.split("-")[1];
  const res = await axios.get(
    `http://localhost:3100/zonesoft/product/${getID}`
  );
  let data1 = await res.data;
  return { props: { data1 } };
}

export default artigoDetail;
