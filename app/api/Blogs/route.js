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

    const blogData = await req.json();

    // Check for required fields
    if (!blogData.title || !blogData.status) {
      return NextResponse.json(
        { message: "Blog title and status required" },
        { status: 400 }
      );
    }

    // Handle tags
    const tagIds = [];
    if (blogData.tags && blogData.tags.length > 0) {
      for (const tag of blogData.tags) {
        const lowerCaseTag = tag.toLowerCase();

        // Check if the tag already exists
        let tagInDb = await prisma.tag.findFirst({
          where: {
            title: {
              equals: lowerCaseTag,
            },
          },
        });

        if (!tagInDb) {
          // Create the tag
          tagInDb = await prisma.tag.create({
            data: { title: lowerCaseTag },
          });
        }

        tagIds.push(tagInDb.id);
      }
    }

    // Create the new blog
    const newBlog = await prisma.blog.create({
      data: {
        title: blogData.title,
        description: blogData.description,
        status: blogData.status,
        userId: token.id,
        blogTags:
          tagIds.length > 0
            ? {
                create: tagIds.map((tagId) => ({ tagId })),
              }
            : undefined,
      },
    });

    return NextResponse.json(
      { message: "Blog created", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
