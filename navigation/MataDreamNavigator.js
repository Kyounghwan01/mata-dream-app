import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import ParkMainScreen from '../screens/ParkMainScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import OrderListScreen from '../screens/OrderListScreen';
import EnrollOrderScreen from '../screens/EnrollOrderScreen';
import ViewOrderScreen from '../screens/ViewOrderScreen';
import ChatScreen from '../screens/ChatScreen';
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

const MataDream = createStackNavigator({
  MyCourse: {
    screen: OrderListScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'Order-List',
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const EnrollOrder = createStackNavigator({
  MyCourse: {
    screen: EnrollOrderScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'Enroll-Order',
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const ViewOrder = createStackNavigator({
  MyCourse: {
    screen: ViewOrderScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'View-Order',
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const Chat = createStackNavigator({
  MyCourse: {
    screen: ChatScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'Chat-View',
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

const MataDreamNavigator = createSwitchNavigator(
  {
    List: MataDream,
    Enroll: EnrollOrder,
    View: ViewOrder,
    Chat : Chat
  },
  {
    initialRouteName: 'Enroll'
  }
);

export default createAppContainer(MataDreamNavigator);
