import CreateBlogForm from "@/app/(components)/CreateBlogForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const BlogCreate = () => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Create a blog" titleSize="4xl" />
      <CreateBlogForm />
    </div>
  );
};

export default BlogCreate;
