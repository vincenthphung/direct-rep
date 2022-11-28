import { useState, useEffect } from "react";
import React from "react";
import { useCreateRepMutation } from "./store/repsApi";

function InputLabel(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function RepForm() {
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [level, setLevel] = useState("");
  const [party, setParty] = useState("");
  const [address, setAddress] = useState("");
  const [letter_id, setLetterId] = useState("");
  const [reps_list, setList] = useState([]);
  const [createRep, result] = useCreateRepMutation();

  // const reps_list_test = []

  useEffect(() => {
    //  to select the reps
    async function fetchReps(zipcode) {
      const urlCivics = `http://localhost:8090/civics?zipcode=${zipcode}`;
      const response = await fetch(urlCivics);
      if (response.ok) {
        const data = await response.json();
        console.log("\n \n DATA", data);
        // return data
        // const reps_list_test = data
        setList(data);
        // console.log("\n \n REPS LIST", reps_list);
      }
    }

    fetchReps(`02116`);
    // setList(data);
    // console.log("\n \n REPS LIST", reps_list);
    // console.log("\n \n REPS LIST", reps_list_test);
  }, []);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   createRep({ office, level, name, party, address, letter_id });
  // }

  return (
    <form
    // onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <select
          onChange={setName}
          required
          id="reps"
          name="reps"
          className="form-select"
        >
          <option value="">See your reps</option>
          {reps_list.map((rep) => {
            return (
              <option key={rep.name} value={rep.level}>
                {rep.name}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default RepForm;
