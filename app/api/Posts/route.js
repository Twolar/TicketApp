import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    // Extract the user token
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postData = await req.json();

    // Check for required fields
    if (!postData.title || !postData.status || !postData.blogId) {
      return NextResponse.json(
        { message: "Post title, status, and blog ID are required" },
        { status: 400 }
      );
    }

    // Convert links to JSON string
    let linksJson = null;
    if (postData.links && Array.isArray(postData.links)) {
      linksJson = JSON.stringify(postData.links);
    }

    // Create the new post
    const newPost = await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        status: postData.status,
        blogId: postData.blogId,
        userId: token.id,
        links: linksJson,
      },
    });

    return NextResponse.json(
      { message: "Post created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
