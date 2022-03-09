import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const saveData = async (data) => {
  try {
    const key = data[0];
    const value = data[1];
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: saveData.js' + error + '\n');
  }
};

export default saveData;
