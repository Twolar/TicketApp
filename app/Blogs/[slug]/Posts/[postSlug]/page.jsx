import PageTitle from "@/app/(components)/PageTitle";
import PostCard from "@/app/(components)/PostCard";
import React from "react";

async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      user: true, // Include user data if needed
      blog: {
        include: {
          blogTags: {
            include: {
              tag: true, // Include associated tags for the blog
            },
          },
        },
      },
    },
  });

  // Parse the links JSON string for the post itself
  if (post) {
    try {
      post.links = JSON.parse(post.links || "[]"); // Ensure links is parsed correctly
    } catch (error) {
      console.error("Error parsing links for post:", post.id, error);
      post.links = []; // Fallback in case of parsing error
    }
  }

  return post;
}

const PostView = async ({ params }) => {
  const post = await getPost(params.postSlug);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <PageTitle
              headingLevel="h2"
              title={post.title}
              subtitle={post.content}
              subtitleClasses="pt-2 text-lg"
            />
            <ul className="mt-4">
              <li>
                Tags:
                <span className="ml-2">
                  {post.blog.blogTags.map((blogTag, index) => (
                    <div key={index} className="badge badge-primary mr-2">
                      {blogTag.tag.title}
                    </div>
                  ))}
                </span>
              </li>
              <li>Author: {post.user.name}</li>
            </ul>
          </div>
          <div></div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 gap-8">
          {post.links.length > 0 ? (
            <>
              <ul className="list-disc list-inside">
                {post.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {link.Title || link.Url}
                      {link.MusicProvider && ` (${link.MusicProvider})`}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center col-span-full">
              🚂 No chu chu chuuunes found here yet...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostView;
