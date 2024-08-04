import EditPostForm from "@/app/(components)/EditPostForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const PostEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Edit Post" />
      <EditPostForm postId={params.postSlug} />
    </div>
  );
};

export default PostEdit;
