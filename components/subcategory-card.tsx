import * as React from "react";
import Link from "next/link";

/* Mui imports */
import {
  CardContent,
  Button,
  Card,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CategoryCard from "./category-card";

const productImg = "/assets/product.png";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const SubcategoryCard = (data: any) => {
  const [subArrayFilter, setSubArrayFilter] = React.useState(
    data.subArray.filter((item: any) => item?.ParentID === data.data.id)
  );

  React.useEffect(() => {
    console.log(data);
    console.log(subArrayFilter);
  }, []);
  return (
    <>
      <CategoryCard data={data.data} className={"active"}/>
      <Card className="subcategory-list-item">
        
        {subArrayFilter.map((item: any) => (
          <Link className="subcategory-name" href={`/categorias/${item.Slug}`}>
            <KeyboardArrowRightIcon fontSize="small" />
            {item.Description}
          </Link>
        ))}
      </Card>

      {/* <Card className="category-list-card">
          <CardContent className="category-list-item">
            <img src={productImg} alt="product-1" className="category"></img>
            <Typography className="product-name">
              {Category.Description}
            </Typography>
          </CardContent>
        </Card> */}
    </>
  );
};

export default SubcategoryCard;
