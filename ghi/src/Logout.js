import { useEffect } from "react";
import { useToken } from "./TokenTest.js";

function LogoutButton() {
  const [, , logout] = useToken();

  useEffect(() => {
    async function clickLogout() {
      logout();
    }

    clickLogout();
  }, [logout]);
}

export default LogoutButton;
