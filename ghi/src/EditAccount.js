import { useState, useEffect } from "react";
import React from "react";
import { useEditUserMutation } from "./store/usersApi";
import { useNavigate } from "react-router-dom";

function InputLabel(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
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

function EditAccount() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setId] = useState("");
  const navigate = useNavigate();
  const [editUser, result] = useEditUserMutation();

  // to get current account info
  useEffect(() => {
    async function getUserData() {
      const url = `http://localhost:8080/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response", response);
        console.log("get user data test", data);
        setName(data.account.full_name);
        setEmail(data.account.email);
        setZipcode(data.account.zipcode);
        setId(data.account.id);
      }
    }
    getUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    editUser({ full_name, email, zipcode, password, userId }).then(() =>
      navigate("/dashboard")
    );
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <form onSubmit={handleSubmit}>
            <InputLabel
              id="name"
              placeholder="Your Full Name"
              labelText="Full Name"
              value={full_name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <InputLabel
              id="email"
              placeholder="email@email.com"
              labelText="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <InputLabel
              id="zipcode"
              placeholder="Zipcode"
              labelText="Enter Your Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              type="text"
            />
            <InputLabel
              id="password"
              placeholder="Password"
              labelText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
