"use client";
import React, { useState } from "react";

const JamForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <form className="form-control w-full" onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          className="input input-bordered input-md w-full mb-3"
          value={formData.title}
          onChange={handleChange}
        />
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          className="textarea textarea-bordered mb-3"
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-accent w-full mt-4">
          create jam
        </button>
      </form>
    </div>
  );
};

export default JamForm;
