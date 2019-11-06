import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Login";
import SearchPage from "./SearchPage";
import HotelsContainer from "./HotelsContainer";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import Hotel from "./Hotel";

class App extends React.Component {
  render() {
    const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.adminLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/adminlogin" />
          )
        }
      />
    );

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={SearchPage} />
            <Route path="/hotels" component={HotelsContainer} />
            <Route path="/hotel" component={Hotel} />
            <Route exact path="/adminlogin" component={AdminLogin} />
            <PrivateRouteAdmin exact path="/admin" component={Admin} />
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    adminLoggedIn: state.loginReducer.adminLoggedIn
  };
};
export default connect(mapStateToProps)(App);
