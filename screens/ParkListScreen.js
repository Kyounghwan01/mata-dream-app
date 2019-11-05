import React, { Component } from 'react';
import { getParkList, getUserData } from '../api';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Icon, Button, Text, View } from 'native-base';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import colorConstans from '../constants/Colors';

export default class ParkListScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // getUserData();
    const getAsync = async () => {
      const res = await getParkList();
      this.props.screenProps.getParkList(res.data.parkList);

    };
    getAsync();
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.screenProps.getUserLocation({latitude : location.coords.latitude, longitude : location.coords.longitude});

    // this._getWeather(location.coords.latitude, location.coords.longitude);
  };

  goToParkData = async data => {
    await this.props.screenProps.getParkData(data);
    this.props.navigation.navigate('Main');
  };

  render() {
    const qwe = 'background'
    return (
      <SafeAreaView>
        {this.props.screenProps.parkList ? (
          <ScrollView>
            {this.props.screenProps.parkList.map((data, list) => {
              var imageAddress = [
                require('../assets/잠실한강공원.jpg'),
                require('../assets/뚝섬한강공원.jpg'),
                require('../assets/이촌한강공원.jpg'),
                require('../assets/반포한강공원.jpg'),
                require('../assets/qwe.jpg')
            ]
              return (
                <TouchableOpacity
                  key={list}
                  style={styles.touchable}
                  onPress={() => {
                    this.goToParkData(data);
                  }}
                >
                  <Image
                    source={imageAddress[list]}
                    style={styles.image}
                  />
                  <View style={styles.view}>
                    <Text style={styles.ParkContainerText}>{data.name}</Text>
                    <Text style={styles.ParkContainerAdd}>{data.address}</Text>
                  </View>
                </TouchableOpacity>
                // <TouchableOpacity key={list} style={styles.ParkContainer} onPress={()=>{this.goToParkData(data)}}>
                //   <Text style={styles.ParkContainerText}>{data.name}</Text>
                //   <Text style={styles.ParkContainerAdd}>{data.address}</Text>
                // </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute'
  },
  image: {
    width: 350,
    height: 150,
    margin: 10,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  ParkContainer: {
    display: 'flex',
    // justifyContent: 'center',
    // height: 200,
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 30
  },
  ParkContainerAdd: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white'
  },
  ParkContainerText: {
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
