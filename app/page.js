import React from "react";
import JamForm from "./(components)/JamForm";
import CreateUserForm from "./(components)/CreateUserForm";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-primary">Welcome to beetjam.</h1>
        <p className="py-6 text-lg">Create a new post!</p>
        {/* <JamForm /> */}

        <CreateUserForm />
      </div>
    </>
  );
};

export default Home;
