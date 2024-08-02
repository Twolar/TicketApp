import CreatePostForm from "@/app/(components)/CreatePostForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const PostCreate = ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Create a post" titleSize="4xl" />
      <CreatePostForm blogId={params.slug} />
    </div>
  );
};

export default PostCreate;
