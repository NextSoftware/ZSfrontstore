import { Grid, Typography, Button, TextField } from "@mui/material";
import * as React from "react";
import {
  cartDecrementItem,
  cartIncrementItem,
  cartRemoveItem,
  selectCartState,
} from "../../slices/cartSlice";
import {
  selectItemCountState,
} from "../../slices/itemCountSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
function TotalContainer(props: any) {
  const itemCountState = useSelector(selectItemCountState);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = React.useState<any>("");
  const [value, setValue] = React.useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["promoCode"]);

  const applyDiscount = async () => {
    await axios
      .get(`/promo-code/code/${localStorage.getItem("inputValue")}`)
      .then((response) => {
        setPromoCode(response.data);
        setCookie("promoCode", JSON.stringify(response.data), {
          path: "/",
          maxAge: 900, // Expires after 1hr
          sameSite: true,
        });      
      })
      .catch((error) => {
        setPromoCode("");
        console.log(error);
      });
  };

  React.useEffect(() => {
    setValue(localStorage.getItem("inputValue"));
    applyDiscount();
  }, []);

  const discountedPrice = () => {
    const price = itemCountState[0].priceOfItemsWithIva
    let discPrice = 0;
    if (promoCode) {
      discPrice = price;
      if (promoCode.Type == "DISCOUNT") {
        discPrice = (price / 100) * promoCode?.Quantity;
      } else if (promoCode.Type == "MONEY") {
        discPrice = promoCode?.Quantity;
      }
    }
    return discPrice;
  };

  return (
    <>
      <React.Fragment>
        {/* CONTAINER - A SUA ENCOMENDA - TOTAL  */}

        <div className="total-rows">
          <div className="flex-row">
            <Typography className="text-row">Valor produtos:</Typography>
            <Typography className="text-row">
              {itemCountState[0].priceOfItems.toFixed(2)}€
            </Typography>
          </div>
          <div className="flex-row">
            <Typography className="text-row">Valor IVA:</Typography>
            <Typography className="text-row">
              {itemCountState[0].priceOfItemsWithIva-itemCountState[0].priceOfItems}€
            </Typography>
          </div>
          <div className="flex-row">
            <Typography className="text-row">Descontos:</Typography>
            <Typography className="text-row">
              -{discountedPrice().toFixed(2)}€
            </Typography>
          </div>
          <div className="flex-row">
            <Typography className="text-row">Código promocional:</Typography>
            <TextField
              className="input promo-code"
              id="promoCode"
              variant="outlined"
              value={value}
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
                localStorage.setItem("inputValue", event.target.value);
                applyDiscount();
              }}
              sx={{ color: "#b277e0" }}
            />
          </div>
        </div>

        <hr className="purple-line" />

        <div className="flex-row">
          <Typography className="total-text">Total:</Typography>
          <Typography className="total-text">
            {cookie.promoCode != ""
              ? (
                itemCountState[0].priceOfItemsWithIva-discountedPrice()
                ).toFixed(2)
              : itemCountState[0].priceOfItemsWithIva.toFixed(2)}
            €
          </Typography>
        </div>

        <Typography className="caption-text">
          O valor total já inclui o IVA, mas não inclui o valor dos portes de
          entrega. Os dados de entrega e os detalhes de pagamento estarão
          disponíveis após avançar com a compra.
        </Typography>
      </React.Fragment>
    </>
  );
}

export default TotalContainer;
