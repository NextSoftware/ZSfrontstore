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

const productImg = "/assets/product.png";
const plusIcon = "/assets/plus.svg";

const ProductItemMain = (data: any) => {
  const [AddCart, setAddCart] = React.useState(true);
  const router = useRouter();
  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();

  // const addToCartHandler = async (article: any) => {
  //   let arr = [];
  //   await axios
  //     .get(`/stock/findItemID/${article.Product.Item_ID}`)
  //     .then(async (response) => {
  //       arr = await response.data;
  //     });
  //   if (arr.length == 0) {
  //     return alert("sem stock");
  //   }
  //   const index = cartState
  //     .map((x: any) => {
  //       return x.id;
  //     })
  //     .indexOf(article.Product.id);
  //   let imgLocation = "";
  //   if (index <= -1) {
  //     if (article.Image_ID.length > 0) {
  //       imgLocation = article.Image_ID[0].location;
  //     } else {
  //       imgLocation = "";
  //     }
  //     dispatch(
  //       cartAddItem({
  //         id: article.Product.id,
  //         item_ID: article.Product.Item_ID,
  //         name: article.Product.Name,
  //         qty: 1,
  //         price: article.Product.Price,
  //         description: article.Product.Description,
  //         image: imgLocation,
  //       })
  //     );
  //   } else {
  //     dispatch(cartIncrementItem({ id: article.Product.id, qty: 1 }));
  //   }
  // };
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
                src={
                  data.data?.foto != null
                    ? `data:image/jpeg;base64,${data.data?.foto}`
                    : "/assets/no-product-image.jpg"
                }
                className="product-image"
                onClick={async () => {
                  //await router.push(`/artigo/${data.codigo}`); //slug?
                  //router.reload();
                  console.log("click!");
                }}
              ></img>
            </Box>
            <Typography className="cardproduct-name">
              {data.data.descricao}
            </Typography>
          </div>
          <Button
            className="btn-add-cart"
            onClick={() => {
              addCartMessage();
              //addToCartHandler(data.data);
            }}
          >
            {data.data.precovenda.toFixed(2)}€
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

export default ProductItemMain;
