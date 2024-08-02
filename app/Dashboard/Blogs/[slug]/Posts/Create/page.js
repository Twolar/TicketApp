import CreatePostForm from "@/app/(components)/CreatePostForm";
import React from "react";

const PostCreate = ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Create a post</h1>
      <CreatePostForm blogId={params.slug} />
    </div>
  );
};

export default PostCreate;
