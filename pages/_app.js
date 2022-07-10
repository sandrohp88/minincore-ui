import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import PropTypes from "prop-types";
import { theme } from "../styles/theme";
import Header from "../components/Header";
import Notifier from "../components/Notifier";
import "../styles/globals.css";

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={createCache({ key: "css" })}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Nerd Pool</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <CssBaseline />
        <Header {...pageProps} />
        <Component {...pageProps} />
        <Notifier />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = propTypes;
export default MyApp;
