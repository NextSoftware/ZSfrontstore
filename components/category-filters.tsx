import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Button, Checkbox, Slider } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const label = { inputProps: { "aria-label": "Impressoras" } };

/* For price slider  */
function valuetext(value: number) {
  return `${value}€`;
}

const CategoryFilters = ({
  famArray,
  subFamArray,
  prodArray,
  urlPrice,
  setUrlPrice,
  setProdArray,
}: any) => {
  const router = useRouter();

  // React.useEffect(() => {
  //   const arrayhandle = async () => {
  //     props.cateArray.sort((a: any, b: any) => a.id - b.id);
  //     console.log();
  //     setArr(
  //       props.cateArray.filter(
  //         (el: any) => el.Slug !== window.location.href.split("/")[4]
  //       )
  //     );
  //   };
  //   arrayhandle();
  // }, []);
  async function ChangePriceOnURL(newValue: number[]) {
    let field = `price=${urlPrice[0] + "_" + urlPrice[1]}`;
    if (!window.location.href.includes("price")) {
      urlManager(field);
    } else {
      urlReplacer("price", field);
    }
  }
  const handlePriceChange = async (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setUrlPrice([Math.min(newValue[0]), urlPrice[1]]);
    } else {
      setUrlPrice([urlPrice[0], Math.max(newValue[1])]);
    }

    ChangePriceOnURL(newValue);
  };

  async function urlManager(field: string) {
    let urlBase: any = [];
    if (window.location.href.includes("?")) {
      urlBase = window.location.href.split("?");
      let exist = false;
      if (!window.location.href.includes("&")) {
        if (!window.location.href.includes(field)) {
          router.push(window.location.href + "&" + field);
        }
      } else {
        const urlArray = urlBase[1].split("&");

        for await (const iterator of urlArray) {
          console.log(iterator);
          if (
            decodeURIComponent(iterator) == field ||
            decodeURIComponent(iterator) == field + "&"
          ) {
            exist = true;
          }
        }
        if (!exist) {
          router.push(window.location.href + "&" + field);
        }
      }
    } else {
      if (!window.location.href.includes("?")) {
        router.push(window.location.href + "?" + field);
      }
    }
  }

  async function urlReplacer(field: string, replaceString: string) {
    let urlArray: any = window.location.href.split("?")[1].split("&");
    let newUrl: any = window.location.href.split("?")[0];

    for (let index = 0; index < urlArray.length; index++) {
      const element = urlArray[index];

      if (element.includes(field)) {
        urlArray[index] = replaceString;
      }
    }

    for (let index = 0; index < urlArray.length; index++) {
      if (urlArray[index] != "") {
        if (index == 0) {
          newUrl += "?" + urlArray[index];
        }
        if (index >= 1) {
          newUrl += "&" + urlArray[index];
        }
      }
    }
    if (newUrl.includes("?")) {
      router.push(newUrl);
    } else {
      router.replace(newUrl);
    }
  }

  async function urlRemove(field: string, marcaArray?: any) {
    let exist = false;
    if (window.location.href.includes("?")) {
      let urlBase = window.location.href.split("?");
      let urlArray = urlBase[1].split("&");
      for (const iterator of urlArray) {
        console.log(decodeURIComponent(iterator));
        if (
          decodeURIComponent(iterator) == field ||
          decodeURIComponent(iterator) == field + "&"
        ) {
          exist = true;
          urlArray = urlArray.filter(
            (el) => decodeURIComponent(el) !== decodeURIComponent(iterator)
          );
        }
        if (iterator.includes("price") && field.includes("price")) {
          urlArray = urlArray.filter(
            (el) => decodeURIComponent(el) !== decodeURIComponent(iterator)
          );
        }
      }

      if (exist) {
        let newUrl = urlBase[0];
        for (let index = 0; index < urlArray.length; index++) {
          if (index == 0) {
            newUrl += "?" + urlArray[index];
          }
          if (index >= 1) {
            newUrl += "&" + urlArray[index];
          }
        }
        if (newUrl.includes("?")) {
          router.push(newUrl);
        } else {
          router.replace(newUrl);
        }
      }
    }
  }
  // const [urlPrice, setUrlPrice] = React.useState<number[]>([
  //   Math.min(...prodArray.map((o: any) => o.precovenda)),
  //   Math.max(...prodArray.map((o: any) => o.precovenda)),
  // ]);
  
  //const minDistance = 10;

  //const [value1, setValue1] = React.useState<number[]>([0, 100]);
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  /*  */

  return (
    <div className="wrapper-filters">
      {/* Categorias */}
      {famArray.length > 0 ? (
        <Accordion
          defaultExpanded={true}
          sx={{ margin: 0 }}
          elevation={0}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<KeyboardArrowDownRoundedIcon />}
            aria-controls="Open"
            id="panel1a-header"
            className="filters-header"
            sx={{ minHeigth: 0 }}
          >
            <Typography className="title-header">Categorias</Typography>
          </AccordionSummary>

          <AccordionDetails className="filters-details">
            {/* Sub Item */}
            {famArray.map((item: any) => (
              <Accordion
                sx={{ margin: 0 }}
                className="filters-item"
                elevation={0}
                disableGutters
                key={item.codigo}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownRoundedIcon />}
                  aria-controls="Open"
                  id="panel1a-header"
                  className="filters-item-header"
                  sx={{ minHeigth: 0 }}
                >
                  <div className="flex-item">
                    <Checkbox
                      // checked={
                      //   router.asPath.includes(
                      //     encodeURI(`category=${item.descricao}`)
                      //   )
                      //     ? true
                      //     : false
                      // }
                      sx={{
                        "&.Mui-checked": {
                          color: "#b277e0",
                        },
                      }}
                      onChange={async (checkEvent: any) => {
                        let field = "";
                        field = `category=${item?.descricao}`;

                        if (checkEvent.target.checked == true) {
                          urlManager(field);
                          // setProdArray(
                          //   prodArray.filter(
                          //     (x: any) => x.familia == item.codigo
                          //   )
                          // );
                        }
                        if (checkEvent.target.checked == false) {
                          //urlRemove(field);
                          router.replace(window.location.href.split("?")[0]);
                          // setProdArray(
                          //   prodArray.filter(
                          //     (x: any) => x.familia !== item.codigo
                          //   )
                          // );
                        }
                      }}
                    />
                    <Typography className="title-item">
                      {item.descricao}
                    </Typography>
                  </div>
                </AccordionSummary>
                {subFamArray
                  .filter((subItem: any) => subItem.familia == item.codigo)
                  .map((subFam: any) => (
                    <div key={subFam.codigo}>
                      <Checkbox
                        checked={
                          router.asPath.includes(
                            encodeURI(`subcategory=${subFam.descricao}`)
                          ) &&
                          router.asPath.includes(
                            encodeURI(`category=${item.descricao}`)
                          )
                            ? true
                            : false
                        }
                        sx={{
                          "&.Mui-checked": {
                            color: "#b277e0",
                          },
                        }}
                        onChange={async (checkEvent: any) => {
                          let field = "";
                          field = `subcategory=${subFam?.descricao}`;

                          if (checkEvent.target.checked == true) {
                            urlManager(field);
                            // setProdArray(
                            //   prodArray.filter(
                            //     (x: any) => x.subfam == subFam.codigo
                            //   )
                            // );
                          }
                          if (checkEvent.target.checked == false) {
                            urlRemove(field);

                            // setProdArray(
                            //   prodArray.filter(
                            //     (x: any) => x.familia == item.codigo
                            //   )
                            // );
                          }
                        }}
                      />

                      {subFam.descricao}
                    </div>
                  ))}
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <></>
      )}

      {/* Filtros */}
      <Accordion
        defaultExpanded={true}
        sx={{ margin: 0 }}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="filters-header"
        >
          <Typography className="title-header">Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails className="filters-details">
          {/* Sub Item */}

          {/* SLIDER PREÇO */}

          {/* Sub Item */}

          <Accordion
            sx={{ margin: 0 }}
            className="filters-item"
            elevation={0}
            disableGutters
            defaultExpanded={true}
            expanded={true}
          >
            <AccordionSummary
              aria-controls="Open"
              id="panel1a-header"
              className="filters-item-header"
              sx={{ minHeigth: 0 }}
            >
              <div className="flex-item">
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#b277e0",
                    },
                  }}
                  checked={router.asPath.includes(`price=`) ? true : false}
                  onChange={(checkEvent) => {
                    if (checkEvent.target.checked == false) {
                      urlRemove(`price=${urlPrice[0] + "_" + urlPrice[1]}`);
                    } else {
                      urlManager(`price=${urlPrice[0] + "_" + urlPrice[1]}`);
                    }
                  }}
                />
                <Typography className="title-item">
                  Intrevalo de Preços
                </Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails className="filters-subitem">
              <div className="price-text-wrapper">
                <Typography className="price-value">
                  {valuetext(urlPrice[0])}
                </Typography>
                <Typography className="title-subitem">a</Typography>
                <Typography className="price-value">
                  {valuetext(urlPrice[1])}
                </Typography>
              </div>

              <Slider
                getAriaLabel={() => "Intrevalo de preço"}
                value={urlPrice}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                //step={Math.round(maxPrice/10)}
                // marks={[
                //   {
                //     value: Math.round(0),
                //   },
                //   {
                //     value: Math.round(100),
                //   },
                // ]}
                min={Math.min(
                  ...prodArray.map((o: any) => o.precovenda)
                )}
                max={Math.max(
                  ...prodArray.map((o: any) => o.precovenda)
                )}
                step={Math.round(
                  Math.max(
                    ...prodArray.map((o: any) => o.precovenda)
                  ) / 14
                )}
                sx={{ color: "#b277e0" }}
              />
            </AccordionDetails>
          </Accordion>

          {/* End Sub item */}

          {/* Sub Item */}

          <Accordion
            sx={{ margin: 0 }}
            className="filters-item"
            elevation={0}
            disableGutters
            expanded={true}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownRoundedIcon />}
              aria-controls="Open"
              id="panel1a-header"
              className="filters-item-header"
              sx={{ minHeigth: 0 }}
            >
              <div className="flex-item">
                {/* <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#b277e0",
                    },
                  }}
                  checked={router.asPath.includes(`stock`) ? true : false}
                /> */}
                <Typography className="title-item">Stock</Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails className="filters-subitem">
              <div className="flex-item">
                {/* <Checkbox sx={{ "&.Mui-checked": { color: "#b277e0" } }} onChange={()=>{StockOnURL('Y')}} /> */}
                <Checkbox
                  sx={{ "&.Mui-checked": { color: "#b277e0" } }}
                  onChange={(checkEvent) => {
                    if (!window.location.href.includes(`stock=N`)) {
                      if (checkEvent.target.checked == true) {
                        urlManager(`stock=Y`);
                      } else {
                        urlRemove(`stock=Y`);
                      }
                    }
                  }}
                  value={isSubscribed}
                  id="Y"
                  disabled={router.asPath.includes(`stock=N`) ? true : false}
                  checked={router.asPath.includes(`stock=Y`) ? true : false}
                />

                <Typography className="title-subitem">Com stock</Typography>
              </div>
              <div className="flex-item">
                {/* <Checkbox sx={{ "&.Mui-checked": { color: "#b277e0" } }} onChange={()=>{StockOnURL('N')}} /> */}
                <Checkbox
                  sx={{ "&.Mui-checked": { color: "#b277e0" } }}
                  onChange={(checkEvent) => {
                    if (!window.location.href.includes(`stock=Y`)) {
                      if (checkEvent.target.checked == true) {
                        urlManager(`stock=N`);
                      } else {
                        urlRemove(`stock=N`);
                      }
                    }
                  }}
                  value={isSubscribed}
                  id="N"
                  disabled={router.asPath.includes(`stock=Y`) ? true : false}
                  checked={router.asPath.includes(`stock=N`) ? true : false}
                />

                <Typography className="title-subitem">Sem stock</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
          {/* End Sub item */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CategoryFilters;
