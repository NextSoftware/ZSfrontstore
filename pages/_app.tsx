import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import theme from "../theme";
import axios from "axios";
import Cookies from "universal-cookie";
import React from "react";

const App = ({ Component, ...rest }: AppProps) => {
  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.defaults.baseURL = "http://localhost:3100/";

  if (userCookie != undefined) {
    axios.interceptors.request.use(async (request): Promise<any> => {
      request.headers.Authorization = `Bearer ${await userCookie?.token}`;
      //console.log(request.headers.Authorization)
      return request;
    });
  }
  
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;