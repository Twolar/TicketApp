import React from "react";

const RegisterForm = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-md w-full mb-4"
        />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className="input input-bordered input-md w-full mb-4"
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered input-md w-full mb-4"
        />
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered input-md w-full mb-4"
        />
        <button className="btn btn-primary w-full mt-4">Register</button>
      </div>
    </div>
  );
};

export default RegisterForm;
