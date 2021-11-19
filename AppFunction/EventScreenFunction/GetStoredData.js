import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoredData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('store_fetchedData')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    console.log("ストレージからデータを得る際にエラーが起きました");
  }
}

export default getStoredData;
