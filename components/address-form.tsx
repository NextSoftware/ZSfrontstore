import { Checkbox, Typography, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import CustomizedSnackbar from "./SnackBar";
import Loading from "./loading";

type FormPropsAddress = {
  street: String;
  nif: String;
  postalCode: String;
  phone: String;
  city: String;
  district: String;
  country: String;
  notes: String;
};

const AddressForm = (props: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/address/email/${props.data?.Email}`)
      .then(async (response) => {
        if ((await response.data.length) != 0) {
          setAddress(await response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>setIsLoading(false));
      
  }, []);

  const changeMainAddress = async (formData: FieldValues) => {
    if (formData != undefined || formData != null) {
      if (address.length == 0) {
        await axios
          .post(`/address`, {
            Country: await formData.country,
            CountryCode: "+351",
            City: await formData.city,
            StreetName: await formData.street,
            PostalCode: await formData.postalCode,
            DoorNumber: "99",
            PhoneNumber: await formData.phone,
            MainAddress: true,
            DeliveryInfo: await formData.notes,
            Customer_ID: props.data.id,
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await axios
          .put(
            `/address/mainAddress/${address[0]?.id}/customer/${props.data.id}`,
            {
              Country: await formData.country,
              CountryCode: "+351",
              City: await formData.city,
              StreetName: await formData.street,
              PostalCode: await formData.postalCode,
              DoorNumber: "99",
              PhoneNumber: await formData.phone,
              MainAddress: true,
              DeliveryInfo: await formData.notes,
            }
          )
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Vazio!");
    }
  };

  const [CartMessage, setCartMessage] = React.useState(false);

  async function addCartMessage() {
    setCartMessage(false);
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for state to update
    setCartMessage(true);
  }
  const defaultValues: FormPropsAddress = {
    street: address[0]?.StreetName,
    nif: props.data?.NIF,
    postalCode: address[0]?.PostalCode,
    phone: address[0]?.PhoneNumber,
    district: "",
    country: address[0]?.Country,
    notes: address[0]?.DeliveryInfo,
    city: address[0]?.City,
  };
  if (isLoading) return <Loading/>
  return (
    <div key={`address${Math.random()}`}>
      <FormContainer
        onSuccess={(info) => changeMainAddress(info)}
        defaultValues={defaultValues != undefined ? defaultValues : undefined}
      >
        <div className="flex-inputs">
          <TextFieldElement
            className="input"
            id="f-address"
            label="Morada"
            variant="outlined"
            name={"street"}
            fullWidth
            required
          />
          <TextFieldElement
            className="input"
            id="f-nif"
            name={"nif"}
            label="NIF (se desejar fatura com estes dados)"
            variant="outlined"
            fullWidth
          />
          <TextFieldElement
            className="input"
            id="outlined-basic"
            label="Contacto"
            variant="outlined"
            name={"phone"}
            fullWidth
            required
          />
          <div className="flexbetween">
            <TextFieldElement
              className="input"
              id="f-postalcode"
              name={"postalCode"}
              label="Código Postal"
              variant="outlined"
              fullWidth
              required
            />
            <TextFieldElement
              className="input"
              id="f-city"
              label="Cidade"
              variant="outlined"
              name={"city"}
              fullWidth
              required
            />
          </div>
          <TextFieldElement
            className="input"
            id="f-distrik"
            label="Distrito / Província (se aplicável)"
            name={"district"}
            variant="outlined"
            fullWidth
          />
          <TextFieldElement
            className="input"
            id="f-country"
            label="País / Região"
            name={"country"}
            variant="outlined"
            fullWidth
            required
          />
          <TextFieldElement
            className="input"
            id="f-notes"
            name={"notes"}
            label="Instruções de entrega"
            variant="outlined"
            fullWidth
          />

          <div className="checkbox-wrapper">
            <Checkbox
              defaultChecked
              sx={{
                "&.Mui-checked": { color: "#b277e0", padding: 0 },
              }}
            />
            <Typography>Guardar esta morada para compras futuras</Typography>
          </div>

          <Button
            className="btn-primary max-width"
            type={"submit"}
            onClick={() => {
              addCartMessage();
            }}
          >
            Guardar morada de entrega
          </Button>
          {CartMessage ? (
            <CustomizedSnackbar
              severity={"success"}
              message={"Morada Guardada com sucesso!"}
            />
          ) : null}
        </div>
      </FormContainer>
    </div>
  );
};

export default AddressForm;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookies = context.req.headers.cookie;
//   return { props: { cookies } };
// };
