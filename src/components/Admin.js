import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchingAllHotels,
  fetchedAllHotels,
  deleteHotel
} from "../actions/adminActions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import preloader from "../assets/images/preloader.gif";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import StarIcon from "@material-ui/icons/Star";

class Admin extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const hotels = this.props.fetched ? (
      this.props.hotels.map((hotel, i) => {
        var n = hotel.stars;
        const stars = [...Array(n)].map((e, i) => (
          <StarIcon key={i} style={{ color: "#fbb710" }} />
        ));
        return (
          <div className="col-md-4 col-xs-12 mb-3" key={hotel._id}>
            <div
              className="card"
              style={{
                boxShadow: "0 0 8px 4px rgba(0,0,0,0.3)"
              }}
            >
              <div className="card-img-top">
                <div
                  id={"carouselExampleIndicators" + i}
                  className="carousel slide"
                  data-ride="carousel"
                  style={{ border: "8px double white" }}
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target={"#carouselExampleIndicators" + i}
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target={"#carouselExampleIndicators" + i}
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target={"#carouselExampleIndicators" + i}
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-interval="3000">
                      <img
                        src={hotel.image_url.profile_pic}
                        className="d-block w-100"
                        alt="first"
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="carousel-item" data-interval="3000">
                      <img
                        src={hotel.image_url.pic_1}
                        className="d-block w-100"
                        alt="second"
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="carousel-item" data-interval="3000">
                      <img
                        src={hotel.image_url.pic_2}
                        className="d-block w-100"
                        alt="third"
                        style={{ height: "300px" }}
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href={"#carouselExampleIndicators" + i}
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
                    href={"#carouselExampleIndicators" + i}
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

              <div className="card-body">
                <h5 className="card-title">{hotel.hotel_name}</h5>
                <p className="card-text">&#8377; {hotel.price.single_room}</p>
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

                <p className="d-none">{hotel._id}</p>
                <button
                  className="btn btn-block text-white"
                  style={{ backgroundColor: "#11caca" }}
                  type="button"
                  onClick={this.props.delete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div
        id="gifContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "calc(100vh - 132px)"
        }}
      >
        <img src={preloader} alt="preloader" />
      </div>
    );

    return (
      <div>
        <Navbar />
        <div className="container-fluid mt-4">
          <div className="row">{hotels}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetched: state.adminReducer.fetched,
    hotels: state.adminReducer.hotels
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    fetch: () => {
      dispatch(fetchingAllHotels);
      fetch("https://alphahotelapi.herokuapp.com/admin")
        .then(res => res.json())
        .then(result => dispatch(fetchedAllHotels(result)));
    },
    delete: e => {
      const id = e.target.previousSibling.innerText;
      if (window.confirm("Are you sure?")) {
        dispatch(deleteHotel(id));
        fetch(`https://alphahotelapi.herokuapp.com/admin/hotel/del/${id}`)
          .then(res => res.json())
          .then(res => console.log(res));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Admin);
