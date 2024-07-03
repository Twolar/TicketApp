import React from "react";

const Denied = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-primary">Denied</h1>
        <p className="py-6 text-lg">
          Looks like you do not have access to this page...
        </p>
      </div>
    </>
  );
};

export default Denied;
