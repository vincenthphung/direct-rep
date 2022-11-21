import { useState } from "react";

function SignupForm(props) {
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
        className="form-conrol"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function AccountForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <SignupForm
        id="name"
        placeholder="Your Full Name"
        labelText="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <SignupForm
        id="email"
        placeholder="email@email.com"
        labelText="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <SignupForm
        id="zipcode"
        placeholder="Zipcode"
        labelText="Enter Your Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        type="integer"
      />
      <SignupForm
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
