import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const readData = async (itemKey) => {
  try {
    let loadedData = await AsyncStorage.getItem(itemKey);
    loadedData = JSON.stringify(loadedData);
    if (loadedData != null) {
      console.log('ファイル名: readData.js\n' + '読み込み成功\n');
      return loadedData;
    } else {
      console.log('ファイル名: readData.js\n' + '呼び出す値がありません\n');
      return '';
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: readData.js\n' + error + '\n');
  }
};

export default readData;
