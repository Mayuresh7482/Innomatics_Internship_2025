
import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("user"));
    if (!storedData) {
      alert(" SignUp First");
      navigate("/signup");
      return;
    }
    if (
      storedData.email === userData.email &&
      storedData.password === userData.password
    ) {
      alert("Login Successfully");
      navigate("/yoga-poses");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
