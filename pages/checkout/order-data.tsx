import * as React from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  TextField,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import Loading from "../../components/loading";

/* Imagens métodos de pagamento */
const imgCreditcart = "/assets/pay_creditcart.jpg";
const imgGooglepay = "/assets/pay_googlepay.jpg";
const imgPaypal = "/assets/pay_paypal.jpg";
const imgMultibanco = "/assets/pay_multibanco.jpg";

function OrderData() {
  const [address, setAddress] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  React.useEffect(() => {
    //setIsLoading(true);
    if (cookie.hasOwnProperty("user")) {
      const jwtUser: any = jwtDecode(cookie?.user?.token);
      console.log(jwtUser);
      axios
        .get(`/customer/email/${jwtUser.email}`)
        .then(async (costumer) => {

            await axios
            .get(
              `/address/NIF/${Number(costumer.data.NIF)}`
            )
            .then((response) => {
              setAddress(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);


  console.log(address);
  if (isLoading) { return <Loading />};
  return (
    <>
      {/* SECTION 1 - Morada de Entrega */}
      <Accordion
        defaultExpanded={true}
        sx={{ margin: 0 }}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownRoundedIcon sx={{ color: "#b277e0" }} />
          }
          aria-controls="Open"
          id="panel1a-header"
          className="accordion-header-payments"
          sx={{ minHeigth: 0 }}
        >
          <Typography className="heading-payment">
            1. Morada de entrega
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="flex-content">
          <TextField
            className="input"
            id="outlined-basic"
            label="Nome completo"
            variant="outlined"
            fullWidth
            required
            sx={{ color: "#b277e0" }}
            defaultValue={
              address[0]?.Customer?.FirstName +
              " " +
              address[0]?.Customer?.LastName
            }
          
          />
          <TextField
            className="input"
            id="outlined-basic"
            label="Contacto"
            variant="outlined"
            fullWidth
            defaultValue={address[0]?.PhoneNumber}
            required
          />
          <TextField
            className="input"
            id="outlined-basic"
            label="Morada"
            variant="outlined"
            fullWidth
            defaultValue={address[0]?.StreetName +" "+address[0]?.DoorNumber}
            required
          />
          <TextField
            className="input"
            id="outlined-basic"
            label="NIF (se desejar fatura com estes dados)"
            variant="outlined"
            defaultValue={address[0]?.Customer?.NIF }
            fullWidth
          />
          <div className="flexbetween">
            <TextField
              className="input"
              id="outlined-basic"
              label="Código Postal"
              variant="outlined"
              defaultValue={address[0]?.PostalCode}
              fullWidth
              required
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Cidade"
              variant="outlined"
              defaultValue={address[0]?.City}
              fullWidth
              required
            />
          </div>
          <TextField
            className="input"
            id="outlined-basic"
            label="Distrito / Província (se aplicável)"
            variant="outlined"
            fullWidth
          />
          <TextField
            className="input"
            id="outlined-basic"
            label="País / Região"
            variant="outlined"
            defaultValue={address[0]?.Country}
            fullWidth
            required
          />
          <TextField
            className="input"
            id="outlined-basic"
            label="Instruções de entrega"
            variant="outlined"
            fullWidth
          />

          <Box className="checkbox-wrapper">
            <Checkbox
              defaultChecked
              sx={{
                "&.Mui-checked": { color: "#b277e0", padding: 0 },
              }}
            />
            <Typography>Guardar esta morada para compras futuras</Typography>
          </Box>

          <Button className="btn-primary max-width">
            Guardar morada de entrega
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* SECTION 2 - Dados de faturação */}

      <Accordion
        defaultExpanded={true}
        sx={{ margin: 0 }}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownRoundedIcon sx={{ color: "#b277e0" }} />
          }
          aria-controls="Open"
          id="panel1a-header"
          className="accordion-header-payments"
          sx={{ minHeigth: 0 }}
        >
          <Typography className="heading-payment">
            2. Dados de Faturação
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="flex-content">
          <Box className="checkbox-wrapper">
            <Checkbox
              defaultChecked
              sx={{ "&.Mui-checked": { color: "#b277e0", padding: 0 } }}
            />
            <Typography>
              Utilizar os mesmos dados da morada de entrega
            </Typography>
          </Box>

          <Button className="btn-close  max-width" sx={{ color: "#b277e0" }}>
            <AddIcon />
            Adicionar outros dados para a faturação
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default OrderData;
