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
const bannerImg1 = "/assets/banner.jpg";
const bannerImg2 = "/assets/banner2.jpg";
const bannerImg3 = "/assets/banner3.jpg";
const plusIcon = "/assets/plus.svg";

// @refresh reset
const artigoDetail = ({ data1 }: any) => {
  console.log(data1)
  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [similarProducts, setSimilarProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [CartMessage, setCartMessage] = React.useState(true);
  const [category, setCategory] = React.useState('');
  const router = useRouter();
  console.log(data1)
  React.useEffect(() => {
    //setIsLoading(true);
    let category: any;
    let arr: any;
    axios
      .get(`/category/${data1.Product.Category_ID}`)
      .then(async (response) => {
        console.log(response.data)
        setCategory(await response.data[0]);
        category = response.data;

        await axios
          .get(`/product/catslug/${encodeURIComponent(category[0].Slug)}`)
          .then((response) => {
            console.log("catslug results")
            console.log(response.data)
            arr = response.data.filter(
              (el: any) => el.Products.id !== data1.Product.id
            );
          }).catch((error)=> console.log(error))
          .finally(() => {
            setSimilarProducts(arr);
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    await axios
      .get(`/stock/findItemID/${article.Product.Item_ID}`)
      .then(async (response) => {
        arr = await response.data;
      });
    if (arr.length == 0) {
      return alert("sem stock");
    }
    if(data1.Product.Amount <= 0){
      alert("sem")
    }
    if (Number(quantity) <= 0 || quantity.length <= 0) {
      alert("Por favor, introduza uma quantidade!");
    } else {
      const index = cartState
        .map((x: any) => {
          return x.id;
        })
        .indexOf(article.Product.id);
      if (index <= -1) {
        dispatch(
          cartAddItem({
            id: article.Product.id,
            item_ID: article.Product.Item_ID,
            name: article.Product.Name,
            qty: Number(quantity),
            price: article.Product.Price,
            description: article.Product.Description,
            image: article?.Image_ID[0]?.location,
          })
        );
      } else {
        dispatch(
          cartIncrementItem({ id: article.Product.id, qty: Number(quantity) })
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
    if (data1.Image_ID[0] === undefined) {
    } else {
      setImagesArr(data1.Image_ID);
    }
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
              {category?.Description}
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
            {/* srcpath = "/assets/no-product-image.jpg"; */}

            {ImagesArr.length === 0 ? (
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
            )}
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
              <Typography className="product-name">
                {data1.Product.Name}
              </Typography>
              <Typography className="product-description">
                {data1.Product.Description}
              </Typography>
              <Typography className="product-price">
                {data1.Product.Price}€
              </Typography>
              <div className="details-wrapper">
                <Typography className="details-title">
                  Detalhes do produto:
                </Typography>
                <div className="flex-detail">
                  <Typography className="details-key">Marca:</Typography>
                  <Typography className="details-value">
                    {data1.Product.Description}
                  </Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">
                    Código de Barras:
                  </Typography>
                  <Typography className="details-value">
                    {data1.Product.EAN}
                  </Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">Descrição:</Typography>
                  <Typography className="details-value">
                    {data1.Product.Description}
                  </Typography>
                </div>
                <div className="flex-detail">
                  <Typography className="details-key">Stock:</Typography>
                  <Typography className="details-value">
                    {data1.Product.Stock}
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
                  addToCartHandler(data1);
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

          <Stack
            direction={{ sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            className="grid-related-products"
          >
            {similarProducts.map((item: any) => (
              <ProductItem
                data={item}
                key={"similarProduct" + item.Products.id}
              />
            )
            )}
          </Stack>
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
  const res = await fetch(`http://localhost:4700/product/${id}`);
  let data1 = await res.json();
  // Pass data to the page via props
  return { props: { data1 } };
}

export default artigoDetail;
