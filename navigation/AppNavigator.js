import React from 'react';
import { Alert } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';
import AcceptButton from '../components/AcceptButton';
import ChatScreen from '../screens/ChatScreen';
import colorConstans from '../constants/Colors';

import loginLoadingScreen from '../screens/loginLoadingScreen';
import { loginWithFacebook, logoutAsync, changeExchangeStatus } from '../api';

import ParkListScreen from '../screens/ParkListScreen';


import io from 'socket.io-client';
import getEnvVars from '../environment';
const {apiUrl} = getEnvVars();






const LoginContainer = props => {
  const facebookLogin = async () => {
    try {
      const user = await loginWithFacebook();
      Alert.alert('Logged in!', `Hi ${user.name}!`);
      props.navigation.navigate('ParkList');
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };
  return <LoginScreen onLoginButtonPress={facebookLogin} />;
};

const LogoutHeader = props => {
  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const ParkListStack = createStackNavigator({
  ParkList: {
    screen: ParkListScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'Park-List',
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
      //console.log("asdasd",props.screenProps.orderData);
      // {
      //   "__v": 0,
      //   "_id": "5dc413e766741a7b15a292df",
      //   "complete": "false",
      //   "image_url": "https://nkhvc.s3.ap-northeast-2.amazonaws.com/A952C7FF-D12B-478E-AE2E-3F649BB43DE6.jpg",
      //   "location": Object {
      //     "latitude": "37.51855245987521",
      //     "longitude": "127.07506947219372",
      //   },
      //   "park": "5dbd01f2e40c4d1680b370c6",
      //   "point": 300,
      //   "seller": "5dc413c766741a7b15a292de",
      // }
      
      return {
        headerRight: <AcceptButton exchange={() => {
          const socket = io.connect(apiUrl);
          socket.emit('sendAlert', {userId : '여기는 보내는사람 id가 오는곳', roomId : props.screenProps.orderData._id})
          console.log('교환');

          //상대에게 교환 수락 메세지


          //교환 완료 받으면


          //상대에게 포인트 이동
        }} />,
        headerLeft: (
          <BackButton
          goBackButtonClick={() => {
            changeExchangeStatus('false', props.screenProps.orderData._id);
            props.navigation.navigate('List');
          }}
          />
        ),
        title: 'Chat-View',
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
    //loginLoading: loginLoadingScreen,
    Login: LoginContainer,
    ParkList: ParkListStack,
    Main: MainTabNavigator,
    ChatScreen: ChatNavigator
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(AppNavigator);
