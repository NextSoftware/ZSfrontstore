import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import { Button, Checkbox, CircularProgress, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import PersonalTab from "./PersonalTab";
import { useRouter } from "next/router";

import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import CustomizedSnackbar from "../../../components/SnackBar";
const AddressForm = React.lazy(() =>
  import("../../../components/address-form")
);
//import AddressForm from "../../../components/address-form";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type FormProps = {
  pass: string;
  repeatPass: string;
};

function PersonalInfo(props: any) {
  const [value, setValue] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [CartMessage, setCartMessage] = React.useState(false);

  const changePassword = async (formData: FieldValues) => {
    if (formData.pass != formData.repeatPass) {
      alert(`Passwords don't match`);
    } else {
      const jwtUser: any = jwtDecode(cookie?.user?.token);
      await axios
        .put(`/Customer/update/${await jwtUser.email}`, {
          oldpassword: formData.actualPass,
          newPassword: formData.pass,
        }) .then((response) => {
          // <CustomizedSnackbar
          //     severity={"success"}
          //     message={"Palavra-Passe alterada com sucesso!"}
          //   />
          alert("Palavra-Passe alterada com sucesso!");
        })
        .catch((error) => {
        //   <CustomizedSnackbar
        //   severity={"error"}
        //   message={"Algo deu errado, verifique as informações fornecidas e tente novamente!"}

        // />
        alert("Algo deu errado, verifique a 'Palavra-Passe atual' e tente novamente!");
        });

    }
  };

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  async function addCartMessage() {
    setCartMessage(false);
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for state to update
    setCartMessage(true);
  }

  const handleClick = () => {
    console.log("clicked");
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log("personal index");
  console.log(props?.userData);
  return (
    <>
      <TabContext value={value}>
        <TabList
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
          sx={{ borderBottom: "1px solid #DEDEDE" }}
        >
          <Tab label="Dados Pessoais" className="tab-user" value="0" />
          <Tab label="Faturação" className="tab-user" value="1" />
          <Tab label="Segurança" className="tab-user" value="2" />
        </TabList>

        <TabPanel
          value={value}
          hidden={value !== "0"}
          id={`simple-tabpanel-0`}
          aria-labelledby={`simple-tab-0`}
        >
          <PersonalTab user={props?.userData} />
        </TabPanel>

        {/* FATURAÇAO */}
        <TabPanel
          value={value}
          hidden={value !== "1"}
          id={`simple-tabpanel-1`}
          aria-labelledby={`simple-tab-1`}
        >
          <Typography className="heading-user">Dados de Faturação</Typography>

          <div className="flex-content">
            <div className="checkbox-wrapper">
              <Checkbox
                defaultChecked
                sx={{ "&.Mui-checked": { color: "#b277e0", padding: 0 } }}
              />
              <Typography>
                Utilizar os mesmos dados da morada de entrega
              </Typography>
            </div>

            <Button className="btn-close  max-width" sx={{ color: "#b277e0" }}>
              <AddIcon />
              Adicionar outros dados para a faturação
            </Button>
          </div>

          <Typography className="heading-user">
            Adicionar dados de faturação
          </Typography>
          <React.Suspense fallback={<div>Loading...</div>}>
            <AddressForm data={props?.userData} />
          </React.Suspense>
        </TabPanel>

        {/* SEGURANÇA */}
        <TabPanel
          value={value}
          hidden={value !== "2"}
          id={`simple-tabpanel-2`}
          aria-labelledby={`simple-tab-2`}
        >
          <Typography className="heading-user">Mudar palavra-passe</Typography>
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

              <Button className="btn-primary max-width" type={"submit"}>
                Guardar palavra-passe
              </Button>
            </div>
          </FormContainer>
        </TabPanel>
      </TabContext>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#7BB062" }}
        >
          Alterações guardadas com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PersonalInfo;
