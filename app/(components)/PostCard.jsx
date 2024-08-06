import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";
import { PageRoutesPublic } from "../(misc)/PageRoutes";

const PostCard = ({ headingLevel, blogId, post }) => {
  return (
    <>
      {" "}
      <div
        key={post.id}
        className="card bg-base-100 image-full shadow-xl border border-neutral"
      >
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <PageTitle
                headingLevel={headingLevel}
                title={post.title}
                titleClasses="text-primary text-2xl"
              />
              <p>{post.content}</p>
            </div>
            <div>
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
            </div>
          </div>
          <div className="divider mt-0 mb-0"></div>

          <div className="card-actions justify-between">
            <div className="text-sm text-gray-500">
              <p>Posted: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <Link
              className="btn btn-primary btn-xs"
              href={`${PageRoutesPublic.Blogs}/${blogId}/Posts/${post.id}`}
            >
              view post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
