import { Link } from "@nextui-org/link";
export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 pb-14">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://mpc.sidcloud.cn/"
        title="Wechatmpc"
      >
        <span className="text-default-600 text-sm">Copyright © 2025 WechatMpc All Rights Reserved.</span>
        {/* <p className="text-primary">Tonpack team</p> */}
      </Link>
    </footer>
  );
}
