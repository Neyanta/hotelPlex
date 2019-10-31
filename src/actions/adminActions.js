export const fetchingAllHotels = () => {
  return {
    type: "FETCHING_ALL_HOTELS"
  };
};

export const fetchedAllHotels = hotels => {
  return {
    type: "FETCHED_ALL_HOTELS",
    payload: hotels
  };
};

export const deleteHotel = id => {
  return {
    type: "DELETE_HOTEL",
    id: id
  };
};
