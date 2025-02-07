"use client"; // coz of usePathname()
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log("Current path is- ", path);
  }, [path]);
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-4">
        <li
          className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
        ${path.startsWith("/dashboard") && "text-primary font-bold"}`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
        ${path.startsWith("/questions") && "text-primary font-bold"}`}
        >
          Questions
        </li>
        <li
          className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
        ${path.startsWith("/upgrade") && "text-primary font-bold"}`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
        ${path.startsWith("/how") && "text-primary font-bold"}`}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
