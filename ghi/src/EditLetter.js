import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import React from "react";
import { useAuthContext } from "./TokenTest.js";
import { useEditLetterMutation } from "./store/lettersApi";

export const EditLetter = () => {
  const { token } = useAuthContext();
  const [letter_id, setLetterId] = useState("letter id");
  const [oneLetter, setOneLetter] = useState([""]);
  const [oneId, setId] = useState("Letter id");
  const [oneContent, setContent] = useState("Letter content");
  const [oneStance, setStance] = useState("Letter stance");
  const [oneTopic, setTopic] = useState("Letter topic");
  const [oneDate, setDate] = useState("Date");
  const [editLetter, result] = useEditLetterMutation();

  // to get the id of the most recent letter created:
  useEffect(() => {
    async function fetchLetterId() {
      const urlLetter = `http://localhost:8090/api/letters`;
      const response = await fetch(urlLetter, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("LETTER DATA", data);
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            const lastId = data[i].id;
            console.log("LAST", lastId);
            setLetterId(lastId);
          }
        }
      }
    }
    fetchLetterId();
  }, [token]);

  // to get the content of the letter
  useEffect(() => {
    async function showLetter(id) {
      const response = await fetch(`http://localhost:8090/letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const content = await response.json();
      setOneLetter(content);
      setId(content["id"]);
      setContent(content["content"]);
      console.log("initial content", content["content"]);
      setStance(content["stance"]);
      setTopic(content["topic"]);
      setDate(content["created"]);
      console.log("LETTER ONE CONTENT", content);
    }
    showLetter(letter_id);
  }, [letter_id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(oneId, oneContent);
    editLetter({ oneId, oneContent });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit letter</h1>
          <div className="mb-3">
            <Card className="text-center">
              <Card.Header>Date created: {oneDate} </Card.Header>
              <Card.Body>
                <Card.Title>
                  Write a letter{" "}
                  {oneStance ? "in favor of" : "in opposition to"} {oneTopic}
                </Card.Title>
                <Card.Text>
                  <div className="mb-3">
                    <label for="letter content" className="form-label">
                      Review and edit your letter here:
                    </label>
                    <textarea
                      value={oneContent}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    >
                      {oneContent}
                    </textarea>
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Save and review
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLetter;
