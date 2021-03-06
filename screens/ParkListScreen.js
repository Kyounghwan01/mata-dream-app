import React, { Component } from "react";
import { getParkList, getUserData } from "../api";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Text, View } from "native-base";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class ParkListScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._getParkListAsync();
    this._getLocationAsync();
  }

  _getParkListAsync = async () => {
    const res = await getParkList();
    this.props.screenProps.getParkList(res.data.parkList);
  };
  _getLocationAsync = async () => {
    const userData = await getUserData();

    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    await Permissions.askAsync(Permissions.LOCATION);
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const { status, expires } = await Permissions.getAsync(
      Permissions.LOCATION,
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status !== "granted") {
      alert("Hey! You heve not enabled selected permissions");
    }

    let location = await Location.getCurrentPositionAsync({});

    if (!location) {
      this.props.screenProps.getUserData({
        name: userData.name,
        id: userData._id,
        latitude: 37.5055751,
        longitude: 127.057275
      });
    } else {
      this.props.screenProps.getUserData({
        name: userData.name,
        id: userData._id,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
  };

  goToParkData = async data => {
    await this.props.screenProps.getParkData(data);
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <SafeAreaView>
        {this.props.screenProps.parkList ? (
          <ScrollView>
            {this.props.screenProps.parkList.map((data, list) => {
              var imageAddress = [
                require("../assets/잠실한강공원.jpg"),
                require("../assets/뚝섬한강공원.jpg"),
                require("../assets/이촌한강공원.jpg"),
                require("../assets/반포한강공원.jpg"),
                require("../assets/qwe.jpg")
              ];
              return (
                <TouchableOpacity
                  key={list}
                  style={styles.touchable}
                  onPress={() => {
                    this.goToParkData(data);
                  }}
                >
                  <Image source={imageAddress[list]} style={styles.image} />
                  <View style={styles.view}>
                    <Text style={styles.ParkContainerText}>{data.name}</Text>
                    <Text style={styles.ParkContainerAdd}>{data.address}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: "absolute"
  },
  image: {
    width: 350,
    height: 150,
    margin: 10
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  ParkContainer: {
    display: "flex",
    // justifyContent: 'center',
    // height: 200,
    backgroundColor: "grey",
    margin: 10,
    borderRadius: 30
  },
  ParkContainerAdd: {
    textAlign: "center",
    fontSize: 12,
    color: "white"
  },
  ParkContainerText: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
