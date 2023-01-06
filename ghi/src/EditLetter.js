import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import React from "react";
import { useAuthContext } from "./TokenTest.js";
import { useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

export const EditLetter = () => {
  const { token } = useAuthContext();
  const [user, setUser] = useState();
  const [, setOneLetter] = useState([""]);
  const [oneId, setId] = useState();
  const [oneContent, setContent] = useState();
  const [oneStance, setStance] = useState();
  const [oneTopic, setTopic] = useState();
  const [oneDate, setDate] = useState();
  const navigate = useNavigate();

  // to get the user's id
  useEffect(() => {
    async function getUserId() {
      const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.account.id);
      }
    }
    getUserId();
  }, [token, user]);

  // to get the id of the most recent letter created:
  useEffect(() => {
    async function fetchLetterId() {
      const urlLetter = `${process.env.REACT_APP_LETTERS_API_HOST}/api/letters`;
      const response = await fetch(urlLetter, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const content = await response.json();
        const data = content.filter((c) => c["user_id"] === user);
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            const lastId = data[i].id;
            setId(lastId);
          }
        }
      }
    }
    fetchLetterId();
  }, [token, user]);

  // to get the content of the letter
  useEffect(() => {
    if (oneId != null) {
      async function showLetter(oneId) {
        const response = await fetch(
          `${process.env.REACT_APP_LETTERS_API_HOST}/letters/${oneId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const content = await response.json();
        setOneLetter(content);
        setId(content["id"]);
        setContent(content["content"]);
        setStance(content["stance"]);
        setTopic(content["topic"]);
        setDate(content["created"]);
      }
      showLetter(oneId);
    }
  }, [oneId, token]);

  // to edit a letter:
  async function putLetter(oneId, oneContent) {
    const url = `${process.env.REACT_APP_LETTERS_API_HOST}/letters/${oneId}?content=${oneContent}`;
    const fetchConfig = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    trackPromise(
      putLetter(oneId, oneContent).then(() => navigate("/selectreps"))
    );
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
            <h1>Edit letter</h1>
          </div>
          <div className="mb-3">
            <Card className="text-center">
              <Card.Header>
                Date created: {""}{" "}
                {oneDate
                  ? new Date(oneDate).toLocaleDateString(undefined, options)
                  : ""}{" "}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  Write a letter{" "}
                  {oneStance ? "in favor of" : "in opposition to"} {oneTopic}
                </Card.Title>
                <Card.Text>
                  <label
                    htmlFor="letter content"
                    className="form-label fst-italic"
                  >
                    Review and edit your letter here:
                  </label>
                  <textarea
                    value={oneContent}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    rows="10"
                  >
                    {oneContent}
                  </textarea>
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
            Save and select representatives
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLetter;
