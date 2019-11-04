import Constants from "expo-constants";

const localhost = 'http://localhost:3001';

const ENV = {
 dev: {
   apiUrl: localhost,
   FB_appKey: '713430802477350',
   authConst : {SOCIAL_ID : 'SOCIAL_ID',FBTOKEN : 'FBTOKEN', USERTOKEN: 'USERTOKEN'},
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