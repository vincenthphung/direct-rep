import { useState, useEffect } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import { useCreateLetterMutation } from "./store/lettersApi";
import { useAuthContext } from "./TokenTest.js";
import { useNavigate } from "react-router-dom";

function LetterForm() {
  const { token } = useAuthContext();
  const [issues, setIssues] = useState([]);
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState();
  const [createLetter, result] = useCreateLetterMutation();
  const navigate = useNavigate();

  // console.log("TOKEN CREATE LETTER", token);

  // to collect and load the issues list from the database
  useEffect(() => {
    async function fetchIssues() {
      const url = `http://localhost:8090/api/issues`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      }
    }
    fetchIssues();
  }, [token]);

  // console.log("ISSUES LIST", issues);

  async function handleSubmit(e) {
    e.preventDefault();
    createLetter({ topic, stance }).then(() => navigate("/eletter"));
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create your letter</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h5> Issue </h5>
              <select
                onChange={(e) => setTopic(e.target.value)}
                required
                name="issues"
                className="form-select"
              >
                <option value="">Select your issue</option>
                {issues.map((issue) => {
                  return (
                    <option key={issue.user_issue} value={issue.openai_issue}>
                      {issue.user_issue}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <h5>Stance</h5>
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
                <option>Choose your stance</option>
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
