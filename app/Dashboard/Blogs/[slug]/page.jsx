import { PageRoutesDashboard } from "@/app/(misc)/PageRoutes";
import Link from "next/link";
import React from "react";

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

const BlogManagement = async ({ params }) => {
  const blog = await getBlog(params.slug);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary">Manage Blog</h2>
            <ul className="mt-4">
              <li>Title: {blog.title}</li>
              <li>Description: {blog.description}</li>
              <li>
                Tags:
                <span className="ml-2">
                  {blog.blogTags.map((blogTag, index) => (
                    <div key={index} className="badge badge-primary mr-2">
                      {blogTag.tag.title}
                    </div>
                  ))}
                </span>
              </li>
              <li>UserId: {blog.userId}</li>
            </ul>
          </div>
          <div>
            <Link
              href={`${PageRoutesDashboard.BlogsEdit}/${blog.id}`}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </div>
        </div>
        <div className="divider divider"></div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary">Posts</h2>
          </div>
          <div>
            <Link
              href={`${PageRoutesDashboard.BlogsEdit}/${blog.id}`}
              className="btn btn-primary btn-sm"
            >
              New Post
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {blogs.map((blog) => (
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
                  <td>
                    <Link
                      href={`${PageRoutesDashboard.Blogs}/${blog.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
