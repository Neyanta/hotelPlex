const initialState = {
  hotels: [],
  fetching: false,
  fetched: false
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_ALL_HOTELS":
      return {
        ...state,
        fetching: true
      };
    case "FETCHED_ALL_HOTELS":
      return {
        ...state,
        hotels: action.payload,
        fetched: true,
        fetching: false
      };
    case "DELETE_HOTEL":
      return {
        ...state,
        hotels: state.hotels.filter(hotel => hotel._id !== action.id)
      };
    default:
      return state;
  }
};

export default adminReducer;
