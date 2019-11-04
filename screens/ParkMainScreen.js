import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { test } from '../api';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class ParkMainScreen extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props.screenProps);
  }
  render() {
    return (
      <View>
        <Text>강리스트오는자리입니다</Text>
        <Button
          title="Press me"
          // onPress={test}
        />
      </View>
    )
  }
}
