import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// Function to get a post by ID
async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      blog: true, // Include related blog info if needed
    },
  });
  return post;
}

// GET method to fetch a post
export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the post with the given ID
    const post = await getPost(params.slug);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// PUT method to update a post
export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const slug = params.slug;
    const postData = await req.json(); // Parse the request body

    // Check for required fields
    if (!postData.title || !postData.status) {
      return NextResponse.json(
        { message: "Post title, and status are required" },
        { status: 400 }
      );
    }

    // Fetch the existing post
    const existingPost = await getPost(slug);
    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Update the post details
    const updatedPost = await prisma.post.update({
      where: { id: slug }, // Use the slug to identify the post
      data: {
        title: postData.title,
        content: postData.content,
        status: postData.status,
      },
    });

    return NextResponse.json(
      { message: "Post updated", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
