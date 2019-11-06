import React from 'react';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';
import { PARK_LIST, SELECTED_PARK_DATA, USER_LOCATION_DATA, PARK_ORDER_LIST } from '../constants/ActionTypes';

// import {
//   COMPLETE_LOADING,
//   LOADING_RECORD_SCREEN,
//   COMPLETE_LOADING_RECORD_SCREEN,
//   START_RECORDING,
//   END_RECORDING,
//   INIT_RECORDING,
//   INIT_STATE
// } from '../constants/actionType';

const mapStateToProps = state => {
  const { parkList, selectedParkData, userData, parkOrderList } = state;
  return { parkList, selectedParkData, userData, parkOrderList };
  //const { isLoadingComplete, recordingStatus, isLoadingRecord } = state;

  // return {
  //   isLoadingComplete,
  //   recordingStatus,
  //   isLoadingRecord
  // };
};

const mapDispatchToProps = dispatch => ({
  getParkList: list => dispatch({ type: PARK_LIST, list }),
  getParkData: data => dispatch({ type: SELECTED_PARK_DATA, data }),
  getUserData : data => dispatch({type : USER_LOCATION_DATA, data}),
  getParkOrderList : data => dispatch({type : PARK_ORDER_LIST, data}),
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
