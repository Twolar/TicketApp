"use client";
import React, { useState } from "react";
import { TicketAreaEnum } from "../(misc)/Enums";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    area: "Software",
    severity: 25,
    description: "",
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
          <span className="label-text">Area</span>
        </label>
        <select
          className="select select-bordered w-full mb-3"
          name="area"
          value={formData.area}
          onChange={handleChange}
        >
          {Object.keys(TicketAreaEnum).map((key) => (
            <option key={key} value={TicketAreaEnum[key]}>
              {TicketAreaEnum[key]}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text">Severity</span>
        </label>
        <input
          type="range"
          min={0}
          max="100"
          value={formData.severity}
          className="range"
          name="severity"
          step="25"
          onChange={handleChange}
        />
        <div className="flex w-full justify-between px-2 text-xs mb-3">
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered mb-3"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-primary w-full mt-4">
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
