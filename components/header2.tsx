import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Image from "next/image";
import myLogo from "../public/assets/logo_next.svg";
import iconCart from "../public/assets/icon_cart.svg";

import styles from "../styles/Header.module.scss";
import Link from "@mui/material/Link";
import { InputBase, Menu, MenuItem, alpha, styled } from "@mui/material";
import {
  selectItemCountState,
  setItemCountState,
} from "../slices/itemCountSlice";
import { selectCartState } from "../slices/cartSlice";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserCard from "./user-card";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const Header2 = (props: any) => {
  console.log(props);
  const dispatch = useDispatch();
  const cartState = useSelector(selectCartState);
  const itemCountState = useSelector(selectItemCountState);
  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  const [pfp, setPfp] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  async function imageVerif() {
    if (userCookie != undefined) {
      const jwtUser = jwtDecode(await userCookie?.token);
      await axios
        .get(`/costumer-has-image/customer/${await jwtUser?.email}`)
        .then(async (response) =>
          setPfp("http://localhost:3100/img/" + (await response.data.location))
        )
        .catch((error) => {
          console.log("Header");
          console.log(error);
        });
    }
  }

  React.useEffect(() => {
    dispatch(setItemCountState(cartState));
    //imageVerif();
  });

  React.useEffect(() => {
    //dispatch(setItemCountState(cartState));
    imageVerif();
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    /* Menu mobile content */

    <Box onClick={handleDrawerToggle} className={styles.navMobile}>
      <Link
        href="https://nextsoftware.com.pt"
        target="_blank"
        sx={{ mt: "30px", mb: "30px" }}
      >
        <Image
          src={myLogo}
          alt="NextSoftware logo"
          width={100}
          className={styles.logoMargin}
          priority
        />
      </Link>
      <Divider />
      <Link href="/categorias" className={styles.menuItemLinkMobile}>
        <Button className={styles.menuItemMobile}>Página Inicial</Button>
      </Link>
      <Link href="/categorias" className={styles.menuItemLinkMobile}>
        <Button className={styles.menuItemMobile}>Produtos</Button>
      </Link>
      <Link href="/checkout" className={styles.menuItemLinkMobile}>
        <Button className={styles.menuItemMobile}>Carrinho de compras</Button>
      </Link>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  function doSomething() {
    console.log(123);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" className={styles.navDesktop} position="static">
        {/* Menu desktop */}
        <Toolbar className={styles.navFlex}>
          <div className={styles.menuStart}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="https://nextsoftware.com.pt" target="_blank">
              <Image
                src={myLogo}
                alt="NextSoftware logo"
                width={100}
                className={styles.logoMargin}
              />
            </Link>
          </div>

          <div style={{ width: "50%" }}>
            {/* <div style={{color:"#FFFFFF", backgroundColor:"#FFFFFF"}}>
            <TextField
              id="search"
              type="search"
              label="Search"
              value={searchTerm}
              onChange={handleChange}
              sx={{ width: 600 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <div className={styles.menuEnd}>
            <Link href="/categorias" className={styles.menuItemLink}>
              <Button className={styles.menuItem}>Página Inicial</Button>
            </Link>
            <Link href="/categorias" className={styles.menuItemLink}>
              <Button className={styles.menuItem}>Produtos</Button>
            </Link>

            <UserCard pfp={pfp} />

            <Link href={`/checkout`} className={styles.btnCart}>
              <Image
                src={iconCart}
                alt="Carrinho"
                height={20}
                className={styles.iconCart}
              ></Image>

              <div className={styles.badge}>
                {itemCountState[0].numberOfItems}
              </div>
            </Link>
          </div>
        </Toolbar>
        <Toolbar>
          {/* <HeaderMenu categories={props.categories}/> */}
          {/* {props.categories.map((x:any)=>(
             <HeaderMenuCategory categories={x.subCategories} Name={x.category.Description}/>
          ))} */}
          {/* <HeaderMenuCategory categorategories={props.categories} /> */}

          <div style={{ backgroundColor: "red", width: "100%" }}>
            {props.categories.map((x: any) => (
              <div>
                <Menudiv category={x.category} label={x.category.Description} />

                {x.subCategories.map((y: any) => {
                  <Menudiv
                    style={{
                      marginLeft: "200px",
                      backgroundColor: "blue",
                      zIndex: "100",
                    }}
                    category={y}
                    label={y.Description}
                  />;
                })}
              </div>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      {/* Menu mobile */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header2;

const Menudiv = ({ category, label }: any) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = async () => {
    console.log(await category);
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
};

const Search = styled("div")(({ theme }) => ({
  display: "flex", // Add this to make the children align horizontally
  flexDirection: "row-reverse", // Reverse the flex direction to move the icon to the left
  alignItems: "center", // Center items vertically
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end", // Change this to align the icon to the right
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
