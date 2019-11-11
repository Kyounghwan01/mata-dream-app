import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

import colorConstans from '../constants/Colors';

const AcceptButton = props => {
  return (
    <Button
      transparent
      style={{ marginRight: 10 }}
      onPress={props.exchange}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colorConstans.headerTextColor
        }}
      >
        교환
      </Text>
    </Button>
  );
};

export default AcceptButton;
