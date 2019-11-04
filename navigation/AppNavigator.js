import React from 'react';
import { Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ParkListNavigator from './ParkListNavigotor';
import LoginScreen from '../screens/LoginScreen';

import loginLoadingScreen from '../screens/loginLoadingScreen';
import { loginWithFacebook } from '../api';

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

const AppNavigator = createSwitchNavigator(
  {
    //loginLoading: loginLoadingScreen,
    Login: LoginContainer,
    ParkList: ParkListNavigator,
    Main: MainTabNavigator
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(AppNavigator);
