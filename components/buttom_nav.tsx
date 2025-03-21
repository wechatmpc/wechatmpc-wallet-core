import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  RiSettings5Line,
  RiSettings5Fill,
  RiWallet3Fill,
  RiWallet3Line,
  RiMenu2Fill,
  RiMenu3Line,
  RiCoinsFill,
  RiCoinsLine,
} from "react-icons/ri";

export const ButtomNav = (props: any) => {
  const router = useRouter();
  const { query } = router;
  // console.log(props)
  const name = props.name;
  const [activeTabs, setActiveTabs] = useState(props.name);
  const [switchRouter, setSwitchRouter] = useState(props.name);

  useEffect(() => {
    switch (switchRouter) {
      case "exchange":
        router.push({
          pathname: "/exchange",
          query: query
        });
        break;
      case "wallet":
        router.push({
          pathname: "/wallet",
          query: query
        });
        break;
      case "setting":
        router.push({
          pathname: "/setting",
          query: query
        });
        break;
      case "dapp":
        router.push({
          pathname: "/dapp",
          query: query
        });
        break;
      default:
        // router.push('/')
        break;
    }
  }, [switchRouter, router]);
  if (name === "" || name == "index" || name == "action") {
    return null;
  }

  const iconSize = "30";
  const tabList = [
    // {
    //   name: "dapp",
    //   title: "Demo",
    //   icon: (
    //     <RiMenu3Line
    //       color="white"
    //       size={iconSize}
    //       onClick={() => setSwitchRouter("dapp")}
    //     />
    //   ),
    //   activeIcon: (
    //     <RiMenu2Fill
    //       color="white"
    //       size={iconSize}
    //       onClick={() => setSwitchRouter("dapp")}
    //     />
    //   ),
    // },
    {
      name: "wallet",
      title: "签名",
      icon: (
        <RiWallet3Line
          color="white"
          size={iconSize}
          onClick={() => setSwitchRouter("wallet")}
        />
      ),
      activeIcon: (
        <RiWallet3Fill
          color="white"
          size={iconSize}
          onClick={() => setSwitchRouter("wallet")}
        />
      ),
    },
    // {
    //   name: "exchange",
    //   title: "Exchange",
    //   icon: (
    //     <RiCoinsLine
    //       color="white"
    //       size={iconSize}
    //       onClick={() => setSwitchRouter("exchange")}
    //     />
    //   ),
    //   activeIcon: (
    //     <RiCoinsFill
    //       color="white"
    //       size={iconSize}
    //       onClick={() => setSwitchRouter("exchange")}
    //     />
    //   ),
    // },
    {
      name: "setting",
      title: "设置",
      icon: (
        <RiSettings5Line
          color="white"
          size={iconSize}
          onClick={() => setSwitchRouter("setting")}
        />
      ),
      activeIcon: (
        <RiSettings5Fill
          color="white"
          size={iconSize}
          onClick={() => setSwitchRouter("setting")}
        />
      ),
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full h-14 bg-primary-color flex justify-around items-center z-50 backdrop-blur-sm">
        {tabList.map((tab) => (
          <div
            key={tab.name}
            className="flex flex-col justify-center items-center"
          >
            {name == tab.name ? tab.activeIcon : tab.icon}
            <p className="text-white text-center text-xs font-bold mx-2">
              {tab.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
