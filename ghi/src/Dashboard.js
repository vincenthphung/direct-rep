import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./TokenTest.js";

function Dashboard() {
  const { token } = useAuthContext();

  const [letters, setLetters] = useState([]);
  const [oneLetter, setOneLetter] = useState([""]);
  const [oneId, setId] = useState("Letter id");
  const [oneContent, setContent] = useState("Letter content");
  const [oneStance, setStance] = useState("Letter stance");
  const [oneTopic, setTopic] = useState("Letter topic");
  const [oneDate, setDate] = useState("Date");
  const [repSelection, setSelection] = useState([]);

  console.log("TOKEN DASHBOARD", token);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8090/api/letters", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const content = await response.json();
      setLetters(content);
      // console.log("LETTER CONTENT", content, "TOKEN", token);
    })();
  }, [token]);

  const del = async (id) => {
    if (window.confirm("Are you sure: This Letter will be Deleted")) {
      await fetch(`http://localhost:8090/letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      setLetters(letters.filter((p) => p.id !== id));
    }
  };

  async function seeLetter(id) {
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

    //  to show selected reps
    async function seeReps() {
      const urlReps = `http://localhost:8090/reps/letter/${id}`;
      const response = await fetch(urlReps, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("\n \n DATA", data);
        setSelection(data);
      }
    }
    seeReps();
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Past letters</h1>
          <div className="mb-3">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th className="col">Date created</th>
                  <th className="col">Stance</th>
                  <th className="col-7">Issue</th>
                  <th className="col">Delete</th>
                  <th className="col">See details</th>
                </tr>
              </thead>
              <tbody>
                {letters.map((letter) => {
                  return (
                    <tr key={letter.id}>
                      <td>{new Date(letter.created).toLocaleDateString()}</td>
                      <td>
                        {letter.stance ? "in favor of" : "in opposition to"}
                      </td>
                      <td>{letter.topic}</td>
                      <td>
                        <Link
                          href="#"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => del(letter.id)}
                        >
                          Delete
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => seeLetter(letter.id)}
                        >
                          See details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Detail letter view</h2>
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
                      <td value={rep.rep_id}>{rep.address}</td>
                      <td value={rep.email}>{rep.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <Link to="/cletter">
              <button type="submit" className="btn btn-success">
                Create new letter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
