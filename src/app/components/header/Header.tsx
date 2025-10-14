"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const pageName = pathname
    .split("/")
    .filter(Boolean)
    .pop() || "Dashboard";

  return (
    <>
      <header
        className="
          fixed top-0 right-0 h-[60px] shadow-md
          flex items-center justify-between px-4 z-50
          w-full md:w-[calc(100%-300px)] md:ml-[300px]
          transition-all duration-300 bg-[#021D46] text-white
        "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-white"
          >
            {isOpen ? <IoClose /> : <FiMenu />}
          </button>

          <h1 className="text-xl font-semibold capitalize">
            {pageName}
          </h1>
        </div>
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
