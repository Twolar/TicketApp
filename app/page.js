import React from "react";
import Link from "next/link";
import PageRoutes from "./(misc)/PageRoutes";
import TicketForm from "./(components)/TicketForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center m-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary">
          Welcome to Ticket App
        </h1>
        <p className="py-6 text-lg">
          Create and manage your development tickets easily and efficiently.
        </p>
        <Link href={PageRoutes.Home}>
          <button className="btn btn-primary">Create New Ticket</button>
        </Link>
      </div>
      <TicketForm />
    </div>
  );
};

export default Home;
