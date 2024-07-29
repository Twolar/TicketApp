import React from "react";
import prisma from "@/lib/prisma";

const fetchBlogs = async () => {
  const blogs = await prisma.user.findMany(); // TODO TLB: Change me to blogs
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
          <div></div>
        </div>

        {/* Row for the table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-2 border-gray-700">
            {/* Table head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
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
