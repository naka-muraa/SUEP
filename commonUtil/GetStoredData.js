import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const getStoredData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('store_fetchedData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名:GetStoredData.js' + error);
  }
};

export default getStoredData;
