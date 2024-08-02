import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

async function getBlog(id) {
  const blog = await prisma.blog.findUnique({
    where: { id: id },
    include: {
      blogTags: {
        include: {
          tag: true,
        },
      },
    },
  });
  return blog;
}

export async function GET(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the blog with the given slug
    const blog = await getBlog(params.slug);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const slug = params.slug;
    const blogData = await req.json(); // Parse the request body

    // Check for required fields
    if (!blogData.title || !blogData.status) {
      return NextResponse.json(
        { message: "Blog title and status required" },
        { status: 400 }
      );
    }

    const existingBlog = await getBlog(slug);
    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const newTagTitles = blogData.tags.map((tag) => tag.toLowerCase());

    // Get existing tag titles
    const existingTagTitles = existingBlog.blogTags.map((bt) =>
      bt.tag.title.toLowerCase()
    );

    // Determine which tags to add and which to remove
    const tagsToAdd = newTagTitles.filter(
      (tag) => !existingTagTitles.includes(tag)
    );
    const tagsToRemove = existingTagTitles.filter(
      (tag) => !newTagTitles.includes(tag)
    );

    // Remove old tags
    await prisma.blogTag.deleteMany({
      where: {
        blogId: existingBlog.id,
        tag: {
          title: { in: tagsToRemove },
        },
      },
    });

    // Add new tags
    for (const tagTitle of tagsToAdd) {
      // Check if the tag exists
      let tagInDb = await prisma.tag.findFirst({
        where: { title: tagTitle },
      });

      if (!tagInDb) {
        // Create new tag if not exist
        tagInDb = await prisma.tag.create({
          data: { title: tagTitle },
        });
      }

      // Create new association
      await prisma.blogTag.create({
        data: {
          blogId: existingBlog.id,
          tagId: tagInDb.id,
        },
      });
    }

    // Update the blog details
    const updatedBlog = await prisma.blog.update({
      where: { id: slug }, // Use the slug to identify the blog
      data: {
        title: blogData.title,
        description: blogData.description,
        status: blogData.status,
      },
    });

    return NextResponse.json(
      { message: "Blog updated", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
