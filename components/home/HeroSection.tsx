import React from "react";
import herobg from "@/public/images/herobg1.jpg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="w-full h-96 relative flex transition-all duration-500 ease-in-out">
      {/* text */}
      <div
        className="absolute z-10 w-full h-full p-4 flex flex-col gap-5 items-start justify-center
      bg-gradient-to-b from-[#121212] via-transparent to-[#121212] via-90%
      transition-all duration-500 ease-in-out
      "
      >
        <h2
          className="w-full lg:w-[60%] font-semibold text-3xl lg:text-4xl xl:text-5xl text-balance
        bg-gradient-to-r to-gray-transparent via-gray-100 from-gray-300 bg-clip-text text-transparent
        transition-all duration-500 ease-in-out

        "
        >
          Find best of content, great author and everything you were waiting
          for.
        </h2>
        <div
          className="w-full flex flex-col md:flex-row gap-4 justify-start items-center 
        transition-all duration-500 ease-in-out"
        >
          <button className="w-48 py-3 rounded text-white text-sm bg-blue-500 hover:bg-blue-600">
            Discover now
          </button>
          <button className=" w-48 py-3 rounded text-white text-sm bg-gray-500 hover:bg-gray-600">
            Create yours
          </button>
        </div>
      </div>

      {/* image */}
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        <Image
          src={herobg}
          alt="Hero background"
          width={1920}
          height={1080}
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default HeroSection;
