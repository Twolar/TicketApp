import EditUserForm from "@/app/(components)/EditUserForm";
import React from "react";

const UserEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Edit User</h1>
      <EditUserForm userId={params.slug} />
    </div>
  );
};

export default UserEdit;
