import React from "react";
import { Alert } from "react-native";
import io from "socket.io-client";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import AcceptButton from "../components/AcceptButton";
import MyPage from "../components/MyPage";
import ChatScreen from "../screens/ChatScreen";
import ParkListScreen from "../screens/ParkListScreen";
import LoginScreen from "../screens/LoginScreen";
import MyPageScreen from "../screens/MyPageScreen";
import colorConstans from "../constants/Colors";

import getEnvVars from "../environment";
import {
  loginWithFacebook,
  logoutAsync,
  changeExchangeStatus,
  deleteOrderList,
  getUserData
} from "../api";

const { apiUrl } = getEnvVars();
const socket = io.connect(apiUrl);

const LoginContainer = props => {
  const facebookLogin = async () => {
    try {
      const user = await loginWithFacebook();
      const point = await getUserData();
      Alert.alert(
        `Hi ${user.name}! `,
        `가용한 포인트는 ${point.point}pt 입니다!`
      );
      props.navigation.navigate("ParkList");
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };
  return <LoginScreen onLoginButtonPress={facebookLogin} />;
};

const LogoutHeader = props => {
  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate("Login");
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const ParkListStack = createStackNavigator({
  ParkList: {
    screen: ParkListScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        headerLeft: (
          <MyPage goToMypage={() => props.navigation.navigate("MyPage")} />
        ),
        title: "Park-List",
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const ChatNavigator = createStackNavigator({
  MyCourse: {
    screen: ChatScreen,
    navigationOptions: props => {
      return {
        headerRight: (
          <AcceptButton
            exchange={() => {
              socket.emit("sendAlert", {
                userId: props.screenProps.userData.id,
                roomId: props.screenProps.orderData._id
              });
            }}
          />
        ),
        headerLeft: (
          <BackButton
            goBackButtonClick={async () => {
              if (
                props.screenProps.orderData.seller ===
                props.screenProps.userData.id
              ) {
                deleteOrderList(
                  props.screenProps.userData.id,
                  props.screenProps.selectedParkData._id
                );
              }

              socket.emit("LEAVE", { roomId: props.screenProps.orderData._id });
              await changeExchangeStatus(
                "false",
                props.screenProps.orderData._id
              );
              // await props.screenProps.resetAcceptArray();
              props.navigation.navigate("List");
            }}
          />
        ),
        title: "Chat-View",
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const MyPageContainer = createStackNavigator({
  MyPage: {
    screen: MyPageScreen,
    navigationOptions: props => {
      return {
        headerLeft: (
          <BackButton
            goBackButtonClick={() => {
              props.navigation.navigate("ParkList");
            }}
          />
        ),
        title: "My-Page",
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const AppNavigator = createSwitchNavigator(
  {
    Login: LoginContainer,
    ParkList: ParkListStack,
    Main: MainTabNavigator,
    ChatScreen: ChatNavigator,
    MyPage: MyPageContainer
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
