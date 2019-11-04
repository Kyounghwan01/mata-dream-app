import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import getEnvVars from '../environment';
const { apiUrl, FB_appKey, authConst } = getEnvVars();

export const loginWithFacebook = async () => {
  const { type, token: fbToken } = await Facebook.logInWithReadPermissionsAsync(
    FB_appKey,
    {
      permissions: ['public_profile']
    }
  );

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
  const fbtoken = await SecureStore.getItemAsync(authConst.FBTOKEN);
  const userData = await axios.get(`${apiUrl}/auth/user`, {
    params: {
      test: 'test입니다'
    },
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  console.log(userData.data.result);
};

export const test = async () => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const a = await axios.get(`${apiUrl}/auth/test`, {
    params: {
      test: 'test입니다'
    },
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  console.log(a.data.message);
  //get, or post 할때 검증을 위해 header값에 토큰을 넣어준다
};

export const getCoursesByLocation = async (
  pageNo,
  pageSize,
  currentLocation
) => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);

  return axios
    .get(`${API_URL}/feeds`, {
      params: {
        pageNo,
        pageSize,
        lon: currentLocation[0],
        lat: currentLocation[1]
      },
      headers: {
        userToken: 'Bearer ' + userToken,
        socialId
      }
    })
    .then(res => res.data);
};
