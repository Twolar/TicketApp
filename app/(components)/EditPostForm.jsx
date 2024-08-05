"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostStatusEnum } from "@/app/(misc)/Enums";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";
import LinksInput from "./LinksFormInput";

const EditPostForm = ({ postId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: PostStatusEnum.Draft,
    blogId: "",
    links: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch existing post data to populate the form
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/Posts/${postId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const json = await res.json();
        setFormData({
          title: json.post.title,
          content: json.post.content,
          status: json.post.status,
          blogId: json.post.blogId,
          links: json.post.links || [],
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not load post data.");
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch(`/api/Posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      setFormData({
        title: "",
        content: "",
        status: PostStatusEnum.Draft,
        blogId: "",
        links: [],
      });
      router.push(`${PageRoutesDashboard.Blogs}/${formData.blogId}`);
      router.refresh(); // Refresh the page to get the latest data
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="form-control w-full">
        <p className="text-error">{errorMessage}</p>
        <form onSubmit={handleSubmit} method="post">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Links</span>
          </label>
          <LinksInput
            name="links"
            value={formData.links}
            onLinksChange={handleChange}
          />
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full mb-4"
          >
            {Object.values(PostStatusEnum).map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>

          <input
            type="submit"
            value="update"
            className="btn btn-primary w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
