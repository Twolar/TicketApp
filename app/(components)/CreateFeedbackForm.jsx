"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const CreateFeedbackForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    suggestion: "",
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
    const res = await fetch("/api/Feedback", {
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
        suggestion: "",
      });
      router.push(`${PageRoutesDashboard.Blogs}`);
      router.refresh(); // Force page refresh to get the latest data
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="form-control w-full">
        <p className="text-error">{errorMessage}</p>
        <form onSubmit={handleSubmit} method="post">
          <label className="label">
            <span className="label-text">Suggestion</span>
          </label>
          <textarea
            name="suggestion"
            required={true}
            value={formData.suggestion}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-4"
          />
          <input
            type="submit"
            value="submit"
            className="btn btn-primary w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateFeedbackForm;
