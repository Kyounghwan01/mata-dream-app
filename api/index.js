import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const loginWithFacebook = async () => {
  const { type, token: fbToken } = await Facebook.logInWithReadPermissionsAsync(
    '713430802477350',
    {
      permissions: ['public_profile']
    }
  );

  if (type === 'success') {
    const user = await axios
      .get(
        `https://graph.facebook.com/me?access_token=${fbToken}&fields=id,name,picture.type(large)`
        // authConstans.FB_GRAPH_URL(fbToken)
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

    await SecureStore.setItemAsync('SOCIAL_ID', user.id);
    await SecureStore.setItemAsync('FBTOKEN', fbToken);
    await SecureStore.setItemAsync('USERTOKEN', userToken);
    return user;
  }
  function getUserToken(user) {
    return axios
      .post(
        `http://localhost:3001/auth/login/facebook`,
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

// export const logoutAsync = async () => {
//   const userToken = await SecureStore.getItemAsync('USERTOKEN');
//   await axios.post(`http://localhost:3001/auth/logout`,{},{})
// }
export const logoutAsync = async () => {
  const userToken = await SecureStore.getItemAsync('USERTOKEN');
  await axios
    .post(
      `http://localhost:3001/auth/logout`,
      {},
      {
        headers: {
          'content-type': 'application/json',
          userToken: 'Bearer ' + userToken
        }
      }
    )
    .then(async () => {
      // await SecureStore.deleteItemAsync(authConstans.FBTOKEN);
      // await SecureStore.deleteItemAsync(authConstans.USERTOKEN);
      await SecureStore.deleteItemAsync('FBTOKEN');
      await SecureStore.deleteItemAsync('USERTOKEN');
    });
};

export const getParkList = async () => {
  const parkList = await axios.get(`http://localhost:3001/park`);
  return parkList
}

export const test = async () => {
  const userToken = await SecureStore.getItemAsync('USERTOKEN');
  const socialId = await SecureStore.getItemAsync('SOCIAL_ID');
  const a = await axios.get(`http://localhost:3001/auth/test`, {
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
  const userToken = await SecureStore.getItemAsync('USERTOKEN');
  const socialId = await SecureStore.getItemAsync('SOCIAL_ID');

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
