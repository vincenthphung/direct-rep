import { useState } from "react";
import React from "react";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      zipcode: "",
      password: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChnage.bind(this);
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    const value = event.target.value;
    this.setState({fullName: value});
  }

  handleEmailChange(event){
    const value = event.target.value;
    this.setEmail({email: value})
  }

  handleZipcodeChange(event){
    const value = event.target.value;
    this.setState({zipcode: value});
  }

  handlePasswordChange(event){
    const value = event.target.value;
    this.setPassword({password: value})
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {.....this.state};
    data.full_name = data.fullName
    delete data.fullName

    const url = ""
  }

}

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <InputLabel
        id="name"
        placeholder="Your Full Name"
        labelText="Full Name"
        value={name}
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
