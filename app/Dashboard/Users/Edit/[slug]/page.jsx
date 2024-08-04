import EditUserForm from "@/app/(components)/EditUserForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const UserEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Edit User" />

      <EditUserForm userId={params.slug} />
    </div>
  );
};

export default UserEdit;
