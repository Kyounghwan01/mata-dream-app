import React from "react";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, configure } from "enzyme";
import { View, Text } from "react-native";
import { Button } from "native-base";

import LoginScreen from "../LoginScreen";

describe("render login screen", () => {
  const onLoginButtonPress = jest.fn();
  const wrapper = shallow(
    <LoginScreen onLoginButtonPress={onLoginButtonPress} />
  );
  test("press login button", () => {
    expect(wrapper.find(Button).length).toBe(1);
    wrapper.find(Button).simulate("press");
    expect(
      wrapper
        .find(Button)
        .find(Text)
        .contains("Facebook Login")
    ).toBe(true);
    expect(onLoginButtonPress).toHaveBeenCalled();
  });
});
