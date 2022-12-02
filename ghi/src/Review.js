import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useAuthContext } from "./TokenTest.js";

function ReviewForm() {
  const { token } = useAuthContext();
  const [letter_id, setLetterId] = useState("");
  const [oneLetter, setOneLetter] = useState([""]);
  const [oneId, setId] = useState("Letter id");
  const [oneContent, setContent] = useState("Letter content");
  const [oneStance, setStance] = useState("Letter stance");
  const [oneTopic, setTopic] = useState("Letter topic");
  const [oneDate, setDate] = useState("Date");
  const [repSelection, setSelection] = useState([]);

  // to get the id of the most recent letter created:
  useEffect(() => {
    async function fetchLetterId() {
      const urlLetter = `http://localhost:8090/api/letters`;
      const response = await fetch(urlLetter, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            const lastId = data[i].id;
            setLetterId(lastId);
          }
        }
      }
    }
    fetchLetterId();
  }, [token]);

  useEffect(() => {
    async function showLetter(id) {
      const response = await fetch(`http://localhost:8090/letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const content = await response.json();
      setOneLetter(content);
      setId(content["id"]);
      setContent(content["content"]);
      setStance(content["stance"]);
      setTopic(content["topic"]);
      setDate(content["created"]);
    }
    showLetter(letter_id);
  }, [letter_id, token]);

  useEffect(() => {
    //  to show selected reps
    async function seeReps(id) {
      const urlReps = `http://localhost:8090/reps/letter/${id}`;
      const response = await fetch(urlReps, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSelection(data);
      }
    }
    seeReps(letter_id);
  }, [letter_id, token]);

  const copyToClipboard = () => {
    copy(oneContent);
    alert(`Your letter has been copied: ${oneContent}`);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
            <h1>Final Letter</h1>
          </div>
          <div className="mb-3">
            <Card className="text-center">
              <Card.Header>Date created: {oneDate} </Card.Header>
              <Card.Body>
                <Card.Title>
                  Write a letter{" "}
                  {oneStance ? "in favor of" : "in opposition to"} {oneTopic}
                </Card.Title>
                <Card.Text> {oneContent} </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </div>
          <div className="mb-3">
            <Card className="text-center">
              <Card.Header>
                <h5>Representatives</h5>
              </Card.Header>
              <Card.Body>
                {/* <Card.Title>Representatives</Card.Title> */}
                <Card.Text>
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Office</th>
                        <th>Party</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repSelection.map((rep, i, j, k, l) => {
                        return (
                          <tr>
                            <td key={rep[j]} value={rep.name}>
                              {rep.name}
                            </td>
                            <td key={rep[i]} value={rep.office}>
                              {rep.office}
                            </td>
                            <td key={rep[l]} value={rep.party}>
                              {rep.party}
                            </td>
                            <td key={rep.rep_id} value={rep.rep_id}>
                              {rep.address}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card.Text>
              </Card.Body>
            </Card>
            {/* <Card.Footer className="text-muted"></Card.Footer> */}
          </div>
          <button
            onClick={copyToClipboard}
            type="submit"
            className="btn btn-primary"
          >
            Copy letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
