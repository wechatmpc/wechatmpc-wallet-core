import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/image";
import { IoIosArrowForward } from "react-icons/io";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import Footer from "@/components/footer";
import Router,{ useRouter } from "next/router";

import { deving } from "../../core/utils/utils";

import { RiWallet3Fill ,RiSeedlingFill , RiSailboatFill ,RiFeedbackFill ,RiChat1Fill ,RiGithubFill} from "react-icons/ri";

type walletCard = {
  title: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function SettingPage() {
  const r = useRouter();
  
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  useEffect(() => {
    const onload = async () => {
      setIsMainPageLoading(false);
      setIsNav("setting");
    };

    onload().catch(console.error);
  }, []);

  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col  justify-centerpy-8 md:py-10 bg-black">
        <Toaster />
        {/* Header */}
        <div className="flex justify-start items-center gap-4">
          <RiWallet3Fill 
          color="white"
          size="55"
          // onClick={() => goBack()}
          ></RiWallet3Fill>
          <div>
            <p className="text-white font-semibold">WechatMpc 签名管理器</p>
            <p className="text-white text-xs">去中心化分布签名管理微信小程序</p>
          </div>
        </div>
        {/* Setting Card1 */}
        <div className="flex bg-gray-900 rounded-md p-3 mt-4"
          onClick={deving}>
          <div className="min-w-10">
          <RiSeedlingFill 
          color="white"
          size="30"
          
          ></RiSeedlingFill>
          </div>
          <div className="ml-2">
            <p className="text-white">私钥备份</p>
            <p className="text-white text-xs mt-1">
            点我进行私钥备份。请妥善保存您的私钥副本，并且绝不要将其交给他人。任何获取您的备份文件的人都可以使用你的名义进行签名。
            </p>
          </div>
        </div>

        {/* Setting Column2 */}
        <h2 className="text-white text-sm mt-8">更多服务</h2>
        <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={deving}>
          <div className="min-w-10">
          <RiSailboatFill 
          color="white"
          size="30"
          
          ></RiSailboatFill>
          </div>
          <div className="ml-2 grow flex justify-between items-center">
            <p className="text-white text-sm">通用多端多平台签名支付服务</p>
            <p className="text-xxs text-white">Will be live soon</p>
          </div>
        </div>
        {/* Setting Column3 */}

        <h2 className="text-white text-sm mt-8">关于我们</h2>


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'https://t.me/wikig16'})}>
            <div className="min-w-10">
            <RiFeedbackFill 
          color="white"
          size="30"
          
          ></RiFeedbackFill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Feedback & Contact</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'https://t.me/Tonspackdev'})}>
            <div className="min-w-10">
            <RiChat1Fill 
          color="white"
          size="30"
          
          ></RiChat1Fill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Join our community</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'https://github.com/carzygod/wechatmpc-docs'})}>
            <div className="min-w-10">
            <RiGithubFill 
          color="white"
          size="30"
          
          ></RiGithubFill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Source Code</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
      </section>
      <Footer />
    </DefaultLayout>
  );
}
