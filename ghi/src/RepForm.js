import { useState, useEffect } from "react";
import React from "react";
import { useCreateRepMutation } from "./store/repsApi";
import { Link } from "react-router-dom";
import { useAuthContext } from "./TokenTest.js";

function RepForm() {
  const { token } = useAuthContext();
  const [name, setName] = useState();
  const [office, setOffice] = useState();
  const [level, setLevel] = useState();
  const [party, setParty] = useState();
  const [address, setAddress] = useState();
  const [letter_id, setLetterId] = useState();
  const [reps_list, setList] = useState([]);
  const [selection, setSelection] = useState([]);
  const [zip, setZip] = useState();
  const [email, setEmail] = useState();
  const [createRep, result] = useCreateRepMutation();

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
            // console.log("LAST", lastId);
            setLetterId(lastId);
          }
        }
      }
    }
    fetchLetterId();
  }, [token]);

  // to get the zipcode
  useEffect(() => {
    async function getZipFromUser() {
      const url = `http://localhost:8080/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response", response);
        console.log("get zip data test", data);
        const zipcode = data.account.zipcode;
        console.log("zipcode", zipcode);
        setZip(zipcode);
        console.log("zip", zip);
      }
    }
    getZipFromUser();
  }, [token, zip]);

  //  to select the reps
  useEffect(() => {
    // to prevent loading before zip is defined:
    if (zip != null) {
      async function fetchReps(zip) {
        const urlCivics = `http://localhost:8090/civics?zipcode=${zip}`;
        const response = await fetch(urlCivics, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("\n \n DATA", data);
          setList(data);
        }
      }
      fetchReps(zip);
      // connects the reps fetch with the user's zip code
    }
  }, [token, zip]);

  // console.log("\n \n REPS LIST", reps_list);

  // to get the rep data from the dropdown selection for the database:
  async function handleRepChange(event) {
    event.preventDefault();
    const rep = event.target.value;
    setName(rep);
    for (let i = 0; i < reps_list.length; i++) {
      if (rep === reps_list[i].name) {
        setOffice(reps_list[i].office);
        setLevel(reps_list[i].level);
        setParty(reps_list[i].party);
        let addressDict = reps_list[i].address;
        setAddress(
          `${addressDict["line1"]} ${addressDict["city"]}, ${addressDict["state"]} ${addressDict["zip"]}`
        );
        setEmail(reps_list[i].email);
      }
    }
  }

  // to send that data to the database via the store reducer:
  async function handleSubmit(e) {
    e.preventDefault();
    createRep({ office, level, name, party, address, email, letter_id }).then(
      () => showReps(letter_id)
    );
  }

  async function showReps(letter_id) {
    const response = await fetch(
      `http://localhost:8090/reps/letter/${letter_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setSelection(data);
    }
  }

  // to load the Reps selected
  useEffect(() => {
    if (letter_id != null) {
      async function showReps(letter_id) {
        const response = await fetch(
          `http://localhost:8090/reps/letter/${letter_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSelection(data);
        }
      }
      showReps(letter_id);
    }
  }, [letter_id, token]);

  async function deleteRep(id) {
    // if (window.confirm("Are you sure? This letter will be deleted")) {
    await fetch(
      `http://localhost:8090/reps/letters/${letter_id}?rep_id=${id}`,
      { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" }
    ).then(() => showReps(letter_id));
  }
  // }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Select Representatives</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                onChange={handleRepChange}
                required
                id="reps"
                name="reps"
                className="form-select"
              >
                <option value="">Representatives</option>
                {reps_list.map((rep) => {
                  return (
                    <option key={rep.name} value={rep.name}>
                      {rep.name}, {rep.office}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </form>
        </div>
      </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Representatives</h2>
          <div>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Rep name</th>
                  <th>Rep office</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {selection.map((rep) => {
                  return (
                    <tr key={rep.rep_id}>
                      <td value={rep.name}>{rep.name}</td>
                      <td value={rep.office}>{rep.office}</td>
                      <td
                        className="btn"
                        onClick={() => deleteRep(rep.rep_id)}
                        value={rep.rep_id}
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/review">
            <button className="btn btn-primary">Final Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RepForm;
