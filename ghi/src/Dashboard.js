// import { Link } from "react-router-dom";
// import { useGetLettersQuery } from "./store/lettersApi";
// import ErrorNotification from "./ErrorNotification";

// function Dashboard() {
//   const { data, error, isLoading } = useGetLettersQuery();

//   if (isLoading) {
//     return <progress className="progress is-primary" max="100"></progress>;
//   }

//   return (
//     <div className="columns is-centered">
//       <div className="column is-narrow">
//         <ErrorNotification error={error} />
//         {/* <div className="field has-right-text">
//                     <className="button">Create Letter</className=>
//                 </div> */}
//         <table className="table is-striped">
//           <thead>
//             <tr>
//               <th>Topic</th>
//               <th>Stance</th>
//               <th>Content</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.letter &&
//               data.letter.map((letters) => (
//                 <tr key={letters.id}>
//                   <td>{letters.topic}</td>
//                   <td>{letters.stance}</td>
//                   <td>{letters.content}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import { Wrapper } from "./Wrapper";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Wrapper } from "./Wrapper";
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

  // const edit = async (id) => {
  //   if (window.confirm("Are you sure: This Letter will be Deleted")) {
  //     await fetch(`http://localhost:8090/letters/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify(),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setLetter(letter.filter((p) => p.id !== id));
  //   }
  // };

  return (
    <Wrapper>
      {/* <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={`/create`} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div> */}

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Letter</th>
              <th scope="col">Stance</th>
              <th scope="col">Content</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {letter.map((letters) => {
              return (
                <tr key={letters.id}>
                  <td>{letters.topic}</td>
                  <td>{letters.stance}</td>
                  <td>{letters.content}</td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={(e) => del(letters.id)}
                    >
                      Delete
                    </a>
                    {/* <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={(e) => edit(letters.id)}
                    >
                      Edit
                    </a> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        {letter.map((work) => {
          return (
            <Card className="text-center" key={work.id}>
              <Card.Header>Letter Number: {work.id}</Card.Header>
              <Card.Body>
                <Card.Title>Topic: {work.stance}</Card.Title>
                <Card.Text>Stance: {work.topic}</Card.Text>
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
