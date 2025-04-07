import { LOGO } from "@/constants/images";
import useAOS from "@/hooks/useAos";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import store, { persistor } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  useAOS();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer theme="dark" autoClose={3000} closeOnClick />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      <Head>
        <title>{pageProps?.title || ""}</title>
        <meta
          property="og:title"
          content={
            pageProps?.title ||
            `Best Online Electronics Store in Nepal | ${SITE_NAME}`
          }
        />
        <meta
          property="og:description"
          content={
            pageProps?.description ||
            "Mobilemandu serves as the premier destination for the best online electronics store in Nepal. Offering a vast array of electronic products, accessories, home appliances, and kids gadgets, we provide our clients with access to top-notch deals and an extensive catalogue."
          }
        />
        <meta
          property="og:image"
          content={pageProps?.image || `${SITE_URL}${LOGO.src}`}
        />
        <meta
          property="og:image:secure_url"
          content={pageProps?.image || `${SITE_URL}${LOGO.src}`}
        />
        <meta property="og:url" content={pageProps?.url || ``} />
        <meta property="og:type" content="website" />
      </Head>
    </>
  );
}
