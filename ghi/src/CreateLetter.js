import { useState, useEffect } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
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
  const [stance, setStance] = useState(true);
  // const [content, setContent] = useState("");
  const [createLetter, result] = useCreateLetterMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    createLetter({ topic, stance });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create your letter</h1>
          <form onSubmit={handleSubmit}>
            <InputLabel
              id="Topic"
              placeholder="Enter the Topic"
              labeltext="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
            />
            <div className="mb-3">
              <p>Stance</p>
              <Form.Select
                aria-label="Default select example"
                id="stance"
                placeholder="Stance"
                labeltext="Stance"
                value={stance}
                onChange={(e) =>
                  setStance(e.target.value === "true" ? true : false)
                }
                type="boolean"
              >
                <option>Choose a stance:</option>
                <option value={true}>For</option>
                <option value={false}>Against</option>
              </Form.Select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LetterForm;
