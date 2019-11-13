import reducer, { initialState } from "./index";
import {
  PARK_LIST,
  SELECTED_PARK_DATA,
  USER_LOCATION_DATA,
  PARK_ORDER_LIST,
  ORDER_DATA
} from "../constants/ActionTypes";

describe("reducer function test", () => {
  it("return inital state", () => {
    expect(initialState).toHaveProperty("parkList");
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("return parkList", () => {
    const action = {
      type: PARK_LIST,
      list: ["잠실한강공원", "반포한강공원"]
    };
    expect(reducer(initialState.parkList, action)).toEqual({
      parkList: ["잠실한강공원", "반포한강공원"]
    });
  });

  it("return userData", () => {
    const action = {
      type: USER_LOCATION_DATA,
      data: {
        id: "5dc524da1d94b8266772bd11",
        latitude: 37.5055751,
        longitude: 127.057275,
        name: "asd"
      }
    };
    expect(reducer(initialState.orderData, action)).toEqual({
      userData: {
        id: "5dc524da1d94b8266772bd11",
        latitude: 37.5055751,
        longitude: 127.057275,
        name: "asd"
      }
    });
  });

  it("return selectedParkData", () => {
    const action = {
      type: SELECTED_PARK_DATA,
      data: {
        _id: "5dbd02ea7d94df169a8adfb5",
        address: "서울특별시 광진구 자양동 704-1",
        location: {
          latitude: 37.5055751,
          longitude: 127.057275
        },
        name: "뚝섬한강공원"
      }
    };
    expect(reducer(initialState.selectedParkData, action)).toEqual({
      selectedParkData: {
        _id: "5dbd02ea7d94df169a8adfb5",
        address: "서울특별시 광진구 자양동 704-1",
        location: { latitude: 37.5055751, longitude: 127.057275 },
        name: "뚝섬한강공원"
      }
    });
  });

  it("return parkOrderList", () => {
    const action = {
      type: PARK_ORDER_LIST,
      data: [
        {
          _id: "5dbd02ea7d94df169a8adfb5",
          complete: "false",
          image_url: "sample_url",
          location: {
            latitude: 37.5055751,
            longitude: 127.057275
          },
          park: "5dbd02ea7d94df169a8adfb5",
          point: 100,
          seller: "5dc149d70e1b79493accfcc7"
        },
        {
          _id: "5dbd02ea7d94df169a8adfb5",
          complete: "false",
          image_url: "sample_url",
          location: {
            latitude: 37.5055751,
            longitude: 127.057275
          },
          park: "5dbd02ea7d94df169a8adfb5",
          point: 120,
          seller: "5dc149d70e1b79493accfcc7"
        }
      ]
    };
    expect(
      reducer(initialState.parkOrderList, action).parkOrderList.length
    ).toEqual(2);
    expect(
      reducer(initialState.parkOrderList, action).parkOrderList[1].point
    ).toEqual(120);
  });

  it("return orderData", () => {
    const action = {
      type: ORDER_DATA,
      data: {
        _id: "5dbd02ea7d94df169a8adfb5",
        complete: "false",
        image_url: "sample_url",
        location: {
          latitude: 37.5055751,
          longitude: 127.057275
        },
        park: "5dbd02ea7d94df169a8adfb5",
        point: 120,
        seller: "5dc149d70e1b79493accfcc7"
      }
    };
    expect(reducer(initialState.orderData, action).orderData).toEqual({
      _id: "5dbd02ea7d94df169a8adfb5",
      complete: "false",
      image_url: "sample_url",
      location: { latitude: 37.5055751, longitude: 127.057275 },
      park: "5dbd02ea7d94df169a8adfb5",
      point: 120,
      seller: "5dc149d70e1b79493accfcc7"
    });
  });
});
