import * as React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "../../styles/Login.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import CustomizedSnackbar from "../../components/SnackBar";

import {
  TextField,
  Typography,
  Button,
  Box,
  Checkbox,
  Link,
} from "@mui/material";
import Image from "next/image";
import loginImg from "../../public/assets/login.jpg";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, userLogout, userSave } from "../../slices/userSlice";

function Login() {
  // Chamada do useRouter do NextJS
  const router = useRouter();
  const dispatch = useDispatch();
  const [LoginState, setLoginState] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(true);
  const cookies = new Cookies();
  // Button click event do botão de inicio de sessão
  const loginHandleClick = async (user: string, pass: string) => {
    if (cookie != undefined) {
      removeCookie("user");
    }
    setLoginState(true);
    await axios
      .post(`/auth/login`, {
        Email: user,
        Password: pass,
      })
      .then(function (response) {
        let time = 1800;
        if (isChecked) {
          time = 20000;
        }
        setCookie("user", JSON.stringify(response.data), {
          path: "/",
          maxAge: time, // Expires after 1hr
          sameSite: true,
        });
        const userCookie = cookies.get("user");
        if (userCookie != undefined) {
          axios.interceptors.request.use(async (request): Promise<any> => {
            request.headers.Authorization = `Bearer ${await response.data
              .token}`;
            return request;
          });
        }
      })
      .then(async () => {
        setLoginState(true);
        router.push("/user");
      })
      .catch((error) => {
        setLoginState(false);
      });
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  React.useEffect(() => {
    if (cookie?.user?.hasOwnProperty("token")) {
      router.push("/categorias");
    }
  }, []);
  //jsx
  return (
    <>
      {/* <Header /> */}
      <div className={styles.pageWrapper}>
        <Grid container className={styles.grid} justifyContent="flex-start">
          <Grid xs={2} md={6} className={styles.gridImg}>
            <div className={styles.imgWrapper}>
              <Image
                src={loginImg}
                alt="Purple door"
                className={styles.loginImg}
              ></Image>
            </div>
          </Grid>
          <Grid xs={10} md={6} className={styles.gridLogin}>
            <div className={styles.loginContainer}>
              <div>
                <Typography className={styles.title}>Iniciar sessão</Typography>
                <Typography className={styles.subtitle}>
                  Bem vindo! Introduza os seus dados
                </Typography>
              </div>

              <TextField
                className="input"
                id="id-email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                sx={{ color: "#b277e0" }}
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                className="input"
                id="id-password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                sx={{ color: "#b277e0" }}
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
              <Box className={styles.checkboxWrapper}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "&.Mui-checked": { color: "#b277e0"},
                  }}
                  onChange={(checkEvent: any) => {
                    if (checkEvent.target.checked == true) {
                      setIsChecked(true);
                    }

                    if (checkEvent.target.checked == false) {
                      setIsChecked(false);
                    }
                  }}
                />
                <Typography className={styles.textCheckbox}>
                  Guardar esta password
                </Typography>
              </Box>
              <Link className={styles.linkText} href={"/password"}>
                Esqueci-me da password
              </Link>
              <div className={styles.btnWrapper}>
                <Button
                  className="btn-primary"
                  onClick={() => loginHandleClick(email, password)}
                >
                  Iniciar sessão
                </Button>
                <Link href="/registar">
                  <Button className="btn-secondary" fullWidth>
                    Registar
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {!LoginState ? (
        <CustomizedSnackbar
          severity={"error"}
          message={"Ocorreu um erro ao efectuar o Login!"}
        />
      ) : null}
      <Footer />
    </>
  );
}
export default Login;
