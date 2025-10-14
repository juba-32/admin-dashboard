"use client";

import { useEffect, useRef } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const listItems = [
  { label: "Users", icon: <HiOutlineUsers />, path: "/dashboard/users" },
  { label: "Products", icon: <AiOutlineProduct />, path: "/dashboard/products" },
  { label: "Logout", icon: <BiLogOut /> },
];

export default function Sidebar({
  isOpen = false,
  onClose = () => {},
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    await signOut({redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed left-0
          ${isOpen ? "top-0" : "top-[60px]"}
          h-full md:top-0 md:h-screen w-[300px]
          bg-[#060C28] text-white p-4
          z-50 md:z-40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Profile */}
        <div className="flex flex-col items-center border-b border-[#0C6DC6]/40 pb-4 mb-4">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <p className="text-lg font-medium">Max Alenor</p>
        </div>

        {/* Menu */}
        <ul className="space-y-1">
          {listItems.map((item, i) => {
            const isActive = pathname === item.path;

            if (item.label === "Logout") {
              return (
                <li key={i}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg capitalize transition-colors text-white hover:bg-[#1A1F37]/80 w-full"
                  >
                    <span className="text-[#0C6DC6] bg-[#1A1F37] p-2 rounded-xl">
                      {item.icon}
                    </span>
                    <p>{item.label}</p>
                  </button>
                </li>
              );
            }

            return (
              <li key={i}>
                <Link
                  href={item.path || "#"}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg capitalize transition-colors
                    ${
                      isActive
                        ? "bg-[#1A1F37] text-white"
                        : "text-white hover:bg-[#1A1F37]/80"
                    }`}
                >
                  <span
                    className={`text-xl ${
                      isActive
                        ? "text-white bg-[#0C6DC6] p-2 rounded-xl"
                        : "text-[#0C6DC6] bg-[#1A1F37] p-2 rounded-xl"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <p>{item.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
