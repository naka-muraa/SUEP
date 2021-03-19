export default {
  name: "SUEP",
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
  orientation: "portrait",
  icon: "./assets/suep_icon.png",
  splash: {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#FFFFFF",
  },
  updates: {
    "fallbackToCacheTimeout": 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    "supportsTablet": true,
    "bundleIdentifier": "com.tpot.suepapp",
    "buildNumber": "1.0.0"
  },
  android: {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    },
    "package": "com.tpot.suepapp",
    "versionCode": 1,
  },
  web: {
    "favicon": "./assets/favicon.png"
  },
  extra: {
    'googleKey': 'AIzaSyDn6mliAUKXl1AOXJ_2GNm9LZGQ9fY9TI0',
    'sheetId': '1iOf5XVafqH0L8t0XZVShUgMFp8Yegctq_qUOU6rCGqI',
  },
};
