const initialState = {
  hotel: ""
};

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIEW_HOTEL":
      return {
        ...state,
        hotel: action.payload
      };
    default:
      return state;
  }
};

export default hotelReducer;
