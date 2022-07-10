import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import PropTypes from "prop-types";
import Header from "../components/Header";

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={createCache({ key: "css" })}>
      <Head>
        <title>Nerd Pool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CssBaseline />
      <Header {...pageProps} />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

MyApp.propTypes = propTypes;
export default MyApp;
