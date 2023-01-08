import { useState } from "react";
import React from "react";
import { useCreateUserMutation } from "./store/usersApi";
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

function AccountForm() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    createUser({ full_name, email, zipcode, password });
    navigate("/newlogin");
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <form onSubmit={handleSubmit}>
            <InputLabel
              id="name"
              placeholder="Your full name"
              labelText="Full name"
              value={full_name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <InputLabel
              id="email"
              placeholder="email@email.com"
              labelText="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <InputLabel
              id="zipcode"
              placeholder="Zipcode"
              labelText="Enter your zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              type="integer"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
