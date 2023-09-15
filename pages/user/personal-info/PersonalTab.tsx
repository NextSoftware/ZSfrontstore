import { TextField, Typography } from "@mui/material";


import React from "react";

// import AddressForm from "../../../components/address-form";
const AddressForm = React.lazy(()=> import( "../../../components/address-form"))
import Loading from "../../../components/loading";

const PersonalTab = (props: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true)
    if(props != null){
      setIsLoading(false)
    }
  }, []);
  console.log(props)
  //TODO: onclick missing
  //console.log(props.user.Customer.FirstName)
  if (isLoading) return <Loading />;
  return (
    <div>
      <Typography className="heading-user">Informações Pessoais</Typography>
      <div className="flex-inputs">
        <TextField
          className="input"
          id="outlined-basic"
          label="Nome completo"
          variant="outlined"
          fullWidth
          required
          sx={{ color: "#b277e0" }}
          value={props?.user?.FirstName + " " + props?.user?.LastName}
        />
      </div>

      <Typography className="heading-user">Morada de entrega</Typography>
          <React.Suspense fallback={<div>Loading...</div>}>
            <AddressForm data={props?.user} />
          </React.Suspense>
    </div>
  );
};

export default PersonalTab;
