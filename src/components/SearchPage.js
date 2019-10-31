import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { fetchingHotels, fetchedHotels } from "../actions/searchActions";
import "../assets/styles/searchPage.css";


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      redirect: false
    };
  }

  handleChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleClick = () => {
    if (this.state.searchInput !== "") {
      this.props.search(this.state.searchInput);
      this.setState({ redirect: true });
    } else {
      alert("Please fill in the location first");
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/hotels" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="section-top">
        
          <div className="content">
            <h1>Search Hotels for your destination </h1>
            <div className="locationSearchBar">
              <TextField
                id="outlined-full-width"
                label="Search"
                style={{ margin: 0 }}
                placeholder="Location"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.searchInput}
                onChange={this.handleChange}
              />

              <Button
                variant="contained"
                color="primary"
                id="searchButton"
                onClick={this.handleClick}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    search: input => {
      dispatch(fetchingHotels());

      fetch(`https://alphahotelapi.herokuapp.com/search/${input}`)
        .then(res => res.json())
        .then(result => dispatch(fetchedHotels(result)));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchPage);
