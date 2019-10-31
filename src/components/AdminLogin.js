import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { adminLogin } from "../actions/loginActions";
import KeyboardArrowLeftSharpIcon from "@material-ui/icons/KeyboardArrowLeftSharp";
import "../assets/styles/adminLogin.css";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirected: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleRedirect = () => {
    if (this.state.redirected) {
      return <Redirect to="/admin" />;
    }
  };
  handleClick = () => {
    var email = "admin@gmail.com";
    var password = "admin@1234";
    if (this.state.email === email && this.state.password === password) {
      this.setState({ redirected: true });
      this.props.adminLoggedIn();
    } else {
      alert("wrong credentials");
    }
  };
  render() {
    return (
      <div>
        {this.handleRedirect()}
        <div className="container" id="adminContainer">
          <div className="card" id="adminCard">
            <h5 className="card-title text-center m-3"> ADMIN LOGIN</h5>
            <form className="">
              <div className="card-body " id="adminBody">
                <label htmlFor="email">Email</label>
                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <label htmlFor="password">Password</label>
                <div className="form-group ">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    type="button"
                    className="btn btn-lg text-light m-3"
                    id="adminButton"
                    onClick={this.handleClick}
                  >
                    Submit
                  </button>
                </div>
                <div className="form-group">
                  <Link to={"/"}>
                    <span className="d-flex align-items-center justify-content-center">
                      <KeyboardArrowLeftSharpIcon /> Back
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    adminLoggedIn: () => dispatch(adminLogin())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AdminLogin);
