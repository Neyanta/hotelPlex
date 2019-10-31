import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";
import { logoutUser } from "../actions/loginActions";
import { connect } from "react-redux";
import logo from "../assets/images/logo.png";

function Navbar(props) {
  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to={"/home"}>
        <img src={logo} style={{ height: "30px", width: "30px" }} alt="logo" />
        HotelPlex
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/home"}>
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/hotels"}>
              Hotels
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/adminlogin"}>
              Admin
            </Link>
          </li>
          <li className="nav-item active" onClick={props.logout}>
            <Link className="nav-link" to={"#"}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

window.onscroll = function() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav").classList.add("sticky-top", "scrolled");
  } else {
    document.getElementById("nav").classList.remove("sticky-top", "scrolled");
  }
};

const mapDisptachToProps = dispatch => {
  return {
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("fbUser");
      dispatch(logoutUser());
    }
  };
};

export default connect(
  null,
  mapDisptachToProps
)(Navbar);
