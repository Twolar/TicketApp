"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogStatusEnum } from "@/app/(misc)/Enums";
import ChipsInput from "./ChipsFormInput";

const suggestions = [
  "Rock",
  "Pop",
  "Jazz",
  "Blues",
  "Classical",
  "Hip-Hop",
  "Country",
  "Reggae",
  "Electronic",
  "Metal",
  "R&B",
  "Folk",
  "Indie",
  "Punk",
  "Soul",
  "Gospel",
  "Disco",
  "Funk",
  "Latin",
  "Ska",
];

const CreateBlogForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    tags: [], // Initialize tags in formData
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

    console.log(formData); // formData now includes tags
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
