import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import ParkMainScreen from "../screens/ParkMainScreen";
import LogoutButton from "../components/LogoutButton";
import MataDreamNavigator from "../navigation/MataDreamNavigator";

import { logoutAsync } from "../api";

import TabBarIcon from "../components/TabBarIcon";
import TabBarMaterial from "../components/TabBarMaterial";
import colorConstans from "../constants/Colors";

const LogoutHeader = props => {
  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate("Login");
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const ParkMainPageStack = createStackNavigator({
  ParkMain: {
    screen: ParkMainScreen,
    navigationOptions: props => {
      return {
        headerRight: <LogoutHeader navigation={props.navigation} />,
        title: "도움말",
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
  tabBarLabel: "도움말",
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: "grey"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-help-circle-outline" />
  )
};

MataDreamNavigator.navigationOptions = {
  tabBarLabel: "mataDream",
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: "grey"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarMaterial focused={focused} name={"place"} />
  )
};

const goToParkList = props => {
  return props.navigation.navigate("ParkList");
};
goToParkList.navigationOptions = {
  tabBarLabel: "ParkList",
  tabBarOptions: {
    activeTintColor: colorConstans.mainColor,
    inactiveTintColor: "grey"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-list"} />
  )
};

const MainTabNavigator = createBottomTabNavigator(
  {
    ParkMainPageStack,
    MataDreamNavigator,
    goToParkList
  },
  {
    initialRouteName: "MataDreamNavigator"
  }
);

export default createAppContainer(MainTabNavigator);
