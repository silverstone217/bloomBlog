"use client";
import { AlignJustify, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const pagesLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const HeaderHome = () => {
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
    <header
      className={`w-full overflow-hidden border-b border-b-gray-700 shadow-lg
      transition-all duration-500 ease-in-out
     ${!isHeaderHidden ? "h-12" : "h-[450px] bg-[#000]"}
       `}
    >
      {/* big screen */}
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

        {/* pages links and button */}
        <div
          className="lg:flex hidden items-center gap-3 flex-shrink-0
         transition-all duration-500 ease-in-out"
        >
          {pagesLinks.map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className={`hover:opacity-70 flex-shrink-0
              transition-all duration-500 ease-in-out
              ${pathname === page.href ? "text-gray-600" : "text-gray-200"}
             `}
            >
              {page.label}
            </Link>
          ))}
          {user && (
            <Link href={"/dashboard"}>
              <AvatarUserProfile />
            </Link>
          )}
          <button
            className={`border  px-4 py-1 rounded ml-2 text-sm
          transition-all duration-500 ease-in-out
          ${!user ? " border-gray-300" : "text-red-500 border-red-500"}
          `}
          >
            {user ? (
              <div className="w-full h-full" onClick={handleLogout}>
                {" "}
                Sign out
              </div>
            ) : (
              <Link href={"/login"} className="w-full h-full">
                {" "}
                Sign Up
              </Link>
            )}
          </button>
        </div>

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
      {isHeaderHidden && (
        <div
          className="w-full flex-1 h-[90%]  flex flex-col items-center justify-between gap-2
          px-10 py-4"
        >
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

          <div className="w-full flex-shrink-0 flex flex-col gap-1">
            <Link
              href={"/dashboard"}
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
      )}
    </header>
  );
};

export default HeaderHome;

export const AvatarUserProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return null;

  const InitialName = user?.name ? user.name?.slice(0, 2).toUpperCase() : "NN";

  return (
    <div
      className={`size-10  flex items-center justify-center rounded-full shadow-xl 
    ${!user.image ? "border border-gray-500" : ""}
    `}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name + " profile picture"}
          priority
          width={1500}
          height={1500}
          className="rounded-full shadow-xl 
            transition-all duration-500 ease-in-out"
        />
      ) : (
        <span className="text-4xl font-bold text-gray-300">{InitialName}</span>
      )}
    </div>
  );
};
