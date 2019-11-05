import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import ParkMainScreen from '../screens/ParkMainScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import OrderListScreen from '../screens/OrderListScreen';
import LogoutButton from '../components/LogoutButton';
import MataDreamNavigator from '../navigation/MataDreamNavigator';

import { logoutAsync } from '../api';

import TabBarIcon from '../components/TabBarIcon';
import colorConstans from '../constants/Colors';

const LogoutHeader = props => {
  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const ParkMainPageStack = createStackNavigator({
  ParkMain: {
    screen: ParkMainScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: `${props.screenProps.selectedParkData.name}`,
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  }
});

//밑에오는 이모티콘 및 설명
ParkMainPageStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: 'grey',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-home" />
  )
};

// const mataDreamStack = createStackNavigator({
//   MyCourse: {
//     screen: OrderListScreen,
//     navigationOptions: props => {
//       return {
//         headerRight: <LogoutHeader navigation={props.navigation} />,
//         title: 'Mata-Dream',
//         headerTintColor: colorConstans.headerTextColor,
//         headerStyle: {
//           backgroundColor: colorConstans.mainColor
//         }
//       };
//     }
//   }
// });

// mataDreamStack.navigationOptions = {
//   tabBarLabel: 'mataDream',
//   tabBarOptions: {
//     activeTintColor: colorConstans.mainColor,
//     inactiveTintColor: 'grey',
//   },
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={'ios-list-box'} />
//   )
// };

MataDreamNavigator.navigationOptions = {
  tabBarLabel: 'mataDream',
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: 'grey',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-list-box'} />
  )
};

const goToParkList = (props) => {
  return props.navigation.navigate('ParkList');
}
goToParkList.navigationOptions = {
  tabBarLabel: 'ParkList',
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: 'grey',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-list'} />
  )
};

const MainTabNavigator = createBottomTabNavigator(
  {
    ParkMainPageStack,
    MataDreamNavigator,
    goToParkList
  },
  {
    initialRouteName: 'ParkMainPageStack'
  }
);

export default createAppContainer(MainTabNavigator);
