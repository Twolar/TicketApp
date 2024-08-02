"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogStatusEnum } from "@/app/(misc)/Enums";
import ChipsInput from "./ChipsFormInput";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const CreateBlogForm = () => {
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
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/Tags");
        if (!res.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await res.json();

        setSuggestions(data.tags.map((tag) => tag.title));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

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
    const res = await fetch("/api/Blogs", {
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
        description: "",
        status: BlogStatusEnum.Draft,
        tags: [],
      });
      router.push(`${PageRoutesDashboard.Blogs}/${response.blog.id}`);
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
            value="Create"
            className="btn btn-primary w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
