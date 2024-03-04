import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./contexts/Contexto";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tapioca da TI"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
            {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
