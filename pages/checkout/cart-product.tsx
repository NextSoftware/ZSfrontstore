import { Button, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import {
  cartRemoveItem,
  cartIncrementItem,
  cartDecrementItem,
  cartQtyItem,
} from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
const CartProduct = (props: any) => {
  const dispatch = useDispatch();
  function checkQty (newValue: number){
    if(newValue > 0){
      dispatch(cartQtyItem({id:props.id, qty:Number(newValue)}));
    }
  }
  return (
    <React.Fragment>
      <div className="each-product-in-cart">
        <div className="product-img-wrapper">
            {props.img && props.img !== "" ? (
                <img src={`http://localhost:3100/img/${props.img}`} />
                ) : (
                  <img src="/assets/no-product-image.jpg" />
                )}
        </div>
        <div className="cart-product-info">
          <Typography className="cart-product-name">{props.name}</Typography>
          <Typography className="cart-product-description">
            {props.description} | Ref: {props.id}
          </Typography>
          <div className="input-delete">
            <input
              className="input-quantity"
              type="number"
              placeholder="Quantidade"
              defaultValue={props.qty}
              min="1"
              max="100"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = Number(e.target.value);
                checkQty(newValue);
              }}
            />
            <Button
              sx={{ color: "#b277e0" }}
              onClick={() => {
                dispatch(cartRemoveItem({ id: props.id }));
              }}
            >
              <DeleteForeverIcon /> Apagar
            </Button>
          </div>
        </div>
        <Typography className="cart-product-price">
          {(props.price * props.qty).toFixed(2)}€
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default CartProduct;