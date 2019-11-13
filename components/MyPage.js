import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';

const BackButton = props => {
  return (
    <Button
      transparent
      style={{marginLeft : 10}}
      onPress={props.goToMypage}
    >
      <Ionicons
      name='md-person'
      size={26}
      style={{ marginBottom: -3 }}
      color='white'
    />
    </Button>
  );
};

export default BackButton;
