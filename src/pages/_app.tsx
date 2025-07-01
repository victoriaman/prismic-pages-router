import "@/styles/globals.css";
// import type { AppProps } from "next/app";
import { Nunito, Nunito_Sans } from "next/font/google";
import clsx from "clsx";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap"
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap"
});

// export default function App({ Component, pageProps }: AppProps) {
//   return <div className={clsx(nunito.className, nunitoSans.className)}>
//     <Header />
//       <Component {...pageProps} />
//     <Footer />
//   </div>
// }

// pages/_app.tsx
import { AppProps } from "next/app";
import type { NextPage } from "next";
import React from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
    return <div className={clsx(nunito.className, nunitoSans.className)}>
    {getLayout(<Component {...pageProps} />)}
  </div>
  // return getLayout(<Component {...pageProps} />);
}
