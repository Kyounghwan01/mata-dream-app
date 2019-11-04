import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import ParkMainScreen from '../screens/ParkMainScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import LogoutButton from '../components/LogoutButton';

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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-list-box" />
  )
};

const myCourseStack = createStackNavigator({
  MyCourse: {
    screen: MyCourseScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: 'myCourse',
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor
        }
      };
    }
  },
  CourseDetail: {
    screen: CourseDetailScreen,
    navigationOptions: {
      title: 'My Course Details',
      headerTintColor: colorConstans.headerTextColor,
      headerStyle: {
        backgroundColor: colorConstans.mainColor
      }
    }
  }
});

myCourseStack.navigationOptions = {
  tabBarLabel: 'myCourse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-archive'} />
  )
};


const goToParkList = (props) => {
  return props.navigation.navigate('ParkList');
}
goToParkList.navigationOptions = {
  tabBarLabel: 'ParkList',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-archive'} />
  )
};

const MainTabNavigator = createBottomTabNavigator(
  {
    ParkMainPageStack,
    myCourseStack,
    goToParkList
  },
  {
    initialRouteName: 'ParkMainPageStack'
  }
);

export default createAppContainer(MainTabNavigator);
