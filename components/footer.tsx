import * as React from "react";

import { Typography } from "@mui/material";
import Image from "next/image";

import logoNext from "../public/assets/logo_next.svg";

const footer = () => {
  return (
    <div className="footer">
      <div className="left-container">
        <Typography className="footer-text">
          Todos os direitos reservados a
        </Typography>
        <Image src={logoNext} alt="NextSoftware" width={100}></Image>
      </div>
      <div className="right-container">
        <Typography className="footer-text">Tem dúvidas?</Typography>
        <a href="mailto:geral@nextsoftware.pt" className="link-text">
          Entre em contacto connosco
        </a>
      </div>
    </div>
  );
};

export default footer;
