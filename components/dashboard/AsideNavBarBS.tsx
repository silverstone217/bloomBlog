"use client";
import {
  ChevronsRight,
  Cog,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  NotebookPen,
  NotebookText,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AvatarUserProfile } from "../home/HeaderHome";

const pagesLinks = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Blogs",
    href: "/dashboard/blogs",
    icon: NotebookText,
  },
  //   {
  //     label: "Profile",
  //     href: "/profile",
  //   },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Cog,
  },
];

const AsideNavBarBS = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const [resizeAside, setResizeAside] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        !resizeAside ? "lg:w-[25%] xl:w-[22%]" : "w-[10%]"
      } h-full border-r border-[#121212] bg-[#121212] shadow-xl p-4 relative
      transition-all duration-500 ease-in-out
     hidden lg:flex flex-col overflow-hidden items-start justify-between
      `}
    >
      {/* header */}
      <div className="flex w-full items-center justify-between  py-2 ">
        {!resizeAside && (
          <Link
            href={"/"}
            className={`text-xl font-bold tracking-wide
        hover:bg-gradient-to-r from-blue-800 via-blue-500 to-gray-400 
        hover:inline-block hover:text-transparent bg-clip-text
        transition-all duration-500 ease-in-out flex-shrink-0

        `}
          >
            BLOOM.
          </Link>
        )}
        {/* menu open*/}
        <button
          onClick={() => setResizeAside(!resizeAside)}
          className={`border-0 p-0 focus:outline-none flex-shrink-0 
          ${resizeAside ? "flex items-center justify-center w-full" : ""}
          transition-all duration-500 ease-in-out`}
        >
          {resizeAside ? (
            <ChevronsRight className="text-xl transition-all duration-500 ease-in-out" />
          ) : (
            <ChevronsRight className="text-xl rotate-180 transition-all duration-500 ease-in-out" />
          )}
        </button>
      </div>

      {/* separators */}
      <div className="py-5" />
      {/* navigation links */}
      <div className="flex flex-col gap-5 w-full flex-1">
        {pagesLinks.map((page, index) => (
          <Link
            key={index}
            href={page.href}
            className={`  font-medium tracking-wide hover:text-blue-500
            flex items-center  gap-4
            transition-all duration-300 ease-in-out
            ${
              resizeAside
                ? "flex items-center justify-center w-full "
                : "justify-start "
            }
            ${pathname === page.href ? "text-blue-500" : "text-gray-500"}
               
                `}
          >
            <span
              className={`w-[40%] lg:text-[16px] xl:text-[18px] flex-shrink-0 ${
                resizeAside ? "hidden" : "block"
              } transition-all duration-300 ease-in-out
             `}
            >
              {page.label}
            </span>
            <span className="transition-all duration-300 ease-in-out flex-shrink-0">
              {page.icon && (
                <page.icon className={`${resizeAside ? "size-7" : "size-6"}`} />
              )}
            </span>
          </Link>
        ))}

        {/* separators */}
        <div className="py-4" />

        <Link
          href={"/dashboard/new-blog"}
          className="
        border px-4 py-2 rounded text-sm
        flex items-center justify-center gap-4
        hover:text-blue-500 hover:border-blue-500
        transition-all duration-300 ease-in-out
        "
        >
          <span
            className={`w-[40%] lg:text-[16px] xl:text-[18px] flex-shrink-0 ${
              resizeAside ? "hidden" : "block"
            } transition-all duration-300 ease-in-out
             `}
          >
            New blog
          </span>
          <NotebookPen
            className={`${
              resizeAside ? "size-8" : "size-6"
            } transition-all duration-300 ease-in-out flex-shrink-0`}
          />
        </Link>
      </div>

      {/* separators */}
      <div className="py-5" />

      {/* profile and logout */}
      <div className="w-full flex-shrink-0 flex flex-col gap-1">
        <Link
          href={"/dashboard/profile"}
          className="flex flex-col items-center justify-center gap-1"
        >
          <AvatarUserProfile />
          {user && !resizeAside && (
            <div className="text-center ">
              <p className="text-sm">{user?.name}</p>
              <p className="text-xs opacity-70">{user?.email}</p>
            </div>
          )}
        </Link>
        {/* auth button */}
        {user ? (
          <button
            className={`border px-4 py-1 rounded mt-2 text-sm
          transition-all duration-500 ease-in-out text-center
          flex items-center justify-center
          ${
            !user
              ? "text-gray-200 border-gray-500"
              : "text-red-500 border-red-500"
          }
          `}
            onClick={handleLogout}
          >
            {!resizeAside ? (
              <span>Sign Out</span>
            ) : (
              <LogOut className="size-7" />
            )}
          </button>
        ) : (
          <Link
            href={"/login"}
            className={`border px-4 py-1 rounded mt-2 text-sm
              transition-all duration-500 ease-in-out text-center
              flex items-center justify-center
              ${
                !user
                  ? "text-gray-200 border-gray-500"
                  : "text-red-500 border-red-500"
              }
              `}
          >
            {" "}
            {!resizeAside ? <span>Sign Up</span> : <LogIn className="size-7" />}
          </Link>
        )}
      </div>

      {/* separators */}
      <div className="py-5" />
    </div>
  );
};

export default AsideNavBarBS;
