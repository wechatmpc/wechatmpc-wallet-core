import bs58 from "bs58";

import {
  api_connect,
  api_balance,
  api_preconnect,
  api_mpc_action,
  api_price_oracle,
} from "../request/index";
// import { miniapp_init } from "../utils/tg";
import {
  storage_set_authkey,
  storage_get_raw_init_data,
  storage_set_raw_init_data,
  storage_get_kp,
  storage_set_kp,
} from "../storage/index";
import { address_readable, sleep } from "../utils/utils";
import config from "../config";

import * as mpc from "./mpc";

function wallet_init_data_set() {
  // console.log("🚧 This is  wallet_init_data_set")
  // let init;

  // console.log("🚧 This is  storage_get_raw_init_data",storage_get_raw_init_data())

  // if (
  //   !storage_get_raw_init_data() ||
  //   !storage_get_raw_init_data()?.isTelegram
  // ) {
  //   init = miniapp_init();
  //   storage_set_raw_init_data(init);
  // }
  const params = new URLSearchParams(window.location.search);
  const action = params.get("action");
  console.log("ACTION now :: ",action)



  let init = {
    starData:""
  }

  if(!action)
  {
    window.close()
  }else
  {
    init.starData = action
  }
  storage_set_raw_init_data(init);
  return init;
}

async function wallet_connect() {
  const init = storage_get_raw_init_data();

  // console.log("🚧 miniapp",init)
  if (init && init?.isTelegram) {
    const auth = await api_connect(init.initData);

    //   console.log("🚧 auth",auth)
    if (auth.code == 200) {
      if (auth?.token) {
        storage_set_authkey(auth.token);
      }

      if (auth?.data) {
        return auth.data;
      }
    }
  }

  return false;
}

async function wallet_list_generate(ws: any) {
  const oracle = await api_price_oracle()
  console.log("🚧  oracle :: ",oracle)

  const ret = [];

  for (let i = 0; i < config.defaultChains.length; i++) {
    let item = config.defaultChains[i];

    ret.push(await wallet_list_peer_generate(item.t, item.c, ws,oracle));
  }

  return ret;
}

async function wallet_list_generate_action(ws: any, action: any) {
  const oracle = await api_price_oracle()
  console.log("🚧  oracle :: ",oracle)

  if (action && action.c) {
    return wallet_list_peer_generate(parseInt(action.c.t), action.c.i, ws,oracle);
  }

  return await wallet_list_peer_generate(0, 1, ws,oracle);
}

function wallet_get_chain_details(type: number, chains: any, w: any) {
  switch (type) {
    case 0:
      //EVM
      let chain = config.evmsChains.default;

      for (const e in config.evmsChains) {
        const c = parseInt(chains, 10).toFixed(0);
        const hex = parseInt(chains, 16).toFixed(0);

        if (e == c || e == hex) {
          chain = config.evmsChains[e];
        }
      }

      return {
        chain: chain,
        address: w.evm,
      };
      break;
    case 1:
      //Solana
      return {
        chain: config.chains.solana,
        address: w.sol,
      };
      break;
    case 2:
      //Ton
      return {
        chain: config.chains.ton,
        address: w.ton,
      };
      break;
    case 3:
      //Bitcoin
      return {
        chain: config.chains.btc,
        address: w.btc,
      };
      break;
    default:
      //SOL
      return {
        chain: config.chains.solana,
        address: w.sol,
      };
      break;
  }
}

async function wallet_list_peer_generate(type: number, chains: any, w: any,oracle:any) {
  const data = wallet_get_chain_details(type, chains, w);
  // console.log("🚧 Predraw data: ",data)
  let tokens = JSON.parse(
    JSON.stringify(
      data.chain.tokens
    )
  )

  let bal =`${await api_balance(data.address, data.chain.symbol, data.chain.decimal,"")}`// ${data.chain.symbol}`;
  console.log(bal)
  if(!bal)
  {
    bal = "0"
  }
  tokens.unshift(
    {
      icon: data.chain.icon,
      name: data.chain.name,
      symbol:data.chain.symbol,
      decimal: data.chain.decimal,
      address: "0",
      price:0,
      bal: bal
    }
  )
  if(oracle && oracle?.code==200 && oracle?.data && oracle.data?.price)
  for(let i =0 ; i < tokens.length ; i++)
  {
    if(!tokens[i].bal)
    {
      tokens[i].bal = "0"
    }
    let ele = tokens[i]
    for(let u = 0 ; u < oracle.data.price.length ; u++)
    {
      let ps = oracle.data.price[u];
      if(ele.symbol == ps.name.toUpperCase())
        {
          //Match
          tokens[i].price = ps.price
        }
    }
  }
  return {
    title: data.chain.name,
    address: address_readable(4, 4, data.address),
    full_address: data.address,
    scan: data.chain.scan.address + data.address,
    img: data.chain.icon,
    name: data.chain.name,
    bal: bal,
    tokens:tokens
  };
}

