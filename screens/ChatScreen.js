import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  YellowBox,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  View,
  ScrollView
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

  async componentDidUpdate() {
    const { screenProps } = this.props;
    if (screenProps.acceptArray.length === 2) {
      const buyer = screenProps.acceptArray.filter(
        id => id !== screenProps.orderData.seller
      );
      exchangeData = {
        seller: screenProps.orderData.seller,
        buyer: buyer[0],
        point: Number(screenProps.orderData.point),
        park: screenProps.orderData.park
      };
      changeExchangeStatus("true", screenProps.orderData._id);
      screenProps.resetAcceptArray([]);
      await changePoint(exchangeData);
      deleteOrderList(
        screenProps.orderData.seller,
        screenProps.orderData.park
      ).then(this.props.navigation.navigate("List"));
      Alert.alert("교환 성공");
    }
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

      socket.on("receiveMessage", msg => {
        this.setState({
          chatMessages: [
            ...this.state.chatMessages,
            { user: msg[1], message: msg[0] }
          ]
        });
      });
      socket.on("receiveAccept", async userId => {
        await screenProps.getAcceptArray(userId);
      });
      socket.on("CANCEL_EVENT", () => {
        screenProps.resetAcceptArray([]);
        Alert.alert("상대방이 교환 거부하셨습니다.");
      });
      socket.on("HOSTOUT_YOUOUT", () => {
        this.state.socket.emit("LEAVE", {
          roomId: screenProps.orderData._id
        });
        screenProps.resetAcceptArray([]);
        Alert.alert('판매자가 나갔습니다.');
        this.props.navigation.navigate("List");
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
                screenProps.resetAcceptArray([]);
              },
              style: "cancel"
            },
            {
              text: "OK",
              onPress: async () => {
                socket.emit("sendAccept", {
                  userId: screenProps.userData.id,
                  roomId: screenProps.orderData._id
                });
                await screenProps.getAcceptArray([screenProps.userData.id]);
                if (screenProps.acceptArray.length === 2) {
                  deleteOrderList(
                    screenProps.orderData.seller,
                    screenProps.orderData.park
                  ).then(this.props.navigation.navigate("List"));
                  Alert.alert("교환 성공");
                } else {
                  this.setState({
                    chatMessages: [
                      ...this.state.chatMessages,
                      {
                        user: screenProps.userData.id,
                        message: "상대방 수락 여부 대기중 입니다..."
                      }
                    ]
                  });
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
    this.state.socket.emit("sendMessage", {
      message: this.state.chatMessage,
      roomId: this.props.screenProps.orderData._id,
      userId: this.props.screenProps.userData.id
    });
    this.setState({ chatMessage: "" });
  };

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <View key={index}>
        {chatMessage.user === this.props.screenProps.userData.id ? (
          <View style={styles.myChatConatiner}>
            <View style={styles.myChat}>
              <Text style={styles.myChatDesc}>{chatMessage.message}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.yourConatiner}>
            <View style={styles.yourChat}>
              <Text style={styles.yourChatDesc}>{chatMessage.message}</Text>
            </View>
          </View>
        )}
      </View>
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
        <SafeAreaView>
          <ScrollView
            style={{ height: "95%" }}
            ref={ref=>this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({animated:true});
            }}
          >{chatMessages}</ScrollView>
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              bottom: 0,
              width: "100%"
            }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  myChatConatiner: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end"
  },
  myChat: {
    backgroundColor: Color.mainColor,
    margin: 10,
    width: "45%",
    display: "flex",
    borderRadius: 10
  },
  myChatDesc: {
    padding: 13
  },
  yourConatiner: {
    width: "100%",
    display: "flex"
  },
  yourChat: {
    backgroundColor: "grey",
    margin: 10,
    width: "45%",
    display: "flex",
    borderRadius: 10
  },
  yourChatDesc: {
    padding: 13
  }
});
