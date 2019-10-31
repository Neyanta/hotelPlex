const initialState = {
  hotels: [],
  filteredHotels: [],
  fetching: false,
  fetched: false
};
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_HOTELS":
      return { ...state, fetching: true };

    case "FETCHED_HOTELS":
      return {
        ...state,
        fetching: false,
        hotels: action.payload,
        filteredHotels: action.payload,
        fetched: true
      };

    case "FILTER_HOTELS":
      return {
        ...state,
        filteredHotels: action.payload
      };

    default:
      return state;
  }
};
export default searchReducer;
