"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PostStatusEnum } from "@/app/(misc)/Enums";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";
import LinksInput from "./LinksFormInput"; // Import the new LinksInput component

const CreatePostForm = ({ blogId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: PostStatusEnum.Draft,
    blogId,
    links: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

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
    const res = await fetch("/api/Posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!res.ok) {
      setErrorMessage(response.message);
    } else {
      setFormData({
        title: "",
        content: "",
        status: PostStatusEnum.Draft,
        blogId,
        links: [],
      });
      router.push(`${PageRoutesDashboard.Blogs}/${response.post.blogId}`);
      router.refresh(); // Force page refresh to get the latest data
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
            required={true}
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="content"
            required={true}
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
            required={true}
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
            value="create"
            className="btn btn-primary w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
