import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import readTableData from '../../../commonUtil/ReadTableData';
import HomeScreenPopup from './homeScreenPopup';
import HomeScreenTable from './Table';

export default function LectureScreen() {
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
  }, []);

  return (
    <View style={styles.container}>
      {initialBoot && <HomeScreenPopup />}

      {/* テーブル部分をインポート */}
      <HomeScreenTable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
