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
import { Avatar } from "@mui/material";
import {
  selectItemCountState,
  setItemCountState,
} from "../slices/itemCountSlice";
import { selectCartState } from "../slices/cartSlice";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
//const UserCard = React.lazy(() => import("./user-card"));
import UserCard from "./user-card";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const Header = (props: Props) => {
  const dispatch = useDispatch();
  const cartState = useSelector(selectCartState);
  const itemCountState = useSelector(selectItemCountState);
  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  const [pfp, setPfp] = React.useState("");
  const [postalcode, setPostalcode] = React.useState("");
  async function imageVerif() {
    if (userCookie != undefined) {
      console.log(process.env.REACT_APP_API_URL);
      const jwtUser = jwtDecode(await userCookie?.token);
      await axios
        .get(
          `/costumer-has-image/customer/${await jwtUser?.email}`
        )
        .then(async (response) =>
          setPfp(`/img/` + (await response.data.location))
        )
        .catch((error) => {
          console.log("Header");
          console.log(error);
        });

      await axios
        .get(
          `/address/Email/${await jwtUser?.email}`
        )
        .then((response) => setPostalcode(response.data[0].PostalCode)).catch((error)=>console.log(error));
    }
  }

  React.useEffect(() => {
    dispatch(setItemCountState({ cartState ,postalcode:postalcode === ""||undefined?"1000-000":postalcode}));
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
          <div className={styles.menuEnd}>
            {/* <Link href="/categorias" className={styles.menuItemLink}>
              <Button className={styles.menuItem}>Página Inicial</Button>
            </Link> */}
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

export default Header;
