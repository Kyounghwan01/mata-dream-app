import React, { Component } from 'react'
import { View, Text, FlatList, Button } from 'react-native';

export default class OrderListScreen extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <Text>MyCourseScreen</Text>
        <Button title="리스트만드는 버튼" onPress={()=>this.props.navigation.navigate('Enroll')}/>
        <Button title="리스트 상세보는 버튼" onPress={()=>this.props.navigation.navigate('View')}/>
      </View>
    )
  }
}
