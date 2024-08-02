import EditPostForm from "@/app/(components)/EditPostForm";
import React from "react";

const PostEdit = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-primary">Edit Post</h1>
      <EditPostForm postId={params.postSlug} />
    </div>
  );
};

export default PostEdit;
