import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

// 主に連想配列を読み込む際に利用
const readArrayData = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue != null) {
      console.log('キー ' + key + ' は値を持っています。' + '\n');
      return JSON.parse(stringValue);
    } else {
      console.log('キー ' + key + ' は値を持っていません。' + '\n');
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名:GetStoredData.js' + error);
  }
};

export default readArrayData;
