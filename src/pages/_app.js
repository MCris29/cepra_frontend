import React from "react";
import "../styles/globals.css";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname.includes("/administracion") ? (
        <div>
          <div className="menu">
            <Menu />
          </div>
          <div className="main-admin">
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <div>
          <Navigation />
          <div className="main">
            <Component {...pageProps} />
          </div>
        </div>
      )}
    </>
  );
}

export default MyApp;
