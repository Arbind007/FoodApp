import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useOktaAuth } from '@okta/okta-react';

const Navbar = (props) => {
  const { authState, oktaAuth } = useOktaAuth();
  const isAuthenticated = authState && authState.isAuthenticated;

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <div style={{ zIndex: 2, opacity: 0.6 }} className="sticky-top">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
        <div className="container my-2">
          <Link to="/" className="navbar-brand text-white font-weight-bold">
            <h2>Pulitzer Paris</h2>
          </Link>

          <div className="collapse navbar-collapse flex-grow-0" id="collapseNav">
            <div className="navbar-nav">
              {isAuthenticated ? (
                <button className="btn btn-outline-danger mx-5" onClick={logout}>
                  <h4>Logout</h4>
                </button>
              ) : (
                <button className="btn btn-outline-danger mx-5" onClick={login}>
                  <h4>Login</h4>
                </button>
              )}
              <Link to="/allorders" className="navbar-brand text-light mx h3 my-auto">
                <h4>All Orders</h4>
              </Link>
              <Link to="/" className="navbar-brand text-light mx-5 h3 my-auto">
                <h4>Menu</h4>
              </Link>
              <Link to="/cart" className="text-light mx-2 h3 my-auto">
                <i className="fas fa-shopping-cart"></i>
              </Link>

              <div
                style={{
                  position: "relative",
                  right: "4.0%",
                  height: "1rem",
                  top: "-0.6rem",
                }}
              >
                <div className="rounded-pill my-2 bg-white">
                  <h6 className="text-dark mx-2 my-auto">
                    {typeof props.total === "object"
                      ? JSON.stringify(props.total)
                      : props.total}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  total: state.quantity,
});

export default connect(mapStateToProps)(Navbar);
