import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import PersonIcon from "@material-ui/icons/Person";
import { connect } from "react-redux";
import { loginUser, FacebookLoginUser } from "../actions/loginActions";
import { Redirect, Link } from "react-router-dom";
import backgroundVideo from "../assets/images/backgroundVideo.mp4";
import "../assets/styles/Login.css";
import logo from "../assets/images/bluelogo.png"

class Login extends Component {
  constructor(props) {
    super(props);
    this.googleCallback = this.googleCallback.bind(this);
  }
  googleCallback(response) {
    let user = {
      name: response.profileObj.name,
      token: response.accessToken
    };

    localStorage.setItem("user", JSON.stringify(user));
    this.props.doLogin();
  }
  renderRedirect = () => {
    if (this.props.loggedIn === true) {
      return <Redirect to="/home" />;
    }
  };
  responseFacebook = response => {
    let fbUser = {
      name: response.name,
      token: response.accessToken,
      email: response.email,
      userID: response.userID
    };
    localStorage.setItem("fbUser", JSON.stringify(fbUser));
    this.props.doFacebookLogin();
  };
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <img src={logo} style={{position: "absolute", top: "10px", left: "10px", height: "80px", width: "80px", zIndex: "999"}} alt="logo"/>
        <header className="v-header container">
          <div className="fullscreen-video-wrap">
            <video src={backgroundVideo} autoPlay loop></video>
          </div>

          <div className="header-content text-md-center">
            <div className="card " id="card">
              <div className="card-body">
                <GoogleLogin
                  className="google-btn "
                  clientId="31049562874-4n83ppt2b503fag4vbv4nu7ab19kggh4.apps.googleusercontent.com"
                  buttonText="Sign in with google"
                  onSuccess={this.googleCallback}
                  onFailure={this.googleCallback}
                  cookiePolicy={"single_host_origin"}
                />
                {/* Facebook Login */}
                <FacebookLogin
                  className="facebook-btn"
                  appId="701308123704164"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                  cssClass="my-facebook-button-class"
                  icon="fa-facebook"
                />
                <Link to={"/adminlogin"}>
                  <button className="admin-btn">
                    <PersonIcon className="mr-2" style={{ color: "black" }} />
                    Are you an admin?
                  </button>
                </Link>
              </div>
              <p className="mt-4 d-none d-md-block">
                I WOULD RATHER OWN A LITTLE AND SEE THE WORLD THAN OWN THE WORLD
                AND SEE A LITTLE OF IT.
              </p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
function mapActionToProps(dispatch) {
  return {
    doLogin: function() {
      dispatch(loginUser());
    },
    doFacebookLogin: function() {
      dispatch(FacebookLoginUser());
    }
  };
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.checkLoggedIn
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(Login);
