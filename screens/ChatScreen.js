import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button
} from 'react-native';
import { getSellerData } from '../api';
import Color from '../constants/Colors';

export default class ChatScreen extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res }, function(){console.log(this.state.seller)});
    });
    console.log(this.props.screenProps.orderData);
  }
  render() {
    return (
      <View>
        <Text>ChatScreen</Text>
        <Button title="View 버튼" onPress={()=>this.props.navigation.navigate('View')}/>
        <Button title="리스트 버튼" onPress={()=>this.props.navigation.navigate('List')}/>
      </View>
    )
  }
}
