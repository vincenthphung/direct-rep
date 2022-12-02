import React from "react";
import { useAuthContext } from "./TokenTest.js";
import { useState, useEffect } from "react";
import { useToken } from "./TokenTest.js";
import { useNavigate } from "react-router-dom";

function NewLoginForm() {
  const [token, login] = useToken();
  console.log("login form", token);

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function clickForm(e) {
    e.preventDefault();
    login(username, password);
    navigate("/dashboard");
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Confirm Account</h1>
          {/* <form onSubmit={login}> */}
          <form>
            <div className="mb-3">
              <label htmlFor="username">Confirm Email</label>
              <input
                onChange={(e) => setUser(e.target.value)}
                type="email"
                name="username"
                value={username}
                className="form-control"
                required
                placeholder="email@email.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Confirm Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
                className="form-control"
                required
                placeholder="password"
              />
            </div>
            <button
              onClick={clickForm}
              type="submit"
              className="btn btn-primary"
            >
              Confirm Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewLoginForm;
