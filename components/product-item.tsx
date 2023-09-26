import * as React from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomizedSnackbar from "./SnackBar";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAddItem,
  cartIncrementItem,
  selectCartState,
} from "../slices/cartSlice";
import axios from "axios";

const productImg = "/assets/product.png";
const plusIcon = "/assets/plus.svg";

const ProductItem = (data: any) => {
  const [AddCart, setAddCart] = React.useState(true);
  const router = useRouter();
  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();

  const { Name, Slug, Price } = data.data.Product;
  function imageVerif() {
    let srcpath = "";

    if (data.data.Image_ID[0] === undefined) {
      srcpath = "/assets/no-product-image.jpg";
    } else {
      console.log(data.data.Images);
      srcpath = `/img/${data.data.Image_ID[0].location}`;
    }
    return srcpath;
  }

  const addToCartHandler = async (article: any) => {
    let arr = [];
    await axios
      .get(`/stock/findItemID/${article.Products.Item_ID}`)
      .then(async (response) => {
        arr = await response.data;
      });
    if (arr.length == 0) {
      return alert("sem stock");
    }
    const index = cartState
      .map((x: any) => {
        return x.id;
      })
      .indexOf(article.Products.id);
    let imgLocation = "";
    if (index <= -1) {
      if (article.Images.length > 0) {
        imgLocation = article.Images[0].location;
      } else {
        imgLocation = "";
      }
      dispatch(
        cartAddItem({
          id: article.Products.id,
          item_ID: article.Products.Item_ID,
          name: article.Products.Name,
          qty: 1,
          price: article.Products.Price,
          description: article.Products.Description,
          image: imgLocation,
        })
      );
    } else {
      dispatch(cartIncrementItem({ id: article.Products.id, qty: 1 }));
    }
  };
  function addCartMessage() {
    setAddCart(false);
  }
  return (
    <div>
      <Card className="card-product">
        <CardContent className="card-content-product">
          <div className="flex-content">
            <Box component="div" className="product-image-wrapper">
              <img
                src={imageVerif()}
                className="product-image"
                onClick={async () => {
                  await router.push(`/artigo/${Slug}`);
                  router.reload();
                }}
              ></img>
            </Box>
            <Typography className="cardproduct-name">{Name}</Typography>
          </div>
          <Button
            className="btn-add-cart"
            onClick={() => {
              addCartMessage();
              addToCartHandler(data.data);
            }}
          >
            {Price.toFixed(2)}€
            <Image
              src={plusIcon}
              width={24}
              height={24}
              alt="Adicionar ao carrinho"
            ></Image>
          </Button>
          {!AddCart ? (
            <CustomizedSnackbar
              severity={"success"}
              message={"Produto adicionado ao Carrinho!"}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductItem;
