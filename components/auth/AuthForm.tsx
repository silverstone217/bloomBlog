"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import React from "react";

const AuthForm = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSubmitWithGoogle = async () => {
    try {
      await signIn("google", {
        redirectTo: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmitWithGoogle();
        }}
        className="bg-blue-600 
        px-10 py-2 border border-blue-600 rounded
        text-white hover:bg-blue-700 hover:border-blue-700
        transition-all duration-500 ease-in-out shadow-xl
        "
      >
        Sign in with Google
      </button>
      <p>{user?.name}</p>
    </form>
  );
};

export default AuthForm;
