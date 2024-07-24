import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log({ blog: body });

  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
        error: true,
      });
    }

    const createBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        genre: body.genre,
        image: body.image,
        authorId: user?.id ?? "",
        tags: body.tags,
      },
    });

    return NextResponse.json({
      message: "Blog created successfully",
      status: 201,
      data: createBlog,
      error: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create blog post",
      status: 500,
      error: true,
    });
  }
}
