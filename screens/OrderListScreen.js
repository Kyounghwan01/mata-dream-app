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
import { getParkOrderList } from '../api';
import { Button } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller : false
    }
  }
  componentDidMount() {
    
    //switch는 계속 호출된다.
    console.log('호출');
    //console.log(this.props.screenProps.parkOrderList);
    // console.log(this.props.screenProps.userData.id);
    //console.log(getParkOrderList(this.props.screenProps.selectedParkData._id));
  }

  render() {
    let checkEnrollUser = false;
    return (
      <View style={{flex: 1, position:'relative'}}>
      <ScrollView>
        {this.props.screenProps.parkOrderList.map((data, index) => {
          if(data.seller === this.props.screenProps.userData.id){
            checkEnrollUser = true
          }
          return (
            <View key={index}>
              <Image source={{ uri: data.image_url }} style={{width : '30%', height : 100}} />
              <Text>{data.point}</Text>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: '80%', height: 500 }}
                region={{
                  latitude: Number(data.location.latitude),
                  longitude: Number(data.location.longitude),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
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
            </View>
          );
        })}
        
        {/* <Button title="리스트 상세보는 버튼" onPress={()=>this.props.navigation.navigate('View')}/> */}
      </ScrollView>
      {
        checkEnrollUser ? (
          <AntDesign
          style={styles.image}
          size={35}
          name={'minuscircle'}
          onPress={() => this.props.navigation.navigate('Enroll')}
        />
        ) : (
          <Ionicons
          style={styles.image}
          size={35}
          name={'md-add-circle'}
          onPress={() => this.props.navigation.navigate('Enroll')}
        />
        )
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    position: 'absolute',
    right : 20,
    bottom: 0,
    color : Colors.mainColor
  }
});
