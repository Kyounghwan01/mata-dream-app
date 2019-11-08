import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'native-base';
import { getSellerData } from '../api';
import Color from '../constants/Colors';

export default class ViewOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: null
    };
  }
  componentDidMount() {
    //판매자정보가져오기
    // console.log("qweqweqwe",this.props.screenProps.orderData.seller);
    getSellerData(this.props.screenProps.orderData.seller).then(res => {
      this.setState({ seller: res });
    });
    console.log(this.props.screenProps.orderData);
  }
  render() {
    return (
      <View>
        {this.state.seller ? (
          <View style={styles.container}>
            {/* <Text>{this.state.seller.name}님의 MATA-DREAM</Text> */}
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapViewStyle}
              region={{
                latitude: Number(
                  this.props.screenProps.orderData.location.latitude
                ),
                longitude: Number(
                  this.props.screenProps.orderData.location.longitude
                ),
                latitudeDelta: 0.01,
                longitudeDelta: 0.0321
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(
                    this.props.screenProps.orderData.location.latitude
                  ),
                  longitude: Number(
                    this.props.screenProps.orderData.location.longitude
                  )
                }}
                description="등록한 위치"
              ></Marker>
            </MapView>
            <View style={styles.infoView}>
              <Image
                source={{ uri: this.props.screenProps.orderData.image_url }}
                style={styles.imageStyle}
              />
              <View style={styles.descStyle}>
                <Text>포인트 : {this.props.screenProps.orderData.point}pt</Text>
                <Text>판매자 : {this.state.seller.name}</Text>
              </View>
            </View>
            <Button
              onPress={() => this.props.navigation.navigate('ChatScreen')}
              style={styles.chatBtn}
            >
              <Text style={styles.chatDescBtn}>판매자와 대화하기!</Text>
            </Button>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke'
  },
  mapViewStyle: {
    width: '100%',
    height: '54%',
    marginBottom: '2%'
  },
  infoView: {
    width: '100%',
    height: '37%',
    padding: '3%',
    display: 'flex',
    flexDirection: 'row'
  },
  imageStyle: {
    width: '50%',
    height: '80%',
    marginTop: '5%',
    borderRadius: 5
  },
  descStyle: {
    backgroundColor: 'grey',
    marginTop: '5%',
    marginLeft: '5%',
    height: '80%'
  },
  chatBtn: {
    display: 'flex',
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: Color.mainColor
  },
  chatDescBtn: {
    color: 'white',
    fontSize: 15
  }
});
