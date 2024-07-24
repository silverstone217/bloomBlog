import HeaderHome from "@/components/home/HeaderHome";
import React from "react";

const blogPage = () => {
  return (
    <main className="w-full">
      <div className="max-w-7xl px-6 lg:px-10 py-4 w-full">
        <HeaderHome />
        {/* separators */}
        <div className="py-4" />
        {/* hero section */}

        <h1 className="text-3xl font-bold">Bloom, the best blog post ever</h1>
        <p className="mt-4">
          Read best blog post on whole world, best content, good news and best
          authors.
        </p>
      </div>
    </main>
  );
};

export default blogPage;
