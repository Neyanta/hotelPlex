import React, { Component } from "react";
import { connect } from "react-redux";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { Redirect } from "react-router-dom";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import StarIcon from "@material-ui/icons/Star";
import WifiIcon from "@material-ui/icons/Wifi";
import PoolIcon from "@material-ui/icons/Pool";
import SpaIcon from "@material-ui/icons/Spa";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import PetsIcon from "@material-ui/icons/Pets";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import emailjs from "emailjs-com";

class Hotel extends Component {
  state = {
    room: ""
  };

  handleRoomChange = e => {
    this.setState({ room: e.target.value });
  };

  sendMail = () => {
    var template_params = {
      hotel_name: this.props.hotel[0].hotel_name,
      hotel_location: this.props.hotel[0].location,
      customer_email: this.props.customerName,
      room: this.state.room
    };

    var service_id = "default_service";
    var template_id = "hotelplex_book_room";
    var user_id = "user_n88zEBStQCYeGEbRxw2xl";
    emailjs.send(service_id, template_id, template_params, user_id).then(
      function(response) {
        alert("Success!");
        console.log("SUCCESS!", response.status, response.text);
      },
      function(error) {
        console.log("FAILED...", error);
      }
    );
  };

  render() {
    var n = this.props.hotel[0].stars;
    const stars = [...Array(n)].map((e, i) => (
      <StarIcon key={i} style={{ color: "#fbb710" }} />
    ));
    var loggedIn = this.props.loggedIn;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="row justify-content-center my-4">
          <div className="col-md-12 col-lg-5 col-sm-12 col-xs-12  bg-white m-1 order-2 p-3">
            <h3>{this.props.hotel[0].hotel_name}</h3>
            <p>{stars}</p>
            <p style={{ textTransform: "capitalize" }}>
              <LocationOnIcon className="mr-2 " style={{ color: "grey" }} />
              {this.props.hotel[0].location}
            </p>
            <p>
              <PhoneIphoneIcon className="mr-2" />
              {this.props.hotel[0].contact}
            </p>
            <ul className="" style={{ listStyle: "none" }}>
              <PaymentOutlinedIcon className="mr-2" />
              Price
              <li>
                Single Room : &#8377; {this.props.hotel[0].price.single_room}
              </li>
              <li>
                Double Room: &#8377; {this.props.hotel[0].price.double_room}
              </li>
              <li>Suite: &#8377; {this.props.hotel[0].price.suite}</li>
            </ul>
            <ul className=" " style={{ listStyle: "none" }}>
              <div className="row ">
                <div className="col-6 ">
                  <li>
                    {this.props.hotel[0].amenities.wifi ? (
                      <WifiIcon style={{ color: "black" }} />
                    ) : (
                      <WifiIcon style={{ color: "grey" }} />
                    )}
                    Wifi
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.pool ? (
                      <PoolIcon style={{ color: "black" }} />
                    ) : (
                      <PoolIcon style={{ color: "grey" }} />
                    )}
                    Pool
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.spa ? (
                      <SpaIcon style={{ color: "black" }} />
                    ) : (
                      <SpaIcon style={{ color: "grey" }} />
                    )}
                    Spa
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.parking ? (
                      <LocalParkingIcon style={{ color: "black" }} />
                    ) : (
                      <LocalParkingIcon style={{ color: "grey" }} />
                    )}
                    Parking
                  </li>
                </div>
                <div className="col-6 ">
                  <li>
                    {this.props.hotel[0].amenities.pets ? (
                      <PetsIcon style={{ color: "black" }} />
                    ) : (
                      <PetsIcon style={{ color: "grey" }} />
                    )}
                    Pets
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.resturant ? (
                      <RestaurantIcon style={{ color: "black" }} />
                    ) : (
                      <RestaurantIcon style={{ color: "grey" }} />
                    )}
                    Restaurant
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.bar ? (
                      <LocalBarIcon style={{ color: "black" }} />
                    ) : (
                      <LocalBarIcon style={{ color: "grey" }} />
                    )}
                    Bar
                  </li>
                  <li>
                    {this.props.hotel[0].amenities.gym ? (
                      <FitnessCenterIcon style={{ color: "black" }} />
                    ) : (
                      <FitnessCenterIcon style={{ color: "grey" }} />
                    )}
                    Gym
                  </li>
                </div>
              </div>
            </ul>

            <p>{this.props.hotel[0].info}</p>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                id="btn"
                className="btn btn-primary "
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Book Now
              </button>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {this.props.hotel[0].hotel_name}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="" style={{ listStyle: "none" }}>
                      <PaymentOutlinedIcon className="mr-2" />
                      Price
                      <li>
                        <input
                          type="radio"
                          name="room"
                          value="single room"
                          onChange={this.handleRoomChange}
                          checked={this.state.room === "single room"}
                        />
                        Single Room : &#8377;{" "}
                        {this.props.hotel[0].price.single_room}
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="room"
                          value="double room"
                          onChange={this.handleRoomChange}
                          checked={this.state.room === "double room"}
                        />
                        Double Room: &#8377;
                        {this.props.hotel[0].price.double_room}
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="room"
                          value="suite"
                          onChange={this.handleRoomChange}
                          checked={this.state.room === "suite"}
                        />
                        Suite: &#8377; {this.props.hotel[0].price.suite}
                      </li>
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#11caca", border: "none" }}
                      onClick={this.sendMail}
                      data-dismiss="modal"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-5 col-sm-12 col-xs-12 bg-transparent m-1">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
              style={{ border: "8px double white" }}
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active" data-interval="3000">
                  <img
                    src={this.props.hotel[0].image_url.profile_pic}
                    className="d-block w-100"
                    alt="first"
                    style={{ height: "50vh" }}
                  />
                </div>
                <div className="carousel-item" data-interval="3000">
                  <img
                    src={this.props.hotel[0].image_url.pic_1}
                    className="d-block w-100"
                    alt="second"
                    style={{ height: "50vh" }}
                  />
                </div>
                <div className="carousel-item" data-interval="3000">
                  <img
                    src={this.props.hotel[0].image_url.pic_2}
                    className="d-block w-100"
                    alt="third"
                    style={{ height: "50vh" }}
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hotel: state.hotelReducer.hotel,
    customerName: JSON.parse(state.loginReducer.loggedIn).name,
    loggedIn: state.loginReducer.loggedIn
  };
};
export default connect(mapStateToProps)(Hotel);
