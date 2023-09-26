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

// @ts-ignore
const categoria = ({ data }) => {
  const router = useRouter();
  const { category } = router.query;
  const errorImg = "/assets/not_found.png";
  const [orderBy, setOrderBy] = React.useState("");
  const [filterProdArray, setFilterProdArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const deployItems = async () => {
      if (window.location.href.includes("?")) {
        //const array: any = [];
        let array2: any = [];
        const url = window.location.href.split("?");
        if (window.location.href.includes("&")) {
          const urlFilters = url[1].split("&");
          array2 = await arrayFilter(urlFilters);
        } else {
          array2 = await arrayFilter([url[1]]);
        }
        setFilterProdArray(await array2);
      } else {
        setFilterProdArray([]);
      }
      setIsLoading(false);
    };
    deployItems();
  }, [router]);

  async function arrayFilter(filterArray: any) {
    let newArray: any = [];
    filterArray = await filterArray.sort();
    for await (const field of filterArray) {
      if (field.includes("price")) {
        const maxPrice = Number(field.split("=")[1].split("_")[1]);
        const minPrice = Number(field.split("=")[1].split("_")[0]);
        if (newArray.length == 0) {
          for await (const element of data.prodArray) {
            if (
              element.Products.Price >= minPrice &&
              element.Products.Price <= maxPrice
            ) {
              newArray.push(element);
            }
          }
        } else {
          newArray = newArray.filter(
            (el: any) =>
              el.Products.Price >= minPrice && el.Products.Price <= maxPrice
          );
        }
      }

      if (field.includes("category")) {
        const index = data.cateArray
          .map((e: any) => e.Description)
          .indexOf(decodeURIComponent(field.split("=")[1]));
        console.log(index);
        const id = await data.cateArray[index].id;

        for await (const element of data.prodArray) {
          if (element.Product.Category_ID == id) {
            newArray.push(element);
          }
        }
      }
    }

    if (filterArray.toString().includes("orderBy")) {
      if (newArray.length == 0) {
        newArray = await data.prodArray;
      }
      const field = filterArray.find((x: any) => x.includes("orderBy"));

      if (field.split("=")[1] == "Id") {
        newArray = newArray.sort(
          (a: any, b: any) => a.Products.id - b.Products.id
        );
      }
      if (field.split("=")[1] == "Price") {
        // console.log("price");
        newArray = newArray.sort(
          (a: any, b: any) => a.Products.Price - b.Products.Price
        );
      }
      if (field.split("=")[1] == "Name") {
        newArray.sort((a: any, b: any) =>
          a.Products.Name.localeCompare(b.Products.Name)
        );
      }
    }
    if (filterArray.toString().includes("like")) {
      if (newArray.length == 0) {
        newArray = data.prodArray;
      }
      // console.log(newArray);
      const field = filterArray.find((x: any) => x.includes("like"));
      // console.log(field.split("=")[1])
      newArray = newArray.filter(
        (item: any) =>
          item.Products.Name.toLowerCase().indexOf(
            field.split("=")[1].toLowerCase()
          ) > -1
      );
    }
    console.log(newArray);
    return newArray;
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

  if (data.prodArray == undefined) return <FourOhFour />;

  if (isLoading) return <Loading />;
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
            {data.cateArray[data.cateArray.length - 1].Description}
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
          <CategoryFilters props={data} />
        </Grid>
        <Grid xs={6} sm={8} md={9} lg={10} className="grid-products">
          <Grid container spacing={1} paddingRight={2} sx={{ paddingTop: 0 }}>
            {!window.location.href.includes("?") ? (
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
                <Typography>Por favor tente de novo.</Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = await context.params.category;
  //console.log(id);
  // Fetch data from external API
  let data = "";
  // const res = await fetch(`/product/catslug/${id}`);
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/zonesoft/product/family/${id}`
  );

  data = await res?.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default categoria;
