import React from "react";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, configure } from "enzyme";
import { SafeAreaView, TouchableOpacity } from "react-native";

import ParkListScreen from "../ParkListScreen";

describe("render login screen", () => {
  const onLoginButtonPress = jest.fn();

  const screenProps = {
    parkList: [
      {
        _id: "5dbd01f2e40c4d1680b370c6",
        address: "서울특별시 송파구 잠실 2동 한가롬로 65",
        location: {
          latitude: 37.5179635,
          longitude: 127.0797443
        },
        name: "잠실한강공원"
      }
    ],
    getParkData: jest.fn()
  };

  const navigation = {
    navigate: jest.fn()
  };

  const wrapper = shallow(
    <ParkListScreen
      navigation={navigation}
      screenProps={screenProps}
      onLoginButtonPress={onLoginButtonPress}
    />
  );
  test("press login button", async () => {
    expect(wrapper.find(SafeAreaView).length).toBe(1);
    wrapper.find(TouchableOpacity).simulate("press");
    await expect(screenProps.getParkData).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith("Main");
  });
});
