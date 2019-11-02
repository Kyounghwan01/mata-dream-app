import React from 'react';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';
import {PARK_LIST} from '../constants/ActionTypes';

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
  const {parkList} = state;
  return {parkList};
  //const { isLoadingComplete, recordingStatus, isLoadingRecord } = state;

  // return {
  //   isLoadingComplete,
  //   recordingStatus,
  //   isLoadingRecord
  // };
};

const mapDispatchToProps = dispatch => ({
  getParkList : () => dispatch({type : PARK_LIST})

  // completeAppLoading: () => dispatch({ type: COMPLETE_LOADING }),
  // onLoadingRecordScreen: () => dispatch({ type: LOADING_RECORD_SCREEN }),
  // onLoadingRecordScreenComplete: () => dispatch({ type: COMPLETE_LOADING_RECORD_SCREEN }),
  // onRecordStart: () => dispatch({ type: START_RECORDING }),
  // onRecordEnd: () => dispatch({ type: END_RECORDING }),
  // onRecordInitialize: () => dispatch({ type: INIT_RECORDING }),
  // initializeState: () => dispatch({ type: INIT_STATE })
});

const AppContainer = props => {
  return <AppNavigator screenProps={props}/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
