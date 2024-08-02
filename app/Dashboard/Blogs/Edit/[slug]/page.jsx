import EditBlogForm from "@/app/(components)/EditBlogForm";
import React from "react";

const BlogEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Edit Blog</h1>
      <EditBlogForm blogId={params.slug} />
    </div>
  );
};

export default BlogEdit;
