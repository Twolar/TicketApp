"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const EditFeedbackForm = ({ feedbackId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    suggestion: "",
    isRead: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch existing feedback data to populate the form
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/Feedback/${feedbackId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const json = await res.json();
        setFormData({
          suggestion: json.feedback.suggestion,
          isRead: json.feedback.isRead,
        });
      } catch (error) {
        console.error("Error loading feedback data:", error);
        setErrorMessage("Could not load feedback data.");
      }
    };

    if (feedbackId) {
      fetchFeedback();
    }
  }, [feedbackId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(`/api/Feedback/${feedbackId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (!res.ok) {
        setErrorMessage(response.message);
      } else {
        router.push(`${PageRoutesDashboard.Feedback}`);
        router.refresh(); // Refresh the page to get the latest data
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      setErrorMessage("An error occurred while updating the feedback.");
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
            required
            value={formData.suggestion}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-4"
            readOnly
          />
          <label className="label">
            <span className="label-text">Is Read</span>
          </label>
          <input
            type="checkbox"
            name="isRead"
            checked={formData.isRead}
            onChange={handleChange}
            className="checkbox mb-4"
          />
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

export default EditFeedbackForm;
