import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div classNameName="jumbotron centered">
      <div classNameName="container offset-3 col-6 mb-3">
        <i classNameName="fas fa-key fa-6x" />
        <h1 classNameName="display-3">Direct Rep</h1>
        <p classNameName="lead">
          Get in touch with your representatives and let AI help you write a
          letter about important political issues.
        </p>
        <hr />
        <Link to="/signup">
          <button type="submit" classNameName="btn btn-dark btn-lg">
            Signup
          </button>
        </Link>
        <Link to="/login">
          <button type="submit" classNameName="btn btn-dark btn-lg ms-5">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
