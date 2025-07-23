import "@/styles/globals.css";
import { Nunito, Nunito_Sans } from "next/font/google";
import clsx from "clsx";

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
}
