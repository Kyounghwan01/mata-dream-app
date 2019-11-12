import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  YellowBox,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
} from "react-native";
import io from "socket.io-client";
import {
  getSellerData,
  changeExchangeStatus,
  changePoint,
  deleteOrderList
} from "../api";
import Color from "../constants/Colors";
import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      socket: io.connect(apiUrl)
    };
  }
  async componentDidMount() {
    await getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res });
    });
    this.connectSocket();

    this.blurListener = this.props.navigation.addListener("didBlur", () => {
      this.state.socket.emit("LEAVE", {
        roomId: this.props.screenProps.orderData._id
      });
    });
  }

  componentWillUnmount() {
    this.blurListener.remove();
    this.state.socket.disconnect();
  }

  connectSocket = () => {
    const { socket } = this.state;
    const { screenProps } = this.props;
    if (this.state.seller._id) {
      socket.emit("JOIN", {
        roomId: screenProps.orderData._id
      });
      //받기
      socket.on("receiveMessage", msg => {
        this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      });
      socket.on("receiveAccept", async userId => {
        await screenProps.getAcceptArray(userId);
        if (screenProps.acceptArray.length === 2) {
          console.log("seller", screenProps.orderData.seller);
          const buyer = screenProps.acceptArray.filter(
            id => id !== screenProps.orderData.seller
          );
          console.log("buyer", buyer);

          exchangeData = {
            seller: screenProps.orderData.seller,
            buyer: buyer[0],
            point: Number(screenProps.orderData.point),
            park: screenProps.orderData.park
          };
          changeExchangeStatus("true", screenProps.orderData._id);
          await changePoint(exchangeData);
          deleteOrderList(
            screenProps.orderData.seller,
            screenProps.orderData.park
          ).then(this.props.navigation.navigate("List"));
          Alert.alert("교환 성공");
        }
      });
      socket.on("CANCEL_EVENT", () => {
        screenProps.resetAcceptArray();
        Alert.alert("상대방이 교환 거부하셨습니다.");
      });
      socket.on("receiveAlert", () => {
        Alert.alert(
          "교환 하시겠습니까?",
          `포인트는 ${screenProps.orderData.point}pt 입니다.`,
          [
            {
              text: "취소",
              onPress: async () => {
                socket.emit("CANCEL", { roomId: screenProps.orderData._id });
                screenProps.resetAcceptArray();
              },
              style: "cancel"
            },
            {
              text: "OK",
              onPress: async () => {
                console.log(screenProps.userData.id);
                console.log(screenProps.acceptArray);
                socket.emit("sendAccept", {
                  userId: screenProps.userData.id,
                  roomId: screenProps.orderData._id
                });
                await screenProps.getAcceptArray(screenProps.userData.id);
                console.log(screenProps.acceptArray);
                if (screenProps.acceptArray.length === 2) {
                  deleteOrderList(
                    screenProps.orderData.seller,
                    screenProps.orderData.park
                  ).then(this.props.navigation.navigate("List"));
                  Alert.alert("교환 성공");
                } else {
                  this.setState({ chatMessages: [...this.state.chatMessages, '상대방 수락 여부 대기중 입니다...'] });
                }
              }
            }
          ],
          { cancelable: false }
        );
      });
    }
  };

  submitChatMessage = () => {
    //보내기
    this.state.socket.emit("sendMessage", {
      message: this.state.chatMessage,
      roomId: this.props.screenProps.orderData._id
    });
    this.setState({ chatMessage: "" });
  };

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <Text key={index}>{chatMessage}</Text>
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <SafeAreaView style={styles.container} style={{ flex: 1 }}>
          <TextInput
            style={{
              height: 40,
              borderWidth: 2,
              position: "absolute",
              bottom: 100,
              width: "100%"
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
    backgroundColor: "#F5FCFF"
  }
});
