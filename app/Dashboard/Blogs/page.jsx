import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesPublic } from "@/app/(misc)/PageRoutes";

const fetchBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      blogTags: {
        include: {
          tag: true, // Include the actual tag information
        },
      },
    },
  });
  return blogs;
};

const Blogs = async () => {
  const blogs = await fetchBlogs();

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* Row for header and button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-5xl font-bold text-primary">Blogs</h2>
            <p className="py-6 text-lg">A list of current Blogs</p>
          </div>
          <div>
            <Link
              href={PageRoutesPublic.BlogCreate}
              className="btn btn-primary"
            >
              Create blog
            </Link>
          </div>
        </div>

        {/* Row for the table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-2 border-gray-700">
            {/* Table head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tags</th>
                <th>UserId</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <th>{blog.id}</th>
                  <td>{blog.title}</td>
                  <td>{blog.description}</td>
                  <td>
                    {blog.blogTags
                      .map((blogTag) => blogTag.tag.title)
                      .join(", ")}
                  </td>
                  <td>{blog.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Blogs;
