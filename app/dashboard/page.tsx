import prisma from "@/lib/prisma";
import React from "react";

const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  return blogs;
};

const dashboardPage = async () => {
  const blogs = await getBlogs();

  return (
    <div>
      <h1>Blogs:</h1>

      <div className="py-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id} className="bg-slate-500 p-2 space-y-4">
              <h2 className="font-bold text-3xl tracking-wide ">
                {blog.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="whitespace-pre-line"
              />
              <div className="flex items-start gap-2 flex-col">
                <p>{blog.genre}</p>
                <p>{blog.tags}</p>
              </div>

              <p>{blog.author.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default dashboardPage;
