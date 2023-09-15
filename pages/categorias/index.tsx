import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import Header from "../../components/header";
import styles from "../../styles/Category.module.scss";
import CategoryFilters from "../../components/category-filters";
import ProductItem from "../../components/product-item";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import Loading from "../../components/loading";
import Image from "next/image";
import FourOhFour from "../404";
import axios from "axios";
import ProductItemMain from "../../components/product-item-main";

// @ts-ignore
const Home = ({
  dataFromFamilies,
  dataFromSubFamilies,
  dataFromProducts,
}: any) => {
  const router = useRouter();
  const { category } = router.query;
  const errorImg = "/assets/not_found.png";
  const [orderBy, setOrderBy] = React.useState("");
  const [filterProdArray, setFilterProdArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const productArray = dataFromProducts.Response.Content.product;
  const familyArray = dataFromFamilies.Response.Content.family;
  const subFamily: Array<any> = dataFromSubFamilies.Response.Content.subfamily;
  const [urlPrice, setUrlPrice] = React.useState<number[]>([
    Math.min(...productArray.map((o: any) => o.precovenda)),
    Math.max(...productArray.map((o: any) => o.precovenda)),
  ]);
  React.useEffect(() => {
    const deployItems = async () => {
      //verificar se tem filtros
      if (window.location.href.includes("?")) {
        let filterArrayFromRouter: any = [];
        const url = window.location.href.split("?");

        if (window.location.href.includes("&")) {
          const urlFilters = url[1].split("&");
          //call the function to apply the filters into the products Array
          filterArrayFromRouter = await arrayFilter(urlFilters);
        } else {
          //call the function to apply the filters into the products Array
          filterArrayFromRouter = await arrayFilter([url[1]]);
        }
        setFilterProdArray(await filterArrayFromRouter);
      } else {
        setFilterProdArray([]);
      }
      setIsLoading(false);
    };
    deployItems();
  }, [router]);

  async function arrayFilter(filterArray: any) {
    let filteredProductArray: any = [];
    filterArray = await filterArray.sort();
    for await (const field of filterArray) {
      //save for later if i need to change logic
      // if (field.includes("price")) {
      //   const maxPrice = Number(field.split("=")[1].split("_")[1]);
      //   const minPrice = Number(field.split("=")[1].split("_")[0]);
      //   if (filteredProductArray.length == 0 && productArray.length > 0) {
      //     for await (const element of productArray) {
      //       if (
      //         element.precovenda >= minPrice &&
      //         element.precovenda <= maxPrice
      //       ) {
      //         filteredProductArray.push(element);
      //       }
      //     }
      //   } else {
      //     filteredProductArray = filteredProductArray.filter(
      //       (el: any) =>
      //         el.Products.Price >= minPrice && el.Products.Price <= maxPrice
      //     );
      //   }
      // }
      if (field.includes("category")) {
        let index;
        let prodArraySave: any = [];
        //try with decode, if decode gives error just grab it without decoding
        try {
          index = familyArray
            .map((e: any) => e.descricao)
            .indexOf(decodeURIComponent(field.split("=")[1]));
        } catch (error) {
          index = familyArray
            .map((e: any) => e.descricao)
            .indexOf(field.split("=")[1]);
        }

        if (index > 0) {
          const id = await familyArray[index].codigo;
          for await (const element of productArray) {
            if (element.familia == id) {
              if (!filteredProductArray.includes(element)) {
                filteredProductArray.push(element);
              }
            }
          }
          //save incase the subcategory doesn't have items
          prodArraySave = filteredProductArray;
        }
        if (field.includes("subcategory")) {
          filteredProductArray = [];
          let subIndex;
          try {
            subIndex = subFamily
              .map((e: any) => e.descricao)
              .indexOf(decodeURIComponent(field.split("=")[1]));
          } catch (error) {
            subIndex = subFamily
              .map((e: any) => e.descricao)
              .indexOf(field.split("=")[1]);
          }

          const subId = await subFamily[subIndex].codigo;

          for await (const element of productArray) {
            if (element.subfam == subId) {
              if (!filteredProductArray.includes(element)) {
                filteredProductArray.push(element);
              }
            }
          }
          if (filteredProductArray.length === 0) {
            filteredProductArray = prodArraySave;
          }
        }
      }
    }

    if (filterArray.toString().includes("orderBy")) {
      if (filteredProductArray.length == 0) {
        filteredProductArray = productArray;
      }
      const field = filterArray.find((x: any) => x.includes("orderBy"));

      if (field.split("=")[1] == "Id") {
        filteredProductArray = filteredProductArray.sort(
          (a: any, b: any) => a.codigo - b.codigo
        );
      }
      if (field.split("=")[1] == "Price") {
        console.log(filteredProductArray);
        filteredProductArray = filteredProductArray.sort((a: any, b: any) => {
          const priceA = a.precovenda;
          const priceB = b.precovenda;

          // Handle zero values
          if (priceA === 0 && priceB !== 0) {
            return -1; // Move elements with priceA of 0 to the front
          }
          if (priceA !== 0 && priceB === 0) {
            return 1; // Move elements with priceB of 0 to the front
          }

          // Regular ascending order sorting
          return priceA - priceB;
        });
      }
      if (field.split("=")[1] == "Name") {
        filteredProductArray.sort((a: any, b: any) =>
          a.descricao.localeCompare(b.descricao)
        );
      }
    }
    if (filterArray.toString().includes("like")) {
      if (filteredProductArray.length == 0) {
        filteredProductArray = productArray;
      }
      // console.log(filteredProductArray);
      const field = filterArray.find((x: any) => x.includes("like"));
      // console.log(field.split("=")[1])
      const decodedField = decodeURIComponent(field);
      filteredProductArray = filteredProductArray.filter(
        (item: any) =>
          item.descricao
            .toLowerCase()
            .indexOf(decodedField.split("=")[1].toLowerCase()) > -1
      );
    }
    console.log(filteredProductArray);
    return filteredProductArray;
  }

  async function urlManager(field: string) {
    let urlBase: any = [];
    if (window.location.href.includes("?")) {
      urlBase = window.location.href.split("?");
      let exist = false;
      if (!window.location.href.includes("&")) {
        router.push(window.location.href + "&" + field);
      } else {
        let urlArray = urlBase[1].split("&");
        for await (const iterator of urlArray) {
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

  async function urlRemove(field: string) {
    let exist = false;
    if (window.location.href.includes("?")) {
      let urlBase = window.location.href.split("?");
      let urlArray = urlBase[1].split("&");
      for (const iterator of urlArray) {
        if (
          decodeURIComponent(iterator) == field ||
          decodeURIComponent(iterator) == field + "&"
        ) {
          exist = true;
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

  const handleChange = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as string);
    // console.log(`orderBy=${event.target.value}`);
    if (window.location.href.includes("orderBy")) {
      urlReplacer("orderBy", `orderBy=${event.target.value}`);
    } else {
      urlManager(`orderBy=${event.target.value}`);
    }
  };

  //if (data.prodArray == undefined) return <FourOhFour />;

  //if (isLoading) return <Loading />;
  return (
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

          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/categorias"
          >
            Produtos
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/categorias"
          >
            Categorias
          </Link>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            color="text.primary"
          >
            {/* {data.cateArray[data.cateArray.length-1].Description} */}
          </Typography>
        </Breadcrumbs>

        <div className="inputs-wrapper">
          <TextField
            id="outlined-basic"
            label="Pesquisar"
            variant="outlined"
            className="each-input"
            onChange={(searchEvent: any) => {
              let field = `like=${searchEvent.target.value}`;
              if (searchEvent.target.value != "") {
                if (window.location.href.includes("like")) {
                  urlReplacer("like", field);
                } else {
                  urlManager(field);
                }
              } else {
                urlReplacer("like", "");
              }
            }}
          />

          <FormControl sx={{ minWidth: "150px" }} size="small">
            <InputLabel id="demo-select-small">Ordenar por</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={orderBy}
              label="Ordenar por"
              onChange={handleChange}
            >
              <MenuItem value={"Name"}>Nome</MenuItem>
              <MenuItem value={"Price"}>Preço</MenuItem>
              <MenuItem value={"Id"}>Mais recente</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Grid container spacing={2} className={styles.contentWrapper}>
        <Grid xs={6} sm={4} md={3} lg={2}>
          <CategoryFilters
            famArray={familyArray}
            subFamArray={subFamily}
            prodArray={
              filterProdArray.length > 0 ? filterProdArray : productArray
            }
            urlPrice={urlPrice}
            setUrlPrice={setUrlPrice}
            setProdArray={setFilterProdArray}
          />
        </Grid>
        <Grid xs={6} sm={8} md={9} lg={10} className="grid-products">
          <Grid container spacing={1} paddingRight={2} sx={{ paddingTop: 0 }}>
            {filterProdArray.length > 0 ? (
              <>
                {filterProdArray.map((item: any) => (
                  <>
                    {urlPrice[0] <= item.precovenda &&
                    urlPrice[1] >= item.precovenda ? (
                      <Grid
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        key={"selectedCatedory" + item.codigo}
                      >
                        <ProductItemMain data={item} />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            ) : (
              <>
                {productArray.map((item: any) => (
                  <>
                    {urlPrice[0] <= item.precovenda &&
                    urlPrice[1] >= item.precovenda ? (
                      <Grid
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        key={"selectedCatedory" + item.codigo}
                      >
                        <ProductItemMain data={item} />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            )}

            {/* {!window.location.href.includes("?") ? (
              data.prodArray.map((item: any) => (
                <Grid
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  key={"selectedCatedory" + item.Product.id}
                >
                  <ProductItem data={item} />
                </Grid>
              ))
            ) : filterProdArray.length > 0 ? (
              <>
                {filterProdArray.map((item: any) => (
                  <Grid
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    key={"selectedCatedory" + item.Products.id}
                  >
                    <ProductItem data={item} />
                  </Grid>
                ))}
              </>
            ) : (
              <div className="success-wrapper-cat">
              {" "}
              <Image
                src={errorImg}
                alt="Encomenda Completa"
                width={100}
                height={100}
              ></Image>
              <Typography className="title-container">
                Não foi possivel encontrar o que procura!
              </Typography>
              <Typography>
                Por favor tente de novo.
              </Typography>
            </div>
            )} */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

async function fetchSubFamlies() {
  // Fetch data from endpoint 1
  const response = await fetch("http://localhost:4700/subfamily/all");
  const data = await response.json();
  return data;
}

async function fetchFamilies() {
  // Fetch data from endpoint 1
  const response = await fetch("http://localhost:4700/family/all");
  const data = await response.json();
  return data;
}

// Function to fetch data from the second endpoint
async function fetchProducts() {
  // Fetch data from endpoint 2
  const response = await fetch("http://localhost:4700/products/all");
  const data = await response.json();
  return data;
}

// This gets called on every request
export async function getServerSideProps() {
  const dataFromFamilies = await fetchFamilies();
  const dataFromSubFamilies = await fetchSubFamlies();
  const dataFromProducts = await fetchProducts();
  return { props: { dataFromFamilies, dataFromSubFamilies, dataFromProducts } };
}

export default Home;
