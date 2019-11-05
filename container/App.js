import React from 'react';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';
import { PARK_LIST, SELECTED_PARK_DATA, USER_LOCATION_DATA } from '../constants/ActionTypes';

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
  const { parkList, selectedParkData, userData } = state;
  return { parkList, selectedParkData, userData };
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
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
