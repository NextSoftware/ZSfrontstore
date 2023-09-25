import * as React from "react";
import { Grid, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CartProduct from "./cart-product";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartState,
} from "../../slices/cartSlice";

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
