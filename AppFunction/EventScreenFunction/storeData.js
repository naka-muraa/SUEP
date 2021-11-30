import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("store_fetchedData", jsonValue)
  } catch (error) {
    console.log(error);
    Sentry.Native.captureException(error);
  }
}

export default storeData;
