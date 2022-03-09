import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const readTableData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data != null) {
      console.log('ファイル名: ReadTableData.js\n読み出し成功\n');
      return data;
    } else {
      console.log('ファイル名: ReadTableData.js\n値無し\n');
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: ReadTableData.js' + error + '\n');
  }
};

export default readTableData;
