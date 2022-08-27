import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import readStringData from '../../../commonUtil/readStringData';
import HomeScreenPopup from './HomeScreenPopup';
import HomeScreenTable from './Table';

export default function LectureScreen() {
  const [initialBoot, setinitialBoot] = useState(false);

  useEffect(() => {
    // 初回起動かどうか確認
    const checkFirstLaunch = async () => {
      const firstLaunchFlag = await readStringData('firstLaunch');
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
