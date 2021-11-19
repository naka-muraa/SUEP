import AsyncStorage from '@react-native-async-storage/async-storage';

//データの読み出し
export default async function loadData(itemKey) {
  try {
    let loadedData = await AsyncStorage.getItem(itemKey);
    loadedData = JSON.stringify(loadedData);
    if (loadedData != null) {
      return loadedData;
    } else {
      console.log('ファイル名：readData.js\n' + '呼び出す値がありません\n');
      return "";
    }
  } catch (error) {
    console.log('ファイル名：readData.js\n' + 'エラー：' + error + '\n');
  }
}
