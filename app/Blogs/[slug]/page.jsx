import PageTitle from "@/app/(components)/PageTitle";
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

const ViewBlog = async ({ params }) => {
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
              subtitleClasses="pt-5 text-lg"
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
        <div className="flex justify-between items-center">
          <div>
            <PageTitle headingLevel="h3" title="Posts" />
          </div>
          <div>
            {/* <Link
              href={`${PageRoutesDashboard.Blogs}/${blog.id}/Posts/Create`}
              className="btn btn-primary btn-sm"
            >
              new
            </Link> */}
          </div>
        </div>
        {/* Display posts as cards in a single column */}
        <div className="grid grid-cols-1 gap-8">
          {blog.posts.length > 0 ? (
            blog.posts.map((post) => (
              <div
                key={post.id}
                className="card bg-base-100 shadow-xl border border-neutral"
              >
                <div className="card-body">
                  <PageTitle
                    headingLevel="h4"
                    title={post.title}
                    titleClasses="text-primary text-2xl"
                  />
                  <p>{post.content}</p>
                  <ul className="list-disc list-inside">
                    {post.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.Url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.MusicProvider || link.Url}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="divider divider mt-0 mb-0"></div>
                  <div className="text-sm text-gray-500">
                    <p>Posted: {new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              Start posting some chu chu chuuunes...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
