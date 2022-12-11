import { useParams } from "react-router-dom";
import { useAuthContext } from "./TokenTest.js";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";

function DetailView() {
  const params = useParams();
  const { token } = useAuthContext();
  const [, setOneLetter] = useState([""]);
  const [, setId] = useState();
  const [oneContent, setContent] = useState();
  const [oneStance, setStance] = useState();
  const [oneTopic, setTopic] = useState();
  const [oneDate, setDate] = useState();
  const [repSelection, setSelection] = useState([]);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const s = params.id;
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_LETTERS_API_HOST}/letters/${s}`,
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
    })();
    async function seeReps() {
      const urlReps = `${process.env.REACT_APP_LETTERS_API_HOST}/reps/letter/${s}`;
      const response = await fetch(urlReps, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSelection(data);
      }
    }
    seeReps();
  }, [token, s]);
  const copyToClipboard = () => {
    copy(oneContent);
    alert(`Your letter has been copied:${oneContent}`);
  };

  return (
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <div className="text-center">
          <h2>Detail letter view</h2>
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
                {oneTopic != null
                  ? oneStance
                    ? `Write a letter in favor of ${oneTopic}`
                    : `Write a letter in opposition to ${oneTopic}`
                  : ""}
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
          <Link to="/dashboard">
            <button type="submit" className="btn btn-success">
              Dashboard
            </button>
          </Link>
          <button
            onClick={copyToClipboard}
            type="submit"
            className="btn btn-primary ms-5">
            Copy letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
