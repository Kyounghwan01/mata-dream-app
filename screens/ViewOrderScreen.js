import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native';

export default class ViewOrderScreen extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <Text>ViewOrderScreen</Text>
        <Button title="채팅뷰 버튼" onPress={()=>this.props.navigation.navigate('Chat')}/>
        <Button title="리스트로 버튼" onPress={()=>this.props.navigation.navigate('List')}/>
      </View>
    )
  }
}
