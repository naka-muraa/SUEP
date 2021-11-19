import AsyncStorage from '@react-native-async-storage/async-storage';

//データの読み出し
export default async function loadData(itemKey) {
  try {
    let loadedData = await AsyncStorage.getItem(itemKey);
    console.log('ファイル名：readData.js\n' + '読み込んだ値：' + loadedData + '\n');
    loadedData = JSON.stringify(loadedData);
    if (loadedData != null) {
      console.log('ファイル名：readData.js\n' + '読み込み成功\n');
      return loadedData;
    } else {
      console.log('ファイル名：readData.js\n' + '呼び出す値がありません\n');
      return "";
    }
  } catch (error) {
    console.log('ファイル名：readData.js\n' + 'エラー：' + error + '\n');
  }
}
