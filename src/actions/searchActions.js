export const fetchingHotels = () => {
  return {
    type: "FETCHING_HOTELS"
  };
};

export const fetchedHotels = data => {
  return {
    type: "FETCHED_HOTELS",
    payload: data
  };
};

export const filterHotels = data => {
  return {
    type: "FILTER_HOTELS",
    payload: data
  };
};
