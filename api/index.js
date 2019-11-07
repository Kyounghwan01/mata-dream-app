import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import getEnvVars from '../environment';
const {
  apiUrl,
  FB_appKey,
  authConst,
  weather_API_KEY,
  air_API_KEY
} = getEnvVars();

export const loginWithFacebook = async () => {
  const {
    type,
    token: fbToken,
      expires,
      permissions,
      declinedPermissions,
  } = await Facebook.logInWithReadPermissionsAsync(FB_appKey, {
    permissions: ['public_profile'],
    expires : 24 * 60
  });
  console.log(type);
  console.log(expires);
  console.log(permissions);
  console.log(declinedPermissions);

  if (type === 'success') {
    const user = await axios
      .get(
        `https://graph.facebook.com/me?access_token=${fbToken}&fields=id,name,picture.type(large)`
      )
      .then(res => res.data);
    // Object {
    //   "id": "124662448947517",
    //   "name": "Kyounghwan Noh",
    //   "picture": Object {
    //     "data": Object {
    //       "height": 200,
    //       "is_silhouette": true,
    //       "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=124662448947517&height=200&width=200&ext=1575184059&hash=AeQk4WBBEGscRVfo",
    //       "width": 200,
    //     },
    //   },
    // }
    const userToken = await getUserToken(user);
    console.log(userToken);

    await SecureStore.setItemAsync(authConst.SOCIAL_ID, user.id);
    await SecureStore.setItemAsync(authConst.FBTOKEN, fbToken);
    await SecureStore.setItemAsync(authConst.USERTOKEN, userToken);
    return user;
  }
  function getUserToken(user) {
    return axios
      .post(
        `${apiUrl}/auth/login/facebook`,
        {
          socialService: 'FACEBOOK',
          socialId: user.id,
          userName: user.name,
          profileImage: user.picture.data.url
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(data => data.headers.usertoken);
  }
};

export const logoutAsync = async () => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  await axios
    .post(
      `${apiUrl}/auth/logout`,
      {},
      {
        headers: {
          'content-type': 'application/json',
          userToken: 'Bearer ' + userToken
        }
      }
    )
    .then(async () => {
      await SecureStore.deleteItemAsync(authConst.FBTOKEN);
      await SecureStore.deleteItemAsync(authConst.USERTOKEN);
    });
};

export const getParkList = async () => {
  const parkList = await axios.get(`${apiUrl}/park`);
  return parkList;
};

export const getUserData = async () => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const userData = await axios.get(`${apiUrl}/auth/user`, {
    params: {
      test: 'test입니다'
    },
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return userData.data.result;
};

export const getTempData = async (lat, long) => {
  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${weather_API_KEY}`
  ).then(res => res.json());
  return data;
};

export const getImageUrl = async imageData => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  return axios
    .post(`${apiUrl}/park/seats/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        userToken: 'Bearer ' + userToken,
        socialId
      }
    })
    .then(res => res.data.imageUrl);
};

export const saveExchangeData = async data => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);

  return axios
    .post(
      `${apiUrl}/park/seats`,
      {
        data
      },
      {
        headers: {
          'content-type': 'application/json',
          userToken: 'Bearer ' + userToken,
          socialId
        }
      }
    )
    .then(res => res.data);
};

export const fetchAirData = async () => {
  const res = await axios(
    `http://openapi.seoul.go.kr:8088/${air_API_KEY}/json/RealtimeCityAir/1/5/%EB%8F%99%EB%B6%81%EA%B6%8C/%EC%84%B1%EB%B6%81%EA%B5%AC`
  );
  //console.log(res);
};

export const getParkOrderList = async (parkId) => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const res = await axios.get(`${apiUrl}/park/seats/${parkId}`,{
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return res.data;
}

export const deleteOrderList = async (userId, parkId) => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const res = await axios.delete(`${apiUrl}/park/seats/${userId}`,{
    data : {park : parkId},
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return res.data;
}