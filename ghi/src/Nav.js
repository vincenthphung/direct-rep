import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "./TokenTest.js";

function Navb() {
  const { token } = useAuthContext();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>DirectREP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {token ? (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cletter">
                Create Letter
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            {token ? (
              <Fragment>
                <Nav.Link as={NavLink} to="/eaccount">
                  Edit Account
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link as={NavLink} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
