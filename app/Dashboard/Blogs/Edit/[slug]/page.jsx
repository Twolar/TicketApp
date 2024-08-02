import EditBlogForm from "@/app/(components)/EditBlogForm";
import PageTitle from "@/app/(components)/PageTitle";
import React from "react";

const BlogEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle headingLevel="h2" title="Edit Blog" titleSize="4xl" />

      <EditBlogForm blogId={params.slug} />
    </div>
  );
};

export default BlogEdit;
