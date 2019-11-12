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
  const { type, token: fbToken } = await Facebook.logInWithReadPermissionsAsync(
    FB_appKey,
    {
      permissions: ['public_profile'],
      expires: 1
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

export const getSellerData = async sellerId => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const sellerData = await axios.get(`${apiUrl}/auth/seller/${sellerId}`, {
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return sellerData.data.result;
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

export const getParkOrder = async parkId => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const res = await axios.get(`${apiUrl}/park/seats/${parkId}`, {
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return res.data;
};

export const deleteOrderList = async (userId, parkId) => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const res = await axios.delete(`${apiUrl}/park/seats/${userId}`, {
    data: { park: parkId },
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  });
  return res.data;
};

export const changeExchangeStatus = async (status, orderId) => {
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);
  const res = await axios.post(
    `${apiUrl}/park/seats/${orderId}`,
    {
      status
    },
    {
      headers: {
        'content-type': 'application/json',
        userToken: 'Bearer ' + userToken,
        socialId
      }
    }
  );
};

export const changePoint = async (exchangeData) => {
  console.log(exchangeData);
  const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);

  const res = await axios.post(
    `${apiUrl}/park/seats/point`,
    {
      exchangeData
    },
    {
      headers: {
        'content-type': 'application/json',
        userToken: 'Bearer ' + userToken,
        socialId
      }
    }
  );
};

// export const saveExchangeData = async data => {
//   const userToken = await SecureStore.getItemAsync(authConst.USERTOKEN);
//   const socialId = await SecureStore.getItemAsync(authConst.SOCIAL_ID);

//   return axios
//     .post(
//       `${apiUrl}/park/seats`,
//       {
//         data
//       },
//       {
//         headers: {
//           'content-type': 'application/json',
//           userToken: 'Bearer ' + userToken,
//           socialId
//         }
//       }
//     )
//     .then(res => res.data);
// };
