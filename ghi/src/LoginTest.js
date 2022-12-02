import React from "react";
import { useAuthContext } from "./TokenTest.js";
import { useState, useEffect } from "react";
import { useToken } from "./TokenTest.js";

function LoginForm() {
  const [token, login] = useToken();
  console.log("login form", token);

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function clickForm(e) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Login</h1>
          {/* <form onSubmit={login}> */}
          <form>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
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
              <label htmlFor="password">Password</label>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
