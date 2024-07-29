import React from "react";
import prisma from "@/lib/prisma";
import CreateUserModal from "@/app/(components)/CreateUserModal";

const fetchUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const Users = async () => {
  const users = await fetchUsers();

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* Row for header and button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-5xl font-bold text-primary">Users</h2>
            <p className="py-6 text-lg">A list of current users</p>
          </div>
          <div>
            <CreateUserModal />
          </div>
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
              {users.map((user) => (
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

export default Users;
