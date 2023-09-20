import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Invoices from "./invoices";
import OrderRequests from "./order-requests";
import { Button, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import Popup from "../../../components/popup";
import PdfViewer from "../../../components/PdfPreview";

// const barcodeImg = "/assets/barcode.jpg";
// const productImg = "/assets/product.png";

function createData(
  id: number,
  date: string,
  state: string,
  invoice: string,
  total: number
) {
  return { id, date, state, invoice, total };
}

// interface TabPanelProps {
//   children?: React.ReactNode;
//   dir?: string;
//   index: number;
//   value: number;
// }

// function TabPanelVis(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <div>{children}</div>
//         </Box>
//       )}
//     </div>
//   );
// }

function Orders() {
  const [value, setValue] = React.useState("0");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [checkoutList, setCheckoutList] = React.useState<any>([]);
  const [checkoutNotReadyList, setCheckoutNotReadyList] = React.useState<any>(
    []
  );
  const [checkoutLast, setCheckoutLast] = React.useState<any>({});
  const [prodImage, setProdImage] = React.useState("0");

  React.useEffect(() => {
    setIsLoading(true);
    const getCheckouts = async () => {
      const jwtUser: any = jwtDecode(cookie?.user?.token);
      await axios
        .get(`/checkout/indisponivel/${await jwtUser.email}`)
        .then((response) => setCheckoutNotReadyList(response.data))
        .catch((error) => console.log(error));

      await axios
        .get(`/checkout/last/${await jwtUser.email}`)
        .then((response) => setCheckoutLast(response.data))
        .catch((error) => console.log(error));
      await axios
        .get(`/checkout/customer/${await jwtUser.email}`)
        .then((response) => {
          console.log(response.data);
          let array = response.data.sort((a: any, b: any) => b.id - a.id);
          setCheckoutList(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    getCheckouts();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        {isOpen ? (
          <Popup
            content={<PdfViewer />}
            buttonclose={() => {
              setIsOpen(false);
            }}
          />
        ) : (
          <></>
        )}
        <TabList
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
          sx={{ borderBottom: "1px solid #DEDEDE" }}
        >
          <Tab label="Encomendas Realizadas" className="tab-user" value="0" />
          <Tab label="Faturas" className="tab-user" value="1" />
          <Tab label="Pedidos de encomenda" className="tab-user" value="2" />
        </TabList>

        <TabPanel
          value={value}
          hidden={value !== "0"}
          id={`simple-tabpanel-0`}
          aria-labelledby={`simple-tab-0`}
        >
          <Typography className="heading-user">
            Encomendas realizadas
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="table-user"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data da Encomenda</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Fatura</TableCell>
                  <TableCell>Valor Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkoutList.map((row: any) => (
                  <TableRow
                    hover
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row?.id}</TableCell>
                    <TableCell>{row?.Date.toString().split("T")[0]}</TableCell>
                    <TableCell>{row?.Checkout_Types.Name}</TableCell>
                    <TableCell align="center">
                      <Button
                        className="btn-text"
                        onClick={() => {
                          window.open(`${process.env.API_URL}/img/sample.pdf`);
                        }}
                      >
                        Ver fatura
                      </Button>
                    </TableCell>
                    <TableCell>{row.TaxedPrice.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            <Typography className="heading-user margintop">
              Resumo da encomenda nº{checkoutLast?.Checkout?.id}
            </Typography>

            {checkoutLast && (
            <div className="flex-between">
              <div className="resume-wrapper">
                <div className="row">
                  <Typography className="key-text">
                    {checkoutLast?.totalProducts} Artigos
                  </Typography>
                  <Typography className="value-text">
                    {((checkoutLast?.Checkout?.Price * 100) / 100).toFixed(2)}€
                  </Typography>
                </div>
                <div className="row">
                  <Typography className="key-text">Custos de envio</Typography>
                  <Typography className="value-text">9,95€</Typography>
                </div>
                <div className="row">
                  <Typography className="key-text">
                    Total: <br />
                    <span>(Taxas incluídas)</span>
                  </Typography>
                  <Typography className="value-text price">
                    {((checkoutLast?.Checkout?.TaxedPrice * 100) / 100).toFixed(
                      2
                    )}
                    €
                  </Typography>
                </div>
              </div>
              <div className="resume-wrapper">
                <div className="row">
                  <Typography className="key-text">
                    Método de pagamento
                  </Typography>
                  <Typography className="value-text">Paypal</Typography>
                </div>
                <div className="row">
                  <Typography className="key-text">Processado a</Typography>
                  <Typography className="value-text">
                    {checkoutLast?.Checkout?.Date.toString().split("T")[0]}
                  </Typography>
                </div>
                <div className="row">
                  <Typography className="key-text">Morada de envio </Typography>
                  <Typography className="value-text">
                    {/* Rua da Igreja nº 0, Freguesia, 9760-000 Angra do Heroísmo */}
                    {checkoutLast?.Address?.StreetName +
                      " " +
                      checkoutLast?.Address?.DoorNumber +
                      ", " +
                      checkoutLast?.Address?.PostalCode +
                      " " +
                      checkoutLast?.Address?.City}
                  </Typography>
                </div>
              </div>
            </div>
            )}


            <Typography className="heading-user margintop">
              Artigos na encomenda
            </Typography>

            <div>
              {checkoutLast?.Products?.map((row: any) => (
                <div className="each-product-in-order" key={row.id}>
                  <div className="product-img-wrapper">
                    {row.Image_has_Products &&
                    row.Image_has_Products.length > 0 ? (
                      <img
                        src={`${process.env.API_URL}/img/${row.Image_has_Products[0].Image.location}`}
                      />
                    ) : (
                      <img src="/assets/no-product-image.jpg" />
                    )}{" "}
                  </div>
                  <div className="cart-product-info">
                    <Typography className="cart-product-name">
                      {row.Description}
                    </Typography>
                    <Typography className="cart-product-description">
                      Ref: {row.id}
                    </Typography>
                    <div className="quantity">
                      {row.ckQty} {row.ckQty > 1 ? "Unidades" : "Unidade"}
                    </div>
                  </div>
                  <div>
                    <Typography className="cart-product-price">
                      {row.Price.toFixed(2)}€
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel
          value={value}
          hidden={value !== "1"}
          id={`simple-tabpanel-1`}
          aria-labelledby={`simple-tab-1`}
        >
          <Invoices data={checkoutList} />
        </TabPanel>

        <TabPanel
          value={value}
          hidden={value !== "2"}
          id={`simple-tabpanel-2`}
          aria-labelledby={`simple-tab-2`}
        >
          <OrderRequests data={checkoutNotReadyList} />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default Orders;
