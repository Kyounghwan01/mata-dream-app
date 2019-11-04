import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { test } from '../api';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class ParkMainScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.screenProps.selectedParkData.location.latitude);
    console.log(this.props.screenProps.selectedParkData.location.longitude);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState(
      {
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        marker: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          title: 'Foo Place',
          subtitle: '1234 Foo Drive'
        },
        marker2: {
          latitude: location.coords.latitude + 0.305,
          longitude: location.coords.longitude + 0.005,
          title: 'second place',
          subtitle: '1234 Foo Drive'
        }
      },
      function() {
        console.log(this.state.location.latitude);
      }
    );

    this._getWeather(location.coords.latitude, location.coords.longitude);
  };

  render() {
    return (
      <View>
        <Text>강리스트오는자리입니다</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: '80%', height: '60%' }}
          region={{
            latitude: this.props.screenProps.selectedParkData.location.latitude,
            longitude: this.props.screenProps.selectedParkData.location
              .longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: this.props.screenProps.selectedParkData.location
                .latitude,
              longitude: this.props.screenProps.selectedParkData.location
                .longitude
            }}
            description="한강공원 중심"
            onDragEnd={e => console.log(e)}
          ></Marker>
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
    );
  }
}
