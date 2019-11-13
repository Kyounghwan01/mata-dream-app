import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const TabBarMaterial = props => {
  return (
    <MaterialIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarMaterial;
