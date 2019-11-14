import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Container, Button, Fab, Icon } from "native-base";
import RNPickerSelect from "react-native-picker-select";

import { getImageUrl, saveExchangeData } from "../api";
import * as ImagePicker from "expo-image-picker";

export default class EnrollOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      location: {
        latitude: this.props.screenProps.userData.latitude,
        longitude: this.props.screenProps.userData.longitude
      },
      point: 100
    };
  }

  generateLibrary = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.1,
        aspect: [4, 3]
      });
      if (!image.cancelled) {
        this.setState({ image: image.uri });
      }
    } catch (err) {
      alert(`Cannot pick Image : ${err.message}`);
    }
  };

  generateCamera = async () => {
    try {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.1,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!image.cancelled) {
        this.setState({ image: image.uri });
      }
    } catch (err) {
      alert(`Cannot generate Camera : ${err.message}`);
    }
  };

  //이거 유틸로 빼기
  createFormData = imageUri => {
    const data = new FormData();
    const uriParts = imageUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    data.append("file", {
      uri: imageUri,
      name: imageUri.split("/").pop(),
      type: `image/${fileType}`
    });

    return data;
  };

  submitData = async () => {
    if (this.state.image === null || this.state.point === null) {
      return Alert.alert("사진 또는 포인트를 등록하세요");
    }
    try {
      const imageUrl = await getImageUrl(this.createFormData(this.state.image));

      let data = {
        seller: this.props.screenProps.userData.id,
        point: this.state.point,
        location: {
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude
        },
        park: this.props.screenProps.selectedParkData._id,
        image_url: imageUrl
      };
      const savedImageData = await saveExchangeData(data);
      if (savedImageData) {
        Alert.alert("등록 성공하였습니다!");
        await this.props.screenProps.getOrderData(savedImageData.newData);
        this.props.navigation.navigate("ChatScreen");
      }
    } catch (error) {
      Alert.alert(
        "Failed Enroll",
        "ask Manager"[
          ({ text: "Cancel" },
          { text: "OK", onPress: () => this.props.navigation.navigate("List") })
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.stepOne}>
          <Text style={styles.welcomeDesc}>1. 현재 위치를 알려주세요!</Text>
          <Text style={styles.welcomeDesc}>
            고객님의 위치가 정확하지 않을 시 마커를 움직여주세요!
          </Text>
          <Text style={styles.welcomeDesc}>
            ( 마커를 길게 누르시면 마커가 이동합니다 )
          </Text>
        </View>
        <View style={styles.MapStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height: 300 }}
            region={{
              latitude: this.props.screenProps.selectedParkData.location
                .latitude,
              longitude: this.props.screenProps.selectedParkData.location
                .longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.0321
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude: this.props.screenProps.userData.latitude,
                longitude: this.props.screenProps.userData.longitude
              }}
              description="내가 자리 잡은 위치"
              onDragEnd={e =>
                this.setState({
                  location: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  }
                })
              }
            ></Marker>
          </MapView>
        </View>

        <View style={styles.stepTwo}>
          <Text style={styles.stepTwoDesc}>
            2. 업로드할 이미지를 선택해 주세요
          </Text>
          <View style={styles.btnGroup}>
            <Button style={styles.cameraBtn} onPress={this.generateCamera}>
              <Icon style={styles.albumIcon} name="camera" />
            </Button>
            <Button style={styles.album} onPress={this.generateLibrary}>
              <Icon style={styles.albumIcon} name="image" />
            </Button>
          </View>
          {this.state.image ? (
            <View style={styles.imageContainer}>
              <Image
                style={{ width: "100%", height: 300 }}
                source={{ uri: `${this.state.image}` }}
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Text style={styles.imageContainerDesc}>
                이미지를 선택해 주세요
              </Text>
            </View>
          )}
        </View>
        <View style={styles.picker}>
          <View style={styles.stepThree}>
            <Text style={styles.stepThreeDesc}>
              3. 받으실 포인트를 선택해주세요
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "포인트를 선택해주세요"
              }}
              onValueChange={value => {
                this.setState({
                  point: value
                });
              }}
              items={[
                { label: "100", value: 100 },
                { label: "200", value: 200 },
                { label: "300", value: 300 },
                { label: "400", value: 400 },
                { label: "500", value: 500 }
              ]}
              value={this.state.point}
              style={styles}
            />
          </View>
        </View>
        <View>
          <Button style={styles.submitBtn} onPress={this.submitData}>
            <Text style={styles.submitText}>등록</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stepOne: {
    height: 100,
    paddingTop: 20
  },
  welcomeDesc: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "rgb(93,85,72)"
  },
  stepTwo: {
    height: 300,
    paddingTop: 20
  },
  stepTwoDesc: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 20,
    borderRadius: 0,
    color: "rgb(93,85,72)"
  },
  imageContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 0
  },
  imageContainerDesc: {
    textAlign: "center",
    lineHeight: 300,
    color: "rgb(93,85,72)"
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cameraBtn: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "green"
  },
  album: {
    width: "50%",
    borderRadius: 0,
    textAlign: "center"
  },
  albumIcon: {
    paddingLeft: "40%"
  },
  stepThree: {
    height: 250,
    paddingTop: 100
  },
  stepThreeDesc: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
    color: "rgb(93,85,72)"
  },
  picker: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingBottom: 30,
    paddingRight: 30
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "grey"
  },
  submitBtn: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
    width: "100%",
    backgroundColor: "rgb(95,197,166)"
  },
  submitText: {
    textAlign: "center",
    paddingLeft: "47%",
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});
