import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../../components/loading";
import { cartClear } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function ConfirmCheck() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checkoutError, setError] = React.useState(false);
  const [checkoutValidator, setCheckoutValidator] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const errorImg = "/assets/errorImg.png";
  const checkIcon = "/assets/check.svg";
  const [cookie, setCookie] = useCookies(["user"]);

  const getCheckout = async () => {
    if (checkoutValidator?.Checkout_Types_ID == 2) {
      setTimeout(async () => {
        await axios
          .get(`/zscheckout/${checkoutValidator.id}`)
          .then((response) => {
            console.log(response.data);
            setCheckoutValidator(response.data);
          });
        console.log("Executing after the wait...");
      }, 5000);
    }
  };
  // Usage
  React.useEffect(() => {
    const jwtUser: any = jwtDecode(cookie?.user?.token);
    axios
      .get(`/zscheckout/last/${jwtUser.email}`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.Checkout_Types_ID != 2) {
          setCheckoutValidator(await response.data.Checkout);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  React.useEffect(() => {
    if (checkoutValidator != undefined) {
      getCheckout();
    }
  });

  if (isLoading)
    return (
      <div>
        <Header />
        <Loading />
      </div>
    );
  return (
    <>
      <div className="background-wrapper-2">
        {checkoutValidator?.Checkout_Types_ID == 2 ? (
          <div>
            <Header />
            <Loading />
          </div>
        ) : (
          <div>
            {" "}
            <Header />
            <div className="success-wrapper">
              {checkoutError == true ? (
                <div>
                  <div>
                    <Image
                      src={errorImg}
                      alt="Encomenda Completa"
                      width={100}
                      height={100}
                    ></Image>
                    <Typography className="title-container">
                      Erro na realização do pedido!
                    </Typography>
                    <Typography>
                      Agradecemos desde já a sua preferência. <br />
                      Por favor volte a realizar seu pedido{" "}
                      <Link href="/user" className="link-text">
                        aqui.
                      </Link>
                    </Typography>
                  </div>
                </div>
              ) : (
                <div
                  onLoad={() => {
                    dispatch(cartClear());
                  }}
                >
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
              )}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
