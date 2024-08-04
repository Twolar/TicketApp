import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesDashboard } from "@/app/(misc)/PageRoutes";
import PageTitle from "@/app/(components)/PageTitle";

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
          <PageTitle
            headingLevel="h2"
            title="Users"
            subtitle="A list of current users"
          />
          <div>
            <Link
              href={PageRoutesDashboard.UsersCreate}
              className="btn btn-primary"
            >
              create
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
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      href={`${PageRoutesDashboard.Users}/Edit/${user.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      edit
                    </Link>
                  </td>
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
