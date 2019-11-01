import React from 'react';
import { Alert, StyleSheet, ImageBackground } from 'react-native';
import { Icon, Button, Text, View } from 'native-base';

import colorConstans from '../constants/Colors';

const LoginScreen = props => {
  const { onLoginButtonPress } = props;

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: 'http://image.auction.co.kr/itemimage/10/f7/f6/10f7f6c746.jpg'
      }}
    >
      <View style={styles.height40}>
        <View style={styles.height40}>
          <Text style={styles.titleText}>MATA-DREAM</Text>
        </View>
        <View style={styles.height100}>
          <View style={styles.buttonView}>
            <Button
              primary
              onPress={onLoginButtonPress}
              style={styles.loginButton}
            >
              <Icon style={styles.Icon} name="logo-facebook" />
              <Text>Facebook Login</Text>
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  height40: {
    height: '40%'
  },
  height100: {
    height: '100%'
  },
  buttonView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: colorConstans.mainColor,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50
  },
  loginButton: {
    backgroundColor: colorConstans.facebookDefaultColor,
    borderRadius: 10,
    width: 200,
    textAlign: 'center'
  }
});

export default LoginScreen;
