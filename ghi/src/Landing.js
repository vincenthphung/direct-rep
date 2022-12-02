import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="mb-3">
            <h1>Welcome to Direct Rep</h1>
          </div>
          <div className="mb-3">
            <Link to="/signup">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </Link>
          </div>
          <div className="mb-3">
            <Link to="/login">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
