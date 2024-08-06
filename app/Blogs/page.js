import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesDashboard, PageRoutesPublic } from "@/app/(misc)/PageRoutes";
import Image from "next/image";
import PageTitle from "../(components)/PageTitle";

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
      <div className="flex justify-between items-center">
        <PageTitle
          headingLevel="h2"
          title="Blogs"
          subtitle="Explore music blogs..."
          subtitleClasses="pt-2 text-lg"
        />
      </div>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 image-full w-96 shadow-xl border border-neutral"
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
              <div className="divider mt-0"></div>
              <div className="card-actions justify-end">
                <Link
                  className="btn btn-primary btn-xs"
                  href={`${PageRoutesPublic.Blogs}/${blog.id}`}
                >
                  view blog
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
