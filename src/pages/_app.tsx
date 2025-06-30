import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito , Nunito_Sans } from "next/font/google";
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

export default function App({ Component, pageProps }: AppProps) {
  return <div className={clsx(nunito.className, nunitoSans.className)}>
    <Component {...pageProps} />
  </div>
}
