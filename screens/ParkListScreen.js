import React, { Component } from 'react'
import {getParkList} from '../api';
import { Icon, Button, Text, View } from 'native-base';

export default class ParkListScreen extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const getAsync = async () => {
      const res = await getParkList();
      this.props.screenProps.getParkList(res.data.parkList);
    }
    getAsync();
  }
  // componentDidUpdate(){
  //   console.log(this.props.screenProps);
  // }
  render() {
    return (
      <View>
        {
          this.props.screenProps.parkList ? <View>
            {this.props.screenProps.parkList.map((data, list) => {
              return <View key={list}>
              <Text>{data.address}</Text>
              <Text>{data.name}</Text>
              </View>
            })}
          </View> : null
        }
        <Button
          onPress={()=>{this.props.navigation.navigate('Main',{
            item : '이것은 파라미터이다'
          })}}
        />
      </View>
    )
  }
}
