import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const storeData = async (key, value) => {
  try {
    const stringData = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringData);
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default storeData;
