import {
  PARK_LIST,
  SELECTED_PARK_DATA,
  USER_LOCATION_DATA,
  PARK_ORDER_LIST,
  ORDER_DATA,
  ACCEPT_ARRAY
} from '../constants/ActionTypes';

const initialState = {
  parkList: [],
  selectedParkData: {},
  userData: {},
  parkOrderList : [],
  orderData : {},
  acceptArray : [],
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case PARK_LIST:
      return Object.assign({ ...state }, { parkList: action.list });
    case SELECTED_PARK_DATA:
      return Object.assign({ ...state }, { selectedParkData: action.data });
    case USER_LOCATION_DATA:
      return Object.assign({ ...state }, { userData: action.data });
    case PARK_ORDER_LIST:
      return Object.assign({ ...state }, { parkOrderList: action.data });
    case ORDER_DATA:
      return Object.assign({ ...state }, { orderData: action.data });
    case ACCEPT_ARRAY:
      console.log(action);
      return Object.assign({ ...state }, { acceptArray: action.data });
    default:
      return state;
  }
};
