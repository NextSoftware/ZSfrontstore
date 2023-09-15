import { Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import axios from "axios";
import { selectCartState } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const checkIcon = "/assets/check.svg";

function OrderConfirmation(props: any) {
  const [cookie, setCookie] = useCookies(["promoCode"])
  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();
  React.useEffect(() => {

    const checkout = async () =>{
      await axios
      .post(`/checkout`, {
        Valid: true,
        Checkout_Types_ID: 1,
        Customer_ID: props.data[0]?.Customer_ID,
        Address_ID: props.data[0]?.id,
      })
      .then((response) => {
        console.log(response.data);
        for (const iterator of cartState) {
          axios.post(`/checkout-product`, {
            Quantity: iterator.qty,
            Item_ID: iterator.item_ID,
            Warehouse_ID: 223,
            Checkout_ID: response.data.id,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
    }

  }, []);
  return (
    <div className="success-wrapper">
      <Image
        src={checkIcon}
        alt="Encomenda Completa"
        width={100}
        height={100}
      ></Image>
      <Typography className="title-container">
        Pedido efectuado com sucesso!
      </Typography>
      <Typography>
        Agradecemos desde já a sua preferência. <br />
        Poderá consultar o seu pedido{" "}
        <Link href="/user" className="link-text">
          aqui.
        </Link>
      </Typography>
    </div>
  );
}

export default OrderConfirmation;
