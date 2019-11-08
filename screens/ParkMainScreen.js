import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getTempData, fetchAirData, getParkOrderList } from '../api';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/*
해야 하는거
1. 내위치 마커 (완료)
2. 미세먼지 온도(완료) 호출 api파일에 등록 (완료)
3. 이후 의뢰를 받으면 받은 redux props을 기반으로 마커 찍기
*/

export default class ParkMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      tempData: {}
    };
  }
  componentDidMount() {
    this.getOrderList();
    //대기온도

    getTempData(
      this.props.screenProps.selectedParkData.location.latitude,
      this.props.screenProps.selectedParkData.location.longitude
    ).then(res => this.setState({ tempData: res }));

    //console.log(this.props.screenProps.selectedParkData);
    //미세먼지
    //fetchAirData();
  }

  componentDidUpdate() {
    //console.log(this.props.screenProps.parkOrderList);
    console.log(this.state.tempData);
  }

  getOrderList = async () => {
    const list = await getParkOrderList(
      this.props.screenProps.selectedParkData._id
    );
    this.props.screenProps.getParkOrderList(list.parkList);
  };

  render() {
    return (
      <View>
        {this.props.screenProps.userData.latitude ? (
          //&& this.state.tempData
          <View>
            <Text>안녕하세요 MATA-DREAM을 이용해 주셔서 감사합니다</Text>
            <Text>현재 {this.props.screenProps.parkOrderList.length}곳의 자리가 있습니다!</Text>
            <Text>관심가시는 마커를 클릭하셔서 전경 및 포인트를 확인 해 주세요</Text>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: '100%', height: 300 }}
              region={{
                latitude: this.props.screenProps.selectedParkData.location
                  .latitude,
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
            <View>
              {/* <Text>{this.state.tempData.weatherName}</Text>
              <Text>{this.state.tempData.humidity}</Text>
              <Text>{this.state.tempData.temperature}</Text> */}
              {/* <Image
          style={{width: 50, height: 50}}
          source={{uri: `http://openweathermap.org/img/wn/${this.state.tempData.weatherIcon}@2x.png`}}
        /> */}
              {/* 온도, 미세먼지 */}
              <View>
                <Text>오늘의 날씨는 </Text>
                <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: `http://openweathermap.org/img/wn/01d@2x.png` }}
              /> 
              <Text>하고</Text>
              </View>
              
              <View>
                <MaterialCommunityIcons name="water" size={26} color="dodgerblue" />
                <Text>31%</Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={26}
                  color="black"
                />
                <Text>9℃</Text>
              </View>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color={Colors.mainColor} />
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
  imageStyle: { height: 70, width: 70, borderRadius: 5 }
});
