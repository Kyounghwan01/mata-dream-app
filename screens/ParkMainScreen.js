import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getTempData, fetchAirData, getParkOrderList } from '../api';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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
  componentDidMount() {}

  render() {
    return (
      <View>
        <View>
          <Text>
            안녕하세요 MATA-DREAM을 이용해 주셔서 진심으로 감사 드립니다
          </Text>

          <Text>
            저희 MATA-DREAM은 한강에 자리 없이 떠도는 사람들을 위해 만든 가상
            앱입니다.
          </Text>
          <View>
            <Text>이용법</Text>
            <View>
              <Text>1.자리를 등록 하시고 판매를 원하시는 분들은 mataDream 페이지의 오른쪽 하단 등록버튼(+)을 클릭하시면 됩니다.
                중복 판매 방지를 위해 한번 등록하시면 위
                아이콘은 없어지고 삭제 버튼(-)으로 바뀝니다.
              </Text>
              <Text>1-1. 등록버튼 클릭시 마커를 클릭하시고 현재 위치를 지정하시고, 현재 보이시는 뷰를 사진으로 찍어 등록하신 후, 포인트를 지정하시면 됩니다.</Text>
              <Text>1-2. 삭제 버튼(-)을 클릭하시면 등록하신 내역은 사라지고 자동으로 등록 버튼(+)으로 바뀝니다.</Text>
            </View>
            <View>
              <Text>2. 이용을 원하시는 분은 지도, 사진을 통해 위치를 확인하시고 대화하기 버튼을 클릭하셔서 판매자와 거래를 이어가시면됩니다</Text>
            </View>
            <View>
              <Text>3. 거래를 확정하시려면 채팅 방 오른쪽 상단에 거래하기 버튼을 판매자, 구매자 모두 클릭하시면 포인트가 이동하고, 거래 방 및 주문 리스트는 자동으로 삭제됩니다.</Text>
              <Text>3-1. 거래 도중 다른 판매자와 거래 하실 수 없습니다. 거래를 변경하시려면 나가기 버튼을 누르시면 자동으로 현재 거래가 취소됩니다.</Text>
            </View>
            <View>
              <Text>4. 포인트 소진으로 충전을 원하시면 mataDream 페이지의 왼쪽 상단부의 마이페이지 아이콘을 클릭하시고 충전하기 버튼을 클릭하시면 1000포인트 충전됩니다.</Text>
            </View>
            <View>
              <Text>저희 MATA-DREAM과 즐거운 시간 보내시길 바라겠습니다!!</Text>
            </View>
          </View>
        </View>
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
    color: Colors.mainColor
  }
});
