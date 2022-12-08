import { useState, useEffect } from "react";
import React from "react";
import { useCreateRepMutation } from "./store/repsApi";
import { useAuthContext } from "./TokenTest.js";
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from "react-router-dom";

function RepForm() {
  const { token } = useAuthContext();
  const [user, setUser] = useState();
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
  const [createRep, ] = useCreateRepMutation();
  // const [createRep, result] = useCreateRepMutation();
  const navigate = useNavigate();

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
      // console.log("Set user", user)
    }
  }
  getUserId();
}, [token, user]);

  // to get the id of the most recent letter created:
  useEffect(() => {
    async function fetchLetterId() {
      const urlLetter = `${process.env.REACT_APP_LETTERS_API_HOST}api/letters`;
      const response = await fetch(urlLetter, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const content = await response.json();
        const data = content.filter((c) => c['user_id'] === user)
        // console.log("test user content", data);
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
  }, [token, user]);

  // to get the zipcode
  useEffect(() => {
    async function getZipFromUser() {
      const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("response", response);
        const zipcode = data.account.zipcode;
        // console.log("zipcode", zipcode);
        setZip(zipcode);
        // console.log("zip", zip);
      }
    }
    getZipFromUser();
  }, [token, zip]);

  //  to select the reps
  useEffect(() => {
    // to prevent loading before zip is defined:
    if (zip != null) {
      async function fetchReps(zip) {
        const urlCivics = `${process.env.REACT_APP_LETTERS_API_HOST}/civics?zipcode=${zip}`;
        const response = await fetch(urlCivics, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
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
    trackPromise(createRep({ office, level, name, party, address, email, letter_id }).then(
      () => showReps(letter_id)
    ));
  }

  async function showReps(letter_id) {
    const response = await fetch(
      `${process.env.REACT_APP_LETTERS_API_HOST}/reps/letter/${letter_id}`,
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
          `${process.env.REACT_APP_LETTERS_API_HOST}/reps/letter/${letter_id}`,
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
      `${process.env.REACT_APP_LETTERS_API_HOST}/reps/letters/${letter_id}?rep_id=${id}`,
      { headers: { Authorization: `Bearer ${token}` }, method: "DELETE" }
    ).then(() => showReps(letter_id));
  }
  // }

  async function finalPage(e) {
    e.preventDefault();
    // console.log(oneId, oneContent);
    navigate("/review");
  }

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
        <div className="text-center">
          <h2>Representatives</h2>
          </div>
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
                        className="btn btn-sm btn-outline-secondary"
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
            <button onClick={finalPage} className="btn btn-primary">Final Page</button>
        </div>
      </div>
    </div>
  );
}

export default RepForm;
