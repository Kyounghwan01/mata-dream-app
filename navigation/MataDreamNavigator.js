import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';


import ParkMainScreen from '../screens/ParkMainScreen';
import OrderListScreen from '../screens/OrderListScreen';
import EnrollOrderScreen from '../screens/EnrollOrderScreen';
import ViewOrderScreen from '../screens/ViewOrderScreen';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';

import { logoutAsync } from '../api';

import colorConstans from '../constants/Colors';

const LogoutHeader = props => {
  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const orderList = createStackNavigator({
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
        headerLeft: (
          <BackButton
          goBackButtonClick={() => props.navigation.navigate('List')}
          />
        ),
        title: `MATA-DREAM 등록`,
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
        headerLeft: (
          <BackButton
          goBackButtonClick={() => props.navigation.navigate('List')}
          />
        ),
        title: 'View-Order',
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
    List: orderList,
    Enroll: EnrollOrder,
    View: ViewOrder
  },
  {
    initialRouteName: 'List'
  }
);

export default createAppContainer(MataDreamNavigator);
