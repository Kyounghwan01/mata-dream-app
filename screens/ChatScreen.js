import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  TextInput,
  YellowBox
} from 'react-native';
import { getSellerData } from '../api';
import io from "socket.io-client";
import Color from '../constants/Colors';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default class ChatScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessage : '',
      chatMessages : []
    }
  }
  componentDidMount(){
    this.socket = io.connect('http://localhost:3001');
    this.socket.on("chat message", msg => {
            this.setState({ chatMessages: [...this.state.chatMessages, msg] });
          });


    getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res }, function(){console.log(this.state.seller)});
    });
    // console.log(this.props.screenProps.orderData);
  }


  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});


  // render() {
  //   return (
  //     <View>
  //       <Text>ChatScreen</Text>
  //       <Button title="View 버튼" onPress={()=>this.props.navigation.navigate('View')}/>
  //       <Button title="리스트 버튼" onPress={()=>this.props.navigation.navigate('List')}/>
  //     </View>
  //   )
  // }
//}