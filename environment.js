import Constants from "expo-constants";

const localhost = 'http://localhost:3001';
// const localhost = 'http://192.168.0.67:3001';

const ENV = {
 dev: {
   apiUrl: localhost,
   FB_appKey: '713430802477350',
   authConst : {SOCIAL_ID : 'SOCIAL_ID',FBTOKEN : 'FBTOKEN', USERTOKEN: 'USERTOKEN'},
   weather_API_KEY : '566758fdfefa4f7755240c7c1f060b10',
   air_API_KEY : '584c626e6b646235323262656e6e56'
 },
 prod: {
   apiUrl: "[your.production.api.here]",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;