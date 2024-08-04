import CreateUserForm from "@/app/(components)/CreateUserForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const UserCreate = () => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Create a user" />
      <CreateUserForm />
    </div>
  );
};

export default UserCreate;
