import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getParkOrderList, deleteOrderList, getSellerData } from '../api';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: false
    };
  }
  componentDidMount() {
    this.getOrderList();
    //console.log(this.props.screenProps.parkOrderList);
    // console.log(this.props.screenProps.userData.id);
    //console.log(getParkOrderList(this.props.screenProps.selectedParkData._id));
  }
  getOrderList = async () => {
    const list = await getParkOrderList(
      this.props.screenProps.selectedParkData._id
    );
    this.props.screenProps.getParkOrderList(list.parkList);
  };

  deleteOrder = async () => {
    await deleteOrderList(
      this.props.screenProps.userData.id,
      this.props.screenProps.selectedParkData._id
    ).then(this.getOrderList());
  };

  goToDetailPage = async data => {
    data['parkname'] = 'nkh';
    this.props.screenProps.getOrderData(data);
    this.props.navigation.navigate('ChatScreen');
  };

  render() {
    let checkEnrollUser = false;
    return (
      <View style={{ flex: 1, backgroundColor: 'whitesmoke' }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: 300 }}
          region={{
            latitude: this.props.screenProps.selectedParkData.location.latitude,
            longitude: this.props.screenProps.selectedParkData.location
              .longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.screenProps.userData.latitude,
              longitude: this.props.screenProps.userData.longitude
            }}
            description="현재 위치"
          ></Marker>
          {this.props.screenProps.parkOrderList
            ? this.props.screenProps.parkOrderList.map((data, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: Number(data.location.latitude),
                      longitude: Number(data.location.longitude)
                    }}
                  >
                    <Callout>
                      <View style={styles.calloutContainer}>
                        <Image
                          source={{ uri: data.image_url }}
                          style={styles.imageStyle}
                        />
                        <Text>{data.point}pt</Text>
                      </View>
                    </Callout>
                  </Marker>
                );
              })
            : null}
        </MapView>
        <ScrollView>
          {this.props.screenProps.parkOrderList.map((data, index) => {
            if (data.seller === this.props.screenProps.userData.id) {
              checkEnrollUser = true;
            }
            return (
              <View key={index}>
                <View style={styles.conatinerstyle}>
                  <View style={styles.mapstyle}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.mapViewStyle}
                      region={{
                        latitude: Number(data.location.latitude),
                        longitude: Number(data.location.longitude),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: Number(data.location.latitude),
                          longitude: Number(data.location.longitude)
                        }}
                        description="판매자위치"
                      ></Marker>
                    </MapView>
                    <Image
                      source={{ uri: data.image_url }}
                      style={styles.realMapStyle}
                    />
                  </View>
                  <View style={styles.orderListDesc}>
                    <View style={styles.point}>
                      <Text style={styles.pointDesc}>{data.point}pt</Text>
                    </View>
                    {data.complete === false ? (
                      <View style={styles.exchange}>
                        <Text style={styles.pointDesc}>거래 가능</Text>
                      </View>
                    ) : (
                      <View>
                        <Text>거래중</Text>
                      </View>
                    )}
                    <Button
                      style={styles.detailBtn}
                      onPress={() => this.goToDetailPage(data)}
                    >
                      <Text style={styles.pointDesc}>대화하기</Text>
                    </Button>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        {checkEnrollUser ? (
          <AntDesign
            style={styles.image}
            size={35}
            name={'minuscircle'}
            onPress={this.deleteOrder}
          />
        ) : (
          <Ionicons
            style={styles.image}
            size={35}
            name={'md-add-circle'}
            onPress={() => this.props.navigation.navigate('Enroll')}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calloutContainer: {
    display: 'flex',
    height: 85,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: { height: 70, width: 70, borderRadius: 5 },
  image: {
    height: 50,
    position: 'absolute',
    right: 20,
    bottom: 0,
    color: Colors.mainColor
  },
  conatinerstyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    margin: '2.5%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 5
  },
  mapstyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    justifyContent: 'center',
    margin: 10
  },
  realMapStyle: {
    width: 185,
    height: 130
  },
  mapViewStyle: {
    width: 185,
    height: 130
  },
  orderListDesc: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  point: {
    backgroundColor: 'dodgerblue',
    width: '30%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    marginRight: 10
  },
  pointDesc: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13
  },
  exchange: {
    backgroundColor: Colors.mainColor,
    width: '30%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    marginRight: 10
  },
  detailBtn: {
    backgroundColor: 'grey',
    width: '30%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 0
  }
});
