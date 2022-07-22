import React from "react";
import "../styles/globals.css";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/" ? (
        <div>
          <div className="menu">
            <Menu />
          </div>
          <div className="main">
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
