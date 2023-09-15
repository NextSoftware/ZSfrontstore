import { Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useCookies } from "react-cookie";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import Header from "../../components/header";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
import { red } from "@mui/material/colors";
function Password() {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const changePassword = async (formData: FieldValues) => {
    if (formData.pass != formData.repeatPass) {
      alert(`Passwords don't match`);
    } else {
      //colocar email
      await axios
        .put(`/Customer/update/forgot/${email}`, {
          newPassword: formData.pass,
        })
        .then((response) => console.log(response))
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifEmail = async (formData: FieldValues) => {
    //colocar email
    await axios
      .get(`/auth/forgotpass/${await formData.verifEmail}`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty("token")) {
          setEmail(formData.verifEmail);
        }
      })
      .then(() => {
        setActiveStep(1);
      })
      .catch((Error) => console.log(Error.response.data.message));
  };

  const verifToken = async (formData: FieldValues) => {
      await axios
        .get(`/Customer/Token/${email}`)
        .then(async (response) => {
          //console.log(response.data);
          if (await response.data == await formData.verifToken) {
            setActiveStep(2);
          } else {
            alert("Token inválido");
          }
        })
        .catch((error) => alert("Token inválido"));
      //console.log(formData.verifToken);
    
  };
  const [activeStep, setActiveStep] = React.useState(0);
  //const [token, setToken] = React.useState("");
  const [email, setEmail] = React.useState("");

  function EmailSetter() {
    return (
      <div>
        <Typography className="heading-user">Verificação de email</Typography>
        <FormContainer onSuccess={(data) => verifEmail(data)}>
          <div className="flex-inputs">
            <TextFieldElement
              required
              fullWidth
              label="Email da conta"
              type="email"
              name={"verifEmail"}
              id="email"
              autoComplete="current-email"
              className="input"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className="btn-primary max-width" type={"submit"}>
                Verificar
              </Button>
              <Button
                className="btn-secondary max-width"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    );
  }

  function TokenSetter() {
    return (
      <div>
        <Typography className="heading-user">Verificação de Token</Typography>
        <FormContainer onSuccess={(data) => verifToken(data)}>
          <div className="flex-inputs">
            <TextFieldElement
              required
              fullWidth
              label="Token enviado para o email"
              type="text"
              name={"verifToken"}
              id="token"
              autoComplete="current-token"
              className="input"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className="btn-primary max-width" type={"submit"}>
                Verificar
              </Button>
              <Button
                className="btn-secondary max-width"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    );
  }

  function PasswordChanger() {
    return (
      <div>
        <Typography className="heading-user">Mudar palavra-passe</Typography>
        <FormContainer onSuccess={(data) => changePassword(data)}>
          <div className="flex-inputs">
            <TextFieldElement
              required
              fullWidth
              label="Nova palavra-passe"
              type="password"
              name={"pass"}
              id="passwordconfirmation"
              autoComplete="current-password"
              className="input"
              variant="outlined"
            />
            <TextFieldElement
              required
              fullWidth
              label="Repita a nova palavra-passe"
              type="password"
              id="repeatpassword"
              name={"repeatPass"}
              autoComplete="current-password"
              className="input"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className="btn-primary max-width" type={"submit"}>
                Guardar palavra-passe
              </Button>
              <Button
                className="btn-secondary max-width"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Grid container direction={"row"} padding={10}>
        <Grid xs={2}></Grid>
        <Grid
          xs={8}
          sx={{ bgcolor: "#fff" }}
          container
          spacing={0}
          padding={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid xs={1}></Grid>
          <Grid xs={10} sx={{ width: "70%" }}>
            {activeStep == 0 ? (
              <EmailSetter />
            ) : activeStep == 1 ? (
              <TokenSetter />
            ) : activeStep == 2 ? (
              <PasswordChanger />
            ) : (
              <></>
            )}

            {/* <Typography className="heading-user">
              Mudar palavra-passe
            </Typography>
            <FormContainer onSuccess={(data) => changePassword(data)}>
              <div className="flex-inputs">
                <TextFieldElement
                  required
                  fullWidth
                  label="Palavra-passe atual"
                  type="password"
                  name={"actualPass"}
                  id="password"
                  autoComplete="current-password"
                  className="input"
                  variant="outlined"
                />
                <TextFieldElement
                  required
                  fullWidth
                  label="Nova palavra-passe"
                  type="password"
                  name={"pass"}
                  id="passwordconfirmation"
                  autoComplete="current-password"
                  className="input"
                  variant="outlined"
                />
                <TextFieldElement
                  required
                  fullWidth
                  label="Repita a nova palavra-passe"
                  type="password"
                  id="repeatpassword"
                  name={"repeatPass"}
                  autoComplete="current-password"
                  className="input"
                  variant="outlined"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button className="btn-primary max-width" type={"submit"}>
                    Guardar palavra-passe
                  </Button>
                  <Button
                    className="btn-secondary max-width"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </FormContainer> */}
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default Password;
