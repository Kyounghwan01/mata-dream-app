import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  TextInput,
  YellowBox,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { getSellerData } from '../api';
import io from 'socket.io-client';
import Color from '../constants/Colors';
import getEnvVars from '../environment';
import { CONNECT_SOCKET } from '../constants/ActionTypes';
const { apiUrl } = getEnvVars();

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
      socket: io.connect(apiUrl)
    };
  }
  async componentDidMount() {
    //didfoucus 함수

    await getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res });
    });
    console.log(this.props.screenProps);
    this.connectSocket();
  }
  componentWillUnmount() {
    this.connectSocket();
  }

  connectSocket = () => {
    console.log('qweqwe', this.state.seller._id);
    if (this.state.seller._id) {
      this.state.socket.emit('JOIN', { roomId: this.state.seller._id });
      //받기
      this.state.socket.on('receiveMessage', msg => {
        this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      });
    }
  };

  submitChatMessage() {
    //보내기
    this.state.socket.emit('sendMessage', {message : this.state.chatMessage, roomId : this.state.seller._id});
    this.setState({ chatMessage: '' });
  }

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <Text key={index}>{chatMessage}</Text>
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <SafeAreaView style={styles.container} style={{ flex: 1 }}>
          <TextInput
            style={{
              height: 40,
              borderWidth: 2,
              position: 'absolute',
              bottom: 100,
              width: '100%'
            }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
          {chatMessages}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
