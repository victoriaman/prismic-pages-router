import { Agbalumo, Acme } from "next/font/google";
import dynamic from 'next/dynamic';
import type { RemoteHeaderProps } from "adminMFE/Header";

const RemoteHeader = dynamic(() => import("adminMFE/Header"), {
  ssr: false,
}) as React.FC<RemoteHeaderProps>;


const agbalumo = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ["latin"],
  weight: '400'
});

const acme = Acme({
  variable: "--font-acme",
  subsets: ["latin"],
  weight: '400'
});

export default function Home() {
  return (
    <div
      className={`${agbalumo.className} ${acme.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       
        <RemoteHeader initializeCounter={5}/>
       
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}


