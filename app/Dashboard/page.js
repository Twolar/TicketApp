import React from "react";
import PageTitle from "../(components)/PageTitle";

const Manage = () => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle
        headingLevel="h2"
        title="Management"
        subtitle="Welcome to the content management area."
        titleSize="4xl"
        subtitleSize="lg"
      />
    </div>
  );
};

export default Manage;
