"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import "./index.css";

type FormValues = {
  username: string;
  password: string;
};

const dummy = (wait: number) => {
  return new Promise((resolve) => setTimeout(resolve, wait));
};

export const SimpleForm = () => {
  const [formData, setFormData] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    await dummy(8000);
    setSubmitted(false);
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            placeholder="Enter User Name"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            placeholder="Enter User Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button
          disabled={submitted}
          type="submit"
          className={`btn-submit ${submitted ? "disabled" : ""}`}
        >
          Submit
        </button>
      </form>
      <div className="form-result-container">
        {submitted && (
          <div className="form-result">
            <p>Form Submitted Successfully</p>
            <p>
              <strong>Name: </strong>
              {formData.username}
            </p>
            <p>
              <strong>Password: </strong>
              {formData.password}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
