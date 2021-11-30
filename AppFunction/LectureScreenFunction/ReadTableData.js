import AsyncStorage from '@react-native-async-storage/async-storage';

//データの読み出し
export async function readTableData(rd) {
  try {
    const gbi = await AsyncStorage.getItem(rd);
    if (gbi != null) {
      console.log('ファイル名：ReadTableData.js\n読み出し成功\n');
      return gbi;
    } else {
      console.log('ファイル名：ReadTableData.js\n値無し\n');
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名：ReadTableData.js\nエラー発生\n' + error);
  }
}
