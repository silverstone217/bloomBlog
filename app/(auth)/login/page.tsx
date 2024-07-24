import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";
import React from "react";
import authbg from "@/public/images/authbg2.jpg";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (user) {
    return redirect("/");
  }

  return (
    <div className="w-full h-dvh overflow-hidden">
      <div className="h-full w-full flex  transition-all duration-500 ease-in">
        {/* image */}
        <div
          className="hidden lg:block xl:w-[480px] lg:w-[420px] flex-shrink-0 border-r border-gray-700  
        transition-all duration-500 ease-in relative"
        >
          <div
            className="absolute w-full h-full z-10 
          flex flex-col gap-2 justify-end p-2 pb-4
          from-35%
          bg-gradient-to-b from-transparent via-overlay1 to-black
          "
          >
            {/* linear gradient */}
            <p className="text-[17px] font-medium">
              {"Let's try to build a better world, again and again."}
            </p>
            <p className="text-xs opacity-75">
              Made by <strong>@Silverstone217</strong>
            </p>
          </div>

          <ImageShower />
        </div>

        {/* form */}
        <div
          className="flex-1 h-full flex flex-col items-center justify-between text-balance gap-5 py-4
         transition-all duration-500 ease-in
        "
        >
          <div
            className="flex-1 h-full flex flex-col items-center justify-center text-balance gap-5
         transition-all duration-500 ease-in
        "
          >
            <div className="flex flex-col items-center justify-center text-balance text-center gap-2">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm opacity-75">
                Create or log into your account to post or save your content.
              </p>
            </div>
            {/* form inputs */}
            {/* submit button */}
            <AuthForm />
          </div>

          {/* footer */}
          <footer className="align-bottom">
            <p className="text-sm opacity-75">
              &copy; 2024 <strong>Bloom</strong>. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const ImageShower = () => {
  return (
    <div className="w-full h-full">
      <Image
        src={authbg}
        alt="image "
        priority
        width={2500}
        height={2000}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
