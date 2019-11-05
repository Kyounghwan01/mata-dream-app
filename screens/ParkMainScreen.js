import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getTempData, fetchAirData } from '../api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import colorConstans from '../constants/Colors';

/*
해야 하는거
1. 내위치 마커 (완료)
2. 미세먼지 온도(완료) 호출 api파일에 등록 (완료)
3. 이후 의뢰를 받으면 받은 redux props을 기반으로 마커 찍기
*/

export default class ParkMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }
  componentDidMount() {
    //this._getLocationAsync()
    //대기온도
    // getTempData(
    //   this.props.screenProps.selectedParkData.location.latitude,
    //   this.props.screenProps.selectedParkData.location.longitude
    // ).then(res => console.log(res));
    //console.log(this.props.screenProps.selectedParkData);

    //미세먼지
    //fetchAirData();
  }

  render() {
    return (
      <View>
        <Text>강리스트오는자리입니다</Text>
        {this.props.screenProps.userLocation ? (
          <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: '80%', height: '60%' }}
            region={{
              latitude: this.props.screenProps.selectedParkData.location
                .latitude,
              longitude: this.props.screenProps.selectedParkData.location
                .longitude,
              latitudeDelta: 0.22,
              longitudeDelta: 0.0121
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude: this.props.screenProps.userLocation.latitude,
                longitude: this.props.screenProps.userLocation.longitude
              }}
              description="내 위치"
              onDragEnd={e => console.log(e)}
            ></Marker>
            {
              this.props.screenProps.selectedParkData ? (<Marker
                draggable
                coordinate={{
                  latitude: this.props.screenProps.selectedParkData.location
                    .latitude,
                  longitude: this.props.screenProps.selectedParkData.location
                    .longitude
                }}
                description="한강공원 중심"
                onDragEnd={e => console.log(e)}
              ></Marker>) : null
            }
            
            {/* <Marker
              draggable
              coordinate={this.state.marker}
              description="이곳은 마커가 오는 자리입니다"
              onDragEnd={e => console.log(e)}
            ></Marker>
            <Marker
              draggable
              coordinate={this.state.marker2}
              description="이곳은 마커가 오는 자리입니다"
              onDragEnd={e => console.log(e)}
            ></Marker> */}
          </MapView>


          </View>
        ) : (
          <ActivityIndicator size="large" color={colorConstans.mainColor} />
        )}
      </View>
    );
  }
}
