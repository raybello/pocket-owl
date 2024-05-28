import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex-row hover:opacity-50 transition justify-center items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" className="" alt="logo" height={30} width={30} />
        <span className="text-lg text-slate-800">PocketOwl</span>
      </div>
    </Link>
  );
}
