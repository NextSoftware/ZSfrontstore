import * as React from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import img404 from "../public/assets/404.png";
import Image from "next/image";
import Footer from "../components/footer";
import { Button, Typography } from "@mui/material";
import Header from "../components/header";

export default function FourOhFour() {
  return (
    <>
      <Header />
      
      <div className="page404-wrapper">
        <Grid container className="grid">
          <Grid xs={12} md={6} className="text-container">
            <Typography className="text-404">404:</Typography>
            <Typography className="not-found-text">
              Página não encontrada
            </Typography>
            <Typography className="sorry-text">
              Pedimos desculpa pelo incómodo,
              <br /> mas não encontrámos a página que procura
            </Typography>
            <Link href="/categorias">
              <Button className="btn-dark">Voltar à página inicial</Button>
            </Link>
          </Grid>
          <Grid xs={12} md={6}>
            <Image src={img404} alt="Erro 404" className="img404" />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
