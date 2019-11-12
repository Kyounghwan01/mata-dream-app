import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  YellowBox,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';
import io from 'socket.io-client';
import { getSellerData, changeExchangeStatus } from '../api';
import Color from '../constants/Colors';
import getEnvVars from '../environment';
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
      socket: io.connect(apiUrl),
      exchangeState: true
    };
  }
  async componentDidMount() {
    await getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res });
    });
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   console.log("qweqwe");
    //   this.connectSocket();
    // });
    // this.focusListener();
    this.connectSocket();
    //함수?
    //대화불러오는 작업
    //룸 들어오는 작업

    this.blurListener = this.props.navigation.addListener('didBlur', () => {
      this.state.socket.emit('LEAVE', {
        roomId: this.props.screenProps.orderData._id
      });
    });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
    this.blurListener.remove();
    this.state.socket.disconnect();
  }

  connectSocket = () => {
    if (this.state.seller._id && this.state.exchangeState) {
      this.state.socket.emit('JOIN', {
        roomId: this.props.screenProps.orderData._id
      });
      //받기
      this.state.socket.on('receiveMessage', msg => {
        this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      });
      this.state.socket.on('receiveAccept', async userId => {
        await this.props.screenProps.getAcceptArray(userId);
        //상대방을 받았어
        //length 2면 교환 시작
        console.log(this.props.screenProps.acceptArray);
      });
      this.state.socket.on('receiveAlert', userId => {
        this.setState({ exchangeState: false });
        Alert.alert(
          '교환 하시겠습니까?',
          `포인트는 ${this.props.screenProps.orderData.point}pt 입니다.`,
          [
            {
              text: '취소 및 나가기',
              onPress: async () => {
                this.state.socket.emit('LEAVE', {
                  roomId: this.props.screenProps.orderData._id
                });
                //소켓 삭제 방 나가기
                await this.props.screenProps.resetAcceptArray();
                await changeExchangeStatus(
                  'false',
                  this.props.screenProps.orderData._id
                );
                this.props.navigation.navigate('List');
              },
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: async () => {
                console.log(this.props.screenProps.userData.id);
                this.state.socket.emit('sendAccept', {
                  userId: this.props.screenProps.userData.id,
                  roomId: this.props.screenProps.orderData._id
                });
                await this.props.screenProps.getAcceptArray(
                  this.props.screenProps.userData.id
                );
                if (this.props.screenProps.acceptArray.length === 2) {
                  Alert.alert('교환 성공');
                } else {
                  Alert.alert('상대방 수락 여부 대기');
                }
                // console.log(this.props.screenProps.acceptArray);
              }
            }
          ],
          { cancelable: false }
        );
      });
    }
  };

  submitChatMessage() {
    //보내기
    this.state.socket.emit('sendMessage', {
      message: this.state.chatMessage,
      roomId: this.props.screenProps.orderData._id
    });
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
