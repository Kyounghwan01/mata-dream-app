import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Button, Fab, Icon } from 'native-base';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { getImageUrl, saveExchangeData } from '../api';
import * as ImagePicker from 'expo-image-picker';

export default class EnrollOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      location: {
        latitude: this.props.screenProps.userData.latitude,
        longitude: this.props.screenProps.userData.longitude
      }
    };
  }
  componentDidMount() {
    console.log(this.props.screenProps.selectedParkData);
  }

  componentDidUpdate() {
    console.log(this.state.location);
  }

  generateLibrary = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.1,
        aspect: [4, 3]
      });
      if (!image.cancelled) {
        this.addImageData(image);
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
        aspect: [4, 3],
      });

      if (!image.cancelled) {
        this.addImageData(image);
      }
    } catch (err) {
      alert(`Cannot generate Camera : ${err.message}`);
    }
  };

  //이거 유틸로 빼기
  createFormData = imageUri => {
    const data = new FormData();
    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    data.append('file', {
      uri: imageUri,
      name: imageUri.split('/').pop(),
      type: `image/${fileType}`
    });

    return data;
  };

  addImageData = async image => {
    try {
      this.setState({image : image.uri})
      // const imageUrl = await getImageUrl(this.createFormData(image.uri));

      // //s3갔다온 url을 넣는다.
      // //완료시 저장됬으니 화면을 리스트로 돌린다.
      // let data = {
      //   seller: this.props.screenProps.userData.id,
      //   point: 100,
      //   location: {
      //     latitude: this.state.location.latitude,
      //     longitude: this.state.location.longitude
      //   },
      //   park: this.props.screenProps.selectedParkData._id,
      //   image_url: imageUrl
      // };
      // const savedImageData = await saveExchangeData(data);
      // console.log('result', savedImageData);

      //this.setState({image: image.uri});
    } catch (error) {
      console.log(error);
      // Alert.alert(
      //   'Error!',
      //   'Failed Image upload',
      //   [
      //     { text: 'Cancel' },
      //     { text: 'OK', onPress: () => this.props.navigation.navigate('List') }
      //   ],
      //   { cancelable: false }
      // );
    }
  };

  render() {
    return (
      <View>
        <Text>{this.props.screenProps.userData.name}님이 MATA-DREAM</Text>
        <Text>고객님의 위치가 정확하지 않을 시 마커를 움직여주세요!</Text>
        <Text>마커를 길게 누르시면 이동가능합니다</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: '80%', height: '60%' }}
          region={{
            latitude: this.props.screenProps.selectedParkData.location.latitude,
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
        {this.state.image ? (
          <Image style={{width: 50, height: 50}} source={{ uri: `${this.state.image}` }} />
        ) : (
          <Text>업로드할 이미지를 선택해 주세요</Text>
        )}
        <Button onPress={() => this.props.navigation.navigate('List')}>
          <Text>go to list</Text>
        </Button>
        <Button onPress={this.generateCamera}>
          <Text>카메라</Text>
        </Button>
        <Button
          onPress={this.generateLibrary}
          style={{ backgroundColor: '#34A34F' }}
        >
          <Icon name="image" />
        </Button>
      </View>
    );
  }
}
