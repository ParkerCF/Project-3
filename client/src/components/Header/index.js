import React from "react";
import { Link } from "react-router-dom";


import Auth from "../../utils/auth";


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-info text-dark py-3 space-between align-center">
      <div className="container flex-column justify align-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: "6rem" }}>
            Greg's List
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: "3rem", fontWeight: "400" }}>
          Check out our wide selection of products.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Seller Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};


export default Header;





