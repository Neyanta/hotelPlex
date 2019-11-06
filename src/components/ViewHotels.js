import React, { Component } from "react";
import { connect } from "react-redux";
import preloader from "../assets/images/preloader.gif";
import { viewHotel } from "../actions/hotelActions";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import StarIcon from "@material-ui/icons/Star";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import "../assets/styles/ViewHotels.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class ViewHotels extends Component {
  handleClick = id => {
    const singleHotel = this.props.hotels.filter(hotel => hotel._id === id);
    this.props.viewHotel(singleHotel);
  };
  render() {
    var loggedIn = this.props.loggedIn;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    const hotelComponents = this.props.fetched ? (
      this.props.hotels.map(hotel => {
        var n = hotel.stars;
        const stars = [...Array(n)].map((e, i) => (
          <StarIcon key={i} style={{ color: "#fbb710" }} />
        ));
        return (
          <div className=" " key={hotel._id}>
            <div
              className="card mb-3 p-0"
              style={{
                border: "none",
                boxShadow: "0 0 8px 4px rgba(0,0,0,0.3)",
                zIndex: "2",
                borderRadius: "0px"
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4 col-sm-12 col-xs-12 ">
                  <img
                    src={hotel.image_url.profile_pic}
                    className="card-img m-0 p-0"
                    alt="hotel_pic"
                    style={{
                      maxHeight: "100%",
                      borderRadius: "0px"
                    }}
                  />
                </div>
                <div className="col-md-6 col-xs-12 col-sm-12">
                  <div className="card-body">
                    <h5 className="card-title">{hotel.hotel_name}</h5>
                    <p className="card-text">
                      &#8377; {hotel.price.single_room}
                    </p>
                    <p className="card-text">
                      <PhoneIphoneOutlinedIcon />
                      {hotel.contact}
                    </p>
                    <p className="card-text">{stars}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        <RoomOutlinedIcon />
                        {hotel.location}
                      </small>
                    </p>
                  </div>
                </div>
                <div
                  className="col-md-2 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center"
                  style={{ borderLeft: "1px solid grey" }}
                >
                  <Link
                    to={"/hotel/" + hotel._id}
                    onClick={() => this.handleClick(hotel._id)}
                  >
                    <button id="btn"> View More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div id="gifContainer">
        <img src={preloader} id="preloaderGif" alt="preloader" />
      </div>
    );

    return (
      <div className="d-flex justify-content-center ">
        <div className="" style={{ width: "80vw" }}>
          {hotelComponents}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hotels: state.searchReducer.filteredHotels,
    fetched: state.searchReducer.fetched,
    loggedIn: state.loginReducer.loggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    viewHotel: hotel => dispatch(viewHotel(hotel))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHotels);
