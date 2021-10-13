import AsyncStorage from '@react-native-async-storage/async-storage';

//データの保存
export async function saveData(dp) {
  try {
    const dp_Key = dp[0];
    const dp_Value = dp[1];
    await AsyncStorage.setItem(dp_Key, dp_Value);
  } catch (error) {
  }
}
