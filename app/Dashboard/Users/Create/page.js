import CreateUserForm from "@/app/(components)/CreateUserForm";
import React from "react";

const UserCreate = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Create a user</h1>
      <CreateUserForm />
    </div>
  );
};

export default UserCreate;
