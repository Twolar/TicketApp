import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesPublic } from "@/app/(misc)/PageRoutes";
import Image from "next/image";

// Fetch blogs directly in the component
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
    <div className="flex flex-col">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-5xl font-bold text-primary">Blogs</h2>
          <p className="py-6 text-lg">Explore music blogs...</p>
        </div>
        <div>
          <Link
            href={PageRoutesPublic.BlogsCreate}
            className="btn btn-primary btn-sm"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 image-full w-96 shadow-xl card bg-base-100 border border-neutral"
          >
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.description}</p>
              <div className="text-sm text-gray-600">
                {blog.blogTags.map((blogTag, index) => (
                  <div key={index} className="badge badge-primary mr-2 mb-2">
                    {blogTag.tag.title}
                  </div>
                ))}
              </div>
              <div className="divider divider"></div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
