import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Navb() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          DirectREP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cletter">
              Create Letter
            </Nav.Link>
            <Nav.Link as={NavLink} to="/eletter">
              Edit Letter
            </Nav.Link>
            <Nav.Link as={NavLink} to="/selectreps">
              Select Reps
            </Nav.Link>
            <Nav.Link as={NavLink} to="/review">
              Review
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/eaccount">
              Edit Account
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
