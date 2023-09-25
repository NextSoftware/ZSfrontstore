import * as React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "../../styles/Login.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {
  TextField,
  Typography,
  Button,
  Box,
  Checkbox,
  Link,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextFieldProps,
} from "@mui/material";
import Image from "next/image";
import loginImg from "../../public/assets/login.jpg";
import { useRouter } from "next/router";
import axios from "axios";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";

type FormProps = {
  user: string;
  fName: string;
  lName: string;
  registerNif: string;
  pass: string;
  repeatPass: string;
};

function Registar() {
  const router = useRouter();

  const register = async (formData: FieldValues) => {
    if (formData.pass != formData.repeatPass) {
      alert(`Passwords don't match`);
    } else {
      console.log(formData);
      await axios
        .post("/auth/register", {
          Email: formData.user,
          FirstName: formData.fName,
          LastName: formData.lName,
          NIF: formData.registerNif,
          Password: formData.pass,
        })
        .then(async function(response) {
          console.log(response);
          router.push("/login");
        })
        .catch(async function(error) {
          alert(error.response.data.message);
        });
    }
  };
  return (
    <>
      <Header />

      <div className={styles.pageWrapper}>
        <Grid
          container
          className={styles.gridRegistar}
          justifyContent="flex-start"
        >
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
                <Typography className={styles.title}>Registe-se</Typography>
                <Typography className={styles.subtitle}>
                  Bem vindo! Introduza os seus dados
                </Typography>
              </div>
              <FormContainer onSuccess={(data) => register(data)}>
                <TextFieldElement
                  className="input"
                  id="email"
                  type={"email"}
                  name={"user"}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ color: "#b277e0" }}
                />

                <TextFieldElement
                  className="input"
                  id="firstname"
                  type="text"
                  name={"fName"}
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ color: "#b277e0" }}
                />

                <TextFieldElement
                  className="input"
                  id="lastname"
                  type="text"
                  name={"lName"}
                  label="Sobrenome"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ color: "#b277e0" }}
                />

                <TextFieldElement
                  className="input"
                  id="nif"
                  name={"registerNif"}
                  label="NIF"
                  variant="outlined"
                  fullWidth
                  sx={{ color: "#b277e0" }}
                />

                <TextFieldElement
                  className="input"
                  id="password"
                  name={"pass"}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  sx={{ color: "#b277e0" }}
                />

                <TextFieldElement
                  className="input"
                  id="repeatpassword"
                  name={"repeatPass"}
                  label="Repetir Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  sx={{ color: "#b277e0", height: "40px" }}
                />

                <div className={styles.btnWrapper}>
                  <Button className="btn-primary" type={"submit"}>
                    Registar
                  </Button>
                </div>
              </FormContainer>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
export default Registar;
