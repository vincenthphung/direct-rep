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
import ReviewForm from "./Review";
import LandingPage from "./Landing";
import EditAccount from "./EditAccount";
import LoginComponent from "./Login";
import { AuthProvider, useToken } from "./Authentication";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

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
      {/* // <AuthProvider>
    //   <GetToken /> */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/eaccount" element={<EditAccount />} />
          <Route path="/selectreps" element={<RepForm />} />
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cletter" element={<LetterForm />} />
          <Route path="/eletter" element={<EditLetter />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
      <ErrorNotification error={error} />
      {/* <Construct info={launch_info} /> */}
      {/* // </AuthProvider> */}
    </div>
  );
}

export default App;
