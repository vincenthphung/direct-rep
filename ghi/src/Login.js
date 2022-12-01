import { useState, useEffect } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import { useLoginMutation } from "./store/authApi";
import { useToken } from "./Authentication";

function InputLabel(props) {
  const { id, placeholder, labeltext, value, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labeltext}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, login] = useToken();
  //   const [login, result] = useLoginMutation();
  //   console.log(result);
  async function handleSubmit(e) {
    e.preventDefault();
    login({ username, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel
        id="Username"
        placeholder="Enter Your Username"
        labeltext="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <InputLabel
        id="Password"
        placeholder="Enter Your Password"
        labeltext="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

export default LoginComponent;
