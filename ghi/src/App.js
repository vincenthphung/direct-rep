import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import AccountForm from "./AccountForm";
import RepForm from "./RepForm";
import "./App.css";
import Navigation from "./Nav";
import Dashboard from "./Dashboard";
import LetterForm from "./CreateLetter";
import EditLetter from "./EditLetter";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/create/reps" element={<RepForm />} />
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cletter" element={<LetterForm />} />
          <Route path="/eletter" element={<EditLetter />} />
        </Routes>
      </BrowserRouter>
      <ErrorNotification error={error} />
      {/* <Construct info={launch_info} /> */}
    </div>
  );
}

export default App;
