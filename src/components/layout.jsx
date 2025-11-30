import Head from 'next/head';
import React from "react";
import Navbar from './Navbar';
import Footer from "./Footer";

export const siteTitle = "DCCN'2025";

export default function Layout({ pageTitle, active = "", children }) {
  return (
    <div>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="DCCN'2025 International Conference"
        />
        <meta
          property="og:image"
          content={"https://dccn.ru/images/dccn-logo.png"}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{pageTitle}</title>
      </Head>
      <header className="w-full">
        <Navbar active={active} />
      </header>
      <main>
        {children}
      </main>
      <footer className="border-t-2 border-gray-300">
        <Footer />
      </footer>
    </div>
  )
}
