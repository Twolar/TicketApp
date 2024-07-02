"use client";
import React, { useState } from "react";
import { TicketAreaEnum, TicketStatusEnum } from "../(misc)/Enums";

const ExampleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    area: TicketAreaEnum.Bug,
    priority: 1,
    description: "",
    status: TicketStatusEnum.Todo,
    assignee: "",
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
            <option key={key} value={key}>
              {TicketAreaEnum[key]}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text">Priority</span>
        </label>
        <input
          type="range"
          min={1}
          max="5"
          value={formData.priority}
          className="range"
          name="priority"
          step="1"
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
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          className="select select-bordered w-full mb-3"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {Object.keys(TicketStatusEnum).map((key) => (
            <option key={key} value={key}>
              {TicketStatusEnum[key]}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text">Assignee</span>
        </label>
        <select
          className="select select-bordered w-full mb-3"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select an assignee
          </option>
          <option value="taylorbennett">Taylor Bennett</option>
          <option value="janedoe">Jane Doe</option>
          <option value="johnsmith">John Smith</option>
        </select>
        <button type="submit" className="btn btn-accent w-full mt-4">
          Create Jam
        </button>
      </form>
    </div>
  );
};

export default ExampleForm;
