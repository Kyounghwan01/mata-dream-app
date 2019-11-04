import React, { Component } from 'react';
import { getParkList, getUserData } from '../api';
import {StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Icon, Button, Text, View } from 'native-base';

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
  }

  goToParkData = async (data) =>{
    await this.props.screenProps.getParkData(data);
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        {this.props.screenProps.parkList ? (
          <ScrollView >
            {this.props.screenProps.parkList.map((data, list) => {
              return (
                <TouchableOpacity key={list} style={{height:300, backgroundColor:'grey', margin:10}} onPress={()=>{this.goToParkData(data)}}>
                  <Text>{data.address}</Text>
                  <Text>{data.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
})
