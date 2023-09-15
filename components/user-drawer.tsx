import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// const Image = React.lazy(() => import("next/image"));
import Image from "next/image";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
// import Orders from "../pages/user/orders";
import PersonalInfo from "../pages/user/personal-info";
import { AddAPhoto, ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ImageUpload from "./image-upload";
import Popup from "./popup";
import Loading from "./loading";
const Orders = React.lazy(() => import("../pages/user/orders"));

const userPic = "/assets/avatar.png";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function UserDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [pfp, setPfp] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  async function imageVerif() {
    console.log(props)
    if (props.userData != undefined) {
      await axios
        .get(`/costumer-has-image/customer/${await props?.userData?.Email}`)
        .then(async (response) => {
          setPfp("http://localhost:3100/img/" + (await response.data.location));
        })
        .finally(() => setIsLoading(false))
        .catch((error) => {
          console.log("drawer");
          console.log(error);
        });
    }
  }

  React.useEffect(() => {
    imageVerif();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="/categorias">
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBack />}
            sx={{
              margin: "20px 0 0 10px",
              backgroundColor: "#2d2d2d",
              color: "white",
            }}
            color="secondary"
          >
            Voltar
          </Button>
        </Link>
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="close"
          sx={{ display: { md: "none" }, margin: "14px 8px 0 0" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <div className="user-pic-wrapper">
        <Image
          src={pfp != undefined ? pfp : userPic}
          priority
          alt="User Picture"
          width={110}
          height={110}
          loading={"eager"}
        />
        <Button
          variant="outlined"
          size="small"
          endIcon={<AddAPhoto />}
          sx={{ margin: "auto" }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Alterar fotografia
        </Button>
        {isOpen ? (
          <Popup
            content={<ImageUpload userData={props?.userData} />}
            buttonclose={() => {
              setIsOpen(false);
            }}
          />
        ) : (
          <></>
        )}
      </div>

      <Divider />

      <List>
        {["Informações Pessoais", "Encomendas", "Ajuda"].map((text, index) => (
          <ListItem
            key={text + index}
            disablePadding
            sx={{ fontWeight: "600", color: "#5b5b5b" }}
          >
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                {index === 0 ? (
                  <PersonIcon />
                ) : index === 1 ? (
                  <ShoppingBagIcon />
                ) : (
                  <HelpIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isLoading) return <Loading />;
  return (
    <>
      <Box sx={{ display: "flex" }} className="box-user">
        <CssBaseline />
        <AppBar
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            marginTop: "64px",
          }}
        >
          <Toolbar
            className="toolbar-user"
            sx={{ height: "30px", backgroundColor: "#202020" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Bem vindo,{" "}
              {props?.userData?.FirstName + " " + props?.userData?.LastName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "borde-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* DRAWER CONTENT */}
        <Box
          component="main"
          className="drawer-content-container"
          sx={{
            flexGrow: 1,
            flexBasis: "100%",
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* DRAWER CONTENT IN HERE */}
          {/* Personal Info */}
          <Box
            component="div"
            className="content-personal-info"
            sx={{ display: selectedIndex === 0 ? "block" : "none" }}
          >
            <PersonalInfo userData={props.userData} />
          </Box>
          {/* Orders */}
          <React.Suspense fallback={<div>Loading...</div>}>
            <Box
              component="div"
              className="content-personal-info"
              sx={{ display: selectedIndex === 1 ? "block" : "none" }}
            >
              <Orders />
            </Box>
          </React.Suspense>
          {/* Help */}
        </Box>
      </Box>
    </>
  );
}
