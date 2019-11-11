import {
  PARK_LIST,
  SELECTED_PARK_DATA,
  USER_LOCATION_DATA,
  PARK_ORDER_LIST,
  ORDER_DATA
} from '../constants/ActionTypes';

const initialState = {
  parkList: [],
  selectedParkData: {},
  userData: {},
  parkOrderList : [],
  orderData : {},
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
    default:
      return state;
  }
};
