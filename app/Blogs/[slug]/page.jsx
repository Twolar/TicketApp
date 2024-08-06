import PageTitle from "@/app/(components)/PageTitle";
import PostCard from "@/app/(components)/PostCard";
import { PageRoutesPublic } from "@/app/(misc)/PageRoutes";
import Link from "next/link";
import React from "react";

// Fetch the blog and associated posts from the database
async function getBlog(id) {
  const blog = await prisma.blog.findUnique({
    where: { id: id },
    include: {
      user: true,
      blogTags: {
        include: {
          tag: true,
        },
      },
      posts: {
        orderBy: {
          createdAt: "desc", // Order posts by creation date in descending order
        },
        include: {
          user: true, // Include user data if needed
        },
      },
    },
  });

  // Parse the links JSON string for each post
  if (blog && blog.posts) {
    blog.posts = blog.posts.map((post) => {
      try {
        return {
          ...post,
          links: JSON.parse(post.links || "[]"), // Ensure links is parsed correctly
        };
      } catch (error) {
        console.error("Error parsing links for post:", post.id, error);
        return {
          ...post,
          links: [], // Fallback in case of parsing error
        };
      }
    });
  }

  return blog;
}

const BlogView = async ({ params }) => {
  const blog = await getBlog(params.slug);

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* Blog Title and Description */}
        <div className="flex justify-between items-center">
          <div>
            <PageTitle
              headingLevel="h2"
              title={blog.title}
              subtitle={blog.description}
              subtitleClasses="pt-2 text-lg"
            />
            <ul className="mt-4">
              <li>
                Tags:
                <span className="ml-2">
                  {blog.blogTags.map((blogTag, index) => (
                    <div key={index} className="badge badge-primary mr-2">
                      {blogTag.tag.title}
                    </div>
                  ))}
                </span>
              </li>
              <li>Author: {blog.user.name}</li>
            </ul>
          </div>
          <div>
            {/* <Link
              href={`${PageRoutesDashboard.BlogsEdit}/${blog.id}`}
              className="btn btn-primary btn-sm"
            >
              edit
            </Link> */}
          </div>
        </div>
        <div className="divider"></div>
        {/* Display posts as cards */}
        <div className="grid grid-cols-1 gap-8">
          {blog.posts.length > 0 ? (
            blog.posts.map((post) => (
              <div key={post.id}>
                <PostCard headingLevel="h3" blogId={blog.id} post={post} />
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              🚂 No chu chu chuuune posts found here yet...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogView;
