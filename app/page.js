import React from "react";
import JamForm from "./(components)/JamForm";
import RegisterForm from "./(components)/RegisterForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary">Welcome to beetjam.</h1>
        <p className="py-6 text-lg">Create a new post!</p>
      </div>
      <JamForm />

      <RegisterForm />
    </div>
  );
};

export default Home;
