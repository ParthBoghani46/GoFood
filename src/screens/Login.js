import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [credential, setcredential] = useState({
    password: "",
    email: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/v1/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert("enter valid credential");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email || ""}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credential.password || ""}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
        <Link to="/createuser" className="btn btn-primary m-3">
          I'm New User
        </Link>
      </form>
    </div>
  );
}
