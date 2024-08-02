"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const EditUserForm = ({ userId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch existing user data to populate the form
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/Users/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const json = await res.json();
        setFormData({
          name: json.user.name,
          username: json.user.username,
          email: json.user.email,
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        setErrorMessage("Could not load user data.");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

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

    try {
      const res = await fetch(`/api/Users/${userId}`, {
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
        router.push(`${PageRoutesDashboard.Users}`);
        router.refresh(); // Refresh the page to get the latest data
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("An error occurred while updating the user.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="form-control w-full">
        <p className="text-error">{errorMessage}</p>
        <form onSubmit={handleSubmit} method="post">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <input
            type="submit"
            value="Update"
            className="btn btn-primary w-full mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
