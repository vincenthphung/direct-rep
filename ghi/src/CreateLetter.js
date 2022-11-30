import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Button from "react-bootstrap/Button";
import { Wrapper } from "./Wrapper";
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
  const [issue, setIssue] = useState([]);
  const [createLetter, result] = useCreateLetterMutation();

  // useEffect(() => {
  //   async function fetchContent() {
  //     const urlLetter = `http://localhost:8090/api/issues`;
  //     const response = await fetch(urlLetter);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("\n \n DATA", data);
  //       setContent(data);
  //     }
  //   }
  //   fetchContent();
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8090/api/issues");
      const content = await response.json();
      setIssue(content);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    createLetter({ topic, stance });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <InputLabel
        id="Topic"
        placeholder="Enter the Topic"
        labeltext="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
      /> */}
      <div>
        <Form.Select
          aria-label="Default select example"
          id="Topic"
          placeholder="Topic"
          labeltext="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          type="text"
        >
          {/* <option>Stance</option> */}
          <option value="">See your reps</option>
          {issue.map((issues) => {
            return (
              <option key={issues.user_issue} value={issues.user_issue}>
                {issues.user_issue}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <Form.Select
        aria-label="Default select example"
        id="stance"
        placeholder="Stance"
        labeltext="Stance"
        value={stance}
        onChange={(e) => setStance(e.target.value === "true" ? true : false)}
        type="boolean"
      >
        {/* <option>Stance</option> */}
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
