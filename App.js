import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import React from 'react';

import AppContainer from './container/App';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;



// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDxaF_qq16RZKEBMiOPQooDeMw8cnbP8iM';

// // import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
// import axios from 'axios';

// const WEATHER_API_KEY = "566758fdfefa4f7755240c7c1f060b10";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       airData: null,
//       location: null,
//       marker : {},
//       marker2 : {},
//       errorMessage: null,
//       hasCameraPermission : null,
//       origin : {latitude : 37.5055751, longitude :127.057275},
//       des : {latitude : 37.5055751 + 0.305, longitude :127.057275 + 0.005}
//     };
//   }
//   componentDidMount() {
//     // const fetchAirData = async () => {
//     //   const res = await axios(
//     //     'http://openapi.seoul.go.kr:8088/584c626e6b646235323262656e6e56/json/RealtimeCityAir/1/5/%EB%8F%99%EB%B6%81%EA%B6%8C/%EC%84%B1%EB%B6%81%EA%B5%AC'
//     //   );
//     //   this.setState({ airData: res });
//     // };
//     //fetchAirData();
//     this._getCamera();
//       this._getLocationAsync();
//   }
//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'Permission to access location was denied',
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({ location : {latitude : location.coords.latitude, longitude : location.coords.longitude},
//     marker : {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       title: 'Foo Place',
//       subtitle: '1234 Foo Drive'
//     },
//     marker2 : {
//       latitude: location.coords.latitude + 0.305,
//       longitude: location.coords.longitude + 0.005,
//       title: 'second place',
//       subtitle: '1234 Foo Drive'
//     }
//    },function(){console.log(this.state.location.latitude)});

//     this._getWeather(location.coords.latitude, location.coords.longitude);
//   };

//   _getCamera = async () => {
//     let { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' },function(){console.log(this.state.hasCameraPermission)});
//   }

//   _getWeather = async(lat, long) => {
//     await fetch(
//       //literal 은 ''가 아니고 ``임!
//         `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${WEATHER_API_KEY}`
//       )
//       .then(response => response.json())
//       .then(json => {
//         this.setState({
//           temperature: json.main.temp,
//           name: json.weather[0].main,
//           isLoaded: true
//         });
//       });
//     }

//   render() {
//       let text = 'Waiting..';
//       if (this.state.errorMessage) {
//         text = this.state.errorMessage;
//       } else if (this.state.location) {
//         text = JSON.stringify(this.state.location);
//       }

//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         {this.state.airData ? (
//           <Text>{this.state.airData.data.RealtimeCityAir.row[0].IDEX_NM}</Text>
//         ) : (
//           <Text>awdawd</Text>
//         )}
//         <Text style={styles.paragraph}>{text}</Text>
//         {this.state.location ? (
//           <MapView
//             style={{ width: '50%', height: '50%' }}
//             initialRegion={{
//               latitude: this.state.location.latitude,
//               longitude: this.state.location.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421
//             }}
//           >
//             <Marker
//               draggable
//               coordinate={this.state.marker}
//               description="이곳은 마커가 오는 자리입니다"
//               onDragEnd={e => console.log(e)}
//             ></Marker>
//             <Marker
//               draggable
//               coordinate={this.state.marker2}
//               description="이곳은 마커가 오는 자리입니다"
//               onDragEnd={e => console.log(e)}
//             ></Marker>
//             <MapViewDirections
//               origin={this.state.origin}
//               destination={this.state.des}
//               apikey="AIzaSyBfirjmCbVnZwsiiECtI1bDjp0GB67lvqQ"
//               strokeWidth={3}
//               strokeColor="hotpink"
//             />
//           </MapView>
//         ) : (
//           <Text>위치 읽어오는 중...</Text>
//         )}
//         {
//           this.state.temperature ? <Text>온도 : {Math.floor(this.state.temperature - 273.15)}도 날씨 : {this.state.name} </Text> : <Text>"awfesgrdhtfjyhgsefawfsgdrhtfjy"</Text>
//         }
//         {/* 카메라 */}
//         {/* {
//           this.stats.hasCameraPermission ? <Text>카메라 사용 허용 </Text>: <Text>카메라 사용 허용을 안함</Text>
//         } */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
