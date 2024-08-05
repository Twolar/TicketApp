import EditFeedbackForm from "@/app/(components)/EditFeedbackForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const FeedbackEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Edit feedback" />

      <EditFeedbackForm feedbackId={params.slug} />
    </div>
  );
};

export default FeedbackEdit;
