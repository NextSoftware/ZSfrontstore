import * as React from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Grid,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

/* Imagens métodos de pagamento */
const imgCreditcart = "/assets/pay_creditcart.jpg";
const imgGooglepay = "/assets/pay_googlepay.jpg";
const imgPaypal = "/assets/pay_paypal.jpg";
const imgMultibanco = "/assets/pay_multibanco.jpg";
const imgMbWay = "/assets/pay_mbway.webp";

function OrderPayment() {
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardValidationDate, setCardValidationDate] = React.useState("");
  const [cardCVC, setCardCVC] = React.useState("");
  return (
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
            <KeyboardArrowDownRoundedIcon sx={{ color: "#b277e0" }} />
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
            <Grid md={3} className="each-payment">
              <div className="payment-type-img">
                <img src={imgCreditcart}></img>
              </div>
              <Typography className="payment-text">
                Cartão de crédito
              </Typography>
            </Grid>
            <Grid md={3} className="each-payment selected">
              <div className="payment-type-img">
                <img src={imgMbWay}></img>
              </div>
              <Typography className="payment-text">MbWay</Typography>
            </Grid>
            {/* <Grid md={3} className="each-payment">
              <div className="payment-type-img">
                <img src={imgPaypal}></img>
              </div>
              <Typography className="payment-text">Pay Pal</Typography>
            </Grid> */}
            <Grid md={3} className="each-payment">
              <div className="payment-type-img">
                <img src={imgMultibanco}></img>
              </div>
              <Typography className="payment-text">Multibanco</Typography>
            </Grid>
          </Grid>

          <Typography className="subheading-card">Dados no cartão:</Typography>

          <div className="flexbetween">
            <TextField
              className="input"
              id="outlined-basic"
              label="Nome no cartão"
              variant="outlined"
              fullWidth
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCardName(event.target.value);
              }}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Número no cartão"
              variant="outlined"
              fullWidth
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCardNumber(event.target.value);
              }}
            />
          </div>
          <div className="flexbetween">
            <TextField
              className="input"
              id="outlined-basic"
              label="Data de validade"
              variant="outlined"
              fullWidth
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCardValidationDate(event.target.value);
              }}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="CVC"
              variant="outlined"
              fullWidth
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCardCVC(event.target.value);
              }}
            />
          </div>
          <Button className="btn-primary max-width">
            Guardar método de pagamento
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default OrderPayment;
