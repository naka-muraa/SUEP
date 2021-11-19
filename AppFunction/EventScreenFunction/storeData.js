import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("store_fetchedData", jsonValue)
  } catch (e) {
    console.log(e);
    console.log("ストレージへデータを保存する際にエラーが起きました");
  }
}

export default storeData;
