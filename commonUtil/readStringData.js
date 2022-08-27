import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const readStringData = async (key) => {
  try {
    let loadedData = await AsyncStorage.getItem(key);
    if (loadedData != null) {
      console.log('キー ' + key + ' は値を持っています。' + '\n');
      return loadedData;
    } else {
      console.log('キー ' + key + ' は値を持っていません。' + '\n');
      return '';
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: readStringData.js\n' + error + '\n');
  }
};

export default readStringData;
