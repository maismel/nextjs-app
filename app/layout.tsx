"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo/apolloClient";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased flex h-screen w-screen bg-gray-100 text-gray-900`}
      >
        <ApolloProvider client={apolloClient}>
          <main className="flex-1">{children}</main>
        </ApolloProvider>
      </body>
    </html>
  );
}
