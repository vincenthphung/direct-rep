import { useToken } from "./TokenTest.js";

function LogoutButton() {
  const [token, logout] = useToken();
  console.log("logout button", token);

  // async function clickLogout(e) {
  //   e.preventDefault();
  logout();
  // }
}

export default LogoutButton;
