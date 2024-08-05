import CreateFeedbackForm from "@/app/(components)/CreateFeedbackForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const FeedbackCreate = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <PageTitle
        headingLevel="h2"
        title="Feedback"
        subtitle="🙏 Please fill out the form below with any suggestions or feature requests 🤝"
      />
      <CreateFeedbackForm />
    </div>
  );
};

export default FeedbackCreate;
