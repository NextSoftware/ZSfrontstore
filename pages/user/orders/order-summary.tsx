import { Typography } from "@mui/material";
import * as React from "react";

function OrderSummary() {
  return (
    <div>
      <Typography className="heading-user">
        Resumo da encomenda nº232
      </Typography>

      <div className="resume-wrapper">
        <div className="row">
          <Typography className="key-text">6 Artigos</Typography>
          <Typography className="value-text">140,89€</Typography>
        </div>
        <div className="row">
          <Typography className="key-text">Custos de envio</Typography>
          <Typography className="value-text">9,95€</Typography>
        </div>
        <div className="row">
          <Typography className="key-text">
            Total: <br />
            <span>(Taxas incluídas)</span>
          </Typography>
          <Typography className="value-text price">150,84€</Typography>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
