import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "../constants/Colors";

export default class ParkMainScreen extends Component {
  render() {
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ margin: 25 }}>
          <View
            style={{
              margin: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>
              <Text style={{ fontWeight: "bold" }}>MATA-DREAM</Text>을 이용해
              주셔서 감사 드립니다
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 13 }}>
              한강에 자리 없이 떠도는 사람들을 위해 만든{" "}
              <Text style={{ fontWeight: "bold" }}>가상 앱</Text>입니다.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "whitesmoke",
              marginTop: 10,
              marginBottom: 10,
              borderRadius : 8
            }}
          >
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontWeight: "bold" }}>이용법</Text>
            </View>
            <View>
              <View style={{ marginBottom: 20 }}>
                <Text>
                  1. 자리를 등록 하시고 판매를 원하시는 분들은 mataDream
                  페이지의 오른쪽 하단 등록버튼(+)을 클릭하시면 됩니다.
                </Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text>
                  2. 등록버튼 클릭 후 화면에서 마커를 클릭하시고 현재 위치를
                  지정하시고, 현재 보이시는 뷰를 사진으로 찍어 등록하신 후,
                  포인트를 지정하시면 됩니다.
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text>
                2. 이용을 원하시는 구매자은 지도, 사진을 통해 위치를 확인하시고
                대화하기 버튼을 클릭하셔서 판매자와 거래를 이어가시면됩니다
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <Text>
                  3. 거래를 확정하시려면 채팅 방 오른쪽 상단에 거래하기 버튼을
                  클릭하시고, 올라오는 창에서 두분 다 OK를 클릭하시면 포인트가
                  이동하고, 거래 방 및 주문 리스트는 자동으로 삭제됩니다.
                </Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text>
                  3-1. 거래 도중 다른 판매자와 거래 하실 수 없습니다. 거래를
                  변경하시려면 왼쪽 상단의 버튼을 누르시면 자동으로 현재 거래가
                  취소되고 채팅방을 나가게 됩니다.
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text>
                  3-2. 판매자의 경우 거래 등록하시면 바로 거래 채팅방으로
                  이동합니다. 이후 나가기 버튼 클릭시 자동으로 방이 삭제됩니다.
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>MATA-DREAM</Text>과 즐거운
              시간 보내시길 바라겠습니다!!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calloutContainer: {
    display: "flex",
    height: 85,
    width: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: { height: 70, width: 70, borderRadius: 5 },
  image: {
    color: Colors.mainColor
  }
});
