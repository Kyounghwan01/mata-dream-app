import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Button, Fab, Icon } from 'native-base';

import * as Permissions from 'expo-permissions';

import {getImageUrl} from '../api';
import * as ImagePicker from 'expo-image-picker';

export default class EnrollOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      image : null
    }
  }
  componentDidMount() {
    // console.log(this.props.screenProps);
  }

  generateLibrary = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.1,
        aspect: [4, 3],
      });
      if (!image.cancelled) {
        this.addImageData(image);
        // console.log(image);
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
      // const { currentLocation } = this.state;
      // const { courseId } = this.state;
      // const locationData = {
      //   type: 'Point',
      //   coordinates: currentLocation.coordinates,
      //   timestamp: currentLocation.timestamp
      // };

      //const imageUrl = await getImageUrl(this.createFormData(image.uri));
      //console.log(imageUrl);

      //s3갔다온 url을 넣는다.
      //const savedImageData = await updateImageByLocation(locationData, courseId, imageUrl);

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
        <Text>마커를 길게 클릭하시면 이동가능합니다</Text>
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
            onDragEnd={e => console.log(e)}
          ></Marker>
        </MapView>
        <Button
          onPress={() => this.props.navigation.navigate('List')}
        ><Text>go to list</Text></Button>
        <Button onPress={this.generateLibrary} style={{ backgroundColor: '#34A34F' }}>
            <Icon name="image" />
          </Button>
          {
            this.state.image ?
            <Image
            source={{uri: `${this.state.image}`}}
            /> : <Text>이미지없다</Text>
          }
      </View>
    );
  }
}
