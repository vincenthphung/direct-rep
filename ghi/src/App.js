import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./TokenTest.js";
import AccountForm from "./AccountForm";
import RepForm from "./RepForm";
import "./App.css";
import Dashboard from "./Dashboard";
import LetterForm from "./CreateLetter";
import EditLetter from "./EditLetter";
import ReviewForm from "./Review";
import LandingPage from "./Landing";
import EditAccount from "./EditAccount";
import LoginForm from "./LoginTest";
import LogoutButton from "./Logout.js";
import NewLoginForm from "./NewLogin";
import DetailView from "./Detailview";
import Navb from "./Nav";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Navb />
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
          <Route path="/letters/:id" element={<DetailView />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
