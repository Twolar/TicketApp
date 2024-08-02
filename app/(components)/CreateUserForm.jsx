"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageRoutesDashboard } from "../(misc)/PageRoutes";

const CreateUserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords must match!");
      return;
    }

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify(formData),
      "content-type": "application/json",
    });

    const response = await res.json();

    if (!res.ok) {
      setErrorMessage(response.message);
    } else {
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push(`${PageRoutesDashboard.Users}`);
      router.refresh(); // Force page refresh to get the latest data
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
            required={true}
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
            required={true}
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
            required={true}
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            required={true}
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            required={true}
            value={formData.confirmpassword}
            onChange={handleChange}
            className="input input-bordered input-md w-full mb-4"
          />
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

export default CreateUserForm;
