import React, { Component } from "react";
import { connect } from "react-redux";
import InputRange from "react-input-range";
import Switch from "react-switch";
import Navbar from "./Navbar";
import ViewHotels from "./ViewHotels";
import Footer from "./Footer";
import {
  fetchingHotels,
  fetchedHotels,
  filterHotels
} from "../actions/searchActions";
import "../assets/styles/hotelsContainer.css";
import "react-input-range/lib/css/index.css";

class HotelsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: { min: 1500, max: 4000 },
      stars: 5,
      amenities: {
        wifi: false,
        pool: false,
        spa: false,
        parking: false,
        pets: false,
        restaurant: false,
        bar: false,
        gym: false
      },
      searchInput: ""
    };
  }

  handleChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleClick = () => {
    if (this.state.searchInput !== "") {
      this.props.search(this.state.searchInput);
    } else {
      alert("Please fill in the location first");
    }
  };

  starsHandleChange = e => {
    this.setState({ stars: parseInt(e.target.value) });
  };

  amenitiesHandleChange = (checked, e) => {
    let key = e.target.parentNode.previousSibling.innerText.toLowerCase();
    this.setState(prevState => {
      return {
        ...prevState,
        amenities: {
          ...prevState.amenities,
          [key]: checked
        }
      };
    });
  };

  applyFilters = () => {
    let filteredHotels = this.props.hotels.filter(
      hotel =>
        hotel.stars === this.state.stars &&
        hotel.price.single_room > this.state.price.min &&
        hotel.price.single_room < this.state.price.max &&
        hotel.amenities.wifi === this.state.amenities.wifi &&
        hotel.amenities.pool === this.state.amenities.pool &&
        hotel.amenities.spa === this.state.amenities.spa &&
        hotel.amenities.parking === this.state.amenities.parking &&
        hotel.amenities.pets === this.state.amenities.pets &&
        hotel.amenities.restaurant === this.state.amenities.restaurant &&
        hotel.amenities.bar === this.state.amenities.bar &&
        hotel.amenities.gym === this.state.amenities.gym
    );
    this.props.filterHotels(filteredHotels);
  };

  render() {
    return (
      <div id="container">
        <Navbar />

        <div className="container mt-4 d-flex justify-content-center">
          <input
            className="form-control"
            type="search"
            placeholder="Location"
            aria-label="Search"
            value={this.state.searchInput}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-primary ml-2"
            style={{ backgroundColor: "#11CACA", border: "none" }}
            type="button"
            onClick={this.handleClick}
          >
            Search
          </button>
        </div>

        <div className="container mt-5 d-flex">
          <InputRange
            maxValue={10000}
            minValue={999}
            formatLabel={value => `₹${value}`}
            value={this.state.price}
            onChange={value => this.setState({ price: value })}
            onChangeComplete={value => console.log(value)}
          />

          <div className="input-group ml-5 mb-3">
            <div className="input-group-prepend">
              <label
                className="input-group-text"
                htmlFor="inputGroupSelect01"
                style={{
                  backgroundColor: "#10caca",
                  color: "white",
                  border: "none"
                }}
              >
                Stars
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={this.starsHandleChange}
              value={this.state.stars}
            >
              <option value="5">5-star hotels</option>
              <option value="4">4-star hotels</option>
              <option value="3">3-star hotels</option>
              <option value="2">2-star hotels</option>
              <option value="1">1-star hotels</option>
            </select>
          </div>
        </div>

        <div className="container mt-4 d-flex justify-content-between flex-wrap">
          <label htmlFor="wifi">
            <span className="amenitiesName">WiFi</span>
            <Switch
              checked={this.state.amenities.wifi}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="wifi"
            />
          </label>

          <label htmlFor="pool">
            <span className="amenitiesName">Pool</span>
            <Switch
              checked={this.state.amenities.pool}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="pool"
            />
          </label>

          <label htmlFor="spa">
            <span className="amenitiesName">Spa</span>
            <Switch
              checked={this.state.amenities.spa}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="spa"
            />
          </label>

          <label htmlFor="parking">
            <span className="amenitiesName">Parking</span>
            <Switch
              checked={this.state.amenities.parking}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="parking"
            />
          </label>

          <label htmlFor="pets">
            <span className="amenitiesName">Pets</span>
            <Switch
              checked={this.state.amenities.pets}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="pets"
            />
          </label>

          <label htmlFor="restaurant">
            <span className="amenitiesName">Restaurant</span>
            <Switch
              checked={this.state.amenities.restaurant}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="restaurant"
            />
          </label>

          <label htmlFor="bar">
            <span className="amenitiesName">Bar</span>
            <Switch
              checked={this.state.amenities.bar}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="bar"
            />
          </label>

          <label htmlFor="gym">
            <span className="amenitiesName">Gym</span>
            <Switch
              checked={this.state.amenities.gym}
              onChange={this.amenitiesHandleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="gym"
            />
          </label>
        </div>

        <div className="container mt-4 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#10caca", border: "none" }}
            onClick={this.applyFilters}
          >
            Apply
          </button>
        </div>

        <div id="viewHotels" style={{ minHeight: "calc(100vh - 485px)" }}>
          <ViewHotels />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hotels: state.searchReducer.hotels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterHotels: filteredHotels => dispatch(filterHotels(filteredHotels)),
    search: input => {
      dispatch(fetchingHotels());

      fetch(`https://alphahotelapi.herokuapp.com/search/${input}`)
        .then(res => res.json())
        .then(result => dispatch(fetchedHotels(result)));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelsContainer);
