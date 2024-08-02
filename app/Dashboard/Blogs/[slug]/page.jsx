import { PageRoutesDashboard } from "@/app/(misc)/PageRoutes";
import Link from "next/link";
import React from "react";

// Fetch the blog and associated posts from the database
async function getBlog(id) {
  const blog = await prisma.blog.findUnique({
    where: { id: id },
    include: {
      user: true,
      blogTags: {
        include: {
          tag: true,
        },
      },
      posts: {
        include: {
          user: true, // Include user data if needed
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
              <li>Author: {blog.user.name}</li>
            </ul>
          </div>
          <div>
            <Link
              href={`${PageRoutesDashboard.BlogsEdit}/${blog.id}`}
              className="btn btn-primary"
            >
              edit
            </Link>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary">Posts</h2>
          </div>
          <div>
            <Link
              href={`${PageRoutesDashboard.Blogs}/${blog.id}/Posts/Create`}
              className="btn btn-primary btn-sm"
            >
              new post
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
                <th>Content</th>
                <th>Status</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blog.posts.length > 0 ? (
                blog.posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>{post.status}</td>
                    <td>{post.user.name}</td>
                    <td>
                      <Link
                        href={`${PageRoutesDashboard.Blogs}/${blog.id}/Posts/Edit/${post.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Start posting some chu chu chuuunes...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
