import * as React from "react";
/* Mui imports */
import { CardContent, Button, Card, Typography, Box, Link } from "@mui/material";
import { useState, useEffect } from "react";

const CategoryCard = (data: any, className: string) => {

  return (
    <div className={className}>
      <Card sx={{backgroundColor: "#2f2f2f"}}> 
        <CardContent className="category-list-item">
          {/* <img
            src={
              data.data.hasOwnProperty("imageLocation")
                ? `http://localhost:3100/img/${data.data.imageLocation}`
                : "/assets/no-product-image.jpg"
            }
            alt="product-1"
            className="category"
          ></img> */}
          <Link className="product-name" href={`/categorias/${data.data.Slug}`}>
            {data.data.Description}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCard;
