import React from "react";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, configure } from "enzyme";
import { Button } from "native-base";

import LoginScreen from '../LoginScreen'

describe('render login screen', () => {
  const onLoginButtonPress = jest.fn();
  const wrapper = shallow(
    <LoginScreen onLoginButtonPress={onLoginButtonPress}/>
  );
  test('', () => {
    expect(wrapper.find(Button).length).toBe(1);
    wrapper.find(Button).simulate("press");
    expect(onLoginButtonPress).toHaveBeenCalled();
  });
});
