"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogStatusEnum } from "@/app/(misc)/Enums";
import ChipsInput from "./ChipsFormInput";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const EditBlogForm = ({ blogId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: BlogStatusEnum.Draft,
    tags: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch existing blog data to populate the form
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/Blogs/${blogId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }
        const json = await res.json();
        setFormData({
          title: json.blog.title,
          description: json.blog.description,
          status: json.blog.status,
          tags: Array.isArray(json.blog.blogTags)
            ? json.blog.blogTags.map((bt) => bt.tag.title)
            : [], // Ensure tags are always an array
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not load blog data.");
      }
    };

    // Fetch suggestions for tags
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/Tags");
        if (!res.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await res.json();
        setSuggestions(
          Array.isArray(data.tags) ? data.tags.map((tag) => tag.title) : []
        ); // Ensure suggestions are an array
      } catch (error) {
        console.error(error);
      }
    };

    if (blogId) {
      fetchBlog();
    }
    fetchTags();
  }, [blogId]);

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
    const res = await fetch(`/api/Blogs/${blogId}`, {
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
        description: "",
        status: BlogStatusEnum.Draft,
        tags: [],
      });
      router.push(`${PageRoutesDashboard.Blogs}/${blogId}`);
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
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            required={true}
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <ChipsInput
            name="tags"
            suggestions={suggestions}
            onChipsChange={handleChange}
            value={formData.tags}
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
            {Object.values(BlogStatusEnum).map((status, index) => (
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

export default EditBlogForm;
