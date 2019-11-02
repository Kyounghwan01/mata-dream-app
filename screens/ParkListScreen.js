import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {getParkList} from '../api';

export default class ParkListScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      parkList : null
    }
  }
  componentDidMount(){
    const getAsync = async () => {
      const res = await getParkList();
      this.setState({parkList : res.data.parkList}, function(){console.log(this.state.parkList)});
    }
    getAsync();
  }
  render() {
    return (
      <View>
        {
          this.state.parkList ? <View>
            {this.state.parkList.map((data, list) => {
              return <View key={list}>
              <Text>{data.address}</Text>
              <Text>{data.name}</Text>
              </View>
            })}
          </View> : null
        }
      </View>
    )
  }
}
