import { Linking, Alert } from 'react-native';

const openUrl = async (url, enableCancel) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    const isCanselable = enableCancel ? true : false;
    Alert.alert('エラー', 'このページを開ませんでした', [{ text: 'OK' }], {
      cancelable: isCanselable,
    });
  }
};

export default openUrl;
