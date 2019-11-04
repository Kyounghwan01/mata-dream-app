import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ParkListScreen from '../screens/ParkListScreen';
import LogoutButton from '../components/LogoutButton';
import { logoutAsync } from '../api';

import colorConstans from '../constants/Colors';

const LogoutHeader = props => {

  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const ParkListStack = createStackNavigator(
  {
    ParkList : {
      screen : ParkListScreen,
      navigationOptions : props => {
        return {
          headerRight: <LogoutHeader navigation={props.navigation} />,
          title: 'Park-List',
          headerTintColor: colorConstans.headerTextColor,
          headerStyle: {
            backgroundColor: colorConstans.mainColor,
          },
        }
      }
    }
  }
)


export default createAppContainer(ParkListStack);