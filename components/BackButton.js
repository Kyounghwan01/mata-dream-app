import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';
import Colors from '../constants/Colors';

const BackButton = props => {
  return (
    <Button
      transparent
      style={{marginLeft : 10}}
      onPress={props.goBackButtonClick}
    >
      <Ionicons
      name='ios-arrow-back'
      size={26}
      style={{ marginBottom: -3 }}
      color='white'
    />
    </Button>
  );
};

export default BackButton;
