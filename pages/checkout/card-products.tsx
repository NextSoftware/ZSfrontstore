import * as React from "react";
import { Grid, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CartProduct from "./cart-product";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAddItem,
  cartDecrementItem,
  cartIncrementItem,
  cartRemoveItem,
  selectCartState,
} from "../../slices/cartSlice";
import {
  selectItemCountState,
  setItemCountState,
} from "../../slices/itemCountSlice";
import process from "process";

// const data = {
//   id: "1234",
//   productName: "Impressora Brother MFC 0023 Impressora",
//   description: "(141,5 x62,5x127,5cm)",
//   price: "126,79€",
//   brand: "Brother",
//   barcode: "03848394893",
//   stock: "Stock disponível",
//   productImg: "/assets/product.png",
// };

const productImg = "/assets/tinteiro.jpg";
const productImg2 = "/assets/filament.jpg";

function CardProducts() {
  const cartState = useSelector(selectCartState);
  //const itemCountState = useSelector(selectItemCountState);
  const dispatch = useDispatch();
console.log(cartState)
  return (
    <React.Fragment>
      {cartState.map((item: any) => (
        <CartProduct
          id={item.id}
          name={item.name}
          description={item.description}
          qty={item.qty}
          price={item.price}
          key={item.id}
          img= {item.image}
        />
      ))}
    </React.Fragment>
  );
}

export default CardProducts;
