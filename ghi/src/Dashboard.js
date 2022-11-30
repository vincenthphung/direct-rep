import { Wrapper } from "./Wrapper";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export const Dashboard = () => {
  const [letter, setLetter] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8090/api/letters");
      const content = await response.json();
      setLetter(content);
    })();
  }, []);

  const del = async (id) => {
    if (window.confirm("Are you sure: This Letter will be Deleted")) {
      await fetch(`http://localhost:8090/letters/${id}`, {
        method: "DELETE",
      });

      setLetter(letter.filter((p) => p.id !== id));
    }
  };

  return (
    <Wrapper>
      <div>
        {letter.map((work) => {
          return (
            <Card className="text-center" key={work.id}>
              <Card.Header>Letter Number: {work.id}</Card.Header>
              <Card.Body>
                <Card.Title>Topic: {work.topic}</Card.Title>
                <Card.Text>Stance: {work.stance.toString()} </Card.Text>
                <a href="/eletter">
                  <Button variant="primary">Edit</Button>
                </a>
              </Card.Body>
              <Card.Footer className="text-muted">
                <a
                  href="#"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={(e) => del(work.id)}
                >
                  Delete
                </a>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
