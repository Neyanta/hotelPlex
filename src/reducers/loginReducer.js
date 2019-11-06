const initialState = {
  loggedIn: localStorage.getItem("user"),
  facebookLoggedIn: "",
  checkLoggedIn: false,
  adminLoggedIn: false
};
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return Object.assign({}, state, {
        loggedIn: localStorage.getItem("user"),
        checkLoggedIn: true
      });
    case "FBLOGIN_USER":
      return Object.assign({}, state, {
        facebookLoggedIn: localStorage.getItem("fbUser"),
        checkLoggedIn: true
      });

    case "LOGOUT_USER":
      return Object.assign({}, state, {
        loggedIn: "",
        facebookLoggedIn: "",
        checkLoggedIn: false,
        adminLoggedIn: false
      });

    case "ADMIN_LOGIN":
      return Object.assign({}, state, { adminLoggedIn: true });

    default:
      return state;
  }
}

export default loginReducer;
