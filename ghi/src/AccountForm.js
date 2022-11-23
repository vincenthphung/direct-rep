import { useState } from "react";
import React from "react";
import { useCreateUserMutation } from './store/usersApi'

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

function AccountForm(props) {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, result] = useCreateUserMutation()

  async function handleSubmit(e) {
    e.preventDefault();
    createUser({full_name, email, zipcode, password})

  }

  return (
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
  );
}

export default AccountForm;