function wallet_action_decode(data: string) {
  try {
    const action = JSON.parse(Buffer.from(bs58.decode(data)).toString());

    return action;
  } catch (e) {
    console.error(e);
  }

  return false;
}

async function wallet_action_details(data: any) {
  try {
    if (data.t == 0) {
      return data;
    } else {
      //Require to do api requset
      const details = await api_preconnect(data.i);

      // console.log("🚧 Preconnect ",details)
      return details?.data;
    }
  } catch (e) {
    console.error(e);
  }

  return false;
}

function wallet_mpc_set_kp(kp: string) {
  storage_set_kp(kp);
}

function wallet_mpc_get_kp() {
  return storage_get_kp();
}

async function wallet_mpc_try_get_kp() {
  for (let i = 0; i < 20; i++) {
    const kp = storage_get_kp();

    if (kp.length < 10) {
      await sleep(500);
    } else {
      return kp;
    }
  }

  return false;
}

async function action_router(data: any) {
  console.log("🚧action_router data", data, data?.c);
  if (data && data?.c) {
    switch (data.t) {
      case 0: //Connect wallet
        return await connect(data);
        break;
      case 1: //Sign message
        return await sign(data);
        break;
      case 2: //Sign and send message
        console.log("signAndSend(uid,data)", data);

        return await signAndSend(data);
        break;
      default:
        return false;
        break;
    }
  }

  return false;
}

async function connect(data: any) {
  let c: any;
  let ret: any;

  if (data.i) {
    const adds = mpc.getAddress(storage_get_kp(), false);

    console.log("🚧getAddress", adds);
    switch (data.c.t) {
      case 0:
        c = adds.evm;
        break;
      case 1:
        c = adds.sol;
        break;
      case 2:
        c = adds.ton;
        break;
      case 3:
        c = adds.btc;
        break;
      default:
        return false;
    }
    data["ret"] = c;
    ret = await api_mpc_action(data);
  }

  return ret;
}

async function sign(data: any) {
  let c: any;
  let ret: any;

  if (data.i && data.d) {
    const kps = mpc.getKp(storage_get_kp());

    switch (data.c.t) {
      case 0:
        c = mpc.evm.sign(kps, data.d);
        break;
      case 1:
        c = mpc.sol.sign(kps, data.d);
        break;
      case 2:
        c = mpc.ton.sign(kps, data.d);
        break;
      case 3:
        c = mpc.btc.sign(kps, data.d);
        break;
      default:
        return false;
    }
    data["ret"] = c;
    ret = await api_mpc_action(data);
  }

  return ret;
}

async function signAndSend(data: any) {
  let c: any;
  let ret: any;

  if (data.i && data.d) {
    const kps = mpc.getKp(storage_get_kp());

    switch (data.c.t) {
      case 0:
        c = await mpc.evm.signAndSendTxn(kps, data, "");
        break;
      case 1:
        c = await mpc.sol.signAndSendTxn(kps, data, "");
        break;
      case 2:
        c = await mpc.ton.signAndSendTxn(kps, data, "");
        break;
      default:
        return false;
    }
    data["ret"] = c;
    ret = await api_mpc_action(data);
  }

  console.log(c, data.i, data.d);

  return ret;
}

function randomKey()
{
  return mpc.evm.randomKey()
}

function randomHDKey()
{
  return mpc.randomHDKey()
}
export {
  wallet_connect,
  wallet_list_generate,
  wallet_list_generate_action,
  wallet_init_data_set,
  wallet_action_decode,
  wallet_action_details,
  wallet_mpc_set_kp,
  wallet_mpc_get_kp,
  wallet_mpc_try_get_kp,
  mpc,
  action_router,
  randomKey,
  randomHDKey
};
