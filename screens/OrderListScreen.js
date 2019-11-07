import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getParkOrderList, deleteOrderList } from '../api';
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
    console.log('호출');
    this.getOrderList();
    //console.log(this.props.screenProps.parkOrderList);
    // console.log(this.props.screenProps.userData.id);
    //console.log(getParkOrderList(this.props.screenProps.selectedParkData._id));
  }
  getOrderList = async () => {
    const list = await getParkOrderList(this.props.screenProps.selectedParkData._id);
    this.props.screenProps.getParkOrderList(list.parkList);
  }

  deleteOrder = async() => {
    await deleteOrderList(this.props.screenProps.userData.id, this.props.screenProps.selectedParkData._id).then(this.getOrderList());
  }

  render() {
    let checkEnrollUser = false;
    return (
      <View style={{ flex: 1, position: 'relative', backgroundColor : 'whitesmoke'}}>
        <ScrollView>
          {this.props.screenProps.parkOrderList.map((data, index) => {
            console.log(data)
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
                    <Image source={{uri : data.image_url}} style={styles.realMapStyle}/>
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
                    <View style={styles.detailBtn}>
                      <Text style={styles.pointDesc}>상세보기</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          {/* <Button title="리스트 상세보는 버튼" onPress={()=>this.props.navigation.navigate('View')}/> */}
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
    width : '95%',
    margin: '2.5%',
    height: 190,
    backgroundColor : 'white',
    borderRadius : 5
  },
  mapstyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    justifyContent : 'center',
    margin : 10
  },
  realMapStyle : {
    width: 185, height: 130,
  },
  mapViewStyle: {
    width: 185,
    height: 130,
  },
  orderListDesc: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection: 'row',
  },
  point: {
    backgroundColor: 'dodgerblue',
    width: '30%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    marginRight : 10
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
    marginRight : 10
  },
  detailBtn: {
    backgroundColor: 'grey',
    width: '30%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
  }
});
