import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { getUserData } from "../api";

export default class MyPageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sell: [],
      buy: []
    };
  }
  async componentDidMount() {
    const data = await getUserData();
    await data.exchange_history.map((data, index) => {
      if (data.seller === this.props.screenProps.userData.id) {
        this.setState({
          sell: this.state.sell.concat([{ park: data.park, point: data.point }])
        });
      } else {
        this.setState({
          buy: this.state.buy.concat([{ park: data.park, point: data.point }])
        });
      }
    });
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <ScrollView style={{flex : 1}}>
        <Text>데헷MyPageScreen</Text>
        {this.state.isLoading ? (
          <View>
            <View>
              <Text>판매내역</Text>
              {this.state.sell.map((data, index) => {
                return (
                  <View key={index}>
                    <Text>{index}</Text>
                    <Text>{data.park}</Text>
                    <Text>{data.point}</Text>
                  </View>
                );
              })}
            </View>
            <View>
              <Text>구매내역</Text>
              {this.state.buy.map((data, index) => {
                return (
                  <View key={index}>
                    <Text>{index}</Text>
                    <Text>{data.park}</Text>
                    <Text>{data.point}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <Text>ㄱㄷ</Text>
        )}
      </ScrollView>
    );
  }
}
