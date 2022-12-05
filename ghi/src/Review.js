import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useAuthContext } from "./TokenTest.js";

function ReviewForm() {
  const { token } = useAuthContext();
  const [oneLetter, setOneLetter] = useState([]);
  const [oneId, setId] = useState();
  const [oneContent, setContent] = useState();
  const [oneStance, setStance] = useState();
  const [oneTopic, setTopic] = useState();
  const [oneDate, setDate] = useState();
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
      if (oneId != null) {
        async function showLetter(oneId) {
        const response = await fetch(`http://localhost:8090/letters/${oneId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const content = await response.json();
        setOneLetter(content);
        console.log("letter content", content)
        setId(content["id"]);
        setContent(content["content"]);
        setStance(content["stance"]);
        setTopic(content["topic"]);
        setDate(content["created"]);
      }
      showLetter(oneId);
      }
  }, [oneId, token]);

  useEffect(() => {
    //  to show selected reps
    if (oneId != null) {
      async function seeReps(oneId) {
        const urlReps = `http://localhost:8090/reps/letter/${oneId}`;
        const response = await fetch(urlReps, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setSelection(data);
        }
      }
      seeReps(oneId);
    }
  }, [oneId, token]);

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
              <Card.Header>Date created: {''} {oneDate ? new Date(oneDate).toLocaleDateString() : ''} </Card.Header>
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
          <div className="mb-3 text-center">
            <h3>Reps selected for this letter</h3>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Office</th>
                  <th>Party</th>
                  <th>Address</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {repSelection.map((rep) => {
                  return (
                    <tr key={rep.rep_id}>
                      <td value={rep.name}>{rep.name}</td>
                      <td value={rep.office}>{rep.office}</td>
                      <td value={rep.party}>{rep.party}</td>
                      <td value={rep.rep_id}>{rep.address}</td>
                      <td value={rep.email}>{rep.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
