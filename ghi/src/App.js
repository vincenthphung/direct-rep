import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./TokenTest.js";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
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
import LoginForm from "./LoginTest";
import LogoutButton from "./Logout.js";
import NewLoginForm from "./NewLogin";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />

          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<AccountForm />} />

            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/eaccount" element={<EditAccount />} />
            <Route path="/selectreps" element={<RepForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cletter" element={<LetterForm />} />
            <Route path="/eletter" element={<EditLetter />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/newlogin" element={<NewLoginForm />} />
            <Route path="/newlogin" element={<NewLoginForm />} />
          </Routes>

          {/* <ErrorNotification error={error} /> */}
          {/* <Construct info={launch_info} /> */}
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
