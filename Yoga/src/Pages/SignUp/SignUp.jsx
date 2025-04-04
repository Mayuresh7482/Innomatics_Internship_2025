import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";
const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username || !user.email || !user.password) {
      alert("Please fill all the fields");
      return;
  }
  
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/login");
  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* UserName */}
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="auth-button">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
