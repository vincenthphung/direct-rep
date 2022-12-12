import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./TokenTest.js";

function Dashboard() {
  const { token } = useAuthContext();
  const [letters, setLetters] = useState([]);
  const [user, setUser] = useState();

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

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_LETTERS_API_HOST}/api/letters`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const content = await response.json();
      const userContent = content.filter((c) => c["user_id"] === user);
      setLetters(userContent);
    })();
  }, [token, user]);

  const del = async (id) => {
    if (window.confirm("Are you sure? This letter will be deleted")) {
      await fetch(`${process.env.REACT_APP_LETTERS_API_HOST}/letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      setLetters(letters.filter((p) => p.id !== id));
    }
  };

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
                          to={"/letters/" + letter.id}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          See details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
