import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Button from "react-bootstrap/Button";
import { useCreateLetterMutation } from "./store/lettersApi";

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

function LetterForm(props) {
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState(false);
  // const [content, setContent] = useState("");
  // const { topic = "create" } = useParams();
  const [createLetter, result] = useCreateLetterMutation();

  // useEffect(() => {
  //   async function fetchContent(topic, stance) {
  //     const urlLetter = `http://localhost:8090/api/letters?topic=${topic}&stance=${stance}`;
  //     const response = await fetch(urlLetter);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("\n \n DATA", data);
  //       setContent(data);
  //     }
  //   }
  //   fetchContent(``);
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    createLetter({ topic });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel
        id="Topic"
        placeholder="Enter the Topic"
        labeltext="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
      />
      <Form.Select
        aria-label="Default select example"
        id="stance"
        placeholder="Stance"
        labeltext="Stance"
        value={stance}
        onChange={(e) => setStance(e.target.value === "true" ? true : false)}
        type="boolean"
      >
        <option>Stance</option>
        <option value={true}>For</option>
        <option value={false}>Against</option>
      </Form.Select>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default LetterForm;
