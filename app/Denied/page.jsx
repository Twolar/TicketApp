import React from "react";
import PageTitle from "../(components)/PageTitle";

const Denied = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <PageTitle
          headingLevel="h2"
          title="Denied"
          subtitle="Looks like you do not have access to this page..."
        />
      </div>
    </>
  );
};

export default Denied;
