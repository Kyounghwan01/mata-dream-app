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
import ChatScreen from '../screens/ChatScreen';
import colorConstans from '../constants/Colors';

import loginLoadingScreen from '../screens/loginLoadingScreen';
import { loginWithFacebook } from '../api';

import ParkListScreen from '../screens/ParkListScreen';

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
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        headerLeft: (
          <BackButton
          goBackButtonClick={() => props.navigation.navigate('List')}
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
