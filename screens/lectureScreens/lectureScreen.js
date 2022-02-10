import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

// 表示パーツと汎用関数のインポート
import HomeScreenPopup from './homeScreenPopup';
import HomeScreenTable from './classTable';
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

//時間割管理ホーム画面
export default function lectureScreen({ navigation }) {
  const [initialBoot, setinitialBoot] = useState(false);

  useEffect(() => {
    // 初回起動かどうか確認
    const checkFirstLaunch = async () => {
      const firstLaunchFlag = await readTableData('firstLaunch');
      if (firstLaunchFlag != 'alreadyLaunched') {
        setinitialBoot(true);
      }
    };
    checkFirstLaunch();
  }, [])

  return (
    <View style={styles.container}>
      {initialBoot && <HomeScreenPopup />}

      {/* テーブル部分をインポート */}
      <View style={styles.bottom}>
        <HomeScreenTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  bottom: {
    flex: 6,
  },

});
