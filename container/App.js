import React from "react";
import { connect } from "react-redux";

import AppNavigator from "../navigation/AppNavigator";
import {
  PARK_LIST,
  SELECTED_PARK_DATA,
  USER_LOCATION_DATA,
  PARK_ORDER_LIST,
  ORDER_DATA,
  ACCEPT_ARRAY,
  ACCEPT_ARRAY_RESET
} from "../constants/ActionTypes";

const mapStateToProps = state => {
  const {
    parkList,
    selectedParkData,
    userData,
    parkOrderList,
    orderData,
    acceptArray
  } = state;
  return {
    parkList,
    selectedParkData,
    userData,
    parkOrderList,
    orderData,
    acceptArray
  };
};

const mapDispatchToProps = dispatch => ({
  getParkList: list => dispatch({ type: PARK_LIST, list }),
  getParkData: data => dispatch({ type: SELECTED_PARK_DATA, data }),
  getUserData: data => dispatch({ type: USER_LOCATION_DATA, data }),
  getParkOrderList: data => dispatch({ type: PARK_ORDER_LIST, data }),
  getOrderData: data => dispatch({ type: ORDER_DATA, data }),
  getAcceptArray: data => dispatch({ type: ACCEPT_ARRAY, data }),
  resetAcceptArray: () => dispatch({ type: ACCEPT_ARRAY_RESET })
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
