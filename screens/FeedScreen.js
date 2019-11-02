import React, { Component } from 'react'
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { test } from '../api';

export default class FeedScreen extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props.navigation);
  }
  render() {
    return (
      <View>
        <Text>강리스트오는자리입니다</Text>
        <Button
          title="Press me"
          onPress={test}
        />
      </View>
    )
  }
}
