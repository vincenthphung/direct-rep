import { useState, useEffect } from "react";
import React from "react";
import { useCreateRepMutation } from "./store/repsApi";
import { Link } from "react-router-dom";

function RepForm() {
  const [name, setName] = useState("name");
  const [office, setOffice] = useState("office");
  const [level, setLevel] = useState("level");
  const [party, setParty] = useState("party");
  const [address, setAddress] = useState("address");
  const [letter_id, setLetterId] = useState("letter id");
  const [reps_list, setList] = useState([]);
  const [selection, setSelection] = useState([]);
  const [createRep, result] = useCreateRepMutation();

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

  //  to select the reps
  useEffect(() => {
    async function fetchReps(zipcode) {
      const urlCivics = `http://localhost:8090/civics?zipcode=${zipcode}`;
      const response = await fetch(urlCivics);
      if (response.ok) {
        const data = await response.json();
        // console.log("\n \n DATA", data);
        setList(data);
      }
    }
    fetchReps(`90017`);
    // connect this with the user account zip code
  }, []);

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
      }
    }
  }

  // to send that data to the database via the store reducer:
  async function handleSubmit(e) {
    e.preventDefault();
    createRep({ office, level, name, party, address, letter_id }).then(() =>
      showReps(letter_id)
    );
  }

  async function showReps(letter_id) {
    const urlReps = `http://localhost:8090/reps/letter/${letter_id}`;
    const response = await fetch(urlReps);
    if (response.ok) {
      const data = await response.json();
      setSelection(data);
    }
  }

  // to load it the first time the page renders
  useEffect(() => {
    showReps(letter_id);
  }, [letter_id]);

  // to load it any time we add or delete a rep
  useEffect(() => {
    showReps(letter_id);
  }, []);

  async function deleteRep(id) {
    // if (window.confirm("Are you sure: This Letter will be Deleted")) {
    await fetch(
      `http://localhost:8090/reps/letters/${letter_id}?rep_id=${id}`,
      {
        method: "DELETE",
      }
    ).then(() => showReps(letter_id));
  }
  // }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Select your reps</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                onChange={handleRepChange}
                required
                id="reps"
                name="reps"
                className="form-select"
              >
                <option value="">See your reps</option>
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
              Add to selection
            </button>
          </form>
        </div>
      </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Reps selection</h2>
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
                {selection.map((rep, i, j) => {
                  return (
                    <tr>
                      <td key={rep[j]} value={rep.name}>
                        {rep.name}
                      </td>
                      <td key={rep[i]} value={rep.office}>
                        {rep.office}
                      </td>
                      <td
                        className="btn"
                        onClick={() => deleteRep(rep.rep_id)}
                        key={rep.rep_id}
                        value={rep.rep_id}
                      >
                        Delete {rep.rep_id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/review">
            <button className="btn btn-primary">Continue to final page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RepForm;
