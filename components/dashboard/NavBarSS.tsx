"use client";
import {
  AlignJustify,
  Cog,
  House,
  LayoutDashboard,
  NotebookText,
  X,
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
  //     href: "/dashboard/profile",
  //   },
  {
    label: "Settings",
    href: "/settings",
    icon: Cog,
  },
  {
    label: "New Blog +",
    href: "/dashboard/new-blog",
    icon: X,
  },
];

const NavBarSS = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`lg:hidden absolute z-50 w-full p-4 ${
        !isHeaderHidden ? "h-12 bg-[#121219]" : "h-full bg-[#000]"
      }
      transition-all duration-500 ease-in-out overflow-hidden
      flex flex-col items-start justify-between
      `}
    >
      {/* header */}
      <div
        className={`w-full flex items-center justify-between 
        `}
      >
        <Link
          href={"/"}
          className={`text-xl font-bold tracking-wide
        hover:bg-gradient-to-r from-blue-800 via-blue-500 to-gray-400 
        hover:inline-block hover:text-transparent bg-clip-text
        transition-all duration-500 ease-in-out
        `}
        >
          BLOOM.
        </Link>
        {/* small screen button */}
        <button
          onClick={() => setIsHeaderHidden(!isHeaderHidden)}
          className="lg:hidden transition-all duration-500 ease-in-out hover:opacity-70"
        >
          {!isHeaderHidden ? (
            <AlignJustify className="size-9 transition-all duration-300 ease-in-out" />
          ) : (
            <X className="size-9 transition-all duration-300 ease-in-out" />
          )}
        </button>
      </div>

      {/* small screen menu */}
      <div
        className="flex-1 w-full flex-shrink-0 flex flex-col 
            items-center justify-center gap-3"
      >
        {pagesLinks.map((page, index) => (
          <Link
            key={index}
            href={page.href}
            className={`hover:opacity-70 flex-shrink-0 text-2xl
              transition-all duration-500 ease-in-out
              ${pathname === page.href ? "text-gray-600" : "text-gray-200"}
             `}
          >
            {page.label}
          </Link>
        ))}
      </div>

      {/* profile and logout */}
      <div className="w-full flex-shrink-0 flex flex-col gap-1">
        <Link
          href={"/dashboard/profile"}
          className="flex flex-col items-center justify-center gap-1"
        >
          <AvatarUserProfile />
          {user && (
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
          ${
            !user
              ? "text-gray-200 border-gray-500"
              : "text-red-500 border-red-500"
          }
          `}
            onClick={handleLogout}
          >
            Sign out
          </button>
        ) : (
          <Link
            href={"/login"}
            className={`border px-4 py-1 rounded mt-2 text-sm
              transition-all duration-500 ease-in-out text-center
              ${
                !user
                  ? "text-gray-200 border-gray-500"
                  : "text-red-500 border-red-500"
              }
              `}
          >
            {" "}
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBarSS;
