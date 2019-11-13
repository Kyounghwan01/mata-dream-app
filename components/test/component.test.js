import React from "react";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, configure } from "enzyme";
import { Button } from "native-base";
import { Text } from "react-native";

import LogoutButton from "../LogoutButton";
import BackButton from "../BackButton";
import AcceptButton from "../AcceptButton";

describe("render LogoutButton", () => {
  const onLogoutButtonClick = jest.fn();
  const wrapper = shallow(
    <LogoutButton onLogoutButtonClick={onLogoutButtonClick} />
  );
  wrapper.find(Button).simulate("press");
  test("should logout action when logoutbutton press", () => {
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(Text).length).toBe(1);
    expect(onLogoutButtonClick).toHaveBeenCalled();
  });
});

describe("render BackButton", () => {
  const goBackButtonClick = jest.fn();
  const wrapper = shallow(<BackButton goBackButtonClick={goBackButtonClick} />);
  wrapper.find(Button).simulate("press");
  test("should logout action when logoutbutton press", () => {
    expect(wrapper.find(Button).length).toBe(1);
    expect(goBackButtonClick).toHaveBeenCalled();
  });
});

describe("render AcceptButton", () => {
  const exchange = jest.fn();
  const wrapper = shallow(<AcceptButton exchange={exchange} />);
  wrapper.find(Button).simulate("press");
  test("should logout action when logoutbutton press", () => {
    expect(wrapper.find(Button).length).toBe(1);
    expect(exchange).toHaveBeenCalled();
  });
});
