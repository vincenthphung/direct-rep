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
    // setUser(username);
    // setPassword(password);
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
              <label htmlFor="username">Username: </label>
              <input
                onChange={(e) => setUser(e.target.value)}
                type="text"
                name="username"
                value={username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password :</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                name="password"
                value={password}
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

// const { token } = useAuthContext();
// const [username, setUser] = useState("");
// const [password, setPassword] = useState("");

// async function handleSubmit(e) {
// e.preventDefault();

// async function login(username, password) {
//   const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;

//   const form = new FormData();
//   form.append("username", username);
//   form.append("password", password);

//   console.log("USER?", username);

//   const response = await fetch(url, {
//     method: "post",
//     credentials: "include",
//     body: form,
//   });
//   if (response.ok) {
//     console.log("RESPONSE", response);
//     const tokenUrl = `${process.env.REACT_APP_USERS_API_HOST}/token`;

//     try {
//       const response = await fetch(tokenUrl, {
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const token = data.access_token;
//         console.log("TOKEN", token);
//         // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT
//         // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
//       }
//     } catch (e) {}
//     return false;
//   }
//   let error = await response.json();
//   console.log("ERROR LOGIN", error);
//   // DO SOMETHING WITH THE ERROR, IF YOU WANT
// }

// login(username, password);

// async function handleSubmit(e) {
//   e.preventDefault();
//   login(username, password);
// }

// to call login function
// useEffect(() => {
//   login(username, password);
// }, [username, password]);
