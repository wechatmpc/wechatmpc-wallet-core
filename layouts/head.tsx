import React from "react";
import NextHead from "next/head";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { initCloudStorage  } from "@telegram-apps/sdk-react";
import * as bs58 from "bs58"
/**
 * MPC web3auth
 */

import { wallet_init_data_set, wallet_mpc_set_kp ,randomHDKey} from "../core/wallet/index";

import { siteConfig } from "@/config/site";

export const Head = () => {
  //themes init
  const { theme, setTheme } = useTheme();

  if (theme != "dark") {
    setTheme("dark");
  }

  //init
  try {
    wallet_init_data_set();
  } catch (e) {
    console.log("🚧 init error", e);
  }

  const [kp, setKp] = useState("");

  useEffect(() => {
    loginWitUrl()
  }, []);

  function stringToFixed64Uint8Array(str:string) {
    const result = new Uint8Array(64);
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    const copyLength = Math.min(encoded.length, 64);
    result.set(encoded.slice(0, copyLength));
    return result;
}

  const loginWitUrl = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tk = params.get("tk");
      console.log("TK now :: ",tk)

      if(!tk)
      {
        window.close()
      }

      let privateKey = bs58.default.encode(
        stringToFixed64Uint8Array(tk as string)
      )
      setKp(privateKey as string);
      wallet_mpc_set_kp(privateKey as string);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />

      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};