import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./category-card";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

type ChildProps = {
  onChildData: (data: string) => void;
  dataArray: any;
};

//@ts-ignoreyarn
const SliderCategorias: React.FC<ChildProps> = ({ onChildData, dataArray }) => {
  
const router = useRouter();
console.log(dataArray)
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: dataArray.length < 7 ? dataArray.length : 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handleButtonClick = (item: any, event:any) => {
    if(event.detail === 2) {
      window.location.href = `/categorias/${item.Slug}`;
    }
    let field = `category=${item.Description}`;
    urlManager(field);


    onChildData(item.id);
  };
  async function urlManager(field: string) {
      router.push(window.location.href.split('?')[0] + "?" + field);
  }
  return (
    <div className="slider-categorias">
      <Slider {...settings}>
        {/* Each category item */}
        {dataArray.map((item: any) => (
          <Button
            key={"cat" + item.id}
            onClick={(event) => {
              handleButtonClick(item ,event);
            }}
          >
            <CategoryCard data={item} className={"active"} />
          </Button>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCategorias;
