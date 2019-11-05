import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native';

export default class ChatScreen extends Component {
  constructor(props){
    super(props);
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
