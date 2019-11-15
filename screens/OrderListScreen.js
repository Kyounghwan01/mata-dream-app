import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Alert, FlatList } from "react-native";
import { Button } from "native-base";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { getParkOrder, deleteOrderList, getSellerData } from "../api";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import io from "socket.io-client";
import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();
import { changeExchangeStatus } from "../api";

export default class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(apiUrl),
      refreshing: false
    };
  }

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = async () => {
    const list = await getParkOrder(
      this.props.screenProps.selectedParkData._id
    );
    this.props.screenProps.getParkOrderList(list.parkList);
  };

  deleteOrder = async () => {
    Alert.alert(
      "매물 삭제",
      "등록하신 매물을 삭제하겠습니까?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteOrderList(
              this.props.screenProps.userData.id,
              this.props.screenProps.selectedParkData._id
            )
              .then(Alert.alert("삭제되었습니다"))
              .then(this.props.navigation.navigate("ParkList"));
          }
        }
      ],
      { cancelable: false }
    );
  };

  goToDetailPage = async data => {
    this.state.socket.emit("PREVENT_ENTER", {
      status: "trading",
      dataId: data._id
    });
    changeExchangeStatus("trading", data._id);
    this.props.screenProps.getOrderData(data);
    this.props.navigation.navigate("ChatScreen");
  };

  render() {
    let isSeller = false;
    let checkEnrollUser = false;
    this.props.screenProps.parkOrderList.map(data => {
      if (data.seller === this.props.screenProps.userData.id) {
        isSeller = this.props.screenProps.userData.id;
      }
    });
    return (
      <View style={{ flex: 1, backgroundColor: "whitesmoke" }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: 260 }}
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
        <FlatList
          data={this.props.screenProps.parkOrderList}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          refreshing={this.state.refreshing}
          onRefresh={this.getOrderList}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => {
            let myOrder = false;
            if (item.seller === this.props.screenProps.userData.id) {
              checkEnrollUser = true;
              myOrder = true;
            } else {
              myOrder = false;
            }
            return (
              <View key={index}>
                <View style={styles.conatinerstyle}>
                  <View style={styles.mapstyle}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.mapViewStyle}
                      region={{
                        latitude: Number(item.location.latitude),
                        longitude: Number(item.location.longitude),
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: Number(item.location.latitude),
                          longitude: Number(item.location.longitude)
                        }}
                        description="판매자위치"
                      ></Marker>
                    </MapView>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.realMapStyle}
                    />
                  </View>
                  <View style={styles.orderListDesc}>
                    <View style={styles.point}>
                      <Text style={styles.pointDesc}>{item.point}pt</Text>
                    </View>
                    {item.complete === "false" ? (
                      <>
                        <View style={styles.exchange}>
                          <Text style={styles.pointDesc}>거래 가능</Text>
                        </View>
                        {isSeller ? (
                          <>
                            {myOrder ? (
                              <Button
                                style={styles.messageBtn}
                                onPress={() => this.goToDetailPage(item)}
                              >
                                <Text style={styles.pointDesc}>대화하기</Text>
                              </Button>
                            ) : (
                              <Button style={styles.detailBtn}>
                                <Text style={styles.pointDesc}>대화불가</Text>
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button
                            style={styles.messageBtn}
                            onPress={() => this.goToDetailPage(item)}
                          >
                            <Text style={styles.pointDesc}>대화하기</Text>
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <View style={styles.nonexchange}>
                          <Text style={styles.pointDesc}>거래 중</Text>
                        </View>
                        <Button style={styles.detailBtn}>
                          <Text style={styles.pointDesc}>대화불가</Text>
                        </Button>
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
        {checkEnrollUser ? (
          <AntDesign
            style={styles.image}
            size={35}
            name={"minuscircle"}
            onPress={this.deleteOrder}
          />
        ) : (
          <Ionicons
            style={styles.image}
            size={35}
            name={"md-add-circle"}
            onPress={() => this.props.navigation.navigate("Enroll")}
          />
        )}
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
  imageStyle: { height: 60, width: 70, borderRadius: 5 },
  image: {
    height: 50,
    position: "absolute",
    right: 20,
    bottom: 0,
    color: Colors.mainColor
  },
  conatinerstyle: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    margin: "2.5%",
    height: 190,
    backgroundColor: "white",
    borderRadius: 5
  },
  mapstyle: {
    display: "flex",
    flexDirection: "row",
    height: 125,
    justifyContent: "center",
    margin: 10
  },
  realMapStyle: {
    width: "50%",
    height: 120
  },
  mapViewStyle: {
    width: "50%",
    height: 120
  },
  orderListDesc: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  point: {
    backgroundColor: "dodgerblue",
    width: "30%",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    marginRight: 10
  },
  pointDesc: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13
  },
  exchange: {
    backgroundColor: Colors.mainColor,
    width: "30%",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    marginRight: 10
  },
  nonexchange: {
    backgroundColor: "darkgrey",
    width: "30%",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    marginRight: 10
  },
  messageBtn: {
    backgroundColor: "rgb(229,156,61)",
    width: "30%",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    borderRadius: 0
  },
  detailBtn: {
    backgroundColor: "rgb(143,120,76)",
    width: "30%",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    borderRadius: 0
  }
});
