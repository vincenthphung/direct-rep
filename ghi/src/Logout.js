import { useEffect } from "react";
import { useToken } from "./TokenTest.js";

function LogoutButton() {
  const [token, login, logout] = useToken();
  // const [token, logout] = useToken();
  // console.log("logout button", token);
  console.log("logout button test", logout);

  useEffect(() => {
    async function clickLogout() {
      logout();
    }

    clickLogout();
  }, [logout]);
}

export default LogoutButton;
