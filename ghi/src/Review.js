import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReviewForm() {
  const [letter_id, setLetterId] = useState("");
  const [oneLetter, setOneLetter] = useState([""]);
  const [oneId, setId] = useState("Letter id");
  const [oneContent, setContent] = useState("Letter content");
  const [oneStance, setStance] = useState("Letter stance");
  const [oneTopic, setTopic] = useState("Letter topic");
  const [repSelection, setSelection] = useState([]);

  // const letter_id = 4;

  // to get the id of the most recent letter created:
  useEffect(() => {
    async function fetchLetterId() {
      const urlLetter = `http://localhost:8090/api/letters`;
      const response = await fetch(urlLetter);
      if (response.ok) {
        const data = await response.json();
        // console.log("LETTER DATA", data);
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            const lastId = data[i].id;
            // console.log("LAST", lastId);
            setLetterId(lastId);
          }
        }
      }
    }
    fetchLetterId();
  }, []);

  useEffect(() => {
    async function showLetter(id) {
      const response = await fetch(`http://localhost:8090/letters/${id}`);
      const content = await response.json();
      setOneLetter(content);
      setId(content["id"]);
      setContent(content["content"]);
      setStance(content["stance"]);
      setTopic(content["topic"]);
      console.log("LETTER ONE CONTENT", content);
    }
    showLetter(letter_id);
  }, [letter_id]);

  useEffect(() => {
    //  to show selected reps
    async function seeReps(id) {
      const urlReps = `http://localhost:8090/reps/letter/${id}`;
      const response = await fetch(urlReps);
      if (response.ok) {
        const data = await response.json();
        console.log("\n \n DATA", data);
        setSelection(data);
      }
    }
    seeReps(letter_id);
  }, [letter_id]);

  console.log("ONE LETTER", oneLetter);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Print letter</h1>
          <div className="mb-3">
            <Card className="text-center">
              <Card.Header>Date created:</Card.Header>
              <Card.Body>
                <Card.Title>
                  Write a letter{" "}
                  {oneStance ? "in favor of" : "in opposition to"} {oneTopic}
                </Card.Title>
                <Card.Text> {oneContent} </Card.Text>
                {/* <Link href="/eletter">
                  <Button variant="primary">Edit</Button>
                </Link> */}
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
              <Card.Body>
                <Card.Title>Reps selected for this letter</Card.Title>
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
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </div>
          <button type="submit" className="btn btn-primary">
            Copy letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
