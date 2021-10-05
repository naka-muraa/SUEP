import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';

// 外部関数のインポート
import { saveData } from '../../appFunction/saveData';
import { readTableData } from '../../appFunction/ReadTableData';

export default function editLectureScreen({ navigation }) {
  const [registeredData, setRegisteredData] = useState();
  const [isChecked, setisChecked] = useState(true);

  // 初回描画時に実行
  useEffect(() => {
    const arrangeFunc = async () => {
      let storedLectureData = await readTableData('tableKey');
      storedLectureData = JSON.parse(storedLectureData);
      if (storedLectureData != null) {
        storedLectureData.filter(value => value.checked = false);
        setRegisteredData(storedLectureData);
      }
    }
    arrangeFunc();
  }, [])


  // チェックマークを付けたデータで "check" = true or falseを設定
  const checkMark = (classId) => {
    const classIdNumber = registeredData.findIndex((id) => id.時間割コード == classId);
    let newData = registeredData;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setRegisteredData(newData);
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <View style={{ width: '80%' }} >
        <View style={styles.itemSearch}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>{item.科目}</Text>
            <Text style={styles.teacher}>{item.担当}</Text>
          </View>
        </View>
      </View>
      <View style={{ borderWidth: 1, borderColor: '#dcdcdc', width: '100%', height: '100%' }}>
        <CheckBox
          checked={item.checked}
          onPress={() => { checkMark(item.時間割コード); setisChecked(!isChecked); }}
        />
      </View>
    </View>
  );

  const headerComponent = () => (
    <>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>登録済みの講義データを削除できます。</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.h2}>
          <Text style={styles.headerText}>科目</Text>
        </View>
        <View style={styles.h3}>
          <Text style={styles.headerText}>担当</Text>
        </View>
        <View style={styles.h4}>
          <Text style={styles.headerText}>削除</Text>
        </View>
      </View>
    </>
  )

  const deleteResisteredData = async () => {
    if (registeredData != null && registeredData != undefined) {
      let selectedLectures = registeredData.filter((lecture) => !lecture.checked);
      selectedLectures = JSON.stringify(selectedLectures);
      await saveData(['tableKey', selectedLectures]);
    }
    navigation.navigate('時間割表');
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={registeredData}
        renderItem={renderItem}
        keyExtractor={item => item.時間割コード}
        ListEmptyComponent={<Text>該当データがありません</Text>}
      />
      <View style={styles.searchTuikacontainer}>
        <TouchableOpacity style={styles.searchTuikaBtn} onPress={() => { deleteResisteredData(); }}>
          <Text style={styles.searchTuikaBtnText}>時間割から削除</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  // 検索結果一覧のデザイン
  itemSearch: {
    backgroundColor: '#167F92',
    flexDirection: 'row'
  },
  title: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    width: '50%',
  },
  teacher: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    width: '50%',
  },
  // 画面下の追加ボタンデザイン
  searchTuikaBtn: {
    width: '50%',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#78bbc7'
  },
  searchTuikacontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  searchTuikaBtnText: {
    fontSize: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  // 検索画面ヘッダー関連
  containerSearch: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginVertical: 2,
    marginHorizontal: 1,
  },
  description: {
    fontSize: 20,
    color: '#4682b4',
  },
  h2: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h3: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h4: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
