import CreateBlogForm from "@/app/(components)/CreateBlogForm";
import React from "react";

const BlogCreate = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Create a blog</h1>
      <CreateBlogForm />
    </div>
  );
};

export default BlogCreate;
