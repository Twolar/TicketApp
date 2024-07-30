import React from "react";

async function getBlog(id) {
  const blog = await prisma.blog.findUnique({
    where: { id: id },
    include: {
      blogTags: {
        include: {
          tag: true,
        },
      },
    },
  });
  return blog;
}

const BlogManagement = async ({ params }) => {
  const blog = await getBlog(params.slug);

  return (
    <div>
      BlogManagement
      <ul>
        <li>Title: {blog.title}</li>
        <li>Description: {blog.description}</li>
        <li>
          Tags: {blog.blogTags.map((blogTag) => blogTag.tag.title).join(", ")}
        </li>
        <li>UserId: {blog.userId}</li>
      </ul>
    </div>
  );
};

export default BlogManagement;
