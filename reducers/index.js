import { PARK_LIST, SELECTED_PARK_DATA } from '../constants/ActionTypes';
// import {
//   COMPLETE_LOADING,
//   INIT_RECORDING,
//   START_RECORDING,
//   END_RECORDING,
//   LOADING_RECORD_SCREEN,
//   COMPLETE_LOADING_RECORD_SCREEN,
//   INIT_STATE
// } from '../constants/actionType';
// import {
//   BEFORE_RECORDING,
//   RECORDING,
//   AFTER_RECORDING
// } from '../constants/status';
// const initialState = {
//   isLoadingComplete: false,
//   isLoadingRecord: false,
//   recordingStatus: 'BEFORE_RECORDING'
// };

const initialState = {
  parkList: [],
  selectedParkData : {},
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case PARK_LIST:
      return Object.assign({ ...state },{parkList: action.list});
    case SELECTED_PARK_DATA:
    return Object.assign({ ...state },{selectedParkData: action.data});
    default:
      return state;
  }

  // switch (action.type) {
  // case COMPLETE_LOADING:
  //   return Object.assign({...state}, {
  //     isLoadingComplete: true
  //   });

  // case INIT_RECORDING:
  //   return Object.assign({...state}, {
  //     recordingStatus: BEFORE_RECORDING
  //   });

  // case START_RECORDING:
  //   return Object.assign({...state}, {
  //     recordingStatus: RECORDING
  //   });

  // case END_RECORDING:
  //   return Object.assign({...state}, {
  //     recordingStatus: AFTER_RECORDING
  //   });

  // case LOADING_RECORD_SCREEN:
  //   return Object.assign({...state}, {
  //     isLoadingRecord: true
  //   });

  // case COMPLETE_LOADING_RECORD_SCREEN:
  //   return Object.assign({...state}, {
  //     isLoadingRecord: false
  //   });

  // case INIT_STATE:
  //   return initialState;

  // default:
  //   return state;
  // }
};
