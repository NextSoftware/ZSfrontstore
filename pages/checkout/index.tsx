import * as React from "react";
import Header from "../../components/header";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/footer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CardProducts from "./card-products";
import OrderData from "./order-data";
import OrderConfirmation from "./order-confirmation";
import OrderPayment from "./order-payment";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import {
  cartClear,
  cartFixPrice,
  selectCartState,
} from "../../slices/cartSlice";
import { selectItemCountState } from "../../slices/itemCountSlice";
import TotalContainer from "./total-container";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../../components/loading";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddressForm from "../../components/address-form";

const productImg = "/assets/product.png";
const imgCreditcart = "/assets/pay_creditcart.jpg";
const imgMultibanco = "/assets/pay_multibanco.jpg";
const logoMulti = "/assets/multibanco-logo.png";
const imgMbWay = "/assets/pay_mbway.webp";
const steps = ["Carrinho", "Dados", "Pagamento", "Encomenda completa"];
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// @ts-ignore
function Checkout({}) {
  const router = useRouter();

  const dispatch = useDispatch();
  const [address, setAddress] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentOption, setPaymentOption] = React.useState(1);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [checkoutValidator, setCheckoutValidator] = React.useState();
  const [checkoutError, setError] = React.useState(false);
  const [entidade, setEntidade] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [pCookie, setPcookie] = useCookies(["promoCode"]);
  const [Customer, setCustomer] = React.useState("");
  const cartState = useSelector(selectCartState);
  const checkIcon = "/assets/check.svg";
  const errorImg = "/assets/errorImg.png";
  const itemCountState = useSelector(selectItemCountState);
  const discountedPrice = () => {
    const price = itemCountState[0].priceOfItemsWithIva;
    if (pCookie.promoCode == undefined) {
      return price;
    }

    if (pCookie.promoCode.Type == "DISCOUNT") {
      return price - price * (pCookie.promoCode?.Quantity / 100);
    } else if (pCookie.promoCode.Type == "MONEY") {
      return price - pCookie.promoCode?.Quantity;
    }
    return price;
  };

  const checkCart = async () => {
    for await (const item of cartState) {
      axios
        .get(`http://localhost:3100/zonesoft/product/${item.id}`)
        .then((response) =>
          dispatch(cartFixPrice(response.data.Response.Content.product))
        )
        .catch((error) => console.log(error));
    }
  };
  const checkoutDeploy = async (pm: string, reference: string) => {
    setIsLoading(true);
    if (!pCookie?.promoCode.hasOwnProperty("id")) {
      await axios
        .post(`http://localhost:3100/zscheckout`, {
          Valid: true,
          Checkout_Types_ID: 2, // começar com e depois atualizar para completo após a API confirmar que o pagamento foi bem sucedido
          Customer_ID: address[0]?.Customer_ID,
          Address_ID: address[0]?.id,
          PaymentMethod: pm,
          Reference: reference.toString(),
          ordersId: 1,
          Name: "",
        })
        .then(async (checkout) => {
          await checkCart();
          for await (const iterator of cartState) {
            await axios
              .post(`http://localhost:3100/article`, {
                Code: iterator.id.toString(),
                Name: iterator.name,
                Price: iterator.price,
                IVA_Type: "NORMAL",
              })
              .then(async (article) => {
                await axios
                  .post(`http://localhost:3100/checkout-article`, {
                    Quantity: iterator.qty,
                    Checkout_ID: checkout.data.id, // automatizar isto!
                    Article_ID: article.data.id,
                  })
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    setError(true);
                    console.log(error.response.data.message);
                  });
              })
              .catch((error) => {
                setError(true);
                console.log(error.response.data.message);
              });
          }
          setCheckoutValidator(await checkout.data);
        })
        .catch((error) => {
          // console.log(error.response);
        })
        .finally(() => {
          //dispatch(cartClear());
          setActiveStep(3);
          setIsLoading(false);
        });
    } else {
      // ATUALIZAR DEPOIS
      await axios
        .post(
          `http://localhost:3100/zscheckout/code/${pCookie?.promoCode.Code}`,
          {
            Valid: true,
            Checkout_Types_ID: 2, // começar com e depois atualizar para completo após a API confirmar que o pagamento foi bem sucedido
            Customer_ID: address[0]?.Customer_ID,
            Address_ID: address[0]?.id,
            PaymentMethod: pm,
            Reference: reference.toString(),
            ordersId: 1,
            Name: "",
          }
        )
        .then(async (checkout) => {
          // console.log(response.data.id);
          //conseguir a warehouse de forma automática
          console.log(checkout.data);
          await checkCart();
          for await (const iterator of cartState) {
            await axios
              .post(`http://localhost:3100/article`, {
                Code: iterator.id.toString(),
                Name: iterator.name,
                Price: iterator.price,
                IVA_Type: "NORMAL",
              })
              .then(async (article) => {
                console.log(article.data);

                await axios
                  .post(`http://localhost:3100/checkout-article`, {
                    Quantity: iterator.qty,
                    Checkout_ID: checkout.data.id, // automatizar isto!
                    Article_ID: article.data.id,
                  })
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    setError(true);
                    console.log(error.response.data.message);
                  });
              })
              .catch((error) => {
                setError(true);
                console.log(error.response.data.message);
              });
          }
          setCheckoutValidator(await checkout.data);
        })
        .catch((error) => {
          // console.log(error.response);
        })
        .finally(() => {
          //dispatch(cartClear());
          setActiveStep(3);
          setIsLoading(false);
        });
    }
  };

  React.useEffect(() => {
    if (cookie.hasOwnProperty("user")) {
      const jwtUser: any = jwtDecode(cookie?.user?.token);
      console.log(jwtUser);

      axios
        .get(`/address/Email/${jwtUser.email}`)
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => console.log(error));

      axios
        .get(`/Customer/Email/${jwtUser.email}`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      if (activeStep === 1) {
        alert("Tem de ter uma conta para realizar uma compra!");
        router.push("/login");
      }
    }
  }, [activeStep]);

  const getCheckout = async (reference: string) => {
    if (reference != undefined) {
      if (checkoutValidator?.Checkout_Types_ID == 2) {
        setTimeout(async () => {
          await axios.get(`/zscheckout/${reference}`).then((response) => {
            console.log(response.data);
            setCheckoutValidator(response.data);
          });
          console.log("Executing after the wait...");
        }, 5000);
      }
    }
  };

  React.useEffect(() => {
    if (activeStep == 3) {
      getCheckout(checkoutValidator?.id);
    }
  }, [checkoutValidator]);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (cartState.length == 0) {
      return alert("cart vazio!");
    }

    if (address == undefined || (address.length == 0 && activeStep == 1)) {
      return alert("Por favor introduz uma morada de entrega!");
    }
    if (activeStep + 1 === 3) {
      switch (paymentOption) {
        case 1: {
          createCreditCardPayment(jwtDecode(cookie?.user?.token));
          break;
        }
        case 2: {
          createMbWayPayment(contact);
          break;
        }
        case 3: {
          createMultibancoPayment();
          break;
        }
      }
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step: number) => () => {
    if (step < 2) {
      setActiveStep(step);
    }
  };

  const handleClick = () => {
    // console.log("clicked");
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

  const createMbWayPayment = async (contact: string) => {
    await axios
      .post("/zscheckout/payment", {
        type: "mbway",
        amount: discountedPrice(),
        contact: contact,
      })
      .then(async (response) => {
        console.log(response.data);
        //setReference(await response.data.referencia);
        //setReference(await response.data.referencia);
        if (response.data.sucesso) {
          await checkoutDeploy("MW:PT", response.data.referencia);
        } else {
          setError(true);
        }
      })
      .catch((error) => setError(true));
  };

  const createMultibancoPayment = async () => {
    await axios
      .post("/zscheckout/payment", {
        type: "multibanco",
        amount: discountedPrice(),
      })
      .then(async (response) => {
        console.log(response);
        setEntidade(await response.data.entidade);
        if (response.data.sucesso) {
          await checkoutDeploy("PC:PT", response.data.referencia);
        } else {
          setError(true);
        }
      })
      .catch((error) => setError(true));
  };

  const createCreditCardPayment = async (cookie: Object) => {
    await axios
      .post("/zscheckout/payment", {
        type: "creditcard",
        amount: discountedPrice(),
        email: await cookie?.email,
      })
      .then(async (response) => {
        console.log(response);
        window.open(response.data.redirectUrl, "_blank");
        await checkoutDeploy("CC:PT", response.data.reference);
      })
      .catch((error) => setError(true));
  };

  if (isLoading) {
    return <Loading />;
  }

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

            {/* <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/categorias"
            >
              Produtos
            </Link> */}
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/categorias"
            >
              Categorias
            </Link>
            {/* <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="text.primary"
            >
              Impressoras
            </Typography> */}
          </Breadcrumbs>
        </div>
        {/* Start of stepper */}
        <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto 20px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps} onClick={handleStep(index)}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <Grid
          container
          spacing={2}
          rowSpacing={2}
          columnSpacing={4}
          justifyContent="center"
          className="checkout-content-wrapper"
          sx={{ display: activeStep == 3 ? "none" : "flex" }}
        >
          {activeStep != 3 && (
            <Grid xs={12} sm={7} md={7} lg={7} className="container-cart">
              <div className="header-container">
                <Typography className="title-container">
                  {activeStep == 0
                    ? "Carrinho de Compras"
                    : activeStep == 1
                    ? "Os seus dados"
                    : "Pagamento"}
                </Typography>
              </div>
              <div className="content-cart">
                {/* All Steps Complete */}
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                  </React.Fragment>
                ) : activeStep == 0 ? (
                  <CardProducts />
                ) : activeStep == 1 ? (
                  // <OrderData />
                  <>
                    {/* SECTION 1 - Morada de Entrega */}
                    <Accordion
                      defaultExpanded={true}
                      sx={{ margin: 0 }}
                      elevation={0}
                      disableGutters
                    >
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowDownRoundedIcon
                            sx={{ color: "#b277e0" }}
                          />
                        }
                        aria-controls="Open"
                        id="panel1a-header"
                        className="accordion-header-payments"
                        sx={{ minHeigth: 0 }}
                      >
                        <Typography className="heading-payment">
                          1. Morada de entrega
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails className="flex-content">
                        <AddressForm data={Customer} />
                      </AccordionDetails>
                    </Accordion>

                    {/* SECTION 2 - Dados de faturação */}

                    <Accordion
                      defaultExpanded={true}
                      sx={{ margin: 0 }}
                      elevation={0}
                      disableGutters
                    >
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowDownRoundedIcon
                            sx={{ color: "#b277e0" }}
                          />
                        }
                        aria-controls="Open"
                        id="panel1a-header"
                        className="accordion-header-payments"
                        sx={{ minHeigth: 0 }}
                      >
                        <Typography className="heading-payment">
                          2. Dados de Faturação
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails className="flex-content">
                        <Box className="checkbox-wrapper">
                          <Checkbox
                            defaultChecked
                            sx={{
                              "&.Mui-checked": { color: "#b277e0", padding: 0 },
                            }}
                          />
                          <Typography>
                            Utilizar os mesmos dados da morada de entrega
                          </Typography>
                        </Box>

                        <Button
                          className="btn-close  max-width"
                          sx={{ color: "#b277e0" }}
                        >
                          <AddIcon />
                          Adicionar outros dados para a faturação
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ) : activeStep == 2 ? (
                  // <OrderPayment />
                  <>
                    {/* SECTION 3 - Métodos de pagamento */}

                    <Accordion
                      defaultExpanded={true}
                      sx={{ margin: 0 }}
                      elevation={0}
                      disableGutters
                    >
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowDownRoundedIcon
                            sx={{ color: "#b277e0" }}
                          />
                        }
                        aria-controls="Open"
                        id="panel1a-header"
                        className="accordion-header-payments"
                        sx={{ minHeigth: 0 }}
                      >
                        <Typography className="heading-payment">
                          3. Método de pagamento
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails className="flex-content">
                        <Typography className="subheading-card">
                          Selecione a forma de pagamento pretendida
                        </Typography>

                        <Grid container spacing={2} className="grid-payments">
                          <Grid
                            md={4}
                            className={
                              paymentOption === 1
                                ? "each-payment selected"
                                : "each-payment"
                            }
                          >
                            <div
                              className="payment-type-img"
                              onClick={() => {
                                setPaymentOption(1);
                              }}
                            >
                              <img src={imgCreditcart}></img>
                            </div>
                            <Typography className="payment-text">
                              Cartão de crédito
                            </Typography>
                          </Grid>

                          <Grid
                            md={4}
                            className={
                              paymentOption === 2
                                ? "each-payment selected"
                                : "each-payment"
                            }
                          >
                            <div
                              className="payment-type-img"
                              onClick={() => {
                                setPaymentOption(2);
                              }}
                            >
                              <img src={imgMbWay}></img>
                            </div>
                            <Typography className="payment-text">
                              MbWay
                            </Typography>
                          </Grid>
                          <Grid
                            md={4}
                            className={
                              paymentOption === 3
                                ? "each-payment selected"
                                : "each-payment"
                            }
                          >
                            <div
                              className="payment-type-img"
                              onClick={() => {
                                setPaymentOption(3);
                              }}
                            >
                              <img src={imgMultibanco}></img>
                            </div>
                            <Typography className="payment-text">
                              Multibanco
                            </Typography>
                          </Grid>
                        </Grid>
                        {paymentOption == 2 ? (
                          <div className="flexbetween">
                            <TextField
                              className="input"
                              id="id-email"
                              label="Nº Telemovel MBWAY"
                              variant="outlined"
                              fullWidth
                              required
                              sx={{ color: "#b277e0" }}
                              value={contact}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setContact(event.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </>
                ) : (
                  <div>Step end</div>
                )}
              </div>
            </Grid>
          )}
          {/* CONTAINER - A SUA ENCOMENDA - TOTAL  */}
          {activeStep != 3 && (
            <Grid xs={12} sm={5} md={5} lg={5} className="container-cart total">
              <div className="header-container">
                <Typography className="title-order">A sua encomenda</Typography>
              </div>
              <div className="content-cart">
                <TotalContainer address={address} />
                <Button
                  className="btn-secondary"
                  onClick={() => {
                    router.push("/categorias");
                  }}
                >
                  Continuar a comprar
                </Button>
                <Button className="btn-primary" onClick={handleNext}>
                  Avançar com a compra
                </Button>
              </div>
            </Grid>
          )}
        </Grid>

        {activeStep == 3 && (
          // <OrderConfirmation data={address}/>
          <div className="success-wrapper">
            {checkoutError == true ? (
              <div>
                {" "}
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
            ) : checkoutValidator?.Checkout_Types_ID === 2 ||
              checkoutValidator === undefined ? (
              checkoutValidator?.PaymentMethod != undefined &&
              checkoutValidator?.PaymentMethod == "PC:PT" ? (
                <div className="success-wrapper2">
                  <div className="payment-type-img">
                    <img src={logoMulti} width="50%" alt="" />
                  </div>
                  <Table
                    sx={{
                      maxWidth: 350,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TableHead></TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                          {"Entidade:"}
                        </TableCell>
                        <TableCell align="left">{entidade}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                          {"Referencia:"}
                        </TableCell>
                        <TableCell align="left">
                          {checkoutValidator.Reference}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                          {"Valor:"}
                        </TableCell>
                        <TableCell align="left">
                          {discountedPrice().toFixed(2) + "€"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 450,
                        fontSize: "1em",
                      }}
                    >
                      <ListItem>
                        Olá! Para efetuar o pagamento por referência Multibanco,
                        siga as instruções abaixo:
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>{1}.</strong>{" "}
                              {
                                "Dirija-se a um terminal de pagamento automático ou utilize o serviço de homebanking do seu banco."
                              }
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>{2}.</strong>{" "}
                              {
                                "Selecione a opção de pagamento de serviços ou pagamentos por referência Multibanco."
                              }
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>{3}.</strong>{" "}
                              {"Insira os seguintes dados:"}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <List>
                          <ListItem>
                            <strong>{"Entidade:"}</strong>[Número da Entidade]
                          </ListItem>
                          <ListItem>
                            <strong>{"Referência:"}</strong> [Número de
                            Referência]
                          </ListItem>
                          <ListItem>
                            <strong>{"Valor:"}</strong> [Valor a pagar]
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>{4}.</strong>{" "}
                              {
                                "Verifique se todos os dados estão corretos, principalmente o número da entidade, o número de referência e o valor a pagar."
                              }
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>{5}.</strong>{" "}
                              {
                                "Confirme o pagamento e guarde o comprovante como comprovativo de pagamento."
                              }
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </div>
                </div>
              ) : (
                <Loading />
              )
            ) : (
              <div
                onLoad={async () => {
                  dispatch(cartClear());
                  await axios.post("http://localhost:3100/zsorder", {
                    Price: checkoutValidator?.Price,
                    Customer_ID: checkoutValidator?.Customer_ID,
                    Checkout_ID: checkoutValidator?.id,
                    IVA: 2,
                    ordersId: 1,
                  });
                }}
              >
                {" "}
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
        )}

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", backgroundColor: "#7BB062" }}
          >
            Produto adicionado ao carrinho de compras!
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
